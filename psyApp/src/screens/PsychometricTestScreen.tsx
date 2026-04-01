import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/gameContext';
import { getRandomMessageByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';
import { PsychometricTest, TestQuestion } from '../data/psychometricTests';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  route: {
    params: {
      test: PsychometricTest;
    };
  };
  navigation: any;
}

const PsychometricTestScreen: React.FC<Props> = ({ route, navigation }) => {
  const game = useGame();
  const { test } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [personaMessage, setPersonaMessage] = useState('');
  const [personaEmoji, setPersonaEmoji] = useState('🐱');
    
  useEffect(() => {
    // Initial message
    setPersonaMessage(getRandomMessageByPersona(game.activePersona, 'testComments'));
    
    // Map emoji
    if (game.activePersona === 'killer') setPersonaEmoji('💀');
    else if (game.activePersona === 'philosopher') setPersonaEmoji('📜');
    else if (game.activePersona === 'sherlock') setPersonaEmoji('🕵️‍♂️');
    else if (game.activePersona === 'mystic') setPersonaEmoji('🔮');
    else setPersonaEmoji('🐱');
  }, [game.activePersona]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion = test.questions[currentIndex];

  const handleSelect = (traitScores: Record<string, number>) => {
    // Update scores
    const newScores = { ...scores };
    Object.keys(traitScores).forEach(trait => {
      newScores[trait] = (newScores[trait] || 0) + traitScores[trait];
    });
    setScores(newScores);

    // Change persona message occasionally
    if (Math.random() > 0.5) {
      setPersonaMessage(getRandomMessageByPersona(game.activePersona, 'testComments'));
    }

    // Navigate to next question or show result
    if (currentIndex < test.questions.length - 1) {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setCurrentIndex(prev => prev + 1);
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        
        // Progress bar expansion anim logic could go here
      });
    } else {
      setShowResult(true);
      // Mark as completed in game context
      game.completeTest(test.id);
    }
  };

  const calculateResult = () => {
    // Find the trait with highest score
    let topTrait = '';
    let maxVal = -1;
    Object.keys(scores).forEach(trait => {
      if (scores[trait] > maxVal) {
        maxVal = scores[trait];
        topTrait = trait;
      }
    });

    // Find corresponding result description
    return test.results.find(r => r.traitId === topTrait) || test.results[0];
  };

  const result = showResult ? calculateResult() : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {!showResult ? (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.exitBtn}>
              <Text style={styles.backBtn}>✕ THOÁT</Text>
            </TouchableOpacity>
            
            <View style={styles.drPsyObservation}>
               <DrPsyAvatar emoji={personaEmoji} size={50} />
               <View style={styles.messageTail} />
               <View style={styles.personaBubble}>
                  <Text style={styles.personaMsg} numberOfLines={2}>{personaMessage}</Text>
               </View>
            </View>
          </View>

          {/* Question Area */}
          <Animated.View style={[styles.questionArea, { opacity: fadeAnim }]}>
            <View style={styles.testMeta}>
               <Text style={styles.testTitle}>{test.title.toUpperCase()}</Text>
               <View style={styles.progressContainer}>
                  <View style={[styles.progressIndicator, { width: `${((currentIndex + 1) / test.questions.length) * 100}%` }]} />
                  <Text style={styles.progressCounter}>{currentIndex + 1} / {test.questions.length}</Text>
               </View>
            </View>
            
            <View style={styles.focusCircle} />
            
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionBtn}
                  onPress={() => handleSelect(option.traitScores)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{option.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </>
      ) : (
        /* Result Screen - Psychological Profile Card Style */
        <View style={styles.resultContainer}>
          <View style={styles.profileCard}>
            <View style={styles.cardHeader}>
               <Text style={styles.cardHeaderTitle}>HỒ SƠ TÂM LÝ HỌC VIÊN</Text>
               <Text style={styles.cardId}>#{test.id.toUpperCase().slice(0, 8)}</Text>
            </View>

            <View style={styles.cardBody}>
               <View style={styles.avatarSection}>
                  <View style={styles.userPhotoPlaceholder}>
                     <Text style={{fontSize: 32}}>🕵️‍♂️</Text>
                  </View>
                  <View style={styles.stamp}>
                     <Text style={styles.stampText}>CHỨNG THỰC</Text>
                  </View>
               </View>

               <View style={styles.infoSection}>
                  <Text style={styles.resultLabel}>KẾT QUẢ PHÂN TÍCH:</Text>
                  <Text style={styles.resultTitle}>{result?.title.toUpperCase()}</Text>
                  <View style={styles.resultDivider} />
                  <Text style={styles.resultDesc}>{result?.description}</Text>
               </View>
            </View>

            <View style={styles.cardFooter}>
               <Text style={styles.footerNote}>XÁC NHẬN BỞI HỌC VIỆN ĐÀO TẠO THÁM TỬ DR. PSY</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.finishBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.finishBtnText}>HOÀN TẤT ĐƯỜNG BAY</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PsychometricTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510', 
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  exitBtn: {
    padding: 10,
  },
  backBtn: {
    color: '#444',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  drPsyObservation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  personaBubble: {
    backgroundColor: '#161625',
    padding: 12,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    flex: 1,
    borderWidth: 1,
    borderColor: '#6C63FF30',
  },
  messageTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#161625',
    marginLeft: -2,
    marginTop: -10,
    zIndex: 11,
  },
  personaMsg: {
    color: '#D0D0E0',
    fontSize: 11,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  testMeta: {
    marginBottom: 40,
    alignItems: 'center',
  },
  testTitle: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 24,
    backgroundColor: '#121220',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  progressIndicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#6C63FF20',
  },
  progressCounter: {
    color: '#6C63FF',
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
  questionArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  focusCircle: {
     position: 'absolute',
     width: 300,
     height: 300,
     borderRadius: 150,
     borderWidth: 1,
     borderColor: '#6C63FF05',
     top: SCREEN_WIDTH * 0.1,
     left: -50,
     zIndex: -1,
  },
  questionText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  optionsContainer: {
    gap: 12,
  },
  optionBtn: {
    backgroundColor: '#121220',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1A1A2E',
  },
  optionText: {
    color: '#A0A0B0',
    fontSize: 15,
    fontWeight: '600',
  },

  // Profile Card Styles
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#F5F5F0',
    width: '100%',
    borderRadius: 8,
    padding: 4,
    borderWidth: 2,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  cardHeader: {
    backgroundColor: '#222',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  cardId: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '900',
  },
  cardBody: {
    padding: 20,
    flexDirection: 'row',
  },
  avatarSection: {
    width: 80,
    alignItems: 'center',
  },
  userPhotoPlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: '#DDD',
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stamp: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#A44',
    padding: 2,
    transform: [{ rotate: '-15deg' }],
  },
  stampText: {
    color: '#A44',
    fontSize: 8,
    fontWeight: '900',
  },
  infoSection: {
    flex: 1,
    marginLeft: 20,
  },
  resultLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  resultTitle: {
    color: '#222',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  resultDivider: {
    height: 2,
    backgroundColor: '#222',
    width: 40,
    marginBottom: 10,
  },
  resultDesc: {
    color: '#444',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    padding: 10,
    alignItems: 'center',
  },
  footerNote: {
    color: '#999',
    fontSize: 8,
    fontWeight: '800',
  },
  finishBtn: {
    backgroundColor: '#6C63FF',
    marginTop: 30,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  }
});
