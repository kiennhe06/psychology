import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';

import { useGame } from '../context/gameContext';
import { Quiz, QuizQuestion } from '../data/quizzes';
import { BookOpen, Check, X } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AUTO_ADVANCE_DELAY = 2500; // ms

// ==========================================
// SOUND SETUP (GAMIFICATION)
// ==========================================
Sound.setCategory('Playback');

// BẠN CẦN BỎ COMMENT & THÊM FILE VÀO `src/assets/sounds/` ĐỂ NHẠC HOẠT ĐỘNG
/*
const sounds = {
  bgm: new Sound(require('../assets/sounds/bg_music.mp3'), (e) => { if(e) console.log('Error scale BGM:', e); }),
  click: new Sound(require('../assets/sounds/click.mp3'), (e) => { if(e) console.log('Error click:', e); }),
  correct: new Sound(require('../assets/sounds/correct.mp3'), (e) => { if(e) console.log('Error correct:', e); }),
  wrong: new Sound(require('../assets/sounds/wrong.mp3'), (e) => { if(e) console.log('Error wrong:', e); })
};
*/

const playSfx = (type: 'bgm' | 'click' | 'correct' | 'wrong') => {
  // if (sounds[type]) {
  //   if (type === 'bgm') {
  //     sounds.bgm.setNumberOfLoops(-1);
  //   }
  //   sounds[type].setCurrentTime(0).play();
  // }
};
const stopSfx = (type: 'bgm') => {
  // if (sounds[type]) sounds[type].stop();
};

