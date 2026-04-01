import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Dimensions, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EffectModel } from '../data/effects';
import { useGame } from '../context/gameContext';
import DrPsyAvatar from '../components/DrPsyAvatar';
import { getRandomMessageByPersona } from '../data/drPsyMessages';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SHOP_ITEMS } from '../data/items';

type RootStackParamList = {
  Tabs: undefined;
  Detail: { effect: EffectModel };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Premium View Renderer ────────────────────────────────────────────────
const PremiumView: React.FC<{ effect: EffectModel; onBack: () => void }> = ({ effect, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const game = useGame();
  const isLocked = !game.isArchiveUnlocked(effect.id);
  const shopItem = SHOP_ITEMS.find(i => i.targetId === effect.id);
  const price = shopItem?.price || 500; // Mặc định 500 nếu không tìm thấy, thay vì 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleUnlock = () => {
    Alert.alert(
      'Mở khóa Hồ sơ mật',
      `Bạn có muốn dùng ${price} 💎 để giải mã toàn bộ hồ sơ này?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Mở khóa', 
          onPress: () => {
            if (game.spendGems(price)) {
              game.unlockArchive(effect.id);
              game.triggerCelebration({ type: 'purchase', itemEmoji: '🔓', itemName: effect.title });
            } else {
              Alert.alert('Không đủ tài nguyên', 'Ghé thăm Nhiệm vụ Hàng ngày hoặc Cửa hàng để tìm thêm 💎!');
            }
          }
        }
      ]
    );
  };

  const premium = effect.premiumData;

  return (
    <SafeAreaView style={styles.premiumContainer}>
      {/* Premium Header */}
      <View style={styles.premiumTopBar}>
        <TouchableOpacity style={styles.premiumBackButton} onPress={onBack}>
          <Text style={styles.premiumBackButtonText}>← Thoát Hồ Sơ</Text>
        </TouchableOpacity>
        <Text style={styles.premiumHeaderTag}>HỒ SƠ MẬT</Text>
      </View>

      <Animated.ScrollView 
        style={[styles.premiumScroll, { opacity: fadeAnim }]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.premiumTitleArea}>
          <Text style={styles.premiumTitle}>{effect.title}</Text>
          <Text style={styles.premiumSubtitle}>{effect.shortDescription}</Text>
        </View>

        {/* Core Lesson (Preview) */}
        <View style={styles.premiumSection}>
          <Text style={styles.premiumSectionHeading}>I. BẢN CHẤT TÂM LÝ</Text>
          <Text style={styles.premiumBodyText} numberOfLines={isLocked ? 3 : undefined}>
            {effect.fullLesson}
          </Text>
        </View>

        {isLocked ? (
          <View style={styles.lockedOverlay}>
            <View style={styles.blurGradientWrapper}>
              <View style={[styles.blurLayer, { opacity: 0.1, top: -30 }]} />
              <View style={[styles.blurLayer, { opacity: 0.3, top: -20 }]} />
              <View style={[styles.blurLayer, { opacity: 0.6, top: -10 }]} />
              <View style={[styles.blurLayer, { opacity: 1, top: 0, backgroundColor: '#0F0F0F', height: 400 }]} />
            </View>
            <View style={styles.lockedContent}>
              <Text style={styles.lockedIcon}>🔒</Text>
              <Text style={styles.lockedTitle}>HỒ SƠ BỊ NIÊM PHONG</Text>
              <Text style={styles.lockedDesc}>Nội dung còn lại chứa các phân tích chiến thuật, báo cáo lâm sàng và cách phòng ngừa tuyệt mật. Bạn cần chìa khóa để truy cập.</Text>
              <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock} activeOpacity={0.8}>
                <Text style={styles.unlockButtonText}>MỞ KHÓA NGAY ({price} 💎)</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* Expert Quotes */}
            {premium?.expertQuotes && premium.expertQuotes.length > 0 && (
              <View style={styles.quotesContainer}>
                {premium.expertQuotes.map((quote, idx) => (
                  <View key={idx} style={styles.quoteBlock}>
                    <Text style={styles.quoteMark}>"</Text>
                    <Text style={styles.quoteText}>{quote}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tactical Breakdown */}
            {premium?.tacticalBreakdown && (
              <View style={styles.premiumSection}>
                <Text style={styles.premiumSectionHeading}>II. PHÂN TÍCH CHIẾN THUẬT</Text>
                <View style={styles.tacticalGrid}>
                  {premium.tacticalBreakdown.map((t, i) => (
                    <View key={i} style={styles.tacticalItem}>
                      <Text style={styles.tacticalStep}>{t.step}</Text>
                      <Text style={styles.tacticalDesc}>{t.desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Secret Case Studies */}
            {premium?.caseStudies && (
              <View style={styles.premiumSection}>
                <Text style={styles.premiumSectionHeading}>III. HỒ SƠ VỤ ÁN / LÂM SÀNG</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.casesScroll}>
                  {premium.caseStudies.map((caseStudy, i) => (
                    <View key={i} style={styles.caseCard}>
                      <View style={styles.caseBadge}><Text style={styles.caseBadgeText}>TÀI LIỆU LƯU TRỮ</Text></View>
                      <Text style={styles.caseTitle}>{caseStudy.title}</Text>
                      <Text style={styles.caseContent}>{caseStudy.content}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Defense / Prevention */}
            <View style={styles.premiumSection}>
              <Text style={[styles.premiumSectionHeading, { color: '#4CAF50' }]}>IV. PHƯƠNG PHÁP PHÒNG VỆ</Text>
              <View style={styles.defenseBox}>
                <Text style={styles.defenseText}>{effect.prevention}</Text>
              </View>
            </View>

            <View style={styles.premiumFooter}>
              <Text style={styles.premiumFooterText}>Masterclass Hoàn Tất</Text>
              <View style={styles.premiumDivider} />
              
              {!game.isArchiveRead(effect.id) ? (
                <TouchableOpacity 
                  style={styles.completeLessonBtn} 
                  onPress={() => {
                    game.markArchiveRead(effect.id);
                    game.addXp(50);
                    game.triggerCelebration({ type: 'purchase', itemEmoji: '🎓', itemName: `Tốt nghiệp: ${effect.title}` });
                    onBack();
                  }}
                >
                  <Text style={styles.completeLessonBtnText}>XÁC NHẬN HOÀN THÀNH BÀI HỌC</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>✅ ĐÃ TỐT NGHIỆP HỌC PHẦN NÀY</Text>
                </View>
              )}
            </View>
            
            <View style={{ height: 100 }} />
          </>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// ─── Standard View Renderer ───────────────────────────────────────────────
const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { effect } = route.params;
  const game = useGame();

  const isBookmarked = game.isBookmarked(effect.id);
  const tip = useMemo(() => getRandomMessageByPersona(game.activePersona, 'tips'), [game.activePersona]);

  // Map persona to emoji for avatar
  const personaEmoji = React.useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  useEffect(() => {
    game.markEffectRead(effect.id);
  }, [effect.id]);

  if (effect.isPremium) {
    return <PremiumView effect={effect} onBack={() => navigation.goBack()} />;
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      {effect.image ? (
        <Image source={effect.image} style={styles.heroImage} resizeMode="cover" />
      ) : (
        <View style={styles.placeholderHeader} />
      )}

      {/* Back + Bookmark buttons */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bookmarkButton, isBookmarked && styles.bookmarkButtonActive]}
          onPress={() => game.toggleBookmark(effect.id)}
        >
          <Text style={styles.bookmarkIcon}>{isBookmarked ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{effect.category}</Text>
        </View>

        <Text style={styles.title}>{effect.title}</Text>
        <Text style={styles.shortDescription}>{effect.shortDescription}</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Định nghĩa</Text>
          <Text style={styles.content}>{effect.fullLesson}</Text>
        </View>

        {effect.origin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Nguồn gốc</Text>
            <Text style={styles.content}>{effect.origin}</Text>
          </View>
        )}

        {effect.famousExperiment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧪 Thí nghiệm kinh điển</Text>
            <Text style={styles.content}>{effect.famousExperiment}</Text>
          </View>
        )}

        {effect.neuroImpact && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧠 Tác động thần kinh học</Text>
            <Text style={styles.content}>{effect.neuroImpact}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 Ví dụ thực tế</Text>
          <Text style={styles.content}>{effect.example}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡️ Cách phòng tránh / Áp dụng</Text>
          <Text style={styles.content}>{effect.prevention}</Text>
        </View>

        {/* Dr. Psy Tip Card */}
        <View style={styles.drPsyCard}>
          <View style={styles.drPsyHeader}>
            <DrPsyAvatar emoji={personaEmoji} size={28} style={styles.drPsyAvatar} />
            <Text style={styles.drPsyName}>DR. PSY ({game.activePersona === 'killer' ? 'Sát thủ' : (game.activePersona === 'philosopher' ? 'Triết gia' : 'Tâm lý')})</Text>
          </View>
          <Text style={styles.drPsyTip}>{tip}</Text>
        </View>

        <View style={styles.standardFooter}>
          {!game.isArchiveRead(effect.id) ? (
            <TouchableOpacity 
              style={styles.standardCompleteBtn} 
              onPress={() => {
                game.markArchiveRead(effect.id);
                game.addXp(30);
                Alert.alert('Chúc mừng thám tử!', 'Bạn đã hấp thụ xong kiến thức bài học này. Tiếp tục phát huy nhé!');
                navigation.goBack();
              }}
            >
              <Text style={styles.standardCompleteBtnText}>HOÀN THÀNH BÀI HỌC (+30 XP)</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.standardDoneBadge}>
              <Text style={styles.standardDoneText}>✨ Đã thu nạp kiến thức</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  // --- Standard Styles ---
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  heroImage: { width: '100%', height: 300 },
  placeholderHeader: { width: '100%', height: 100, backgroundColor: '#1A1A1A' },
  topBar: {
    position: 'absolute', top: 50, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,
  },
  backButton: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  backButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  bookmarkButton: { backgroundColor: 'rgba(0,0,0,0.6)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  bookmarkButtonActive: { backgroundColor: 'rgba(255, 100, 100, 0.3)' },
  bookmarkIcon: { fontSize: 20 },
  contentContainer: { padding: 24, paddingBottom: 60, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#121212', marginTop: -24 },
  categoryChip: { alignSelf: 'flex-start', backgroundColor: '#6C63FF20', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, marginBottom: 12 },
  categoryText: { color: '#6C63FF', fontSize: 13, fontWeight: '700' },
  title: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', lineHeight: 40, marginBottom: 12 },
  shortDescription: { fontSize: 18, fontWeight: '500', color: '#A0A0A0', marginBottom: 20, lineHeight: 28 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#4DA8DA', marginBottom: 12 },
  content: { fontSize: 16, color: '#E0E0E0', lineHeight: 26 },
  drPsyCard: { backgroundColor: '#1A1A2E', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#6C63FF40', marginTop: 8 },
  drPsyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  drPsyAvatar: { marginRight: 8 },
  drPsyName: { color: '#6C63FF', fontSize: 15, fontWeight: '700' },
  drPsyTip: { color: '#D0D0E0', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  // --- Premium Styles ---
  premiumContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  premiumTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD70030',
  },
  premiumBackButton: {
    padding: 8,
  },
  premiumBackButtonText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '600',
  },
  premiumHeaderTag: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumScroll: {
    padding: 20,
  },
  premiumTitleArea: {
    marginBottom: 30,
    marginTop: 10,
  },
  premiumTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFDF00',
    lineHeight: 46,
    textTransform: 'uppercase',
    marginBottom: 16,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  premiumSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  quotesContainer: {
    marginBottom: 40,
    backgroundColor: '#181812',
    padding: 24,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  quoteBlock: {
    marginBottom: 16,
  },
  quoteMark: {
    fontSize: 40,
    color: '#FFD700',
    opacity: 0.5,
    fontFamily: 'serif',
    marginBottom: -20,
  },
  quoteText: {
    fontSize: 16,
    color: '#EFEFEF',
    lineHeight: 26,
    fontFamily: 'serif',
    fontStyle: 'italic',
    paddingLeft: 12,
  },
  premiumSection: {
    marginBottom: 40,
  },
  premiumSectionHeading: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD70020',
    paddingBottom: 8,
  },
  premiumBodyText: {
    fontSize: 17,
    color: '#E0E0E0',
    lineHeight: 28,
  },
  tacticalGrid: {
    gap: 16,
  },
  tacticalItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#FFD700',
  },
  tacticalStep: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  tacticalDesc: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 24,
  },
  casesScroll: {
    gap: 16,
    paddingRight: 40,
  },
  caseCard: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#1A1814',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD70040',
  },
  caseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  caseBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  caseTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  caseContent: {
    color: '#D0D0D0',
    fontSize: 15,
    lineHeight: 24,
  },
  defenseBox: {
    backgroundColor: '#1A2A1A',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF5050',
  },
  defenseText: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 26,
  },
  premiumFooter: {
    alignItems: 'center',
    marginTop: 20,
  },
  premiumFooterText: {
    color: '#FFD700',
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10,
  },
  premiumDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#FFD700',
  },
  // --- Locked Overlay Styles ---
  lockedOverlay: {
    position: 'relative',
    marginTop: -20,
    minHeight: 300,
  },
  blurGradientWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    zIndex: 1,
  },
  blurLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#0F0F0F',
  },
  lockedContent: {
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  lockedIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  lockedTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedDesc: {
    fontSize: 15,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  unlockButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    width: '100%',
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  completeLessonBtn: {
    backgroundColor: '#FFD700',
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  completeLessonBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  completedBadge: {
    marginTop: 20,
    backgroundColor: '#4CAF5020',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  completedBadgeText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '800',
  },
  standardFooter: {
    marginTop: 40,
    alignItems: 'center',
  },
  standardCompleteBtn: {
    backgroundColor: '#4DA8DA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  standardCompleteBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  standardDoneBadge: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4DA8DA40',
  },
  standardDoneText: {
    color: '#4DA8DA',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
  }
});
