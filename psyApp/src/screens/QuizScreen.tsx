import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';

import { useGame } from '../context/gameContext';
import { QUIZZES, QUEST_REGIONS, Quiz } from '../data/quizzes';
import { DAILY_CHALLENGES } from '../data/dailyQuizzes';
import { getRandomMessageByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const REGION_CARD_WIDTH = SCREEN_WIDTH * 0.72;

interface Props {
  navigation: any;
}

// ── Component Vùng Rung Lắc Ảo Diệu (Animated Region Card) ──
const AnimatedRegionCard = ({ region, index, navigation, game, allQuizIds }: any) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100 + 300; // Delay trượt ngang sau khi giao diện tải
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 40, friction: 6, delay, useNativeDriver: true })
    ]).start();
  }, [index]);

  const regionQuizzes = QUIZZES.filter(q => region.quizIds.includes(q.id));
  const completedCount = regionQuizzes.filter(q => game.completedQuizIds.includes(q.id)).length;

  const handleQuizPress = (quiz: Quiz, bypassLock: boolean = false) => {
    if (!bypassLock) {
      const quizIndex = allQuizIds.indexOf(quiz.id);
      const isFirst = quizIndex === 0;
      const prevId = !isFirst ? allQuizIds[quizIndex - 1] : null;
      const locked = !isFirst && prevId && !game.isQuizCompleted(prevId);

      if (locked) {
        HapticFeedback.trigger('notificationError');
        const prev = QUIZZES.find(q => q.id === prevId);
        Alert.alert('🔒 Rào chắn tư duy', `Sếp cần hóa giải "${prev?.title}" để mở ải này!`);
        return;
      }
    }
    HapticFeedback.trigger('impactLight');
    game.recordDailyChallengePlayed(); // Hoặc logic cần thiết
    navigation.navigate('QuizPlay', { quiz, isDaily: false });
  };

  return (
    <Animated.View style={[styles.regionCardGlass, { borderColor: region.color + '60', opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
      <View style={[styles.regionHeadGlass, { backgroundColor: region.color + '15' }]}>
        <Text style={styles.regionIcon}>{region.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.regionTitleNeon, { color: region.color, textShadowColor: region.color + '80' }]}>{region.name}</Text>
          <Text style={styles.regionStatsGlass}>Hoàn thành: {completedCount}/{regionQuizzes.length}</Text>
        </View>
      </View>

      <View style={styles.regionList}>
         {regionQuizzes.map(quiz => {
           const done = game.isQuizCompleted(quiz.id);
           const quizIdx = allQuizIds.indexOf(quiz.id);
           const locked = quizIdx > 0 && !game.isQuizCompleted(allQuizIds[quizIdx - 1]);

           return (
             <TouchableOpacity
               key={quiz.id}
               style={[styles.quizRowGlass, done && styles.quizRowDoneGlass, locked && styles.quizRowLockedGlass]}
               onPress={() => handleQuizPress(quiz)}
             >
               <View style={[styles.quizBulletGlass, { backgroundColor: done ? 'rgba(16, 185, 129, 0.2)' : locked ? 'rgba(255,255,255,0.05)' : region.color + '25' }]}>
                 <Text style={{fontSize: 16}}>{done ? '✅' : locked ? '🔒' : '💎'}</Text>
               </View>
               <Text style={[styles.quizRowTitleGlass, locked && { color: '#64748B' }]} numberOfLines={1}>
                 {quiz.title}
               </Text>
             </TouchableOpacity>
           );
         })}
      </View>
    </Animated.View>
  );
};

// ── Screen Chính ──
const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();

  const greeting = useMemo(() => getRandomMessageByPersona(game.activePersona, 'greetings'), [game.activePersona]);
  const psyTip = useMemo(() => getRandomMessageByPersona(game.activePersona, 'tips'), [game.activePersona]);

  // Hoạt ảnh (Aura/Pulse) cho Thử thách ngày & Giao diện dọc
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.4)).current;
  const slideUpPage = useRef(new Animated.Value(40)).current;
  const fadePage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Glow lặp lại vô tận cho nhiệm vụ Daily
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseScale, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
          Animated.timing(pulseScale, { toValue: 1, duration: 1500, useNativeDriver: true })
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, { toValue: 0.8, duration: 1500, useNativeDriver: true }),
          Animated.timing(pulseOpacity, { toValue: 0.4, duration: 1500, useNativeDriver: true })
        ])
      ])
    ).start();

    // Fade in nội dung chính
    Animated.parallel([
      Animated.timing(fadePage, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideUpPage, { toValue: 0, tension: 50, friction: 7, useNativeDriver: true })
    ]).start();
  }, []);

  const personaEmoji = useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  const dailyChallenge = useMemo((): Quiz | null => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (game.dailyChallengeDate === todayStr && game.dailyChallengeQuizId) {
      const daily = DAILY_CHALLENGES.find(q => q.id === game.dailyChallengeQuizId);
      if (daily) return daily;
      const journey = QUIZZES.find(q => q.id === game.dailyChallengeQuizId);
      if (journey) return journey;
    }
    if (DAILY_CHALLENGES.length > 0) {
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const chosenIdx = dayOfYear % DAILY_CHALLENGES.length;
      return DAILY_CHALLENGES[chosenIdx];
    }
    return null;
  }, [game.dailyChallengeDate, game.dailyChallengeQuizId]);

  useEffect(() => {
    if (dailyChallenge) {
      const today = new Date().toISOString().split('T')[0];
      if (game.dailyChallengeDate !== today) {
        game.setDailyChallenge(dailyChallenge.id);
      }
    }
  }, [dailyChallenge]);

  const xpProgress = game.maxXp > 0 ? game.xp / game.maxXp : 0;
  const allQuizIds = useMemo(() => QUEST_REGIONS.reduce<string[]>((acc, region) => [...acc, ...region.quizIds], []), []);

  const triggerDailyAction = () => {
    if (game.canPlayDailyChallenge() && dailyChallenge) {
      HapticFeedback.trigger('impactHeavy');
      game.recordDailyChallengePlayed();
      navigation.navigate('QuizPlay', { quiz: dailyChallenge, isDaily: true });
    } else {
      HapticFeedback.trigger('notificationWarning');
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b', '#0B0F19']} style={styles.container}>
      <SafeAreaView style={{flex: 1}} edges={['top']}>
        <StatusBar barStyle="light-content" />
        
        {/* ── Bảng Điều Khiển (Header Console Glass) ── */}
        <View style={styles.headerGlass}>
          <View style={styles.headerTop}>
             <View style={styles.avatarGlowCircle}>
                <DrPsyAvatar emoji={personaEmoji} size={46} />
             </View>
             
             <View style={styles.headerInfo}>
               <Text style={styles.drWelcomeNeon}>HÀNH TRÌNH TÂM LÝ</Text>
               <Text style={styles.greetingText} numberOfLines={1}>{greeting}</Text>
             </View>

             <View style={styles.gemsCounterGlass}>
               <Text style={styles.gemValNeon}>{game.gems}</Text>
               <Text style={{fontSize: 16, textShadowColor: '#FFD700', textShadowRadius: 8}}>💎</Text>
             </View>
          </View>

          <View style={styles.statusBoxGlass}>
             <LinearGradient colors={['#c084fc', '#8b5cf6']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.levelTagNeon}>
                <Text style={styles.levelTagText}>Lv.{game.level}</Text>
             </LinearGradient>

             <View style={styles.xpBarTrackGlass}>
                <LinearGradient 
                   colors={['#e879f9', '#a855f7', '#6366f1']} 
                   start={{x:0, y:0}} end={{x:1, y:0}} 
                   style={[styles.xpBarFillNeon, { width: `${Math.max(xpProgress * 100, 5)}%` }]} 
                />
             </View>

             <View style={styles.streakSmallGlass}>
                <Text style={{fontSize: 14}}>🔥</Text>
                <Text style={styles.streakTextNeon}>{game.streak}</Text>
             </View>
          </View>
        </View>

        <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} style={{ opacity: fadePage, transform: [{ translateY: slideUpPage }] }}>
          
          {/* ── Thử Thách Hằng Ngày (Pulse Glow) ── */}
          {dailyChallenge && (
            <Animated.View style={[
                styles.dailyRelWrap, 
                game.canPlayDailyChallenge() ? { transform: [{ scale: pulseScale }] } : { opacity: 0.8 }
              ]}>
              {/* Bóng đổ ngoài viền nhấp nháy */}
              {game.canPlayDailyChallenge() && (
                <Animated.View style={[styles.dailyAura, { opacity: pulseOpacity }]} />
              )}
              
              <TouchableOpacity
                style={[styles.dailyBannerGlass, !game.canPlayDailyChallenge() && styles.dailyBannerDoneGlass]}
                onPress={triggerDailyAction}
                activeOpacity={0.8}
              >
                <View style={styles.dailyRow}>
                   <View style={styles.dailyIconBoxGlass}>
                      <Text style={{fontSize: 26}}>{game.canPlayDailyChallenge() ? '🎯' : '✅'}</Text>
                   </View>
                   <View style={styles.dailyInfo}>
                      <Text style={styles.dailyLabelNeon}>⚡ THỬ THÁCH HẰNG NGÀY</Text>
                      <Text style={[styles.dailyQuizNameNeon, !game.canPlayDailyChallenge() && { color: '#94A3B8', textDecorationLine: 'line-through' }]} numberOfLines={1}>
                         {dailyChallenge.title}
                      </Text>
                   </View>
                   <View style={styles.dailyRewardBadgeNeon}>
                      <Text style={styles.dailyRewardTextNeon}>x2 XP</Text>
                   </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ── Banner: The Mirror Game (Quẹt Thẻ Tâm Lý) ── */}
          <View style={{flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 28}}>
            <TouchableOpacity 
              style={[styles.mirrorBannerGlass, {flex: 1, marginHorizontal: 0, marginBottom: 0}]} 
              onPress={() => { HapticFeedback.trigger('impactHeavy'); navigation.navigate('SwipeGame'); }}
              activeOpacity={0.8}
            >
               <LinearGradient colors={['rgba(244, 63, 94, 0.4)', 'rgba(139, 92, 246, 0.4)']} style={styles.mirrorGradient} start={{x:0, y:0}} end={{x:1, y:1}}>
                  <Text style={{fontSize: 28, marginBottom: 8}}>🪞</Text>
                  <Text style={[styles.mirrorTitleNeon, {fontSize: 14}]}>TẤM GƯƠNG</Text>
                  <Text style={[styles.mirrorSubtitle, {fontSize: 10}]}>Sinh tồn (Swipe)</Text>
               </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.mirrorBannerGlass, {flex: 1, marginHorizontal: 0, marginBottom: 0}]} 
              onPress={() => { HapticFeedback.trigger('impactHeavy'); navigation.navigate('ImpostorGame'); }}
              activeOpacity={0.8}
            >
               <LinearGradient colors={['rgba(56, 189, 248, 0.4)', 'rgba(52, 211, 153, 0.4)']} style={styles.mirrorGradient} start={{x:0, y:0}} end={{x:1, y:1}}>
                  <Text style={{fontSize: 28, marginBottom: 8}}>🎭</Text>
                  <Text style={[styles.mirrorTitleNeon, {fontSize: 14, color: '#38bdf8', textShadowColor: '#38bdf8'}]}>KẺ GIẢ MẠO</Text>
                  <Text style={[styles.mirrorSubtitle, {fontSize: 10}]}>Ai đang thao túng?</Text>
               </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitleNeon}>🗺️ BẢN ĐỒ VÙNG ĐẤT</Text>
             <Text style={styles.sectionDescGlass}>Hoàn thành tuần tự để mở khóa cốt truyện bí mật</Text>
          </View>

          {/* ── Vòng lặp Cuốn ngang các Lãnh Địa Kính ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionsRow}
            snapToInterval={REGION_CARD_WIDTH + 18}
            decelerationRate="fast"
          >
            {QUEST_REGIONS.map((region, idx) => (
              <AnimatedRegionCard 
                key={region.id} 
                region={region} 
                index={idx} 
                navigation={navigation} 
                game={game} 
                allQuizIds={allQuizIds} 
              />
            ))}
          </ScrollView>

          {/* ── Thẻ Lời Khuyên Psy (Mảnh Thủy Tinh) ── */}
          <View style={styles.psyTipGlass}>
             <View style={styles.psyTipRow}>
                <View style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 4, marginRight: 10, borderWidth: 1, borderColor: '#8b5cf6'}}>
                   <DrPsyAvatar emoji={personaEmoji} size={30} />
                </View>
                <Text style={styles.psyTipNameNeon}>Chỉ thị ({game.activePersona === 'killer' ? 'Sát thủ' : (game.activePersona === 'philosopher' ? 'Triết gia' : 'Tâm lý')}):</Text>
             </View>
             <Text style={styles.psyTipTextGlass}>"{psyTip}"</Text>
          </View>

          <View style={{ height: 60 }} />
        </Animated.ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  // Header Glass
  headerGlass: {
    paddingHorizontal: 20, paddingTop: 6, paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000', shadowOffset: { width:0, height:10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarGlowCircle: { marginRight: 14, borderRadius: 28, borderWidth: 2, borderColor: '#8b5cf6', backgroundColor: 'rgba(0,0,0,0.5)', padding: 2 },
  headerInfo: { flex: 1 },
  drWelcomeNeon: { fontSize: 16, fontWeight: '900', color: '#f8fafc', letterSpacing: 1, textShadowColor: 'rgba(139, 92, 246, 0.8)', textShadowRadius: 8 },
  greetingText: { fontSize: 12, color: '#94A3B8', fontWeight: '700', marginTop: 2 },
  gemsCounterGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 215, 0, 0.08)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
  gemValNeon: { color: '#FFD700', fontSize: 18, fontWeight: '900', marginRight: 6, textShadowColor: 'rgba(255, 215, 0, 0.5)', textShadowRadius: 8 },

  statusBoxGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 16, gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  levelTagNeon: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, shadowColor: '#c084fc', shadowOpacity: 0.6, shadowRadius: 6 },
  levelTagText: { color: '#FFF', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  xpBarTrackGlass: { flex: 1, height: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  xpBarFillNeon: { height: '100%', borderRadius: 5 },
  streakSmallGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  streakTextNeon: { color: '#f8fafc', fontSize: 13, fontWeight: '900', marginLeft: 6, textShadowColor: '#ef4444', textShadowRadius: 8 },

  scrollContent: { paddingVertical: 24 },

  // Daily Banner
  dailyRelWrap: { marginHorizontal: 20, marginBottom: 26 },
  dailyAura: { ...StyleSheet.absoluteFillObject, borderRadius: 24, backgroundColor: '#FFD700', transform: [{ scale: 1.05 }], opacity: 0.4, filter: 'blur(10px)' },
  dailyBannerGlass: { backgroundColor: 'rgba(20, 15, 10, 0.8)', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.5)', zIndex: 2 },
  dailyBannerDoneGlass: { borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.05)' },
  dailyRow: { flexDirection: 'row', alignItems: 'center' },
  dailyIconBoxGlass: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255, 215, 0, 0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 14, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
  dailyInfo: { flex: 1 },
  dailyLabelNeon: { color: '#FFD700', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 4, textShadowColor: 'rgba(255, 215, 0, 0.5)', textShadowRadius: 8 },
  dailyQuizNameNeon: { color: '#f8fafc', fontSize: 16, fontWeight: '900' },
  dailyRewardBadgeNeon: { backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.6)', shadowColor: '#8b5cf6', shadowOpacity: 0.8, shadowRadius: 10 },
  dailyRewardTextNeon: { color: '#e0e7ff', fontSize: 11, fontWeight: '900', letterSpacing: 1 },

  // Mirror Banner
  mirrorBannerGlass: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', elevation: 5, shadowColor: '#f43f5e', shadowOpacity: 0.3, shadowRadius: 10 },
  mirrorGradient: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  mirrorTitleNeon: { color: '#f43f5e', fontSize: 16, fontWeight: '900', letterSpacing: 1, textShadowColor: '#f43f5e', textShadowRadius: 8, textAlign: 'center' },
  mirrorSubtitle: { color: '#e2e8f0', fontSize: 11, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  mirrorPlayBtn: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  mirrorPlayText: { color: '#000', fontSize: 13, fontWeight: '900', letterSpacing: 1 },

  // Regions Section
  sectionHeader: { paddingHorizontal: 24, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#8b5cf6', marginLeft: 20 },
  sectionTitleNeon: { color: '#e2e8f0', fontSize: 14, fontWeight: '900', letterSpacing: 1.5, textShadowColor: 'rgba(255,255,255,0.2)', textShadowRadius: 5 },
  sectionDescGlass: { color: '#94A3B8', fontSize: 12, marginTop: 4, fontWeight: '600' },
  regionsRow: { paddingHorizontal: 20, gap: 18, paddingBottom: 10 },

  // Region Card Glass
  regionCardGlass: { width: REGION_CARD_WIDTH, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 28, padding: 18, borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width:0, height:10 } },
  regionHeadGlass: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  regionIcon: { fontSize: 32, marginRight: 14, textShadowColor: 'rgba(255,255,255,0.2)', textShadowRadius: 10 },
  regionTitleNeon: { fontSize: 16, fontWeight: '900', marginBottom: 2 },
  regionStatsGlass: { fontSize: 11, color: '#94A3B8', fontWeight: '700' },
  regionList: { gap: 12 },
  quizRowGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)' },
  quizRowDoneGlass: { borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.05)' },
  quizRowLockedGlass: { opacity: 0.6, borderColor: 'transparent' },
  quizBulletGlass: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  quizRowTitleGlass: { color: '#E2E8F0', fontSize: 14, fontWeight: '800', flex: 1, letterSpacing: 0.2 },

  // Motivation Glass
  psyTipGlass: { marginHorizontal: 20, marginTop: 32, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.3)', borderLeftWidth: 4, borderLeftColor: '#8b5cf6' },
  psyTipRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  psyTipNameNeon: { color: '#c084fc', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  psyTipTextGlass: { color: '#cbd5e1', fontSize: 14, fontStyle: 'italic', lineHeight: 22, fontWeight: '500' }
});
