import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ArrowLeft, Send, ShieldCheck, Info, MessageSquareCode } from 'lucide-react-native';
import { useGame } from '../context/gameContext';
import { MISSIONS } from '../data/missions';
import DrPsyAvatar from '../components/DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RouteParams = {
  MissionReport: {
    missionId: string;
  };
};

const MissionReportScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'MissionReport'>>();
  const game = useGame();

  const { missionId } = route.params;
  const mission = MISSIONS.find(m => m.id === missionId);

  const [reportText, setReportText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerdict, setShowVerdict] = useState(false);
  const [verdictContent, setVerdictContent] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!mission) return null;

  const getPersonaVerdict = (text: string, personaId: string) => {
    const length = text.length;
    let comment = '';

    switch (personaId) {
      case 'sherlock':
        if (length < 50) comment = 'Thám tử à, báo cáo sơ sài là biểu hiện của một bộ não lười biếng. Lần sau hãy quan sát kỹ hơn.';
        else if (length < 150) comment = 'Tạm chấp nhận được. Ngươi đã bắt đầu nhìn thấy những điều hiển nhiên mà người khác bỏ qua.';
        else comment = 'Thật xuất sắc! Khả năng quan sát của ngươi đang tiến gần đến trình độ của ta rồi đấy.';
        return `${comment}`;

      case 'killer':
        if (length < 50) comment = 'Ngươi định hạ gục đối phương bằng vài dòng chữ này sao? Quá yếu ớt.';
        else if (length < 150) comment = 'Tốt, ngươi đã biết cách đào sâu vào điểm yếu của mục tiêu.';
        else comment = 'Tàn nhẫn và chính xác. Ngươi đã nắm thóp được tình huống này một cách hoàn hảo.';
        return `${comment}`;

      case 'mystic':
        if (length < 50) comment = 'Năng lượng của bạn đang bị chặn lại. Hãy mở lòng và cảm nhận sâu hơn.';
        else if (length < 150) comment = 'Tần số của bạn đã đồng điệu với thực tại. Vũ trụ đang mỉm cười với bạn.';
        else comment = 'Sự thấu thị tuyệt vời! Bạn đã nhìn thấy được sợi dây liên kết vô hình giữa các linh hồn.';
        return `${comment}`;

      case 'philosopher':
        if (length < 50) comment = 'Hỡi hành giả, sự am hiểu không thể đong đếm qua loa. Hãy suy ngẫm thêm.';
        else if (length < 150) comment = 'Sự hiểu biết là bước đầu tiên để tự do. Bạn đang đi đúng hướng.';
        else comment = 'Một báo cáo thấm đẫm trí tuệ. Bạn đã hiểu được bản chất của nỗi khổ và sự chấp niệm.';
        return `${comment}`;

      case 'mastermind':
        if (length < 50) comment = 'Báo cáo quá sơ sài. Ngươi định giấu ta điều gì hay chỉ là một quân tốt lười biếng?';
        else if (length < 150) comment = 'Tốt. Ngươi đã bắt đầu nhìn thấy những nước đi ngầm của các quân cờ chung quanh.';
        else comment = 'Xuất sắc. Tầm nhìn vĩ mô của ngươi đã bao quát được toàn bộ bàn cờ xã hội này.';
        return `${comment}`;

      case 'manipulator':
        if (length < 50) comment = 'Ngươi chưa biết cách lèo lái thông tin. Bằng chứng này quá yếu ớt để giật dây.';
        else if (length < 150) comment = 'Đã thấy được sợi xích. Ngươi đang bắt đầu nắm quyền kiểm soát thực tại.';
        else comment = 'Thật xảo quyệt! Ngươi đã biến tình huống này thành sân chơi thao túng của riêng mình.';
        return `${comment}`;

      default:
        return `Bạn đã hoàn thành xuất sắc nhiệm vụ thực địa!`;
    }
  };

  const handleSubmit = () => {
    if (reportText.trim().length < 10) {
      Alert.alert('Bằng chứng chưa đủ!', 'Báo cáo thám tử cần ít nhất 10 ký tự để được phê duyệt bởi sư phụ.');
      return;
    }

    setIsSubmitting(true);

    // Simulate thinking/reviewing
    setTimeout(() => {
      const verdict = getPersonaVerdict(reportText, game.activePersona);
      setVerdictContent(verdict);

      game.completeMission(mission.id);
      game.addXp(mission.rewardXp);

      setIsSubmitting(false);
      setShowVerdict(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BÁO CÁO THỰC ĐỊA</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.missionBrief, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.badgeRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{mission.category.toUpperCase()}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: mission.difficulty === 'HARD' ? '#FF444420' : '#4CAF5020' }]}>
                <Text style={[styles.difficultyText, { color: mission.difficulty === 'HARD' ? '#FF4444' : '#4CAF50' }]}>
                  {mission.difficulty}
                </Text>
              </View>
            </View>

            <Text style={styles.missionTitle}>{mission.title}</Text>
            <View style={styles.taskCard}>
              <Info size={18} color="#6C63FF" style={{ marginTop: 2 }} />
              <Text style={styles.taskText}>{mission.task}</Text>
            </View>
          </Animated.View>

          {!showVerdict ? (
            <View style={styles.reportArea}>
              <View style={styles.inputLabelRow}>
                <MessageSquareCode size={20} color="#8080A0" />
                <Text style={styles.inputLabel}>Bằng chứng & Diễn biến</Text>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="Nhập những gì bạn đã làm, quan sát được và cảm nhận của đối phương... (Tối thiểu 20 ký tự)"
                placeholderTextColor="#444"
                multiline
                numberOfLines={10}
                value={reportText}
                onChangeText={setReportText}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Text style={styles.submitBtnText}>ĐANG PHÊ DUYỆT...</Text>
                ) : (
                  <>
                    <Text style={styles.submitBtnText}>GỬI HỒ SƠ TUYỆT MẬT</Text>
                    <Send size={18} color="#FFF" style={{ marginLeft: 8 }} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.verdictArea}>
              <Animated.View style={[styles.successHeader, { opacity: fadeAnim }]}>
                <ShieldCheck size={32} color="#4CAF50" />
                <Text style={styles.verdictTitle}>HOÀN THÀNH XUẤT SẮC</Text>
              </Animated.View>

              <View style={styles.personaVerdictBox}>
                <View style={styles.avatarWrapper}>
                  <DrPsyAvatar size={100} persona={game.activePersona} />
                </View>
                <View style={styles.verdictBubble}>
                  <Text style={styles.verdictContent}>"{verdictContent}"</Text>
                  <View style={styles.bubbleTail} />
                </View>
              </View>

              <View style={styles.rewardBox}>
                <Text style={styles.rewardLabel}>PHẦN THƯỞNG</Text>
                <Text style={styles.rewardValue}>+{mission.rewardXp} XP THÁM TỬ</Text>
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.closeBtnText}>RỜI PHÒNG HỒ SƠ</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MissionReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E2E',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  scrollContent: {
    padding: 20,
  },
  missionBrief: {
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#6C63FF20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6C63FF40',
  },
  categoryText: {
    color: '#6C63FF',
    fontSize: 10,
    fontWeight: '900',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '900',
  },
  missionTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: '#121220',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#1E1E2E',
  },
  taskText: {
    color: '#A0A0B0',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
  },
  reportArea: {
    marginTop: 10,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#8080A0',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 1,
  },
  textInput: {
    backgroundColor: '#0F0F1A',
    borderRadius: 16,
    padding: 16,
    color: '#FFF',
    fontSize: 15,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#1E1E2E',
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnDisabled: {
    backgroundColor: '#333',
    shadowOpacity: 0,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  verdictArea: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  verdictTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 10,
    letterSpacing: 2,
  },
  personaVerdictBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 20,
    zIndex: 2,
  },
  verdictBubble: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6C63FF40',
    width: '100%',
    position: 'relative',
  },
  verdictContent: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    fontStyle: 'italic',
  },
  bubbleTail: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6C63FF40',
  },
  rewardBox: {
    backgroundColor: '#FFD70010',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD70040',
    marginBottom: 30,
    width: '100%',
  },
  rewardLabel: {
    color: '#8080A0',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 2,
  },
  rewardValue: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
  },
  closeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#8080A0',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  }
});
