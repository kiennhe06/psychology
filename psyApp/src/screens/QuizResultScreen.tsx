import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';

import { useGame } from '../context/gameContext';
import { BADGES } from '../data/badges';
import { QUIZZES, QUEST_REGIONS } from '../data/quizzes';
import { getQuizCommentByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';
import { Share2, ArrowLeft, Trophy, Zap, Diamond } from 'lucide-react-native';

Sound.setCategory('Playback');

// BẠN CẦN BỎ COMMENT & THÊM FILE VÀO `src/assets/sounds/` ĐỂ NHẠC HOẠT ĐỘNG
/*
const sounds = {
  victory: new Sound(require('../assets/sounds/correct.mp3'), (e) => { if(e) console.log(e); }),
  defeat: new Sound(require('../assets/sounds/wrong.mp3'), (e) => { if(e) console.log(e); })
};
*/
const playResultSfx = (type: 'victory' | 'defeat') => {
  // if (sounds[type]) {
  //   sounds[type].setCurrentTime(0).play();
  // }
};

interface Props {
  route: {
    params: {
      quizId: string;
      quizTitle: string;
      correctCount: number;
      totalQuestions: number;
      earnedXp: number;
      earnedGems: number;
      isPerfect: boolean;
      isDaily: boolean;
    };
  };
  navigation: any;
}

const QuizResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quizId, quizTitle, correctCount, totalQuestions, earnedXp, earnedGems, isPerfect, isDaily } = route.params;
  const game = useGame();
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // --- Animations ---
  const bounceAnim = useRef(new Animated.Value(0)).current; 
  const scoreScaleAnim = useRef(new Animated.Value(0)).current;
  const cardsSlideAnim = useRef([
    new Animated.ValueXY({ x: 0, y: 50 }), // Dr.Psy
    new Animated.ValueXY({ x: 0, y: 50 }), // Rewards
    new Animated.ValueXY({ x: 0, y: 50 }), // Badges
    new Animated.ValueXY({ x: 0, y: 50 }), // Buttons
  ]).current;
  const cardsOpacityAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // --- Theme Colors logic ---
  const glowColor = scorePercent === 100 ? '#10b981' : scorePercent >= 60 ? '#8b5cf6' : '#f59e0b';
  const glowShadow = `rgba(${scorePercent === 100 ? '16, 185, 129' : scorePercent >= 60 ? '139, 92, 246' : '245, 158, 11'}, 0.4)`;

  // --- Badges Calculation ---
  const newBadges = useMemo(() => {
    const badges: string[] = [];
    if (game.completedQuizIds.length === 0) badges.push('b1');
    if (isPerfect && !game.isBadgeUnlocked('b3')) badges.push('b3');
    const quiz = QUIZZES.find(q => q.id === quizId);
    if (quiz) {
      const region = QUEST_REGIONS.find(r => r.quizIds.includes(quizId));
      if (region) {
        const willBeCompleted = [...game.completedQuizIds, quizId];
        const allDone = region.quizIds.every(id => willBeCompleted.includes(id));
        if (allDone && !game.isBadgeUnlocked('b4')) badges.push('b4');
      }
    }
    if (game.gems + earnedGems >= 100 && !game.isBadgeUnlocked('b5')) badges.push('b5');
    return badges;
  }, []);

  // --- Initial Mount & Rewards ---
  useEffect(() => {
    game.addXp(earnedXp);
    game.addGems(earnedGems);
    game.completeQuiz(quizId, isPerfect);
    if (quizId.startsWith('test_')) game.completeTest(quizId);
    game.checkAndUpdateStreak();

    // Sound & Haptic Trigger
    if (scorePercent >= 60) {
      HapticFeedback.trigger('notificationSuccess');
      playResultSfx('victory');
    } else {
      HapticFeedback.trigger('notificationWarning');
      playResultSfx('defeat');
    }

    // STAGGERED ANIMATIONS (Đánh thức từng khu vực ngầu)
    const animSequence = Animated.sequence([
      // Vòng tròn điểm nổ ra
      Animated.spring(scoreScaleAnim, { toValue: 1, tension: 60, friction: 5, useNativeDriver: true }),
      // Nhảy chữ Cố lên/Hoàn hảo
      Animated.spring(bounceAnim, { toValue: 1, friction: 4, tension: 70, useNativeDriver: true }),
      // Nổi lần lượt Thẻ Dr.PSy -> Reward -> Badge -> Button
      Animated.stagger(150, cardsSlideAnim.map((animXY, index) => 
        Animated.parallel([
          Animated.spring(animXY, { toValue: { x: 0, y: 0 }, tension: 40, friction: 6, useNativeDriver: true }),
          Animated.timing(cardsOpacityAnim[index], { toValue: 1, duration: 400, useNativeDriver: true })
        ])
      ))
    ]);

    animSequence.start();

    // Pulse nhấp nháy cho nút chi sẻ
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    ).start();

  }, []);

  const getEmoji = () => {
    if (scorePercent === 100) return '🏆';
    if (scorePercent >= 80) return '🌟';
    if (scorePercent >= 60) return '👏';
    if (scorePercent >= 40) return '💪';
    return '📚';
  };

  const getMessage = () => {
    if (scorePercent === 100) return 'Hoàn hảo! Bạn là thiên tài!';
    if (scorePercent >= 80) return 'Xuất sắc! Gần đạt đỉnh rồi!';
    if (scorePercent >= 60) return 'Tốt lắm! Hãy tiếp tục nào!';
    if (scorePercent >= 40) return 'Không tệ! Ôn tập thêm nhé!';
    return 'Cố lên! Học thêm rồi thử lại nha!';
  };

  const drPsyComment = useMemo(() => getQuizCommentByPersona(game.activePersona, scorePercent), [game.activePersona, scorePercent]);
  const personaEmoji = useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  const handleShare = async () => {
    HapticFeedback.trigger('impactLight');
    try {
      await Share.share({
        message: `🧠 Mình vừa đạt ${scorePercent}% ở bài test "${quizTitle}" trên app Dr.Psy! Nhận ${earnedXp} XP ⚡ và ${earnedGems} 💎. Bạn thử chưa?`,
      });
    } catch (e) {}
  };

  const handleGoBack = () => {
    HapticFeedback.trigger('impactLight');
    navigation.navigate('Tabs');
  };

  const resolvedBadges = newBadges.map(id => BADGES.find(b => b.id === id)).filter(Boolean);

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b', '#0f172a']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Animated.View style={[styles.scoreHeaderZone, { transform: [{ scale: scoreScaleAnim }] }]}>
          <View style={[styles.scoreCircleWrapper, { borderColor: glowColor, shadowColor: glowColor }]}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreEmoji}>{getEmoji()}</Text>
              <Text style={styles.scorePercent}>{scorePercent}%</Text>
              <Text style={styles.scoreDetail}>{correctCount}/{totalQuestions} câu đúng</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: bounceAnim }], opacity: bounceAnim, alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.message}>{getMessage()}</Text>
          {isDaily === true ? (
            <View style={styles.dailyTag}>
              <Text style={styles.dailyTagText}>🎯 Thử thách hằng ngày hoàn tất!</Text>
            </View>
          ) : null}
        </Animated.View>
        <Animated.View style={[styles.drPsyCard, { opacity: cardsOpacityAnim[0], transform: cardsSlideAnim[0].getTranslateTransform() }]}>
          <DrPsyAvatar emoji={personaEmoji} size={52} />
          <View style={styles.drPsyTextContainer}>
            <Text style={styles.drName}>DR. PSY ( {game.activePersona.toUpperCase()} )</Text>
            <Text style={styles.drPsyCommentText}>{drPsyComment}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.rewardsContainer, { opacity: cardsOpacityAnim[1], transform: cardsSlideAnim[1].getTranslateTransform() }]}>
          <View style={styles.rewardCard}>
            <View style={[styles.rewardIconWrapper, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
               <Zap size={24} color="#38bdf8" fill="#38bdf8" />
            </View>
            <View>
              <Text style={[styles.rewardValue, { color: '#38bdf8' }]}>+{earnedXp}</Text>
              <Text style={styles.rewardLabel}>Kinh nghiệm</Text>
            </View>
          </View>
          <View style={styles.rewardCard}>
            <View style={[styles.rewardIconWrapper, { backgroundColor: 'rgba(216, 180, 254, 0.15)' }]}>
              <Diamond size={24} color="#d8b4fe" fill="#d8b4fe" />
            </View>
            <View>
              <Text style={[styles.rewardValue, { color: '#d8b4fe' }]}>+{earnedGems}</Text>
              <Text style={styles.rewardLabel}>Gems</Text>
            </View>
          </View>
        </Animated.View>
        {resolvedBadges && resolvedBadges.length > 0 ? (
          <Animated.View style={[styles.badgeSection, { opacity: cardsOpacityAnim[2], transform: cardsSlideAnim[2].getTranslateTransform() }]}>
            <View style={styles.badgeTitleRow}>
              <Trophy size={18} color="#fbbf24" fill="#fbbf24" style={{marginRight: 8}}/>
              <Text style={styles.badgeTitle}>Huy hiệu độc quyền mới!</Text>
            </View>
            <View style={styles.badgeRow}>
              {resolvedBadges.map(badge => (
                <View key={badge!.id} style={styles.badgeCard}>
                  <Text style={styles.newBadgeEmoji}>{badge!.emoji}</Text>
                  <Text style={styles.newBadgeName}>{badge!.name}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        ) : null}
        <View style={{flex: 1}} />
        <Animated.View style={[styles.actions, { opacity: cardsOpacityAnim[3], transform: cardsSlideAnim[3].getTranslateTransform() }]}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity onPress={handleShare} activeOpacity={0.85}>
              <LinearGradient colors={['#8b5cf6', '#6366f1']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.shareButton}>
                <Share2 size={20} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.shareButtonText}>Khoe thành tích ngay</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack} activeOpacity={0.8}>
            <ArrowLeft size={18} color="#94a3b8" style={{marginRight: 8}} />
            <Text style={styles.backButtonText}>Trở về màn hình chính</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QuizResultScreen;

// ─── Styles Glassmorphism ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },

  // Score Circle
  scoreHeaderZone: { alignItems: 'center', marginBottom: 20 },
  scoreCircleWrapper: {
    borderRadius: 100, padding: 8,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.02)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 20, elevation: 15,
  },
  scoreCircle: {
    width: 154, height: 154, borderRadius: 77,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  scoreEmoji: { fontSize: 36, marginBottom: 4 },
  scorePercent: { color: '#fff', fontSize: 36, fontWeight: '900', letterSpacing: 1 },
  scoreDetail: { color: '#94a3b8', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

  // Messages
  message: { color: '#f8fafc', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 12, textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 4 },
  dailyTag: { backgroundColor: 'rgba(251, 191, 36, 0.15)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 12 },
  dailyTagText: { color: '#fbbf24', fontWeight: '800', fontSize: 13, textTransform: 'uppercase' },

  // Dr Psy Card
  drPsyCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 18,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width:0, height:4}
  },
  drPsyTextContainer: { flex: 1, marginLeft: 16 },
  drName: { color: '#a78bfa', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 4 },
  drPsyCommentText: { color: '#e2e8f0', fontSize: 15, lineHeight: 22, fontStyle: 'italic', fontWeight: '500' },

  // Rewards Component
  rewardsContainer: {
    flexDirection: 'row', gap: 14, marginBottom: 24, paddingHorizontal: 5
  },
  rewardCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  rewardIconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rewardValue: { fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
  rewardLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },

  // Badges Component
  badgeSection: { alignItems: 'center', backgroundColor: 'rgba(251, 191, 36, 0.05)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.2)' },
  badgeTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  badgeTitle: { color: '#fbbf24', fontSize: 16, fontWeight: '800', textTransform: 'uppercase' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  badgeCard: {
    alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.3)'
  },
  newBadgeEmoji: { fontSize: 32, marginBottom: 6 },
  newBadgeName: { color: '#fef3c7', fontSize: 13, fontWeight: '800' },

  // Action Buttons
  actions: { width: '100%', gap: 14 },
  shareButton: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 16, paddingVertical: 18,
    shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10
  },
  shareButtonText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  backButton: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, paddingVertical: 18,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  backButtonText: { color: '#94a3b8', fontSize: 16, fontWeight: '700' },
});
