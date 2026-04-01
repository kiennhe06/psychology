import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import { IMPOSTOR_SCENARIOS, ImpostorScenario, ImpostorCharacter } from '../data/impostorScenarios';
import { useGame } from '../context/gameContext';

const { width: SW } = Dimensions.get('window');

type Phase = 'intro' | 'reading' | 'vote_person' | 'vote_tactic' | 'result' | 'gameover';

const ImpostorGameScreen = ({ navigation }: any) => {
  const game = useGame();
  const [phase, setPhase] = useState<Phase>('intro');
  const [round, setRound] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gems, setGems] = useState(0);
  const [scenarios, setScenarios] = useState<ImpostorScenario[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [selectedTactic, setSelectedTactic] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [personCorrect, setPersonCorrect] = useState(false);
  const [tacticCorrect, setTacticCorrect] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  const startGame = useCallback(() => {
    const shuffled = [...IMPOSTOR_SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
    setRound(0); setLives(3); setScore(0); setStreak(0); setGems(0);
    setSelectedPerson(null); setSelectedTactic(null); setShowResult(false);
    setPhase('reading');
    setTimeout(animateIn, 100);
  }, []);

  useEffect(() => { if (phase === 'reading') animateIn(); }, [round]);

  const sc = scenarios[round];

  const submitVotePerson = () => {
    if (selectedPerson === null) return;
    setPhase('vote_tactic');
    animateIn();
  };

  const submitVoteTactic = () => {
    if (!selectedTactic) return;
    const chars = sc.characters;
    const impostors = chars.filter(c => c.isImpostor);
    const chosen = chars[selectedPerson!];
    const pCorrect = chosen.isImpostor;
    const tCorrect = selectedTactic === sc.tactic;
    setPersonCorrect(pCorrect);
    setTacticCorrect(tCorrect);

    let roundGems = 0;
    if (pCorrect) { roundGems += 5; setScore(s => s + 1); }
    if (tCorrect) roundGems += 10;
    if (pCorrect && tCorrect) {
      setStreak(s => s + 1);
      if (streak >= 2) roundGems *= 2; // streak bonus
    } else {
      setStreak(0);
      if (!pCorrect) setLives(l => l - 1);
    }
    setGems(g => g + roundGems);
    setShowResult(true);
    setPhase('result');
    animateIn();
    try { HapticFeedback.trigger(pCorrect ? 'notificationSuccess' : 'notificationError'); } catch(e) {}
  };

  const nextRound = () => {
    if (lives <= 0 || round >= scenarios.length - 1) {
      game.addGems(gems);
      setPhase('gameover');
      animateIn();
      return;
    }
    setRound(r => r + 1);
    setSelectedPerson(null);
    setSelectedTactic(null);
    setShowResult(false);
    setPhase('reading');
  };

  // ═══════════════════════════
  //       RENDER: INTRO
  // ═══════════════════════════
  if (phase === 'intro') {
    return (
      <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
        <SafeAreaView style={[s.flex, {justifyContent: 'center', paddingHorizontal: 28}]}>
          <StatusBar barStyle="light-content" hidden />
          <Text style={s.introEmoji}>🎭</Text>
          <Text style={s.introTitle}>AI ĐANG{'\n'}NÓI DỐI?</Text>
          <Text style={s.introSub}>Nhận diện kẻ thao túng tâm lý</Text>

          <View style={s.introRules}>
            <View style={s.ruleRow}><Text style={s.ruleIcon}>👥</Text><Text style={s.ruleText}>Đọc lời khai của mọi người</Text></View>
            <View style={s.ruleRow}><Text style={s.ruleIcon}>🔍</Text><Text style={s.ruleText}>Tìm ra kẻ đang thao túng</Text></View>
            <View style={s.ruleRow}><Text style={s.ruleIcon}>🧠</Text><Text style={s.ruleText}>Gọi đúng tên chiêu thức</Text></View>
            <View style={s.ruleSep} />
            <View style={s.ruleRow}><Text style={s.ruleIcon}>❤️</Text><Text style={s.ruleText}>3 mạng • Sai người = -1 mạng</Text></View>
            <View style={s.ruleRow}><Text style={s.ruleIcon}>💎</Text><Text style={s.ruleText}>Đúng người +5 • Đúng chiêu +10</Text></View>
          </View>

          <TouchableOpacity onPress={startGame} activeOpacity={0.85}>
            <LinearGradient colors={['#f43f5e', '#9333ea']} start={{x:0,y:0}} end={{x:1,y:1}} style={s.startBtn}>
              <Text style={s.startBtnText}>🎭 BẮT ĐẦU ĐIỀU TRA</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}} onPress={() => navigation.goBack()}>
            <Text style={{color: '#64748b', fontSize: 13, fontWeight: '700'}}>← Quay lại</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!sc) return <View style={s.flex}><LinearGradient colors={['#0a0a0f','#1a0a2e','#0a0a0f']} style={s.flex} /></View>;

  // ═══════════════════════════
  //     RENDER: READING
  // ═══════════════════════════
  if (phase === 'reading') {
    return (
      <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <StatusBar barStyle="light-content" hidden />
          {/* HUD */}
          <View style={s.hud}>
            <Text style={s.hudItem}>❤️ {lives}</Text>
            <Text style={s.hudItem}>📋 {round + 1}/{scenarios.length}</Text>
            <Text style={s.hudItem}>🔥 x{streak}</Text>
            <Text style={s.hudItem}>💎 {gems}</Text>
          </View>

          <Animated.ScrollView style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}} contentContainerStyle={s.readPad} showsVerticalScrollIndicator={false}>
            {/* Situation */}
            <View style={s.situationBox}>
              <Text style={s.themeTag}>{sc.themeEmoji} {sc.theme}</Text>
              <Text style={s.diffTag}>{sc.difficulty === 1 ? '🟢 Dễ' : sc.difficulty === 2 ? '🟡 Trung bình' : '🔴 Khó'}</Text>
            </View>
            <Text style={s.situationText}>{sc.situation}</Text>

            {/* Characters */}
            {sc.characters.map((ch, i) => (
              <View key={i} style={s.charCard}>
                <View style={s.charHeader}>
                  <Text style={{fontSize: 28}}>{ch.emoji}</Text>
                  <Text style={s.charName}>{ch.name}</Text>
                </View>
                <Text style={s.charStatement}>"{ch.statement}"</Text>
              </View>
            ))}

            <TouchableOpacity onPress={() => { setPhase('vote_person'); animateIn(); }} activeOpacity={0.85}>
              <LinearGradient colors={['#f43f5e', '#9333ea']} style={s.actionBtn}>
                <Text style={s.actionBtnText}>🗳️ BỎ PHIẾU</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════
  //   RENDER: VOTE PERSON
  // ═══════════════════════════
  if (phase === 'vote_person') {
    return (
      <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <StatusBar barStyle="light-content" hidden />
          <Animated.ScrollView style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}} contentContainerStyle={s.votePad} showsVerticalScrollIndicator={false}>
            <Text style={s.voteTitle}>🔍 AI LÀ KẺ GIẢ MẠO?</Text>
            <Text style={s.voteSub}>Chọn người đang thao túng</Text>

            {sc.characters.map((ch, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedPerson(i)} activeOpacity={0.85}>
                <View style={[s.voteCard, selectedPerson === i && s.voteCardSelected]}>
                  <Text style={{fontSize: 32}}>{ch.emoji}</Text>
                  <View style={{flex: 1, marginLeft: 14}}>
                    <Text style={s.voteName}>{ch.name}</Text>
                    <Text style={s.voteQuote} numberOfLines={2}>"{ch.statement}"</Text>
                  </View>
                  {selectedPerson === i && <Text style={{fontSize: 24}}>✅</Text>}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={submitVotePerson} disabled={selectedPerson === null} activeOpacity={0.85}>
              <LinearGradient colors={selectedPerson !== null ? ['#f43f5e', '#9333ea'] : ['#334155', '#1e293b']} style={s.actionBtn}>
                <Text style={[s.actionBtnText, selectedPerson === null && {opacity: 0.4}]}>XÁC NHẬN →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════
  //   RENDER: VOTE TACTIC
  // ═══════════════════════════
  if (phase === 'vote_tactic') {
    return (
      <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <StatusBar barStyle="light-content" hidden />
          <Animated.ScrollView style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}} contentContainerStyle={s.votePad} showsVerticalScrollIndicator={false}>
            <Text style={s.voteTitle}>🧠 HỌ DÙNG CHIÊU GÌ?</Text>
            <Text style={s.voteSub}>Chọn chiêu thức tâm lý</Text>

            {sc.tacticOptions.map((t, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedTactic(t)} activeOpacity={0.85}>
                <View style={[s.tacticCard, selectedTactic === t && s.tacticCardSelected]}>
                  <Text style={[s.tacticText, selectedTactic === t && {color: '#f8fafc'}]}>{t}</Text>
                  {selectedTactic === t && <Text style={{fontSize: 20}}>✅</Text>}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={submitVoteTactic} disabled={!selectedTactic} activeOpacity={0.85}>
              <LinearGradient colors={selectedTactic ? ['#f43f5e', '#9333ea'] : ['#334155', '#1e293b']} style={s.actionBtn}>
                <Text style={[s.actionBtnText, !selectedTactic && {opacity: 0.4}]}>🔓 XÁC NHẬN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════
  //     RENDER: RESULT
  // ═══════════════════════════
  if (phase === 'result') {
    const impostors = sc.characters.filter(c => c.isImpostor);
    return (
      <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
        <SafeAreaView style={s.flex}>
          <StatusBar barStyle="light-content" hidden />
          <Animated.ScrollView style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}} contentContainerStyle={s.votePad} showsVerticalScrollIndicator={false}>
            {/* Result header */}
            <Text style={{fontSize: 56, textAlign: 'center'}}>{personCorrect && tacticCorrect ? '🎉' : personCorrect ? '😏' : '😵'}</Text>
            <Text style={[s.resultTitle, {color: personCorrect ? '#34d399' : '#f43f5e'}]}>
              {personCorrect && tacticCorrect ? 'HOÀN HẢO!' : personCorrect ? 'GẦN ĐÚNG!' : 'SAI RỒI!'}
            </Text>

            {/* Who was impostor */}
            <View style={s.resultSection}>
              <Text style={s.resultLabel}>KẺ GIẢ MẠO:</Text>
              {impostors.map((imp, i) => (
                <View key={i} style={s.resultImpostor}>
                  <Text style={{fontSize: 28}}>{imp.emoji}</Text>
                  <Text style={s.resultImpName}>{imp.name}</Text>
                </View>
              ))}
            </View>

            {/* Score breakdown */}
            <View style={s.resultSection}>
              <View style={s.resultRow}>
                <Text style={s.resultKey}>Đoán người:</Text>
                <Text style={[s.resultVal, {color: personCorrect ? '#34d399' : '#f43f5e'}]}>{personCorrect ? '✅ Đúng (+5💎)' : '❌ Sai (-1❤️)'}</Text>
              </View>
              <View style={s.resultRow}>
                <Text style={s.resultKey}>Đoán chiêu:</Text>
                <Text style={[s.resultVal, {color: tacticCorrect ? '#34d399' : '#f43f5e'}]}>{tacticCorrect ? '✅ Đúng (+10💎)' : `❌ ${sc.tactic}`}</Text>
              </View>
              {streak >= 3 && <Text style={{color: '#fbbf24', fontWeight: '900', fontSize: 14, marginTop: 8}}>🔥 STREAK x{streak} — GEMS NHÂN ĐÔI!</Text>}
            </View>

            {/* Explanation */}
            <View style={s.explainBox}>
              <Text style={s.explainTitle}>📖 GIẢI THÍCH</Text>
              <Text style={s.explainText}>{sc.explanation}</Text>
            </View>

            <View style={s.tipBox}>
              <Text style={s.tipTitle}>💡 MẸO ĐỜI THỰC</Text>
              <Text style={s.tipText}>{sc.tip}</Text>
            </View>

            <TouchableOpacity onPress={nextRound} activeOpacity={0.85}>
              <LinearGradient colors={['#8b5cf6', '#4f46e5']} style={s.actionBtn}>
                <Text style={s.actionBtnText}>{lives <= 0 || round >= scenarios.length - 1 ? '📊 XEM KẾT QUẢ' : '→ VÒNG TIẾP'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ═══════════════════════════
  //     RENDER: GAMEOVER
  // ═══════════════════════════
  return (
    <LinearGradient colors={['#0a0a0f', '#1a0a2e', '#0a0a0f']} style={s.flex}>
      <SafeAreaView style={[s.flex, {justifyContent: 'center', paddingHorizontal: 28}]}>
        <StatusBar barStyle="light-content" hidden />
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}], alignItems: 'center'}}>
          <Text style={{fontSize: 64}}>🎭</Text>
          <Text style={s.goTitle}>{lives > 0 ? 'THÁM TỬ XUẤT SẮC!' : 'CUỘC ĐIỀU TRA KẾT THÚC'}</Text>

          <View style={s.goStats}>
            <View style={s.goBox}><Text style={s.goNum}>{score}</Text><Text style={s.goLabel}>Đúng</Text></View>
            <View style={s.goBox}><Text style={[s.goNum, {color: '#fbbf24'}]}>{gems}💎</Text><Text style={s.goLabel}>Gems</Text></View>
            <View style={s.goBox}><Text style={s.goNum}>{round + 1}</Text><Text style={s.goLabel}>Vòng</Text></View>
          </View>

          <TouchableOpacity onPress={startGame} activeOpacity={0.85} style={{width: '100%'}}>
            <LinearGradient colors={['#8b5cf6', '#4f46e5']} style={s.actionBtn}>
              <Text style={s.actionBtnText}>🔄 CHƠI LẠI</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 14, marginTop: 8}} onPress={() => navigation.goBack()}>
            <Text style={{color: '#64748b', fontSize: 14, fontWeight: '700'}}>← Thoát</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ImpostorGameScreen;

const s = StyleSheet.create({
  flex: { flex: 1 },
  // INTRO
  introEmoji: { fontSize: 72, textAlign: 'center', marginBottom: 12 },
  introTitle: { fontSize: 38, fontWeight: '900', color: '#f8fafc', textAlign: 'center', letterSpacing: 3, lineHeight: 48, textShadowColor: '#f43f5e', textShadowRadius: 20 },
  introSub: { color: '#64748b', fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 8, marginBottom: 28 },
  introRules: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 28 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ruleIcon: { fontSize: 18, width: 30 },
  ruleText: { color: '#cbd5e1', fontSize: 14, fontWeight: '700', flex: 1 },
  ruleSep: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 8 },
  startBtn: { paddingVertical: 18, borderRadius: 28, alignItems: 'center', shadowColor: '#f43f5e', shadowOpacity: 0.5, shadowRadius: 20, elevation: 8 },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '900', letterSpacing: 2 },
  // HUD
  hud: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  hudItem: { color: '#e2e8f0', fontSize: 14, fontWeight: '800' },
  // READING
  readPad: { paddingHorizontal: 20, paddingBottom: 40 },
  situationBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  themeTag: { color: '#94a3b8', fontSize: 12, fontWeight: '800', backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  diffTag: { color: '#94a3b8', fontSize: 12, fontWeight: '800' },
  situationText: { color: '#f8fafc', fontSize: 17, fontWeight: '800', lineHeight: 26, marginBottom: 20 },
  charCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  charHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  charName: { color: '#e2e8f0', fontSize: 16, fontWeight: '900', marginLeft: 12 },
  charStatement: { color: '#94a3b8', fontSize: 14, fontWeight: '600', lineHeight: 22, fontStyle: 'italic' },
  actionBtn: { paddingVertical: 16, borderRadius: 24, alignItems: 'center', marginTop: 16 },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  // VOTE
  votePad: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  voteTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '900', textAlign: 'center', letterSpacing: 1 },
  voteSub: { color: '#64748b', fontSize: 13, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  voteCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.06)' },
  voteCardSelected: { borderColor: '#f43f5e', backgroundColor: 'rgba(244,63,94,0.1)' },
  voteName: { color: '#f8fafc', fontSize: 16, fontWeight: '900' },
  voteQuote: { color: '#64748b', fontSize: 12, fontWeight: '600', marginTop: 2 },
  tacticCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.06)' },
  tacticCardSelected: { borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)' },
  tacticText: { color: '#94a3b8', fontSize: 15, fontWeight: '800', flex: 1 },
  // RESULT
  resultTitle: { fontSize: 28, fontWeight: '900', textAlign: 'center', marginTop: 8, marginBottom: 20 },
  resultSection: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  resultLabel: { color: '#64748b', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10 },
  resultImpostor: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  resultImpName: { color: '#f43f5e', fontSize: 18, fontWeight: '900', marginLeft: 10 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  resultKey: { color: '#94a3b8', fontSize: 14, fontWeight: '700' },
  resultVal: { fontSize: 14, fontWeight: '900' },
  explainBox: { backgroundColor: 'rgba(139,92,246,0.08)', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(139,92,246,0.2)' },
  explainTitle: { color: '#a78bfa', fontSize: 13, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  explainText: { color: '#cbd5e1', fontSize: 14, fontWeight: '600', lineHeight: 24 },
  tipBox: { backgroundColor: 'rgba(52,211,153,0.08)', borderRadius: 18, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(52,211,153,0.2)' },
  tipTitle: { color: '#34d399', fontSize: 13, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  tipText: { color: '#cbd5e1', fontSize: 14, fontWeight: '600', lineHeight: 24 },
  // GAMEOVER
  goTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '900', textAlign: 'center', marginTop: 16, marginBottom: 24 },
  goStats: { flexDirection: 'row', gap: 16, marginBottom: 28 },
  goBox: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  goNum: { color: '#f8fafc', fontSize: 28, fontWeight: '900' },
  goLabel: { color: '#64748b', fontSize: 12, fontWeight: '800', marginTop: 4 },
});
