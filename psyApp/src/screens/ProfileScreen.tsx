import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  Modal,
  TextInput,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/gameContext';
import { BADGES } from '../data/badges';
import { QUIZZES } from '../data/quizzes';
import { PSY_EFFECTS } from '../data/effects';
import DrPsyAvatar from '../components/DrPsyAvatar';
import PsyIdCard from '../components/PsyIdCard';
import { FORBIDDEN_ARCHIVES } from '../data/forbiddenArchives';
import { PSYCHOMETRIC_TESTS } from '../data/psychometricTests';
import { MISSIONS } from '../data/missions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const [activeTab, setActiveTab] = React.useState<'STATS' | 'VAULT'>('STATS');

  // States cho Hòm Thư
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);

  const xpProgress = game.maxXp > 0 ? game.xp / game.maxXp : 0;
  const completedQuizzes = game.completedQuizIds.length;
  const totalQuizzes = QUIZZES.length;
  const readEffects = game.readEffectIds.length;
  const totalEffects = PSY_EFFECTS.length;
  const bookmarkedEffects = PSY_EFFECTS.filter(e => game.bookmarkedEffectIds.includes(e.id));

  const handleLogout = () => {
    Alert.alert('🚪 Đăng xuất', 'Bạn muốn rời khỏi văn phòng thám tử?', [
      { text: 'Ở lại', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => { game.logout(); navigation.replace('Login'); } }
    ]);
  };

  const handleSendFeedback = async () => {
    if (feedbackText.trim().length < 5) {
      Alert.alert('Lỗi', 'Sếp viết chi tiết xíu nữa nhé! (Ít nhất 5 ký tự)');
      return;
    }
    setIsSending(true);

    try {
      /* 
       * BƯỚC QUAN TRỌNG NHẤT:
       * Thay 'thay_id_cua_sep_vao_day' bằng cái mã rác mà Formspree cấp cho sếp
       * Ví dụ: 'https://formspree.io/f/mxyqgwnj' (mxyqgwnj chính là ID)
       */
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykbpeda';

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Tên Đặc Vụ': game.userName,
          'email': contactEmail ? contactEmail : undefined, // Formspree dùng trường 'email' này để gán chức năng Nút Reply (Trả lời)
          'Email Kèm Theo': contactEmail || 'Đặc vụ này chọn ẩn danh',
          'Nội dung Mật thư': feedbackText,
          'Thời gian gửi': new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setShowFeedback(false);
        setFeedbackText('');
        setContactEmail('');
        Alert.alert('Xác nhận', 'Mật thư đã nằm gọn trong hộp thư Email của sếp! 🕵️‍♂️💌');
      } else {
        // Nếu sếp quên chưa đổi ID Formspree
        Alert.alert('Hệ thống từ chối', 'Sếp chưa cấu hình ID Formspree! Sếp vui lòng đọc hướng dẫn để điền mã nhé.');
      }
    } catch (error) {
      console.log('Lỗi mạng:', error);
      Alert.alert('Nhiễu sóng', 'Đường truyền đang gặp sự cố, vui lòng thử lại sau!');
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenTelegram = () => {
    const telegramUrl = 'https://t.me/kien_nhe';

    // Bỏ qua bước kiểm tra canOpenURL để tránh bị hệ điều hành chặn
    Linking.openURL(telegramUrl).catch(err => {
      console.log('Lỗi mở ứng dụng:', err);
      Alert.alert('Lỗi', 'Không thể khởi chạy link Telegram trên thiết bị này!');
    });
  };

  const handleBadgePress = (badge: typeof BADGES[0]) => {
    const unlocked = game.isBadgeUnlocked(badge.id);
    Alert.alert(`${badge.emoji} ${badge.name}`, `${badge.description}\n\n📋 Điều kiện: ${badge.condition}\n\n${unlocked ? '✅ Đã đạt được!' : '🔒 Chưa đạt'}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* ── Compact Dashboard Header ─────────────────────────────────── */}
      <View style={styles.dashboard}>
        <View style={styles.profileRow}>
          <View style={styles.avatarGlow}>
            <DrPsyAvatar emoji={game.activeDrPsySkin} size={60} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{game.userName || 'Thám tử Psy'}</Text>
            <View style={styles.levelRow}>
              <View style={styles.levelTag}>
                <Text style={styles.levelTagText}>Cấp {game.level}</Text>
              </View>
              <Text style={styles.xpLabelSmall}>{game.xp}/{game.maxXp} XP</Text>
            </View>
            <View style={styles.xpTrackMini}>
              <View style={[styles.xpFillMini, { width: `${xpProgress * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'STATS' && styles.tabItemActive]}
            onPress={() => setActiveTab('STATS')}
          >
            <Text style={[styles.tabItemText, activeTab === 'STATS' && styles.tabItemTextActive]}>📊 HỒ SƠ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'VAULT' && styles.tabItemActive]}
            onPress={() => setActiveTab('VAULT')}
          >
            <Text style={[styles.tabItemText, activeTab === 'VAULT' && styles.tabItemTextActive]}>🔐 KHO MẬT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>

        {activeTab === 'STATS' ? (
          <>
            {/* ── Thẻ Thám Tử ──────────────────────────────────────────────── */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>🪪 THẺ THÁM TỬ</Text>
            </View>
            <PsyIdCard />

            {/* ── Stats Grid (Compact) ────────────────────────────────────── */}
            <View style={styles.statsLayout}>
              {/* ... (Existing stats code) */}
              <View style={styles.statMiniCard}>
                <Text style={{ fontSize: 20 }}>🔥</Text>
                <View>
                  <Text style={styles.statNum}>{game.streak}</Text>
                  <Text style={styles.statTag}>Chuỗi</Text>
                </View>
              </View>
              <View style={styles.statMiniCard}>
                <Text style={{ fontSize: 20 }}>💎</Text>
                <View>
                  <Text style={styles.statNum}>{game.gems}</Text>
                  <Text style={styles.statTag}>Đá quý</Text>
                </View>
              </View>
              <View style={styles.statMiniCard}>
                <Text style={{ fontSize: 20 }}>📝</Text>
                <View>
                  <Text style={styles.statNum}>{completedQuizzes}/{totalQuizzes}</Text>
                  <Text style={styles.statTag}>Quizzes</Text>
                </View>
              </View>
              <View style={styles.statMiniCard}>
                <Text style={{ fontSize: 20 }}>📖</Text>
                <View>
                  <Text style={styles.statNum}>{readEffects}/{totalEffects}</Text>
                  <Text style={styles.statTag}>Hiệu ứng</Text>
                </View>
              </View>
            </View>

            {/* ── Badges Section ───────────────────────────────────────────── */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>🏅 HUY HIỆU DANH GIÁ</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeScroll}>
              {BADGES.map(badge => {
                const unlocked = game.isBadgeUnlocked(badge.id);
                return (
                  <TouchableOpacity
                    key={badge.id}
                    style={[styles.badgeItem, unlocked && styles.badgeItemActive]}
                    onPress={() => handleBadgePress(badge)}
                  >
                    <Text style={[styles.badgeIcon, !unlocked && { opacity: 0.2 }]}>{badge.emoji}</Text>
                    {unlocked && <View style={styles.badgeCheck}><Text style={styles.badgeCheckIcon}>✓</Text></View>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <View style={styles.vaultArea}>
            {/* ── Forbidden Archives ────────────────────────────────────────── */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>📑 HỒ SƠ TUYỆT MẬT</Text>
            </View>
            {FORBIDDEN_ARCHIVES.filter(a => game.isArchiveUnlocked(a.id)).length === 0 ? (
              <View style={styles.emptyVaultCard}>
                <Text style={styles.emptyVaultText}>Sếp chưa có hồ sơ cấm nào. Hãy vào Shop mua "Chìa khóa" nhé! 🗝️</Text>
              </View>
            ) : (
              <View style={styles.vaultGrid}>
                {FORBIDDEN_ARCHIVES.filter(a => game.isArchiveUnlocked(a.id)).map(archive => (
                  <TouchableOpacity
                    key={archive.id}
                    style={styles.archiveVaultCard}
                    onPress={() => navigation.navigate('ArchiveDetail', { archive })}
                  >
                    <Text style={styles.vaultEmoji}>{archive.coverEmoji}</Text>
                    <Text style={styles.vaultItemTitle} numberOfLines={1}>{archive.title}</Text>
                    <Text style={styles.vaultItemSub}>{archive.caseCode}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* ── Psychometric Tests ────────────────────────────────────────── */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>🪞 TRẮC NGHIỆM BẢN NGÃ</Text>
            </View>
            <View style={styles.vaultGrid}>
              {PSYCHOMETRIC_TESTS.map(test => {
                const isUnlocked = game.isTestUnlocked(test.id);
                return (
                  <TouchableOpacity
                    key={test.id}
                    style={[styles.archiveVaultCard, !isUnlocked && { opacity: 0.5 }]}
                    onPress={() => isUnlocked ? navigation.navigate('PsychometricTest', { test }) : Alert.alert('🔒 Bị khóa', 'Sếp cần dùng Gems mua vĩnh viễn bài trắc nghiệm này trong Shop!')}
                  >
                    <Text style={styles.vaultEmoji}>{isUnlocked ? '🧠' : '🔒'}</Text>
                    <Text style={styles.vaultItemTitle} numberOfLines={1}>{test.title}</Text>
                    <Text style={[styles.vaultItemSub, { color: isUnlocked ? '#4CAF50' : '#888' }]}>
                      {isUnlocked ? 'BẮT ĐẦU NGAY' : 'CHƯA MỞ KHÓA'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Real-world Missions ────────────────────────────────────────── */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>🛡️ NHIỆM VỤ THỰC ĐỊA</Text>
            </View>
            {MISSIONS.map(mission => {
              const isCompleted = game.isMissionCompleted(mission.id);
              return (
                <View key={mission.id} style={[styles.missionCard, isCompleted && styles.missionCardCompleted]}>
                  <View style={styles.missionInfo}>
                    <Text style={styles.missionTitle}>{mission.title}</Text>
                    <Text style={styles.missionDesc} numberOfLines={2}>{mission.description}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.missionBtn, isCompleted && styles.missionBtnDone]}
                    onPress={() => isCompleted ? null : navigation.navigate('MissionReport', { missionId: mission.id })}
                  >
                    <Text style={styles.missionBtnText}>{isCompleted ? '✓ XONG' : 'XÁC NHẬN'}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <View style={styles.psySay}>
          <Text style={styles.psySayText}>"Mỗi bước đi là một sự khai mở. Văn phòng thám tử tin tưởng sếp!"</Text>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#229ED9' }]} onPress={handleOpenTelegram}>
            <Text style={styles.actionBtnText}>✈️ CHAT TELEGRAM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#1E1E2E', borderColor: '#6C63FF40', borderWidth: 1 }]} onPress={() => setShowFeedback(true)}>
            <Text style={[styles.actionBtnText, { color: '#8982FF' }]}>✉️ GỬI MẬT THƯ</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>🚪 RỜI KHỎI VĂN PHÒNG</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Modal Mật Thư */}
      <Modal visible={showFeedback} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📩 HÒM THƯ TUYỆT MẬT</Text>
            <Text style={styles.modalDesc}>Mọi thông tin của sếp sẽ được mã hóa và truyền thẳng về trung tâm đầu não (Máy chủ nội bộ).</Text>

            <TextInput
              style={styles.emailInput}
              placeholder="Gửi Email của sếp (để nhận thư hồi đáp)..."
              placeholderTextColor="#666"
              value={contactEmail}
              onChangeText={setContactEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.feedbackInput}
              multiline
              placeholder="Sếp có gặp lỗi gì, hay muốn thêm tính năng gì không? Hãy góp ý nhé..."
              placeholderTextColor="#666"
              value={feedbackText}
              onChangeText={setFeedbackText}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowFeedback(false)}
                disabled={isSending}
              >
                <Text style={styles.modalCancelText}>HỦY BỎ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalSendBtn, isSending && { opacity: 0.5 }]}
                onPress={handleSendFeedback}
                disabled={isSending}
              >
                <Text style={styles.modalSendText}>{isSending ? 'ĐANG MÃ HÓA...' : 'TRUYỀN TIN'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  dashboard: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#121220',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E2E',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGlow: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C63FF40',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  levelTag: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 10,
  },
  levelTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },
  xpLabelSmall: {
    color: '#8080A0',
    fontSize: 11,
    fontWeight: '700',
  },
  xpTrackMini: {
    height: 6,
    backgroundColor: '#1E1E2E',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  xpFillMini: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },

  // Tab Switcher
  tabSwitcher: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#0F0F1A',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#1E1E2E',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabItemActive: {
    backgroundColor: '#6C63FF20',
    borderWidth: 1,
    borderColor: '#6C63FF40',
  },
  tabItemText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tabItemTextActive: {
    color: '#6C63FF',
  },

  scrollArea: {
    paddingVertical: 16,
  },

  // Vault
  vaultArea: {
    paddingBottom: 20,
  },
  emptyVaultCard: {
    marginHorizontal: 16,
    padding: 30,
    backgroundColor: '#121220',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1E2E',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  emptyVaultText: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  vaultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  archiveVaultCard: {
    width: (SCREEN_WIDTH - 32 - 12) / 2,
    backgroundColor: '#121220',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  vaultEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  vaultItemTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  vaultItemSub: {
    color: '#555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Missions
  missionCard: {
    marginHorizontal: 16,
    backgroundColor: '#121220',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  missionCardCompleted: {
    borderColor: '#4CAF5040',
    opacity: 0.8,
  },
  missionInfo: {
    flex: 1,
    marginRight: 10,
  },
  missionTitle: {
    color: '#E0E0E0',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  missionDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
  },
  missionBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  missionBtnDone: {
    backgroundColor: '#1A3A1A',
  },
  missionBtnText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },


  // Stats
  statsLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },
  statMiniCard: {
    width: (SCREEN_WIDTH - 32 - 10) / 2,
    backgroundColor: '#121220',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  statNum: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  statTag: {
    color: '#666',
    fontSize: 11,
    fontWeight: '700',
  },

  // Sections
  sectionHead: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // Badges
  badgeScroll: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  badgeItem: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#121220',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1E2E',
  },
  badgeItemActive: {
    borderColor: '#FFD70040',
    backgroundColor: '#1A1A0A',
  },
  badgeIcon: {
    fontSize: 30,
  },
  badgeCheck: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#4CAF50',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121220',
  },
  badgeCheckIcon: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },

  // Bookmarks
  bookmarkScroll: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  bookCard: {
    width: 150,
    backgroundColor: '#121220',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  bookEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  bookTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 18,
  },
  bookCategory: {
    color: '#6C63FF',
    fontSize: 11,
    fontWeight: '800',
  },
  emptyBook: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#121220',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    color: '#666',
    fontSize: 12,
  },

  // Message
  psySay: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#121220',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6C63FF20',
    marginBottom: 20,
  },
  psySayText: {
    color: '#8080A0',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Logout
  logoutBtn: {
    marginHorizontal: 16,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#121220',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF525230',
  },
  logoutBtnText: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // Action Buttons
  actionButtonsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#161625',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#6C63FF50',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  modalDesc: {
    color: '#A0A0B0',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  emailInput: {
    backgroundColor: '#121220',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    color: '#FFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A3E',
    fontSize: 14,
  },
  feedbackInput: {
    backgroundColor: '#121220',
    borderRadius: 12,
    height: 120,
    padding: 16,
    color: '#FFF',
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A3E',
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A3E',
  },
  modalCancelText: {
    color: '#888',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },
  modalSendBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  modalSendText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },
});
