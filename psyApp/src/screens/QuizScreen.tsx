import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/gameContext';
import { QUIZZES, QUEST_REGIONS, Quiz } from '../data/quizzes';
import { DAILY_CHALLENGES } from '../data/dailyQuizzes';
import { getRandomMessageByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const REGION_CARD_WIDTH = SCREEN_WIDTH * 0.68;

interface Props {
  navigation: any;
}

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();

  const greeting = useMemo(() => {
    return getRandomMessageByPersona(game.activePersona, 'greetings');
  }, [game.activePersona]);

  const psyTip = useMemo(() => {
    return getRandomMessageByPersona(game.activePersona, 'tips');
  }, [game.activePersona]);

  // Map persona to emoji for avatar
  const personaEmoji = React.useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  // Daily Challenge Logic: Ưu tiên lấy từ DAILY_CHALLENGES (Bản 7 câu scenario)
  const dailyChallenge = useMemo((): Quiz | null => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Nếu đã có ID lưu trong state cho ngày hôm nay
    if (game.dailyChallengeDate === todayStr && game.dailyChallengeQuizId) {
      // Tìm trong DAILY_CHALLENGES trước
      const daily = DAILY_CHALLENGES.find(q => q.id === game.dailyChallengeQuizId);
      if (daily) return daily;
      
      // Dự phòng tìm trong QUIZZES cũ
      const journey = QUIZZES.find(q => q.id === game.dailyChallengeQuizId);
      if (journey) return journey;
    }

    // Nếu chưa có, chọn một bài ngẫu nhiên từ kho DAILY_CHALLENGES mới
    if (DAILY_CHALLENGES.length > 0) {
      // Dùng ngày để chọn ổn định trong 24h
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

  const handleQuizPress = (quiz: Quiz, bypassLock: boolean = false) => {
    if (!bypassLock) {
      const quizIndex = allQuizIds.indexOf(quiz.id);
      const isFirst = quizIndex === 0;
      const prevId = !isFirst ? allQuizIds[quizIndex - 1] : null;
      const locked = !isFirst && prevId && !game.isQuizCompleted(prevId);

      if (locked) {
        const prev = QUIZZES.find(q => q.id === prevId);
        Alert.alert('🔒 Tuyến đường bị chặn', `Hoàn thành "${prev?.title}" để tiếp tục hành trình!`);
        return;
      }
    }

    const isDaily = dailyChallenge?.id === quiz.id;
    if (isDaily || bypassLock) game.recordDailyChallengePlayed();
    navigation.navigate('QuizPlay', { quiz, isDaily: isDaily || bypassLock });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <DrPsyAvatar emoji={personaEmoji} size={42} style={styles.avatarCompact} />
          <View style={styles.headerInfo}>
            <Text style={styles.drWelcome}>HÀNH TRÌNH TÂM LÝ</Text>
            <Text style={styles.greetingText} numberOfLines={1}>{greeting}</Text>
          </View>
          <View style={styles.gemsCounter}>
            <Text style={styles.gemValSmall}>{game.gems}</Text>
            <Text style={{fontSize: 12}}>💎</Text>
          </View>
        </View>

        <View style={styles.statusBox}>
           <View style={styles.levelTag}>
              <Text style={styles.levelTagText}>Lv.{game.level}</Text>
           </View>
           <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: `${xpProgress * 100}%` }]} />
           </View>
           <View style={styles.streakSmall}>
              <Text style={{fontSize: 12}}>🔥</Text>
              <Text style={styles.streakText}>{game.streak}</Text>
           </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {dailyChallenge && (
          <TouchableOpacity
            style={[styles.dailyBanner, !game.canPlayDailyChallenge() && styles.dailyBannerDone]}
            onPress={() => game.canPlayDailyChallenge() && handleQuizPress(dailyChallenge, true)}
            disabled={!game.canPlayDailyChallenge()}
          >
            <View style={styles.dailyRow}>
               <View style={styles.dailyIconBox}>
                  <Text style={{fontSize: 24}}>{game.canPlayDailyChallenge() ? '🎯' : '✅'}</Text>
               </View>
               <View style={styles.dailyInfo}>
                  <Text style={styles.dailyLabel}>THỬ THÁCH HẰNG NGÀY</Text>
                  <Text style={styles.dailyQuizName} numberOfLines={1}>{dailyChallenge.title}</Text>
               </View>
               <View style={styles.dailyRewardBadge}>
                  <Text style={styles.dailyRewardText}>x2 XP</Text>
               </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>🗺️ Bản Đồ Vùng Đất</Text>
           <Text style={styles.sectionDesc}>Hoàn thành tuần tự để mở khóa cốt truyện</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionsRow}
          snapToInterval={REGION_CARD_WIDTH + 14}
          decelerationRate="fast"
        >
          {QUEST_REGIONS.map(region => {
            const regionQuizzes = QUIZZES.filter(q => region.quizIds.includes(q.id));
            const completedCount = regionQuizzes.filter(q => game.completedQuizIds.includes(q.id)).length;

            return (
              <View key={region.id} style={[styles.regionCard, { borderColor: region.color + '40' }]}>
                <View style={[styles.regionHead, { backgroundColor: region.color + '15' }]}>
                  <Text style={styles.regionIcon}>{region.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.regionTitle, { color: region.color }]}>{region.name}</Text>
                    <Text style={styles.regionStats}>{completedCount}/{regionQuizzes.length} hoàn thành</Text>
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
                         style={[styles.quizRow, done && styles.quizRowDone, locked && styles.quizRowLocked]}
                         onPress={() => handleQuizPress(quiz)}
                       >
                         <View style={[styles.quizBullet, { backgroundColor: done ? '#4CAF5020' : locked ? '#333' : region.color + '20' }]}>
                           <Text style={{fontSize: 14}}>{done ? '✅' : locked ? '🔒' : '💎'}</Text>
                         </View>
                         <Text style={[styles.quizRowTitle, locked && { color: '#666' }]} numberOfLines={1}>
                           {quiz.title}
                         </Text>
                       </TouchableOpacity>
                     );
                   })}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.psyTip}>
           <View style={styles.psyTipRow}>
              <DrPsyAvatar emoji={personaEmoji} size={24} />
              <Text style={styles.psyTipName}>Chỉ thị ({game.activePersona === 'killer' ? 'Sát thủ' : (game.activePersona === 'philosopher' ? 'Triết gia' : 'Tâm lý')}):</Text>
           </View>
           <Text style={styles.psyTipText}>
              "{psyTip}"
           </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#121220',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E2E',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarCompact: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#6C63FF30',
  },
  headerInfo: {
    flex: 1,
  },
  drWelcome: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  greetingText: {
    fontSize: 11,
    color: '#8080A0',
    fontWeight: '600',
  },
  gemsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07070F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD70030',
  },
  gemValSmall: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 4,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07070F',
    padding: 8,
    borderRadius: 12,
    gap: 10,
  },
  levelTag: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  levelTagText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  xpBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#1E1E2E',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  streakSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  streakText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },

  scrollContent: {
    paddingVertical: 16,
  },

  // Daily Banner
  dailyBanner: {
    marginHorizontal: 16,
    backgroundColor: '#121220',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFD70060',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dailyBannerDone: {
    borderColor: '#4CAF5040',
    backgroundColor: '#0B1A0B',
    shadowOpacity: 0,
  },
  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#07070F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dailyInfo: {
    flex: 1,
  },
  dailyLabel: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dailyQuizName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  dailyRewardBadge: {
    backgroundColor: '#6C63FF20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C63FF40',
  },
  dailyRewardText: {
    color: '#6C63FF',
    fontSize: 10,
    fontWeight: '900',
  },

  // Sections
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionDesc: {
    color: '#666',
    fontSize: 12,
  },

  // Regions Row
  regionsRow: {
    paddingHorizontal: 16,
    gap: 14,
  },
  regionCard: {
    width: REGION_CARD_WIDTH,
    backgroundColor: '#121220',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },
  regionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    marginBottom: 12,
  },
  regionIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  regionStats: {
    fontSize: 11,
    color: '#666',
  },
  regionList: {
    gap: 8,
  },
  quizRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07070F',
    padding: 8,
    borderRadius: 12,
  },
  quizRowDone: {
    borderColor: '#4CAF5040',
    borderWidth: 1,
  },
  quizRowLocked: {
    opacity: 0.4,
  },
  quizBullet: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  quizRowTitle: {
    color: '#B0B0C0',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },

  // Motivation Card
  psyTip: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#121220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#6C63FF20',
  },
  psyTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  psyTipName: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 8,
  },
  psyTipText: {
    color: '#8080A0',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
  }
});
