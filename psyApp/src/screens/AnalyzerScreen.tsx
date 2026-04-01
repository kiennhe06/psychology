import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { analyzeScenario, AnalysisResult, AnalyzerRule } from '../data/analyzerRules';
import { useGame } from '../context/gameContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const CATEGORY_LABELS: Record<string, { emoji: string; label: string; color: string }> = {
  cognitive: { emoji: '🧠', label: 'Nhận thức', color: '#BA68C8' },
  emotion: { emoji: '❤️', label: 'Cảm xúc', color: '#F06292' },
  social: { emoji: '👥', label: 'Xã hội', color: '#64B5F6' },
  memory: { emoji: '🌀', label: 'Trí nhớ', color: '#FFD54F' },
  decision: { emoji: '⚖️', label: 'Quyết định', color: '#81C784' },
  manipulation: { emoji: '🎭', label: 'Thao túng', color: '#FF7043' },
};

const AnalyzerScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const [displayedAnalysis, setDisplayedAnalysis] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<any>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const startTypewriter = (text: string) => {
    // Xóa interval cũ trước khi bắt đầu mới
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setDisplayedAnalysis('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const fullText = text;
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedAnalysis(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, 20); // Tăng tốc độ lên chút cho mượt
  };

  const handleAnalyze = () => {
    if (inputText.trim().length < 5) return;

    setIsAnalyzing(true);
    setShowResult(false);
    setDisplayedAnalysis('');

    // Simulate thinking delay
    setTimeout(async () => {
      try {
        const analysisResult = analyzeScenario(inputText, game.activePersona);

        setResult(analysisResult);
        setIsAnalyzing(false);
        setShowResult(true);

        // Start Gemini Effect
        startTypewriter(analysisResult.deepAnalysis);

        // Reward
        if (analysisResult.matchedRules.length > 0) {
          game.addXp(20);
        }

        // Animate score
        Animated.timing(scoreAnim, {
          toValue: analysisResult.awarenessScore,
          duration: 1200,
          useNativeDriver: false,
        }).start();

        // Animate cards stagger
        const newAnims = analysisResult.matchedRules.map(() => new Animated.Value(0));
        cardAnims.length = 0;
        cardAnims.push(...newAnims);

        Animated.stagger(
          200,
          newAnims.map(anim =>
            Animated.spring(anim, { toValue: 1, friction: 6, useNativeDriver: true })
          )
        ).start();
      } catch (error) {
        console.error("Analysis Failed:", error);
        // Fallback on error
        // Fallback on unexpected error
        const fallback = analyzeScenario(inputText, game.activePersona);
        setResult(fallback);
        setIsAnalyzing(false);
        setShowResult(true);
        startTypewriter(fallback.deepAnalysis);
      }
    }, 1800); 
  };

  const handleReset = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setInputText('');
    setResult(null);
    setShowResult(false);
    setDisplayedAnalysis('');
    scoreAnim.setValue(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return '#4CAF50';
    if (score >= 50) return '#FFD700';
    if (score >= 25) return '#FF9800';
    return '#FF5252';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'THÁM TỬ XUẤT SẮC';
    if (score >= 50) return 'KHÁM PHÁ NHIỀU';
    if (score >= 25) return 'CÒN ẨN SỐ';
    return 'MỚI BẮT ĐẦU';
  };

  const renderResultCard = (rule: AnalyzerRule, index: number) => {
    const cardAnim = cardAnims[index] || new Animated.Value(1);
    const cat = CATEGORY_LABELS[rule.category] || CATEGORY_LABELS.cognitive;

    return (
      <Animated.View
        key={rule.id}
        style={[
          styles.resultCard,
          {
            opacity: cardAnim,
            transform: [
              { translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
            ],
          },
        ]}
      >
        <View style={styles.resultCardHeader}>
          <Text style={styles.resultEmoji}>{rule.effectEmoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.resultEffectName}>{rule.effectName}</Text>
          </View>
          <View style={[styles.categoryTag, { backgroundColor: cat.color + '20' }]}>
            <Text style={[styles.categoryTagText, { color: cat.color }]}>
              {cat.label}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>🕵️‍♂️ DR. PSY ANALYZER</Text>
            <Text style={styles.headerSub}>Trí tuệ thám tử đọc vị tâm lý (Offline)</Text>
          </View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Input Section */}
          {!showResult && (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>🖋️ MÔ TẢ TÌNH HUỐNG</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Hãy kể lại một sự việc bạn muốn thấu hiểu tâm lý...'}
                placeholderTextColor="#444"
                multiline
                numberOfLines={6}
                maxLength={1000}
                value={inputText}
                onChangeText={setInputText}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{inputText.length}/1000</Text>
            </View>
          )}

          {/* Analyze Button */}
          {!showResult && (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.analyzeBtn,
                  inputText.trim().length < 5 && styles.analyzeBtnDisabled,
                  isAnalyzing && styles.analyzeBtnLoading,
                ]}
                onPress={handleAnalyze}
                disabled={inputText.trim().length < 5 || isAnalyzing}
                activeOpacity={0.8}
              >
                <View style={styles.btnContent}>
                   {isAnalyzing ? (
                     <Text style={styles.analyzeBtnText}>ĐANG QUÉT NĂNG LƯỢNG...</Text>
                   ) : (
                     <Text style={styles.analyzeBtnText}>PHÂN TÍCH CHUYÊN SÂU</Text>
                   )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Loading Animation */}
          {isAnalyzing && (
            <View style={styles.loadingSection}>
              <View style={styles.scannerLine} />
              <Animated.Text style={[styles.loadingEmoji, { transform: [{ scale: pulseAnim }] }]}>🛰️</Animated.Text>
              <Text style={styles.loadingText}>Đang truy xuất kho dữ liệu tâm lý...</Text>
            </View>
          )}

          {/* Results */}
          {showResult && result && (
            <View style={styles.resultsSection}>
              {/* Layer 1: Persona Reaction */}
              <View style={styles.verdictBox}>
                <View style={styles.verdictHeader}>
                  <Text style={styles.verdictTitle}>🎭 NHẬN ĐỊNH GIẢNG VIÊN</Text>
                </View>
                <Text style={styles.verdictText}>{result.drPsyVerdict}</Text>
              </View>

              {/* Awareness Score Bar */}
              <View style={styles.awarenessBarBg}>
                <View style={[styles.awarenessBarFill, { width: `${result.awarenessScore}%`, backgroundColor: getScoreColor(result.awarenessScore) }]} />
                <Text style={styles.awarenessScoreText}>ĐỘ SÂU TÂM LÝ: {result.awarenessScore}%</Text>
              </View>

              {/* Layer 2: Pattern Recognition */}
              {result.matchedRules.length > 0 && (
                <View style={styles.patternsBox}>
                  <Text style={styles.sectionHeader}>🔎 PHÁT HIỆN QUY LUẬT ({result.matchedRules.length})</Text>
                  <View style={styles.patternsList}>
                    {result.matchedRules.map((rule, i) => renderResultCard(rule, i))}
                  </View>
                </View>
              )}

              {/* Layer 3: Deep Analysis (Gemini Mode) */}
              <View style={styles.geminiDeepBox}>
                <View style={styles.geminiHeader}>
                  <Text style={styles.geminiTitle}>✨ PHÂN TÍCH CHUYÊN SÂU (DR. PSY)</Text>
                  {isTyping && <View style={styles.typingDot} />}
                </View>
                <Text style={styles.deepAnalysisText}>
                  {displayedAnalysis}
                  {isTyping && <Text style={styles.cursor}>|</Text>}
                </Text>
              </View>

              {/* Layer 4: Tactical Advice */}
              {!isTyping && (
                <View style={styles.strategyBox}>
                  <Text style={styles.strategyHeader}>🏹 CHIẾN THUẬT HÀNH ĐỘNG</Text>
                  {result.tacticalAdvice.map((advice, i) => (
                    <View key={i} style={styles.adviceItem}>
                      <Text style={styles.adviceBullet}>•</Text>
                      <Text style={styles.adviceTextItem}>{advice}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Reset Button */}
              {!isTyping && (
                <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                  <Text style={styles.resetBtnText}>🔄 PHÂN TÍCH TÌNH HUỐNG MỚI</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AnalyzerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07070F',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1E1E2E',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    color: '#8982FF',
    fontSize: 18,
    fontWeight: '800',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSub: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // Input Section
  inputSection: {
    marginBottom: 20,
    backgroundColor: '#121220',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  inputLabel: {
    color: '#8982FF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  textInput: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 24,
    minHeight: 140,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#444',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 8,
  },

  // Analyze Button
  analyzeBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  analyzeBtnDisabled: {
    backgroundColor: '#2A2A3E',
    shadowOpacity: 0,
  },
  analyzeBtnLoading: {
    backgroundColor: '#4A45A0',
  },
  btnContent: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  analyzeBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  // Loading
  loadingSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#121220',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#6C63FF30',
  },
  scannerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#6C63FF',
    opacity: 0.5,
  },
  loadingEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  loadingText: {
    color: '#8982FF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Results
  resultsSection: {
    gap: 16,
  },

  // Verdict (Layer 1)
  verdictBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#6C63FF40',
  },
  verdictHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  verdictTitle: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  verdictText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
    fontStyle: 'italic',
  },

  // Awareness Bar
  awarenessBarBg: {
    height: 32,
    backgroundColor: '#121220',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  awarenessBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 16,
  },
  awarenessScoreText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    alignSelf: 'center',
    letterSpacing: 1,
  },

  // Patterns (Layer 2)
  patternsBox: {
    gap: 12,
  },
  sectionHeader: {
    color: '#666',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 4,
  },
  patternsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  resultCard: {
    backgroundColor: '#121220',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2A2A3E',
    flex: 1,
    minWidth: '45%',
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultEmoji: {
    fontSize: 20,
  },
  resultEffectName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: 8,
    fontWeight: '900',
  },

  // Deep Analysis (Layer 3)
  geminiDeepBox: {
    backgroundColor: '#0F0F1A',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6C63FF20',
    minHeight: 150,
  },
  geminiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  geminiTitle: {
    color: '#8982FF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C63FF',
  },
  deepAnalysisText: {
    color: '#B0B0C0',
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '500',
  },
  cursor: {
    color: '#6C63FF',
    fontWeight: '900',
    fontSize: 18,
  },

  // Strategy (Layer 4)
  strategyBox: {
    backgroundColor: '#12201A',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#4CAF5030',
  },
  strategyHeader: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  adviceItem: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 10,
  },
  adviceBullet: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '900',
  },
  adviceTextItem: {
    color: '#A0B0A0',
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
    fontWeight: '600',
  },

  // Reset
  resetBtn: {
    backgroundColor: '#1E1E2E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  resetBtnText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
