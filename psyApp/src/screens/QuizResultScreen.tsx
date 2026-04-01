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
import { useGame } from '../context/gameContext';
import { BADGES } from '../data/badges';
import { QUIZZES, QUEST_REGIONS } from '../data/quizzes';
import { getQuizCommentByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';

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
  const {
    quizId,
    quizTitle,
    correctCount,
    totalQuestions,
    earnedXp,
    earnedGems,
    isPerfect,
    isDaily,
  } = route.params;

  const game = useGame();

  // Animations
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const xpAnim = useRef(new Animated.Value(0)).current;
  const gemAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;

  // Determine score percentage
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Badge checking logic
  const newBadges = useMemo(() => {
    const badges: string[] = [];

    // b1: First quiz completed
    if (game.completedQuizIds.length === 0) {
      badges.push('b1');
    }

    // b3: Perfect score
    if (isPerfect && !game.isBadgeUnlocked('b3')) {
      badges.push('b3');
    }

    // b4: Complete all quizzes in a region
    const quiz = QUIZZES.find(q => q.id === quizId);
    if (quiz) {
      const region = QUEST_REGIONS.find(r => r.quizIds.includes(quizId));
      if (region) {
        const regionQuizIds = region.quizIds;
        const willBeCompleted = [...game.completedQuizIds, quizId];
        const allDone = regionQuizIds.every(id => willBeCompleted.includes(id));
        if (allDone && !game.isBadgeUnlocked('b4')) {
          badges.push('b4');
        }
      }
    }

    // b5: 100 gems total
    if (game.gems + earnedGems >= 100 && !game.isBadgeUnlocked('b5')) {
      badges.push('b5');
    }

    return badges;
  }, []);

  // Apply rewards once
  useEffect(() => {
    // Add XP & gems
    game.addXp(earnedXp);
    game.addGems(earnedGems);
    game.completeQuiz(quizId, isPerfect);
    
    // Nếu là trắc nghiệm tâm lý (Học phần Phân tích), đánh dấu hoàn thành bài học
    if (quizId.startsWith('test_')) {
      game.completeTest(quizId);
    }

    game.checkAndUpdateStreak();

    // Run animations
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(xpAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(gemAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(badgeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
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

  // Map persona to emoji for avatar
  const personaEmoji = React.useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🧠 Tôi vừa đạt ${scorePercent}% trong quiz "${quizTitle}" trên ứng dụng Tâm Lý Học! Nhận ${earnedXp} XP và ${earnedGems} 💎. Bạn thử chưa?`,
      });
    } catch (error) {
      // User cancelled or error
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Tabs');
  };

  const resolvedBadges = newBadges
    .map(id => BADGES.find(b => b.id === id))
    .filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* ── Score Circle ──────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.scoreCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.scoreEmoji}>{getEmoji()}</Text>
          <Text style={styles.scorePercent}>{scorePercent}%</Text>
          <Text style={styles.scoreDetail}>
            {correctCount}/{totalQuestions} câu đúng
          </Text>
        </Animated.View>

        <Text style={styles.message}>{getMessage()}</Text>
        {isDaily && (
          <View style={styles.dailyTag}>
            <Text style={styles.dailyTagText}>🎯 Thử thách hằng ngày hoàn thành!</Text>
          </View>
        )}

        {/* ── Dr. Psy Comment ───────────────────────────────────────────── */}
        <Animated.View style={[styles.drPsyCard, { transform: [{ scale: scaleAnim }] }]}>
          <DrPsyAvatar emoji={personaEmoji} size={48} style={styles.drPsyAvatar} />
          <View style={{flex: 1}}>
             <Text style={styles.drName}>DR. PSY ({
               game.activePersona === 'killer' ? 'Sát thủ' : 
               game.activePersona === 'philosopher' ? 'Triết gia' : 
               game.activePersona === 'sherlock' ? 'Sherlock' :
               game.activePersona === 'mystic' ? 'Huyền bí' : 'Tâm lý'
             })</Text>
             <Text style={styles.drPsyCommentText}>{drPsyComment}</Text>
          </View>
        </Animated.View>

        {/* ── Rewards ───────────────────────────────────────────────────── */}
        <View style={styles.rewardsContainer}>
          <Animated.View
            style={[
              styles.rewardCard,
              {
                opacity: xpAnim,
                transform: [
                  {
                    translateY: xpAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.rewardEmoji}>⚡</Text>
            <Text style={styles.rewardValue}>+{earnedXp}</Text>
            <Text style={styles.rewardLabel}>XP</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.rewardCard,
              {
                opacity: gemAnim,
                transform: [
                  {
                    translateY: gemAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.rewardEmoji}>💎</Text>
            <Text style={styles.rewardValue}>+{earnedGems}</Text>
            <Text style={styles.rewardLabel}>Gem</Text>
          </Animated.View>
        </View>

        {/* ── New Badges ────────────────────────────────────────────────── */}
        {resolvedBadges.length > 0 && (
          <Animated.View
            style={[
              styles.badgeSection,
              {
                opacity: badgeAnim,
                transform: [
                  {
                    scale: badgeAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.5, 1.1, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.badgeTitle}>🎖️ Huy hiệu mới!</Text>
            <View style={styles.badgeRow}>
              {resolvedBadges.map(badge => (
                <View key={badge!.id} style={styles.badgeCard}>
                  <Text style={styles.newBadgeEmoji}>{badge!.emoji}</Text>
                  <Text style={styles.newBadgeName}>{badge!.name}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* ── Action Buttons ────────────────────────────────────────────── */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareButtonText}>📤 Chia sẻ kết quả</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonText}>← Quay về</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizResultScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Score
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6C63FF',
    marginBottom: 16,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  scoreEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  scorePercent: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
  },
  scoreDetail: {
    color: '#A0A0D0',
    fontSize: 14,
    fontWeight: '600',
  },
  message: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  dailyTag: {
    backgroundColor: '#FFD70015',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  dailyTagText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 13,
  },

  // Dr. Psy Card
  drPsyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6C63FF40',
    marginTop: 8,
    marginBottom: 8,
  },
  drPsyAvatar: {
    marginRight: 12,
  },
  drName: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  drPsyCommentText: {
    flex: 1,
    color: '#D0D0E0',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // Rewards
  rewardsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  rewardCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  rewardEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  rewardValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
  },
  rewardLabel: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },

  // Badges
  badgeSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  badgeCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD70060',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  newBadgeEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  newBadgeName: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
  },

  // Actions
  actions: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  shareButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#A0A0D0',
    fontSize: 16,
    fontWeight: '600',
  },
});
