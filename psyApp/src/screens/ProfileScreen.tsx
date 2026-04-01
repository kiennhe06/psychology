import React, { useEffect, useRef, useState } from 'react';
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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';

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
  const [activeTab, setActiveTab] = useState<'STATS' | 'VAULT'>('STATS');

  // Hòm Thư
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const xpProgress = game.maxXp > 0 ? game.xp / game.maxXp : 0;
  const completedQuizzes = game.completedQuizIds.length;
  const totalQuizzes = QUIZZES.length;
  const readEffects = game.readEffectIds.length;
  const totalEffects = PSY_EFFECTS.length;
  const bookmarkedEffects = PSY_EFFECTS.filter(e => game.bookmarkedEffectIds.includes(e.id));

  // --- Animation Refs ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Hiệu ứng Pulse nhẹ cho khung Avatar
  const avatarGlowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Kích hoạt animation khi đổi Tab
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 6, useNativeDriver: true })
    ]).start();
  }, [activeTab]);

  useEffect(() => {
    // Vòng lặp Pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarGlowAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(avatarGlowAnim, { toValue: 1, duration: 1500, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const handleLogout = () => {
    HapticFeedback.trigger('impactHeavy');
    Alert.alert('🚪 Đăng xuất', 'Bạn muốn rời khỏi văn phòng thám tử?', [
      { text: 'Ở lại', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => { game.logout(); navigation.replace('Login'); } }
    ]);
  };

  const switchTab = (tab: 'STATS' | 'VAULT') => {
    HapticFeedback.trigger('selection');
    setActiveTab(tab);
  };

  const handleSendFeedback = async () => {
    if (feedbackText.trim().length < 5) {
      Alert.alert('Lỗi', 'Sếp viết chi tiết xíu nữa nhé! (Ít nhất 5 ký tự)');
      return;
    }
    setIsSending(true);
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykbpeda';
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Tên Đặc Vụ': game.userName,
          'email': contactEmail ? contactEmail : undefined,
          'Email Kèm Theo': contactEmail || 'Đặc vụ này chọn ẩn danh',
          'Nội dung Mật thư': feedbackText,
          'Thời gian gửi': new Date().toLocaleString()
        })
      });
      if (response.ok) {
        setShowFeedback(false);
        setFeedbackText('');
        setContactEmail('');
        Alert.alert('Thành công', 'Mật thư đã đến tay Chỉ huy! 🕵️‍♂️💌');
        HapticFeedback.trigger('notificationSuccess');
      } else {
        Alert.alert('Hệ thống từ chối', 'Gửi thất bại, cổng kết nối chưa sẵn sàng.');
        HapticFeedback.trigger('notificationError');
      }
    } catch (error) {
      Alert.alert('Nhiễu sóng', 'Đường truyền đang gặp sự cố!');
      HapticFeedback.trigger('notificationError');
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenTelegram = () => {
    const telegramUrl = 'https://t.me/kien_nhe';
    Linking.openURL(telegramUrl).catch(() => {
      Alert.alert('Lỗi', 'Không thể khởi chạy link Telegram trên thiết bị này!');
    });
  };

  const handleBadgePress = (badge: typeof BADGES[0]) => {
    const unlocked = game.isBadgeUnlocked(badge.id);
    HapticFeedback.trigger('impactLight');
    Alert.alert(`${badge.emoji} ${badge.name}`, `${badge.description}\n\n📋 Điều kiện: ${badge.condition}\n\n${unlocked ? '✅ Đã đạt được!' : '🔒 Chưa đạt'}`);
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b', '#0B0F19']} style={styles.container}>
      <SafeAreaView style={{flex: 1}} edges={['top']}>
        <StatusBar barStyle="light-content" />

        {/* ── Compact Dashboard Header Glassmorphism ───────────────────────────── */}
        <View style={styles.dashboard}>
          <View style={styles.profileRow}>
            {/* Avatar Pulse Glow */}
            <View style={styles.avatarWrapper}>
              <Animated.View style={[styles.avatarGlowBase, { transform: [{ scale: avatarGlowAnim }] }]} />
              <View style={styles.avatarGlass}>
                <DrPsyAvatar emoji={game.activeDrPsySkin} size={60} />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{game.userName || 'Thám tử Psy'}</Text>
              <View style={styles.levelRow}>
                <LinearGradient colors={['#8b5cf6', '#6366f1']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.levelTag}>
                  <Text style={styles.levelTagText}>Cấp {game.level}</Text>
                </LinearGradient>
                <Text style={styles.xpLabelSmall}>{game.xp}/{game.maxXp} XP</Text>
              </View>
              {/* Neon XP Track */}
              <View style={styles.xpTrackMini}>
                <LinearGradient 
                  colors={['#c084fc', '#8b5cf6', '#4f46e5']} 
                  start={{x:0, y:0}} end={{x:1, y:0}} 
                  style={[styles.xpFillMini, { width: `${Math.max(xpProgress * 100, 5)}%` }]} 
                />
              </View>
            </View>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabSwitcher}>
            <TouchableOpacity style={[styles.tabItem, activeTab === 'STATS' && styles.tabItemActive]} onPress={() => switchTab('STATS')}>
              <Text style={[styles.tabItemText, activeTab === 'STATS' && styles.tabItemTextActive]}>📊 HỒ SƠ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabItem, activeTab === 'VAULT' && styles.tabItemActive]} onPress={() => switchTab('VAULT')}>
              <Text style={[styles.tabItemText, activeTab === 'VAULT' && styles.tabItemTextActive]}>🔐 KHO MẬT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {activeTab === 'STATS' ? (
              <View>
                {/* ── Thẻ Thám Tử ──────────────────────────────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>🪪 THẺ THÁM TỬ QUỐC TẾ</Text>
                </View>
                <PsyIdCard />

                {/* ── Stats Grid (Glass) ────────────────────────────────────── */}
                <View style={styles.statsLayout}>
                  <View style={styles.statMiniCard}>
                    <View style={styles.statIconWrap}><Text style={{ fontSize: 20 }}>🔥</Text></View>
                    <View>
                      <Text style={styles.statNum}>{game.streak}</Text>
                      <Text style={styles.statTag}>Chuỗi Tốt</Text>
                    </View>
                  </View>
                  <View style={styles.statMiniCard}>
                    <View style={styles.statIconWrap}><Text style={{ fontSize: 20 }}>💎</Text></View>
                    <View>
                      <Text style={styles.statNum}>{game.gems}</Text>
                      <Text style={styles.statTag}>Gems</Text>
                    </View>
                  </View>
                  <View style={styles.statMiniCard}>
                    <View style={styles.statIconWrap}><Text style={{ fontSize: 20 }}>📝</Text></View>
                    <View>
                      <Text style={styles.statNum}>{completedQuizzes}/{totalQuizzes}</Text>
                      <Text style={styles.statTag}>Nhiệm vụ</Text>
                    </View>
                  </View>
                  <View style={styles.statMiniCard}>
                    <View style={styles.statIconWrap}><Text style={{ fontSize: 20 }}>📚</Text></View>
                    <View>
                      <Text style={styles.statNum}>{readEffects}/{totalEffects}</Text>
                      <Text style={styles.statTag}>Hiệu ứng</Text>
                    </View>
                  </View>
                </View>

                {/* ── Yêu Thích (Bookmarks) - ĐÃ KHÔI PHỤC ────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>📌 BÍ KÍP TÂM LÝ YÊU THÍCH</Text>
                </View>
                {bookmarkedEffects.length === 0 ? (
                   <View style={styles.emptyCardLight}>
                     <Text style={styles.emptyTextLight}>Bạn chưa đánh dấu trái tim ♥️ hiệu ứng nào.\nKhám phá tại màn hình Khám Phá nhé!</Text>
                   </View>
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bookmarkScroll}>
                    {bookmarkedEffects.map(effect => (
                      <TouchableOpacity 
                        key={effect.id} 
                        style={[styles.bookCardLight, { borderLeftColor: effect.category === 'Xã hội' ? '#3b82f6' : effect.category === 'Cảm xúc' ? '#ec4899' : '#8b5cf6', borderLeftWidth: 4 }]}
                        onPress={() => {
                          HapticFeedback.trigger('impactLight');
                          navigation.navigate('Detail', { effect });
                        }}
                      >
                        <Text style={styles.bookEmoji}>{effect.category === 'Xã hội' ? '🤝' : effect.category === 'Cảm xúc' ? '♥️' : '🧠'}</Text>
                        <Text style={styles.bookTitle} numberOfLines={2}>{effect.title}</Text>
                        <Text style={styles.bookCategory}>{effect.category}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {/* ── Badges Section ───────────────────────────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>🎖️ HUY HIỆU DANH GIÁ</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeScroll}>
                  {BADGES.map(badge => {
                    const unlocked = game.isBadgeUnlocked(badge.id);
                    return (
                      <TouchableOpacity key={badge.id} style={[styles.badgeItem, unlocked && styles.badgeItemActive]} onPress={() => handleBadgePress(badge)}>
                        <Text style={[styles.badgeIcon, !unlocked && { opacity: 0.3 }]}>{badge.emoji}</Text>
                        {unlocked && <View style={styles.badgeCheck}><Text style={styles.badgeCheckIcon}>✓</Text></View>}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <View style={styles.vaultArea}>
                {/* ── Forbidden Archives ────────────────────────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>📂 HỒ SƠ VỤ ÁN TUYỆT MẬT</Text>
                </View>
                {FORBIDDEN_ARCHIVES.filter(a => game.isArchiveUnlocked(a.id)).length === 0 ? (
                  <View style={styles.emptyCardLight}>
                    <Text style={styles.emptyTextLight}>Sếp chưa có hồ sơ cấm nào. Hãy truy cập "Kho Mật" ở Shop (Dùng vàng) đổi nhé🗝️</Text>
                  </View>
                ) : (
                  <View style={styles.vaultGrid}>
                    {FORBIDDEN_ARCHIVES.filter(a => game.isArchiveUnlocked(a.id)).map(archive => (
                      <TouchableOpacity key={archive.id} style={styles.glassVaultCard} onPress={() => { HapticFeedback.trigger('impactLight'); navigation.navigate('ArchiveDetail', { archive }); }}>
                        <Text style={styles.vaultEmoji}>{archive.coverEmoji}</Text>
                        <Text style={styles.vaultItemTitle} numberOfLines={1}>{archive.title}</Text>
                        <Text style={styles.vaultItemSub}>{archive.caseCode}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* ── Psychometric Tests ────────────────────────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>🪞 PHÒNG TRẮC NGHIỆM BẢN NGÃ</Text>
                </View>
                <View style={styles.vaultGrid}>
                  {PSYCHOMETRIC_TESTS.map(test => {
                    const isUnlocked = game.isTestUnlocked(test.id);
                    return (
                      <TouchableOpacity key={test.id} style={[styles.glassVaultCard, !isUnlocked && { opacity: 0.5, borderColor: 'rgba(255,255,255,0.02)' }]} 
                        onPress={() => {
                          HapticFeedback.trigger('impactLight');
                          isUnlocked ? navigation.navigate('PsychometricTest', { test }) : Alert.alert('🔒 Bị khóa', 'Truy cập tab Hành Trình hoặc Shop để mở!')
                        }}
                      >
                        <Text style={styles.vaultEmoji}>{isUnlocked ? '🧠' : '🔒'}</Text>
                        <Text style={styles.vaultItemTitle} numberOfLines={1}>{test.title}</Text>
                        <Text style={[styles.vaultItemSub, { color: isUnlocked ? '#a78bfa' : '#64748b' }]}>
                          {isUnlocked ? 'BẮT ĐẦU PHÂN TÍCH' : 'CHƯA MỞ KHÓA'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* ── Real-world Missions ────────────────────────────────────────── */}
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>🛡️ NHIỆM VỤ THỰC TẾ TUẦN</Text>
                </View>
                {MISSIONS.map(mission => {
                  const isCompleted = game.isMissionCompleted(mission.id);
                  return (
                    <View key={mission.id} style={[styles.glassMissionCard, isCompleted && styles.missionCardCompleted]}>
                      <View style={styles.missionInfo}>
                        <Text style={[styles.missionTitle, isCompleted && { textDecorationLine: 'line-through', color: '#94a3b8' }]}>{mission.title}</Text>
                        <Text style={styles.missionDesc} numberOfLines={2}>{mission.description}</Text>
                      </View>
                      <TouchableOpacity style={[styles.missionBtn, isCompleted && styles.missionBtnDone]} 
                        onPress={() => {
                           HapticFeedback.trigger('impactLight');
                           isCompleted ? null : navigation.navigate('MissionReport', { missionId: mission.id })
                        }}>
                        <Text style={styles.missionBtnText}>{isCompleted ? '✓ ĐÃ HOÀN TẤT' : 'TIẾP NHẬN BÁO CÁO'}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* ── Footer ───────────────────────────────────────────────────── */}
            <View style={{height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 20, marginVertical: 10}}/>
            <View style={styles.psySay}>
              <Text style={styles.psySayText}>"Không có vụ án nào khó, chỉ có thám tử chưa đọc đủ sách tâm lý sếp ạ!"</Text>
            </View>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.actionBtnBlue} onPress={handleOpenTelegram}>
                <Text style={styles.actionBtnText}>✈️ TELEGRAM HỖ TRỢ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnDark} onPress={() => { HapticFeedback.trigger('impactLight'); setShowFeedback(true); }}>
                <Text style={styles.actionBtnTextDark}>✉️ GỬI BÁO CÁO MẬT</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutBtnGlass} onPress={handleLogout}>
              <Text style={styles.logoutBtnText}>🚪 ĐĂNG XUẤT THIẾT BỊ</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal Mật Thư Giữ Nguyên (Hoặc Glassmorphism sương sương) */}
      <Modal visible={showFeedback} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📩 TRẠM THƯ TÍN TUYỆT MẬT</Text>
            <Text style={styles.modalDesc}>Mọi chỉ thị của sếp sẽ được mã hóa và gửi thẳng đến điện thoại của Tổng Bộ Chỉ Huy.</Text>
            <TextInput style={styles.emailInput} placeholder="Bút danh hoặc Email của sếp..." placeholderTextColor="#64748b" value={contactEmail} onChangeText={setContactEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.feedbackInput} multiline placeholder="Sếp đang bận tâm điều gì? Lỗi App hay Góp ý tính năng mới?" placeholderTextColor="#64748b" value={feedbackText} onChangeText={setFeedbackText} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowFeedback(false)} disabled={isSending}>
                <Text style={styles.modalCancelText}>HỦY THƯ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalSendBtn, isSending && { opacity: 0.5 }]} onPress={handleSendFeedback} disabled={isSending}>
                <Text style={styles.modalSendText}>{isSending ? 'ĐANG DỊCH MÃ...' : 'PHÓNG THƯ'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  // Dashboard Header
  dashboard: {
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000', shadowOffset: { width:0, height:10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { width: 68, height: 68, justifyContent: 'center', alignItems: 'center' },
  avatarGlowBase: { position: 'absolute', width: 68, height: 68, borderRadius: 34, backgroundColor: 'rgba(139, 92, 246, 0.3)' },
  avatarGlass: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)'},
  profileInfo: { flex: 1, marginLeft: 16 },
  userName: { color: '#f8fafc', fontSize: 22, fontWeight: '900', marginBottom: 6, textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 6 },
  levelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  levelTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginRight: 10, shadowColor: '#8b5cf6', shadowOpacity: 0.5, shadowRadius: 5 },
  levelTagText: { color: '#fff', fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  xpLabelSmall: { color: '#94a3b8', fontSize: 13, fontWeight: '700' },
  xpTrackMini: { height: 8, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 4, width: '100%', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  xpFillMini: { height: '100%', borderRadius: 4 },

  // Tabs
  tabSwitcher: { flexDirection: 'row', marginTop: 24, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  tabItemActive: { backgroundColor: 'rgba(255,255,255,0.1)', shadowColor: '#8b5cf6', shadowOpacity: 0.2, shadowRadius: 5 },
  tabItemText: { color: '#64748b', fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  tabItemTextActive: { color: '#e2e8f0', textShadowColor: '#c084fc', textShadowRadius: 8 },

  scrollArea: { paddingVertical: 20 },

  // Vault / Missions
  vaultArea: { paddingBottom: 20 },
  glassVaultCard: { width: (SCREEN_WIDTH - 40 - 16) / 2, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  vaultGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 16, marginBottom: 24 },
  vaultEmoji: { fontSize: 36, marginBottom: 14, textShadowColor: 'rgba(255,255,255,0.3)', textShadowRadius: 10 },
  vaultItemTitle: { color: '#f8fafc', fontSize: 14, fontWeight: '800', textAlign: 'center', marginBottom: 6 },
  vaultItemSub: { color: '#94a3b8', fontSize: 11, fontWeight: '700', letterSpacing: 1 },

  glassMissionCard: { marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  missionCardCompleted: { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' },
  missionInfo: { flex: 1, marginRight: 14 },
  missionTitle: { color: '#f8fafc', fontSize: 15, fontWeight: '800', marginBottom: 6 },
  missionDesc: { color: '#94a3b8', fontSize: 13, lineHeight: 18, fontWeight: '500' },
  missionBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  missionBtnDone: { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' },
  missionBtnText: { color: '#e2e8f0', fontSize: 11, fontWeight: '900', textAlign: 'center' },

  // Stats Grid
  statsLayout: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 14, marginBottom: 30 },
  statMiniCard: { width: (SCREEN_WIDTH - 40 - 14) / 2, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  statIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'},
  statNum: { color: '#f8fafc', fontSize: 18, fontWeight: '900' },
  statTag: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },

  sectionHead: { paddingHorizontal: 24, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: '#8b5cf6', marginLeft: 20 },
  sectionTitle: { color: '#e2e8f0', fontSize: 13, fontWeight: '900', letterSpacing: 1.2 },

  badgeScroll: { paddingHorizontal: 20, gap: 14, marginBottom: 30 },
  badgeItem: { width: 70, height: 70, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  badgeItemActive: { backgroundColor: 'rgba(255, 215, 0, 0.08)', borderColor: 'rgba(255, 215, 0, 0.4)', shadowColor: '#FFD700', shadowOpacity: 0.3, shadowRadius: 10 },
  badgeIcon: { fontSize: 34 },
  badgeCheck: { position: 'absolute', top: -6, right: -6, backgroundColor: '#10b981', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#1e1b4b' },
  badgeCheckIcon: { color: '#fff', fontSize: 11, fontWeight: '900' },

  // Bookmarks - Dựng Lại Chuyên Mục Yêu thích
  bookmarkScroll: { paddingHorizontal: 20, gap: 14, marginBottom: 30 },
  bookCardLight: { width: 160, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  bookEmoji: { fontSize: 26, marginBottom: 10, textShadowColor: 'rgba(255,255,255,0.3)', textShadowRadius: 8 },
  bookTitle: { color: '#f8fafc', fontSize: 14, fontWeight: '800', marginBottom: 8, lineHeight: 20 },
  bookCategory: { color: '#a78bfa', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },

  emptyCardLight: { marginHorizontal: 20, padding: 24, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderStyle: 'dashed' },
  emptyTextLight: { color: '#8080A0', fontSize: 13, textAlign: 'center', lineHeight: 22, fontWeight: '600' },

  // Messages
  psySay: { marginHorizontal: 20, padding: 20, backgroundColor: 'transparent', marginBottom: 24 },
  psySayText: { color: '#94a3b8', fontSize: 14, fontStyle: 'italic', textAlign: 'center', lineHeight: 22 },

  // Action Buttons Bottom
  actionButtonsRow: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, gap: 14 },
  actionBtnBlue: { flex: 1, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3b82f6', shadowColor: '#3b82f6', shadowOpacity: 0.4, shadowRadius: 8 },
  actionBtnDark: { flex: 1, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  actionBtnTextDark: { color: '#e2e8f0', fontSize: 13, fontWeight: '900', letterSpacing: 1 },

  logoutBtnGlass: { marginHorizontal: 20, height: 52, borderRadius: 16, backgroundColor: 'rgba(239, 68, 68, 0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.4)' },
  logoutBtnText: { color: '#f87171', fontSize: 13, fontWeight: '900', letterSpacing: 1.5 },

  // Modals Mail Feedback
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: '#1e1b4b', borderRadius: 24, padding: 28, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.5)', shadowColor: '#8b5cf6', shadowOpacity: 0.2, shadowRadius: 20 },
  modalTitle: { color: '#f8fafc', fontSize: 17, fontWeight: '900', marginBottom: 8, textAlign: 'center', letterSpacing: 1 },
  modalDesc: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  emailInput: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 14, height: 50, paddingHorizontal: 18, color: '#fff', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', fontSize: 14 },
  feedbackInput: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 14, height: 120, padding: 18, color: '#fff', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', fontSize: 14, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalCancelBtn: { flex: 1, height: 48, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  modalCancelText: { color: '#94a3b8', fontSize: 13, fontWeight: '800' },
  modalSendBtn: { flex: 1, height: 48, backgroundColor: '#8b5cf6', justifyContent: 'center', alignItems: 'center', borderRadius: 14 },
  modalSendText: { color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
});