// ==========================================
// HAPTIC FEEDBACK WRAPPER
// ==========================================
const haptic = (type: 'impactLight' | 'notificationSuccess' | 'notificationError') => {
  HapticFeedback.trigger(type, { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
};


interface Props {
  route: {
    params: {
      quiz: Quiz;
      isDaily?: boolean;
    };
  };
  navigation: any;
}

const QuizPlayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quiz, isDaily = false } = route.params;
  const game = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);

  // --- ANIMATIONS ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulsingAnim = useRef(new Animated.Value(1)).current;
  
  // Mảng animation cho 4 đáp án (Staggered Options)
  const optionsAnims = useRef([
    new Animated.ValueXY({ x: 0, y: 50 }),
    new Animated.ValueXY({ x: 0, y: 50 }),
    new Animated.ValueXY({ x: 0, y: 50 }),
    new Animated.ValueXY({ x: 0, y: 50 }),
  ]).current;
  const optionsOpacityAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const currentQuestion: QuizQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  // Lifecycle & BGM
  useEffect(() => {
    playSfx('bgm');
    return () => stopSfx('bgm');
  }, []);

  // Timer countdown
  useEffect(() => {
    if (currentQuestion.timeLimit && !showExplanation && selectedOption === null) {
      setTimer(currentQuestion.timeLimit);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [currentIndex, showExplanation, currentQuestion.timeLimit]);

  useEffect(() => {
    if (!timerActive || timer === null || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          // Time's up - auto select wrong
          setTimerActive(false);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleTimeUp = useCallback(() => {
    setSelectedOption(-1); // -1 means timed out
    setShowExplanation(true);
    playSfx('wrong');
    haptic('notificationError');
  }, []);

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / totalQuestions,
      duration: 500,
      useNativeDriver: false, // Color/width can't use native driver
    }).start();
  }, [currentIndex, totalQuestions]);

  // Nhấp nháy Icon
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulsingAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulsingAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Animate Entrance (Staggered Animation)
  useEffect(() => {
    // Reset tổng thể
    slideAnim.setValue(50);
    fadeAnim.setValue(0);
    
    optionsAnims.forEach(anim => anim.setValue({ x: 0, y: 60 }));
    optionsOpacityAnims.forEach(anim => anim.setValue(0));

    const totalAnims = [
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      // Lật từng thẻ đáp án
      Animated.stagger(100, optionsAnims.map((anim, i) => 
        Animated.parallel([
          Animated.spring(anim, { toValue: { x: 0, y: 0 }, friction: 6, tension: 50, useNativeDriver: true }),
          Animated.timing(optionsOpacityAnims[i], { toValue: 1, duration: 300, useNativeDriver: true })
        ])
      ))
    ];
    Animated.sequence(totalAnims).start();
  }, [currentIndex]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; 

    setSelectedOption(index);
    setTimerActive(false);
    
    // Play SFX & HAPTIC
    haptic('impactLight');
    playSfx('click');

    const isCorrect = index === currentQuestion.correctIndex;
    
    // Đợi một chút rồi ghim kết quả đúng/sai (tăng hồi hộp)
    setTimeout(() => {
      setShowExplanation(true);
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
        playSfx('correct');
        haptic('notificationSuccess');
      } else {
        playSfx('wrong');
        haptic('notificationError');
      }
      setAutoAdvanceCountdown(AUTO_ADVANCE_DELAY);
    }, 300);
  };

  const handleNext = () => {
    setAutoAdvanceCountdown(null);
    if (currentIndex < totalQuestions - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setTimer(null);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Tới trang kết quả
      const xpMultiplier = isDaily ? 2 : 1;
      const earnedXp = Math.round(quiz.xpReward * (correctCount / totalQuestions) * xpMultiplier);
      const correctRate = correctCount / totalQuestions;
      let earnedGems = 0;
      if (correctRate >= 1) earnedGems = quiz.gemReward;
      else if (correctRate >= 0.8) earnedGems = Math.round(quiz.gemReward * 0.5); 
      
      const isPerfect = correctCount === totalQuestions;

      navigation.replace('QuizResult', {
        quizId: quiz.id,
        quizTitle: quiz.title,
        correctCount,
        totalQuestions,
        earnedXp,
        earnedGems,
        isPerfect,
        isDaily,
      });
    }
  };

  const timerColor = timer !== null && timer <= 5 ? '#FF3366' : '#FFD700';

  useEffect(() => {
    if (autoAdvanceCountdown === null || autoAdvanceCountdown <= 0) return;
    const t = setTimeout(() => {
      handleNext();
    }, autoAdvanceCountdown);
    return () => clearTimeout(t);
  }, [autoAdvanceCountdown]);

  return (
    <LinearGradient 
      colors={['#0f172a', '#1e1b4b', '#0f172a']} 
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* ── Top Bar ───────────────────────────────── */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.quitButton}>
            <Text style={styles.quitText}>✕</Text>
          </TouchableOpacity>

          {/* Progress Bar with Glow */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#8b5cf6', '#06b6d4'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.questionCount}>{currentIndex + 1}/{totalQuestions}</Text>
        </View>

        {/* ── Timer ─────────────────────────────────── */}
        {timer !== null && timer > 0 && selectedOption === null && (
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: timerColor }]}>⏱ {timer}s</Text>
          </View>
        )}

        {/* ── Question Area ─────────────────────────── */}
        <Animated.ScrollView
          style={[styles.scrollArea, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* Scenario Glass Card */}
          {currentQuestion.scenario && (
            <View style={styles.scenarioCard}>
              <View style={styles.scenarioHeader}>
                <Animated.View style={{ transform: [{ scale: pulsingAnim }] }}>
                  <BookOpen size={20} color="#a78bfa" />
                </Animated.View>
                <Text style={styles.scenarioLabel}>Tình huống</Text>
              </View>
              <Text style={styles.scenarioText}>{currentQuestion.scenario}</Text>
            </View>
          )}

          {/* Question Title */}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Staggered Options List */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const animTransform = optionsAnims[index].getTranslateTransform();
              const animOpacity = optionsOpacityAnims[index];

              let borderCol = 'rgba(255,255,255,0.1)';
              let bgCol = 'rgba(255,255,255,0.05)';
              let iconMark = null;

              if (selectedOption !== null && showExplanation) {
                if (index === currentQuestion.correctIndex) {
                  borderCol = '#10b981'; bgCol = 'rgba(16, 185, 129, 0.15)';
                  iconMark = <Check size={20} color="#10b981" />;
                } else if (index === selectedOption) {
                  borderCol = '#ef4444'; bgCol = 'rgba(239, 68, 68, 0.15)';
                  iconMark = <X size={20} color="#ef4444" />;
                } else {
                  bgCol = 'rgba(255,255,255,0.02)'; // Cực mờ
                }
              }

              return (
                <Animated.View 
                  key={index} 
                  style={{ opacity: animOpacity, transform: animTransform }}
                >
                  <TouchableOpacity
                    style={[styles.optionCard, { borderColor: borderCol, backgroundColor: bgCol }]}
                    onPress={() => handleSelectOption(index)}
                    activeOpacity={0.7}
                    disabled={selectedOption !== null}
                  >
                    <View style={styles.optionIndexBadge}>
                      <Text style={styles.optionIndexText}>{String.fromCharCode(65 + index)}</Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                    {iconMark && <View style={styles.iconMarkContainer}>{iconMark}</View>}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Timeout */}
          {selectedOption === -1 && (
             <View style={styles.timeoutCard}>
               <Text style={styles.timeoutText}>⏰ Hết giờ!</Text>
             </View>
          )}

          {/* Explanation Glass Card */}
          {showExplanation && (
            <Animated.View style={styles.explanationCard}>
              <Text style={[styles.explanationLabel, { color: selectedOption === currentQuestion.correctIndex ? '#10b981' : '#f59e0b' }]}>
                {selectedOption === currentQuestion.correctIndex ? '🎉 Xuất sắc!' : '💡 Giải thích cho bạn:'}
              </Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </Animated.View>
          )}

          {/* Next Button */}
          {showExplanation && (
             <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
                <LinearGradient
                   colors={['#8b5cf6', '#6366f1']}
                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                   style={styles.nextButtonGradient}
                >
                   <Text style={styles.nextButtonText}>
                     {currentIndex < totalQuestions - 1 ? 'Chuyển câu tiếp (tự động) →' : '🏁 Xem kết quả'}
                   </Text>
                </LinearGradient>
             </TouchableOpacity>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QuizPlayScreen;

// ─── Styles Glassmorphism ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 16,
  },
  quitButton: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  quitText: { color: '#ef4444', fontSize: 16, fontWeight: '700' },
  progressBarContainer: {
    flex: 1, height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4, overflow: 'hidden',
  },
  progressBar: { height: '100%', borderRadius: 4 },
  questionCount: { color: '#a1a1aa', fontSize: 15, fontWeight: '700', minWidth: 36, textAlign: 'right' },

  // Timer
  timerContainer: { alignItems: 'center', paddingBottom: 10 },
  timerText: { fontSize: 22, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },

  // Body
  scrollArea: { flex: 1, paddingHorizontal: 20 },
  
  // Scenario Card (Glass)
  scenarioCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(167, 139, 250, 0.3)',
    borderLeftWidth: 4, borderLeftColor: '#8b5cf6',
  },
  scenarioHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  scenarioLabel: { color: '#a78bfa', fontSize: 15, fontWeight: '800', textTransform: 'uppercase' },
  scenarioText: { color: '#e2e8f0', fontSize: 16, lineHeight: 26, fontStyle: 'italic' },

  // Question Text
  questionText: { color: '#fff', fontSize: 22, fontWeight: '700', lineHeight: 32, marginBottom: 28, textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 4, textShadowOffset: {width: 0, height: 2} },

  // Options
  optionsContainer: { gap: 14 },
  optionCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 18,
    borderWidth: 1.5,
  },
  optionIndexBadge: { 
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 14 
  },
  optionIndexText: { color: '#cbd5e1', fontWeight: '800', fontSize: 15 },
  optionText: { color: '#f8fafc', fontSize: 16, flex: 1, lineHeight: 24, fontWeight: '500' },
  iconMarkContainer: { marginLeft: 10, padding: 4, backgroundColor: '#fff', borderRadius: 20 },

  // Timeout
  timeoutCard: { alignItems: 'center', marginTop: 20, backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 12, borderRadius: 12 },
  timeoutText: { color: '#ef4444', fontSize: 18, fontWeight: '800' },

  // Explanation
  explanationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16, padding: 18, marginTop: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  explanationLabel: { fontSize: 16, fontWeight: '800', marginBottom: 8, textTransform: 'uppercase' },
  explanationText: { color: '#94a3b8', fontSize: 15, lineHeight: 24 },

  // Next Button
  nextButton: { marginTop: 24, borderRadius: 16, overflow: 'hidden', elevation: 8, shadowColor: '#6366f1', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  nextButtonGradient: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  nextButtonText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
