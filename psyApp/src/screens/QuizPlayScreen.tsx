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
import { useGame } from '../context/gameContext';
import { Quiz, QuizQuestion } from '../data/quizzes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AUTO_ADVANCE_DELAY = 2500; // ms

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

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion: QuizQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

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
  }, []);

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / totalQuestions,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, totalQuestions]);

  // Animate question entrance
  useEffect(() => {
    slideAnim.setValue(50);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Already answered

    setSelectedOption(index);
    setTimerActive(false);

    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }

    // Show explanation after a brief delay, then start auto-advance
    setTimeout(() => {
      setShowExplanation(true);
      setAutoAdvanceCountdown(AUTO_ADVANCE_DELAY);
    }, 600);
  };

  const handleNext = () => {
    setAutoAdvanceCountdown(null); // cancel any pending auto
    if (currentIndex < totalQuestions - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setTimer(null);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz finished — navigate to results
      const xpMultiplier = isDaily ? 2 : 1;
      const earnedXp = Math.round(quiz.xpReward * (correctCount / totalQuestions) * xpMultiplier);
      // Gem: chỉ nhận khi đúng ≥80%, perfect = full, 80-99% = nửa
      const correctRate = correctCount / totalQuestions;
      let earnedGems = 0;
      if (correctRate >= 1) {
        earnedGems = quiz.gemReward;  // Perfect = full
      } else if (correctRate >= 0.8) {
        earnedGems = Math.round(quiz.gemReward * 0.5); // 80%+ = half
      }
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

  const handleQuit = () => {
    navigation.goBack();
  };

  const getOptionStyle = (index: number) => {
    if (selectedOption === null) return styles.option;

    if (index === currentQuestion.correctIndex) {
      return [styles.option, styles.optionCorrect];
    }
    if (index === selectedOption && index !== currentQuestion.correctIndex) {
      return [styles.option, styles.optionWrong];
    }
    return [styles.option, styles.optionDimmed];
  };

  const getOptionTextStyle = (index: number) => {
    if (selectedOption === null) return styles.optionText;

    if (index === currentQuestion.correctIndex) {
      return [styles.optionText, styles.optionTextCorrect];
    }
    if (index === selectedOption && index !== currentQuestion.correctIndex) {
      return [styles.optionText, styles.optionTextWrong];
    }
    return [styles.optionText, styles.optionTextDimmed];
  };

  // Timer color
  const timerColor = timer !== null && timer <= 5 ? '#FF4444' : '#FFD700';

  // Auto-advance effect
  useEffect(() => {
    if (autoAdvanceCountdown === null || autoAdvanceCountdown <= 0) return;
    const t = setTimeout(() => {
      handleNext();
    }, autoAdvanceCountdown);
    return () => clearTimeout(t);
  }, [autoAdvanceCountdown]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleQuit} style={styles.quitButton}>
          <Text style={styles.quitText}>✕</Text>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <Text style={styles.questionCount}>
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </View>

      {/* ── Timer ───────────────────────────────────────────────────────── */}
      {timer !== null && timer > 0 && selectedOption === null && (
        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, { color: timerColor }]}>⏱ {timer}s</Text>
        </View>
      )}

      {/* ── Question ────────────────────────────────────────────────────── */}
      <Animated.ScrollView
        style={[
          styles.questionContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Scenario (if any) */}
        {currentQuestion.scenario && (
          <View style={styles.scenarioCard}>
            <Text style={styles.scenarioLabel}>📖 Tình huống:</Text>
            <Text style={styles.scenarioText}>{currentQuestion.scenario}</Text>
          </View>
        )}

        {/* Question */}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleSelectOption(index)}
              activeOpacity={0.8}
              disabled={selectedOption !== null}
            >
              <View style={styles.optionIndexBadge}>
                <Text style={styles.optionIndexText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={getOptionTextStyle(index)}>{option}</Text>
              {selectedOption !== null && index === currentQuestion.correctIndex && (
                <Text style={styles.correctMark}>✓</Text>
              )}
              {selectedOption === index && index !== currentQuestion.correctIndex && (
                <Text style={styles.wrongMark}>✗</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Out Indicator */}
        {selectedOption === -1 && (
          <View style={styles.timeoutCard}>
            <Text style={styles.timeoutText}>⏰ Hết giờ!</Text>
          </View>
        )}

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationLabel}>
              {selectedOption === currentQuestion.correctIndex ? '🎉 Chính xác!' : '💡 Giải thích:'}
            </Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}

        {/* Next Button (tap to skip auto-advance) */}
        {showExplanation && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
            <Text style={styles.nextButtonText}>
              {currentIndex < totalQuestions - 1 ? 'Câu tiếp → (tự chuyển)' : '🏁 Xem kết quả'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default QuizPlayScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  quitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2A3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quitText: {
    color: '#888',
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#2A2A3E',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 5,
  },
  questionCount: {
    color: '#888',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 36,
    textAlign: 'right',
  },

  // Timer
  timerContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 20,
    fontWeight: '800',
  },

  // Question
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scenarioCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  scenarioLabel: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  scenarioText: {
    color: '#D0D0E0',
    fontSize: 15,
    lineHeight: 23,
  },
  questionText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 24,
  },

  // Options
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#333',
  },
  optionCorrect: {
    backgroundColor: '#1A3A1A',
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#3A1A1A',
    borderColor: '#FF4444',
  },
  optionDimmed: {
    opacity: 0.5,
  },
  optionIndexBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2A2A3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIndexText: {
    color: '#A0A0D0',
    fontWeight: '700',
    fontSize: 14,
  },
  optionText: {
    color: '#E0E0E0',
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  optionTextCorrect: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#FF4444',
    fontWeight: '600',
  },
  optionTextDimmed: {
    color: '#888',
  },
  correctMark: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },
  wrongMark: {
    color: '#FF4444',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },

  // Timeout
  timeoutCard: {
    alignItems: 'center',
    marginTop: 16,
  },
  timeoutText: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: '700',
  },

  // Explanation
  explanationCard: {
    backgroundColor: '#1A2A1A',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  explanationLabel: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  explanationText: {
    color: '#D0D0D0',
    fontSize: 14,
    lineHeight: 22,
  },

  // Next Button
  nextButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
