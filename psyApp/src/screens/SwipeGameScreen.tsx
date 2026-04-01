import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';

import {
  SWIPE_SCENARIOS,
  RANDOM_EVENTS,
  RandomEvent,
  DIFFICULTY_CONFIGS,
  DifficultyConfig,
  PERSONA_BUFFS,
  PersonaBuff,
  SwipeScenario,
} from '../data/swipeScenarios';
import { useGame } from '../context/gameContext';

const { width: SW, height: SH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;
const MAX_STAT = 100;

type Phase = 'intro' | 'menu' | 'confirm' | 'playing' | 'event' | 'gameover';

// ═══════════════════════════════════════════════════════
//                  SWIPE GAME SCREEN
// ═══════════════════════════════════════════════════════
const SwipeGameScreen = ({ navigation }: any) => {
  const game = useGame();

  // ── State ──
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedDiff, setSelectedDiff] = useState<DifficultyConfig>(DIFFICULTY_CONFIGS[0]);
  const [scenarios, setScenarios] = useState<SwipeScenario[]>([]);
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ sanity: 60, energy: 60, social: 60, wealth: 60 });
  const [deathReason, setDeathReason] = useState('');
  const [profilerLog, setProfilerLog] = useState<string[]>([]);
  const [survived, setSurvived] = useState(0);
  const [pendingEv, setPendingEv] = useState<RandomEvent | null>(null);
  const [showHint, setShowHint] = useState(false);

  const activeBuff = useMemo(() =>
    PERSONA_BUFFS.find(p => p.personaId === game.activePersona) || PERSONA_BUFFS[0],
    [game.activePersona]
  );

  // ── Animation Refs ──
  const pos = useRef(new Animated.ValueXY()).current;

  // Intro animations (all JS-driven vì safe)
  const introFade = useRef(new Animated.Value(0)).current;
  const introTitleY = useRef(new Animated.Value(50)).current;
  const introRulesOp = useRef(new Animated.Value(0)).current;
  const introBtnOp = useRef(new Animated.Value(0)).current;
  const introBtnScale = useRef(new Animated.Value(0.8)).current;
  const introOrb1 = useRef(new Animated.Value(0)).current;
  const introOrb2 = useRef(new Animated.Value(0)).current;

  // ── Intro Auto-Play ──
  useEffect(() => {
    if (phase !== 'intro') return;

    // Floating orbs
    Animated.loop(Animated.sequence([
      Animated.timing(introOrb1, { toValue: -15, duration: 2000, useNativeDriver: false }),
      Animated.timing(introOrb1, { toValue: 15, duration: 2000, useNativeDriver: false }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(introOrb2, { toValue: 15, duration: 2500, useNativeDriver: false }),
      Animated.timing(introOrb2, { toValue: -15, duration: 2500, useNativeDriver: false }),
    ])).start();

    // Timeline tự chạy
    const t1 = setTimeout(() => {
      // Avatar + Title fade in
      Animated.parallel([
        Animated.timing(introFade, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(introTitleY, { toValue: 0, duration: 1000, useNativeDriver: false }),
      ]).start();
    }, 400);

    const t2 = setTimeout(() => {
      // Rules
      Animated.timing(introRulesOp, { toValue: 1, duration: 800, useNativeDriver: false }).start();
    }, 2000);

    const t3 = setTimeout(() => {
      // Button
      Animated.parallel([
        Animated.timing(introBtnOp, { toValue: 1, duration: 600, useNativeDriver: false }),
        Animated.spring(introBtnScale, { toValue: 1, tension: 50, friction: 5, useNativeDriver: false }),
      ]).start();
      try { HapticFeedback.trigger('notificationSuccess'); } catch(e) {}
    }, 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  // ── Pan Responder ──
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => phase === 'playing',
    onPanResponderMove: (_, gs) => pos.setValue({ x: gs.dx, y: gs.dy * 0.2 }),
    onPanResponderRelease: (_, gs) => {
      if (gs.dx > SWIPE_THRESHOLD) swipe('right');
      else if (gs.dx < -SWIPE_THRESHOLD) swipe('left');
      else Animated.spring(pos, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: false }).start();
    },
  }), [pos, idx, stats, phase]);

  const swipe = (dir: 'right' | 'left') => {
    const x = dir === 'right' ? SW + 100 : -SW - 100;
    Animated.timing(pos, { toValue: { x, y: 0 }, duration: 280, useNativeDriver: false }).start(() => applySwipe(dir));
    try { HapticFeedback.trigger(dir === 'right' ? 'notificationSuccess' : 'notificationError'); } catch(e) {}
  };

  // ── Start Game ──
  const startGame = useCallback((diff: DifficultyConfig) => {
    setSelectedDiff(diff);
    const s = diff.startStats;
    setStats({
      sanity: Math.min(MAX_STAT, s + activeBuff.statBonus.sanity),
      energy: Math.min(MAX_STAT, s + activeBuff.statBonus.energy),
      social: Math.min(MAX_STAT, s + activeBuff.statBonus.social),
      wealth: Math.min(MAX_STAT, s + activeBuff.statBonus.wealth),
    });
    const shuffled = [...SWIPE_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, diff.cardCount);
    setScenarios(shuffled);
    setIdx(0); setDeathReason(''); setProfilerLog([]); setSurvived(0); setPendingEv(null); setShowHint(false);
    pos.setValue({ x: 0, y: 0 });
    setPhase('playing');
  }, [activeBuff]);

  // ── Apply Decision ──
  const applySwipe = (dir: 'left' | 'right') => {
    const sc = scenarios[idx];
    if (!sc) return;
    const raw = dir === 'left' ? sc.leftImpact : sc.rightImpact;
    const m = selectedDiff.multiplier;
    const imp = {
      sanity: raw.sanity > 0 ? raw.sanity : Math.round(raw.sanity * m),
      energy: raw.energy > 0 ? raw.energy : Math.round(raw.energy * m),
      social: raw.social > 0 ? raw.social : Math.round(raw.social * m),
      wealth: raw.wealth > 0 ? raw.wealth : Math.round(raw.wealth * m),
    };
    if (activeBuff.personaId === 'philosopher') imp.sanity = imp.sanity < 0 ? Math.round(imp.sanity * 0.5) : imp.sanity;
    if (activeBuff.personaId === 'manipulator') imp.social = imp.social < 0 ? Math.round(imp.social * 0.7) : imp.social;
    if (raw.effectName) setProfilerLog(prev => [...new Set([...prev, raw.effectName!])]);

    const ns = survived + 1;
    setSurvived(ns);

    setStats(prev => {
      const n = {
        sanity: Math.max(0, Math.min(MAX_STAT, prev.sanity + imp.sanity)),
        energy: Math.max(0, Math.min(MAX_STAT, prev.energy + imp.energy)),
        social: Math.max(0, Math.min(MAX_STAT, prev.social + imp.social)),
        wealth: Math.max(0, Math.min(MAX_STAT, prev.wealth + imp.wealth)),
      };
      if (n.sanity <= 0) endGame('💀 Tâm trí tan vỡ: Suy sụp tinh thần', ns, false);
      else if (n.energy <= 0) endGame('🩸 Đột quỵ: Kiệt sức hoàn toàn', ns, false);
      else if (n.social <= 0) endGame('🚪 Bị tẩy chay: Xã hội ruồng bỏ', ns, false);
      else if (n.wealth <= 0) endGame('💸 Phá sản: Vỡ nợ tứ bề', ns, false);
      else if (idx >= scenarios.length - 1) endGame('🏆 SỐNG SÓT HOÀN HẢO!', ns, true);
      else maybeEvent(idx + 1);
      return n;
    });
    setIdx(prev => prev + 1);
    pos.setValue({ x: 0, y: 0 });
    setShowHint(false);
  };

  const endGame = (reason: string, count: number, win: boolean) => {
    setDeathReason(reason);
    let gems = count * selectedDiff.gemRewardPerCard;
    if (win) gems += selectedDiff.bonusGems;
    if (activeBuff.personaId === 'mastermind' && win) gems *= 2;
    if (gems > 0) game.addGems(gems);
    setPhase('gameover');
    try { HapticFeedback.trigger(win ? 'notificationSuccess' : 'notificationWarning'); } catch(e) {}
  };

  const maybeEvent = (nextIdx: number) => {
    if (nextIdx % 4 !== 0) return;
    const roll = Math.random();
    if (roll < selectedDiff.curseChance) {
      let pool = RANDOM_EVENTS.filter(e => e.type === 'curse');
      if (activeBuff.personaId === 'killer') pool = pool.filter(e => e.impact.energy >= -10);
      if (pool.length > 0) { setPendingEv(pool[Math.floor(Math.random() * pool.length)]); setPhase('event'); }
    } else if (roll < selectedDiff.curseChance + 0.2) {
      const pool = RANDOM_EVENTS.filter(e => e.type === 'lucky');
      if (pool.length > 0) { setPendingEv(pool[Math.floor(Math.random() * pool.length)]); setPhase('event'); }
    }
  };

  const dismissEvent = () => {
    if (!pendingEv) return;
    setStats(prev => ({
      sanity: Math.max(0, Math.min(MAX_STAT, prev.sanity + pendingEv.impact.sanity)),
      energy: Math.max(0, Math.min(MAX_STAT, prev.energy + pendingEv.impact.energy)),
      social: Math.max(0, Math.min(MAX_STAT, prev.social + pendingEv.impact.social)),
      wealth: Math.max(0, Math.min(MAX_STAT, prev.wealth + pendingEv.impact.wealth)),
    }));
    setPendingEv(null);
    setPhase('playing');
  };

  // ═══════════════════════════════
  //        RENDER: INTRO
  // ═══════════════════════════════
  if (phase === 'intro') {
    return (
      <View style={s.introWrap}>
        <StatusBar barStyle="light-content" hidden />
        <LinearGradient colors={['#07080f', '#150a2e', '#07080f']} style={StyleSheet.absoluteFill} />

        {/* Floating Orbs */}
        <Animated.View style={[s.orb, { top: '12%', left: '8%', width: 100, height: 100, backgroundColor: 'rgba(139,92,246,0.12)', transform: [{ translateY: introOrb1 }] }]} />
        <Animated.View style={[s.orb, { top: '55%', right: '6%', width: 70, height: 70, backgroundColor: 'rgba(244,63,94,0.1)', transform: [{ translateY: introOrb2 }] }]} />
        <Animated.View style={[s.orb, { bottom: '18%', left: '30%', width: 50, height: 50, backgroundColor: 'rgba(251,191,36,0.08)', transform: [{ translateY: introOrb1 }] }]} />

        {/* Avatar + Title */}
        <Animated.View style={{ opacity: introFade, transform: [{ translateY: introTitleY }], alignItems: 'center' }}>
          <View style={s.introAvatarRing}>
            <Text style={{fontSize: 60}}>🪞</Text>
          </View>
          <Text style={s.introTitle}>TẤM GƯƠNG{'\n'}VÔ THỨC</Text>
          <Text style={s.introSub}>Cuộc chiến sinh tồn tâm lý</Text>
        </Animated.View>

        {/* Rules */}
        <Animated.View style={[s.introRulesBox, { opacity: introRulesOp }]}>
          <View style={s.ruleRow}>
            <View style={[s.ruleDot, {backgroundColor: '#f43f5e'}]} />
            <Text style={s.ruleText}>👈 Quẹt trái = <Text style={{color: '#f43f5e', fontWeight: '900'}}>Phủ quyết</Text></Text>
          </View>
          <View style={s.ruleRow}>
            <View style={[s.ruleDot, {backgroundColor: '#10b981'}]} />
            <Text style={s.ruleText}>👉 Quẹt phải = <Text style={{color: '#10b981', fontWeight: '900'}}>Chấp thuận</Text></Text>
          </View>
          <View style={s.ruleSep} />
          <View style={s.ruleRow}>
            <View style={[s.ruleDot, {backgroundColor: '#c084fc'}]} />
            <Text style={s.ruleText}>Giữ cân bằng 4 chỉ số: 🧠⚡🤝💰</Text>
          </View>
          <View style={s.ruleRow}>
            <View style={[s.ruleDot, {backgroundColor: '#fbbf24'}]} />
            <Text style={s.ruleText}>Chỉ số nào chạm 0 → <Text style={{color: '#f43f5e', fontWeight: '900'}}>Bạn chết!</Text></Text>
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={{ opacity: introBtnOp, transform: [{ scale: introBtnScale }], width: '100%', paddingHorizontal: 24 }}>
          <TouchableOpacity onPress={() => setPhase('menu')} activeOpacity={0.85}>
            <LinearGradient colors={['#f43f5e', '#9333ea']} start={{x:0,y:0}} end={{x:1,y:1}} style={s.introBtn}>
              <Text style={s.introBtnText}>🪞 NHÌN VÀO GƯƠNG</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={s.skipBtn} onPress={() => setPhase('menu')}>
          <Text style={s.skipText}>Bỏ qua →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ═══════════════════════════════
  //        RENDER: MENU
  // ═══════════════════════════════
  if (phase === 'menu') {
    return (
      <LinearGradient colors={['#07080f', '#1e1b4b', '#07080f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={s.menuPad} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={s.menuHeader}>
              <Text style={{fontSize: 40}}>🪞</Text>
              <Text style={s.menuTitle}>CHỌN TRẬN ĐẤU</Text>
            </View>

            {/* Persona */}
            <LinearGradient colors={['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.05)']} style={s.personaBox}>
              <Text style={{fontSize: 32}}>{activeBuff.emoji}</Text>
              <View style={{flex: 1, marginLeft: 14}}>
                <Text style={s.personaName}>{activeBuff.name}</Text>
                <Text style={s.personaDesc}>{activeBuff.description}</Text>
                {activeBuff.specialAbility && <Text style={s.personaAbility}>⚡ {activeBuff.specialAbility}</Text>}
              </View>
            </LinearGradient>

            {/* Difficulty Cards */}
            {DIFFICULTY_CONFIGS.map((d, i) => {
              const colors = i === 0 ? ['#064e3b', '#065f46'] : i === 1 ? ['#713f12', '#78350f'] : i === 2 ? ['#7f1d1d', '#991b1b'] : ['#4a044e', '#581c87'];
              return (
                <TouchableOpacity key={d.id} onPress={() => { setSelectedDiff(d); setPhase('confirm'); }} activeOpacity={0.85}>
                  <LinearGradient colors={colors} start={{x:0,y:0}} end={{x:1,y:1}} style={[s.diffCard, i === 3 && s.diffNightmare]}>
                    <View style={s.diffTop}>
                      <Text style={{fontSize: 32}}>{d.emoji}</Text>
                      <View style={{flex: 1, marginLeft: 14}}>
                        <Text style={s.diffName}>{d.name}</Text>
                        <Text style={s.diffDesc}>{d.description}</Text>
                      </View>
                    </View>
                    <View style={s.diffBottom}>
                      <View style={s.diffChip}><Text style={s.diffChipText}>🃏 {d.cardCount} thẻ</Text></View>
                      <View style={s.diffChip}><Text style={s.diffChipText}>❤️ HP {d.startStats}</Text></View>
                      <View style={s.diffChip}><Text style={s.diffChipText}>⚔️ x{d.multiplier}</Text></View>
                      <View style={[s.diffChip, {backgroundColor: 'rgba(251,191,36,0.2)'}]}><Text style={[s.diffChipText, {color: '#fbbf24'}]}>💎 {d.gemRewardPerCard}/thẻ</Text></View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
              <Text style={s.backText}>← Quay lại</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════════
  //     RENDER: CONFIRM (Xác nhận)
  // ═══════════════════════════════
  if (phase === 'confirm') {
    const d = selectedDiff;
    const preview = {
      sanity: Math.min(MAX_STAT, d.startStats + activeBuff.statBonus.sanity),
      energy: Math.min(MAX_STAT, d.startStats + activeBuff.statBonus.energy),
      social: Math.min(MAX_STAT, d.startStats + activeBuff.statBonus.social),
      wealth: Math.min(MAX_STAT, d.startStats + activeBuff.statBonus.wealth),
    };
    return (
      <LinearGradient colors={['#07080f', '#1e1b4b', '#07080f']} style={s.flex}>
        <SafeAreaView style={[s.flex, {justifyContent: 'center', paddingHorizontal: 24}]}>
          <StatusBar barStyle="light-content" />

          {/* Difficulty Badge */}
          <View style={s.confirmTop}>
            <Text style={{fontSize: 56}}>{d.emoji}</Text>
            <Text style={s.confirmName}>{d.name}</Text>
            <Text style={s.confirmDesc}>{d.description}</Text>
          </View>

          {/* Stats Preview */}
          <View style={s.confirmStats}>
            <Text style={s.confirmLabel}>CHỈ SỐ KHỞI ĐẦU</Text>
            <View style={s.confirmRow}>
              <StatPreview emoji="🧠" label="Tỉnh Táo" val={preview.sanity} color="#c084fc" />
              <StatPreview emoji="⚡" label="Thể Lực" val={preview.energy} color="#34d399" />
            </View>
            <View style={s.confirmRow}>
              <StatPreview emoji="🤝" label="Quan Hệ" val={preview.social} color="#38bdf8" />
              <StatPreview emoji="💰" label="Tài Sản" val={preview.wealth} color="#fbbf24" />
            </View>
          </View>

          {/* Info */}
          <View style={s.confirmInfo}>
            <InfoRow label="Số thẻ kịch bản" value={`${d.cardCount} thẻ`} />
            <InfoRow label="Hệ số sát thương" value={`x${d.multiplier}`} danger={d.multiplier > 1} />
            <InfoRow label="Phần thưởng" value={`💎 ${d.gemRewardPerCard}/thẻ`} gold />
            {d.curseChance > 0 && <InfoRow label="Thẻ Đen xuất hiện" value={`${Math.round(d.curseChance * 100)}%`} danger />}
          </View>

          {/* Start Button */}
          <TouchableOpacity onPress={() => startGame(d)} activeOpacity={0.85}>
            <LinearGradient colors={['#f43f5e', '#9333ea']} start={{x:0,y:0}} end={{x:1,y:1}} style={s.confirmStartBtn}>
              <Text style={s.confirmStartText}>⚔️ BẮT ĐẦU SINH TỒN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginTop: 14, padding: 10}} onPress={() => setPhase('menu')}>
            <Text style={{color: '#64748b', fontSize: 13, fontWeight: '700'}}>← Đổi độ khó</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════════
  //     RENDER: RANDOM EVENT
  // ═══════════════════════════════
  if (phase === 'event' && pendingEv) {
    const lucky = pendingEv.type === 'lucky';
    return (
      <LinearGradient colors={lucky ? ['#07080f', '#14532d', '#07080f'] : ['#07080f', '#7f1d1d', '#07080f']} style={s.flex}>
        <SafeAreaView style={[s.flex, {justifyContent: 'center', alignItems: 'center', padding: 30}]}>
          <View style={[s.evCard, { borderColor: lucky ? '#22c55e' : '#ef4444' }]}>
            <Text style={{fontSize: 56, textAlign: 'center', marginBottom: 12}}>{pendingEv.emoji}</Text>
            <Text style={[s.evType, { color: lucky ? '#22c55e' : '#ef4444' }]}>
              {lucky ? '🌟 THẺ VÀNG MAY MẮN' : '💀 THẺ ĐEN NGUYỀN RỦA'}
            </Text>
            <Text style={s.evDesc}>{pendingEv.description}</Text>
            <View style={s.evChips}>
              {pendingEv.impact.sanity !== 0 && <ImpactChip icon="🧠" val={pendingEv.impact.sanity} />}
              {pendingEv.impact.energy !== 0 && <ImpactChip icon="⚡" val={pendingEv.impact.energy} />}
              {pendingEv.impact.social !== 0 && <ImpactChip icon="🤝" val={pendingEv.impact.social} />}
              {pendingEv.impact.wealth !== 0 && <ImpactChip icon="💰" val={pendingEv.impact.wealth} />}
            </View>
            <TouchableOpacity style={[s.evBtn, { backgroundColor: lucky ? '#22c55e' : '#ef4444' }]} onPress={dismissEvent}>
              <Text style={s.evBtnText}>CHẤP NHẬN SỐ PHẬN</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════════
  //     RENDER: GAME OVER
  // ═══════════════════════════════
  if (phase === 'gameover') {
    const win = deathReason.includes('SỐNG SÓT');
    let gems = survived * selectedDiff.gemRewardPerCard;
    if (win) gems += selectedDiff.bonusGems;
    if (activeBuff.personaId === 'mastermind' && win) gems *= 2;

    return (
      <LinearGradient colors={win ? ['#07080f', '#14532d', '#07080f'] : ['#07080f', '#450a0a', '#07080f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <ScrollView contentContainerStyle={s.goScroll}>
            <Text style={{fontSize: 48}}>🕵️</Text>
            <Text style={s.goTitle}>BỆNH ÁN TÂM LÝ</Text>
            <Text style={s.goDeath}>{deathReason}</Text>

            <View style={s.goRow}>
              <View style={s.goBox}><Text style={s.goNum}>{survived}</Text><Text style={s.goLbl}>Thẻ sống sót</Text></View>
              <View style={s.goBox}><Text style={[s.goNum, {color:'#fbbf24'}]}>{gems}💎</Text><Text style={s.goLbl}>Gems nhận</Text></View>
              <View style={s.goBox}><Text style={s.goNum}>{selectedDiff.emoji}</Text><Text style={s.goLbl}>{selectedDiff.name}</Text></View>
            </View>

            {profilerLog.length > 0 && (
              <View style={s.diagBox}>
                <Text style={s.diagTitle}>🔍 LỖI NHẬN THỨC ĐÃ MẮC:</Text>
                {profilerLog.map((e, i) => (
                  <View key={i} style={s.diagItem}><Text style={{color:'#f43f5e'}}>⚠️</Text><Text style={s.diagText}>{e}</Text></View>
                ))}
              </View>
            )}

            <TouchableOpacity onPress={() => setPhase('menu')}>
              <LinearGradient colors={['#8b5cf6', '#4f46e5']} style={s.retryBtn}>
                <Text style={s.retryText}>🔄 CHƠI LẠI</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 12, marginTop: 8}} onPress={() => navigation.goBack()}>
              <Text style={{color:'#64748b', fontSize: 14, fontWeight: '700', textAlign: 'center'}}>← Thoát</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════════
  //     RENDER: PLAYING
  // ═══════════════════════════════
  const sc = scenarios[idx];
  if (!sc) return <View style={s.flex}><LinearGradient colors={['#07080f','#1e1b4b','#07080f']} style={s.flex} /></View>;

  const rotate = pos.x.interpolate({ inputRange: [-SW/2, 0, SW/2], outputRange: ['-14deg', '0deg', '14deg'], extrapolate: 'clamp' });
  const leftOp = pos.x.interpolate({ inputRange: [-SW/2, -30], outputRange: [1, 0], extrapolate: 'clamp' });
  const rightOp = pos.x.interpolate({ inputRange: [30, SW/2], outputRange: [0, 1], extrapolate: 'clamp' });
  const leftBgOp = pos.x.interpolate({ inputRange: [-SW/2, 0], outputRange: [0.3, 0], extrapolate: 'clamp' });
  const rightBgOp = pos.x.interpolate({ inputRange: [0, SW/2], outputRange: [0, 0.3], extrapolate: 'clamp' });
  const themeMap: any = { office: '💼 Công sở', love: '❤️ Tình yêu', family: '👪 Gia đình', social_media: '📱 Mạng XH', money: '💰 Tiền bạc' };

  return (
    <LinearGradient colors={['#07080f', '#1e1b4b', '#07080f']} style={s.flex}>
      {/* Swipe color overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: '#f43f5e', opacity: leftBgOp}]} pointerEvents="none" />
      <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: '#10b981', opacity: rightBgOp}]} pointerEvents="none" />

      <SafeAreaView style={s.flex}>
        <StatusBar barStyle="light-content" hidden />

        {/* HUD - Circular Gauges */}
        <View style={s.hud}>
          <View style={s.gaugeRow}>
            <CircleGauge emoji="🧠" val={stats.sanity} color="#c084fc" />
            <CircleGauge emoji="⚡" val={stats.energy} color="#34d399" />
            <View style={s.hudMidBox}>
              <Text style={s.hudCount}>{idx + 1}</Text>
              <Text style={s.hudSlash}>/ {scenarios.length}</Text>
            </View>
            <CircleGauge emoji="🤝" val={stats.social} color="#38bdf8" />
            <CircleGauge emoji="💰" val={stats.wealth} color="#fbbf24" />
          </View>
          {activeBuff.specialAbility?.includes('Xem trước') && (
            <TouchableOpacity style={s.hintBtn} onPress={() => setShowHint(p => !p)}>
              <Text style={{fontSize: 14}}>🔍</Text><Text style={s.hintBtnText}>{showHint ? 'Ẩn' : 'Soi'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Card */}
        <View style={s.gameArea}>
          <Animated.View {...panResponder.panHandlers} style={[s.card, { transform: [...pos.getTranslateTransform(), { rotate }] }]}>
            <LinearGradient colors={['#1e293b', '#111827', '#0f172a']} style={s.cardInner}>
              {/* Theme tag */}
              <View style={s.tagRow}><View style={s.tag}><Text style={s.tagText}>{themeMap[sc.theme] || sc.theme}</Text></View></View>

              {/* Scenario */}
              <Text style={s.scenarioText}>{sc.situation}</Text>

              {/* Sherlock hint */}
              {showHint && (
                <View style={s.hintBox}>
                  <Text style={s.hintLabel}>🔍 Phân tích:</Text>
                  <Text style={s.hintLine}>← {fmtImpact(sc.leftImpact)}</Text>
                  <Text style={s.hintLine}>→ {fmtImpact(sc.rightImpact)}</Text>
                </View>
              )}

              {/* Crowd */}
              <View style={s.crowd}>
                <Text style={s.crowdTitle}>👁 ĐÁM ĐÔNG:</Text>
                <Text style={s.crowdDesc}>{sc.crowdPercentageLabel}</Text>
              </View>

              {/* Choice overlays */}
              <Animated.View style={[s.choiceL, { opacity: leftOp }]}>
                <Text style={{fontSize: 28}}>❌</Text>
                <Text style={s.choiceLbl}>{sc.leftChoice}</Text>
              </Animated.View>
              <Animated.View style={[s.choiceR, { opacity: rightOp }]}>
                <Text style={{fontSize: 28}}>✅</Text>
                <Text style={s.choiceLbl}>{sc.rightChoice}</Text>
              </Animated.View>
            </LinearGradient>
          </Animated.View>
        </View>

        <View style={s.swipeHint}><Text style={s.swipeHintText}>← QUẸT TRÁI  •  QUẸT PHẢI →</Text></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

// ═════════ HELPER COMPONENTS ═════════
const fmtImpact = (imp: any) => {
  const p: string[] = [];
  if (imp.sanity) p.push(`🧠${imp.sanity > 0?'+':''}${imp.sanity}`);
  if (imp.energy) p.push(`⚡${imp.energy > 0?'+':''}${imp.energy}`);
  if (imp.social) p.push(`🤝${imp.social > 0?'+':''}${imp.social}`);
  if (imp.wealth) p.push(`💰${imp.wealth > 0?'+':''}${imp.wealth}`);
  return p.join('  ');
};

const ImpactChip = ({ icon, val }: { icon: string; val: number }) => (
  <View style={[s.chip, { borderColor: val >= 0 ? '#22c55e' : '#ef4444' }]}>
    <Text style={s.chipText}>{icon} {val > 0?'+':''}{val}</Text>
  </View>
);

const HudBar = ({ icon, val, color }: { icon: string; val: number; color: string }) => (
  <View style={s.hudItem}>
    <Text style={{fontSize: 11}}>{icon}</Text>
    <View style={s.hudTrack}>
      <LinearGradient colors={[color, color + '80']} start={{x:0,y:0}} end={{x:1,y:0}} style={[s.hudFill, { width: `${val}%` }]} />
    </View>
    <Text style={[s.hudVal, { color }]}>{val}</Text>
  </View>
);

const StatPreview = ({ emoji, label, val, color }: { emoji: string; label: string; val: number; color: string }) => (
  <View style={s.previewItem}>
    <Text style={{fontSize: 20}}>{emoji}</Text>
    <Text style={[s.previewVal, { color }]}>{val}</Text>
    <Text style={s.previewLabel}>{label}</Text>
  </View>
);

const InfoRow = ({ label, value, danger, gold }: { label: string; value: string; danger?: boolean; gold?: boolean }) => (
  <View style={s.infoRow}>
    <Text style={s.infoLabel}>{label}</Text>
    <Text style={[s.infoVal, danger && {color:'#f43f5e'}, gold && {color:'#fbbf24'}]}>{value}</Text>
  </View>
);

export default SwipeGameScreen;

// ═══════════════════════════════════════════════════════
//                      STYLES
// ═══════════════════════════════════════════════════════
const s = StyleSheet.create({
  flex: { flex: 1 },

  // INTRO
  introWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 },
  orb: { position: 'absolute', borderRadius: 100 },
  introAvatarRing: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(139,92,246,0.15)', borderWidth: 3, borderColor: '#8b5cf6', justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#8b5cf6', shadowOpacity: 0.6, shadowRadius: 25, elevation: 10 },
  introTitle: { color: '#f8fafc', fontSize: 38, fontWeight: '900', textAlign: 'center', letterSpacing: 4, lineHeight: 48, textShadowColor: '#f43f5e', textShadowRadius: 20 },
  introSub: { color: '#64748b', fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 8, letterSpacing: 1, marginBottom: 28 },
  introRulesBox: { width: '100%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 28 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ruleDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  ruleText: { color: '#cbd5e1', fontSize: 14, fontWeight: '700', flex: 1, lineHeight: 20 },
  ruleSep: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 8 },
  introBtn: { paddingVertical: 18, borderRadius: 28, alignItems: 'center', shadowColor: '#f43f5e', shadowOpacity: 0.6, shadowRadius: 20, elevation: 8 },
  introBtnText: { color: '#fff', fontSize: 17, fontWeight: '900', letterSpacing: 2 },
  skipBtn: { position: 'absolute', top: 50, right: 24 },
  skipText: { color: '#475569', fontSize: 13, fontWeight: '700' },

  // MENU
  menuPad: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 50 },
  menuHeader: { alignItems: 'center', marginBottom: 20 },
  menuTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '900', letterSpacing: 2, marginTop: 6, textShadowColor: '#f43f5e', textShadowRadius: 12 },
  personaBox: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(139,92,246,0.4)', marginBottom: 20 },
  personaName: { color: '#e2e8f0', fontSize: 15, fontWeight: '900' },
  personaDesc: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  personaAbility: { color: '#c084fc', fontSize: 11, fontWeight: '800', marginTop: 4 },
  diffCard: { borderRadius: 22, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', elevation: 4, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  diffNightmare: { borderColor: '#f43f5e', shadowColor: '#f43f5e', shadowOpacity: 0.4, shadowRadius: 15 },
  diffTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  diffName: { color: '#f8fafc', fontSize: 20, fontWeight: '900' },
  diffDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2, fontWeight: '600' },
  diffBottom: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  diffChip: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  diffChipText: { color: '#e2e8f0', fontSize: 11, fontWeight: '800' },
  backBtn: { alignSelf: 'center', marginTop: 16, paddingHorizontal: 28, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  backText: { color: '#94a3b8', fontSize: 13, fontWeight: '700' },

  // CONFIRM
  confirmTop: { alignItems: 'center', marginBottom: 24 },
  confirmName: { color: '#f8fafc', fontSize: 28, fontWeight: '900', marginTop: 10, letterSpacing: 2 },
  confirmDesc: { color: '#94a3b8', fontSize: 13, fontWeight: '700', marginTop: 4 },
  confirmStats: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  confirmLabel: { color: '#64748b', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 14, textAlign: 'center' },
  confirmRow: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  previewItem: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  previewVal: { fontSize: 22, fontWeight: '900', marginTop: 4 },
  previewLabel: { color: '#64748b', fontSize: 10, fontWeight: '800', marginTop: 4 },
  confirmInfo: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 20, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  infoLabel: { color: '#94a3b8', fontSize: 13, fontWeight: '700' },
  infoVal: { color: '#e2e8f0', fontSize: 13, fontWeight: '900' },
  confirmStartBtn: { paddingVertical: 18, borderRadius: 28, alignItems: 'center', shadowColor: '#f43f5e', shadowOpacity: 0.6, shadowRadius: 20, elevation: 8 },
  confirmStartText: { color: '#fff', fontSize: 17, fontWeight: '900', letterSpacing: 2 },

  // HUD
  hud: { paddingHorizontal: 16, paddingTop: 8 },
  hudRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  hudItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  hudTrack: { flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' },
  hudFill: { height: '100%', borderRadius: 4 },
  hudVal: { fontSize: 11, fontWeight: '900', width: 26, textAlign: 'right' },
  hudMid: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4, gap: 12 },
  hudCount: { color: '#64748b', fontSize: 12, fontWeight: '900', letterSpacing: 1, backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 10 },
  hintBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139,92,246,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  hintBtnText: { color: '#c084fc', fontSize: 11, fontWeight: '800', marginLeft: 4 },

  // GAME
  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { width: SW * 0.9, height: SH * 0.55, elevation: 15, shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 25, shadowOffset: { width: 0, height: 15 } },
  cardInner: { flex: 1, borderRadius: 32, padding: 24, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)', justifyContent: 'center', overflow: 'hidden' },
  tagRow: { position: 'absolute', top: 16, left: 20 },
  tag: { backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  tagText: { color: '#94a3b8', fontSize: 11, fontWeight: '800' },
  scenarioText: { color: '#f8fafc', fontSize: 19, fontWeight: '900', lineHeight: 30, textAlign: 'center', marginBottom: 20, marginTop: 10, textShadowColor: 'rgba(192,132,252,0.5)', textShadowRadius: 10 },
  crowd: { backgroundColor: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  crowdTitle: { color: '#fbbf24', fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  crowdDesc: { color: '#cbd5e1', fontSize: 11, fontWeight: '600', lineHeight: 16, fontStyle: 'italic' },
  choiceL: { position: 'absolute', top: 24, right: 14, borderRadius: 16, padding: 14, borderWidth: 2.5, borderColor: '#f43f5e', backgroundColor: 'rgba(244,63,94,0.2)', transform: [{rotate:'-8deg'}], alignItems: 'center' },
  choiceR: { position: 'absolute', top: 24, left: 14, borderRadius: 16, padding: 14, borderWidth: 2.5, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', transform: [{rotate:'8deg'}], alignItems: 'center' },
  choiceLbl: { color: '#fff', fontSize: 10, fontWeight: '800', marginTop: 4, textAlign: 'center', maxWidth: 90 },
  hintBox: { backgroundColor: 'rgba(139,92,246,0.12)', padding: 10, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#8b5cf6' },
  hintLabel: { color: '#c084fc', fontSize: 10, fontWeight: '900', marginBottom: 4 },
  hintLine: { color: '#e2e8f0', fontSize: 10, fontWeight: '700' },
  swipeHint: { alignItems: 'center', paddingBottom: 16 },
  swipeHintText: { color: '#475569', fontSize: 11, fontWeight: '800', letterSpacing: 1 },

  // EVENT
  evCard: { width: '100%', backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: 32, padding: 28, borderWidth: 2, alignItems: 'center' },
  evType: { fontSize: 14, fontWeight: '900', letterSpacing: 2, marginBottom: 14 },
  evDesc: { color: '#e2e8f0', fontSize: 17, fontWeight: '800', textAlign: 'center', lineHeight: 26, marginBottom: 20 },
  evChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  chipText: { color: '#e2e8f0', fontSize: 13, fontWeight: '800' },
  evBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16 },
  evBtnText: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: 1 },

  // GAME OVER
  goScroll: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 50, alignItems: 'center' },
  goTitle: { color: '#f8fafc', fontSize: 22, fontWeight: '900', marginTop: 14, letterSpacing: 2, textShadowColor: '#f43f5e', textShadowRadius: 12 },
  goDeath: { color: '#94a3b8', fontSize: 13, fontWeight: '700', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  goRow: { flexDirection: 'row', gap: 12, marginVertical: 20, width: '100%' },
  goBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  goNum: { color: '#f8fafc', fontSize: 20, fontWeight: '900' },
  goLbl: { color: '#64748b', fontSize: 10, fontWeight: '800', marginTop: 4 },
  diagBox: { width: '100%', backgroundColor: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: '#c084fc', marginBottom: 20 },
  diagTitle: { color: '#c084fc', fontSize: 12, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  diagItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 12, gap: 10 },
  diagText: { color: '#e2e8f0', fontSize: 12, fontWeight: '800', flex: 1 },
  retryBtn: { width: '100%', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', shadowColor: '#8b5cf6', shadowOpacity: 0.5, shadowRadius: 15 },
  retryText: { color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});
