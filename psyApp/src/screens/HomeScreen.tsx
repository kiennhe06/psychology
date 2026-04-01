import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  TextInput, 
  ScrollView, 
  Dimensions, 
  Animated 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, Settings } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';

import { PSY_EFFECTS, EffectModel } from '../data/effects';
import { useGame } from '../context/gameContext';
import { getRandomMessageByPersona } from '../data/drPsyMessages';
import DrPsyAvatar from '../components/DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RootStackParamList = {
  Tabs: undefined;
  Detail: { effect: EffectModel };
  Analyzer: undefined;
  Settings: undefined;
  SwipeGame: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const CATEGORIES = ["Tất cả", "Nhận thức", "Cảm xúc", "Xã hội"];

// --- Component Thẻ Animated (Staggered Animation) ---
const AnimatedEffectCard = ({ item, index, navigation, game, personaColors }: { item: EffectModel, index: number, navigation: any, game: any, personaColors: any }) => {
  const isLocked = item.isPremium && !game.isArchiveUnlocked(item.id);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Delay thời gian bắt đầu dựa trên thứ tự index (Staggered Effect)
    const delay = index * 80;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 7, delay, useNativeDriver: true })
    ]).start();
  }, [index]);

  const handlePress = () => {
    HapticFeedback.trigger('impactLight');
    navigation.navigate('Detail', { effect: item });
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity style={styles.glassCard} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.cardImageContainer}>
          {item.image && <Image source={item.image} style={styles.cardImage} resizeMode="cover" />}
          {/* Lớp gradient đè dưới để bóng đổ êm mượt vào phần text */}
          <LinearGradient colors={['transparent', 'rgba(18, 18, 32, 0.9)', '#121220']} style={styles.imageGradientOverlay} />
          {isLocked && (
            <View style={styles.lockOverlayGlass}>
              <Text style={{fontSize: 24, textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 10}}>🔒</Text>
            </View>
          )}
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <View style={[styles.categoryBadgeGlass, { borderColor: item.category === 'Nhận thức' ? '#BA68C8' : (item.category === 'Cảm xúc' ? '#F06292' : '#64B5F6') }]}>
            <Text style={[styles.categoryText, { color: item.category === 'Nhận thức' ? '#E1BEE7' : (item.category === 'Cảm xúc' ? '#F8BBD0' : '#BBDEFB') }]}>
              {item.category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Màn hình Chính HomeScreen ---
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [greeting, setGreeting] = useState('');

  // Animation Refs
  const avatarGlowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setGreeting(getRandomMessageByPersona(game.activePersona, 'greetings'));
    game.checkAndUpdateStreak();
  }, [game.activePersona]);

  useEffect(() => {
    // Hiệu ứng nhịp đập cho thẻ Dr. Psy
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarGlowAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(avatarGlowAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const personaEmoji = useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    if (game.activePersona === 'sherlock') return '🕵️‍♂️';
    if (game.activePersona === 'mystic') return '🔮';
    if (game.activePersona === 'mastermind') return '🕴️';
    if (game.activePersona === 'manipulator') return '⛓️';
    return '🐱';
  }, [game.activePersona]);

  const personaColors = useMemo(() => {
    switch (game.activePersona) {
      case 'killer': return { glow: 'rgba(229, 57, 53, 0.4)', border: 'rgba(229, 57, 53, 0.5)', bg: 'rgba(30, 20, 20, 0.6)', accent: '#FF5252' };
      case 'philosopher': return { glow: 'rgba(67, 160, 71, 0.4)', border: 'rgba(67, 160, 71, 0.5)', bg: 'rgba(20, 30, 20, 0.6)', accent: '#69F0AE' };
      case 'sherlock': return { glow: 'rgba(212, 175, 55, 0.4)', border: 'rgba(212, 175, 55, 0.5)', bg: 'rgba(30, 26, 20, 0.6)', accent: '#FFD700' };
      case 'mystic': return { glow: 'rgba(126, 87, 194, 0.4)', border: 'rgba(126, 87, 194, 0.5)', bg: 'rgba(23, 20, 30, 0.6)', accent: '#B388FF' };
      case 'mastermind': return { glow: 'rgba(117, 117, 117, 0.4)', border: 'rgba(117, 117, 117, 0.5)', bg: 'rgba(19, 19, 19, 0.6)', accent: '#EEEEEE' };
      case 'manipulator': return { glow: 'rgba(255, 87, 34, 0.4)', border: 'rgba(255, 87, 34, 0.5)', bg: 'rgba(30, 20, 20, 0.6)', accent: '#FF8A65' };
      default: return { glow: 'rgba(108, 99, 255, 0.4)', border: 'rgba(108, 99, 255, 0.3)', bg: 'rgba(255, 255, 255, 0.03)', accent: '#8982FF' };
    }
  }, [game.activePersona]);

  const filteredEffects = useMemo(() => {
    return PSY_EFFECTS.filter(effect => {
      const matchesSearch = effect.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            effect.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesCategory = true;
      if (activeCategory !== 'Tất cả') {
        matchesCategory = effect.category === activeCategory;
      }
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b', '#0B0F19']} style={styles.container}>
      <FlatList
        data={filteredEffects}
        // Force Re-render FlatList items on category change or search to re-trigger Staggered Animation
        keyExtractor={(item) => activeCategory + searchQuery + item.id} 
        renderItem={({ item, index }) => <AnimatedEffectCard item={item} index={index} navigation={navigation} game={game} personaColors={personaColors} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* ── Thẻ Lời Thỉnh Cầu DR. PSY (Glassmorphism & Pulse) ── */}
            <View style={[styles.briefingCardGlass, { borderColor: personaColors.border, backgroundColor: personaColors.bg, shadowColor: personaColors.accent }]}>
               <View style={styles.briefingHeader}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* Ring Pulse bao quanh Avatar */}
                    <View style={styles.avatarRelWrap}>
                       <Animated.View style={[styles.avatarGlowRing, { backgroundColor: personaColors.glow, transform: [{ scale: avatarGlowAnim }] }]} />
                       <View style={{backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 24, borderWidth: 1, borderColor: personaColors.border, padding: 2}}>
                         <DrPsyAvatar emoji={personaEmoji} size={42} />
                       </View>
                    </View>
                    <View style={styles.briefingInfo}>
                       <Text style={[styles.drNameNeon, { color: personaColors.accent, textShadowColor: personaColors.glow }]}>
                         DR. PSY (Giảng viên: {
                         game.activePersona === 'killer' ? 'Sát thủ' : 
                         (game.activePersona === 'philosopher' ? 'Triết gia' : 
                         (game.activePersona === 'sherlock' ? 'Sherlock' : 
                         (game.activePersona === 'mystic' ? 'Huyền bí' : 
                         (game.activePersona === 'mastermind' ? 'Bậc thầy' : 
                         (game.activePersona === 'manipulator' ? 'Kẻ giật dây' : 'Mặc định')))))
                       })</Text>
                       <Text style={styles.briefingStatus}>● ĐANG KẾT NỐI TÂM TRÍ</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.settingsBtnGlass} onPress={() => { HapticFeedback.trigger('impactLight'); navigation.navigate('Settings'); }}>
                    <Settings color={personaColors.accent} size={22} />
                  </TouchableOpacity>
               </View>
               <View style={[styles.bubbleGlass, { borderLeftColor: personaColors.accent }]}>
                  <Text style={[styles.greetingText, { color: '#E2E8F0' }]}>{greeting}</Text>
               </View>
            </View>

            {/* ── Tiêu đề Neon ── */}
            <View style={styles.headerArea}>
              <Text style={styles.headerTitleNeon}>Hành Trình Tâm Lý</Text>
              <Text style={styles.subtitleGlass}>Khám phá góc khuất của tâm trí</Text>
            </View>

            {/* ── Search Bar Glass ── */}
            <View style={styles.searchContainerGlass}>
              <Search color="#94A3B8" size={18} style={styles.searchIcon} />
              <TextInput style={styles.searchInput} placeholder="Tìm kiếm hiệu ứng..." placeholderTextColor="#64748B" value={searchQuery} onChangeText={setSearchQuery} />
            </View>

            {/* ── Nút Lọc Thể loại (Pill Filters Neon) ── */}
            <View style={styles.filtersWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <TouchableOpacity key={category} 
                      style={[styles.chipGlass, isActive && styles.chipActiveNeon]} 
                      onPress={() => { HapticFeedback.trigger('impactLight'); setActiveCategory(category); }}
                    >
                      <Text style={[styles.chipTextGlass, isActive && styles.chipTextActiveNeon]}>{category}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            
            <View style={styles.sectionDivider}>
               <Text style={styles.sectionLabelNeon}>HỒ SƠ KHẢ DỤNG</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{fontSize: 40, marginBottom: 12}}>🛸</Text>
            <Text style={styles.emptyTextGlass}>Radar không quét thấy kết quả nào trong vũ trụ tâm lý hiện tại.</Text>
          </View>
        }
      />

      {/* FAB: AI Analyzer (Floating Bubble Neon) */}
      <TouchableOpacity style={styles.fabNeon} onPress={() => { HapticFeedback.trigger('impactHeavy'); navigation.navigate('Analyzer'); }} activeOpacity={0.85}>
        <LinearGradient colors={['#8b5cf6', '#4f46e5']} style={styles.fabGradientFill}>
           <Text style={styles.fabText}>🤖</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  
  // Dr Psy Briefing Glass
  briefingCardGlass: {
    marginHorizontal: 16, padding: 18, borderRadius: 24, marginTop: 10, marginBottom: 20,
    borderWidth: 1, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 5,
  },
  briefingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, justifyContent: 'space-between' },
  avatarRelWrap: { width: 52, height: 52, justifyContent: 'center', alignItems: 'center' },
  avatarGlowRing: { position: 'absolute', width: 52, height: 52, borderRadius: 26 },
  briefingInfo: { marginLeft: 14 },
  drNameNeon: { fontSize: 11, fontWeight: '900', letterSpacing: 1, textShadowRadius: 8 },
  briefingStatus: { color: '#10B981', fontSize: 9, fontWeight: '900', marginTop: 4, letterSpacing: 0.5 },
  settingsBtnGlass: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  bubbleGlass: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 14, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderLeftWidth: 4 },
  greetingText: { fontSize: 14, fontWeight: '600', lineHeight: 22, fontStyle: 'italic' },

  // Titles
  headerArea: { paddingHorizontal: 16, marginBottom: 16, marginTop: 4 },
  headerTitleNeon: { fontSize: 26, fontWeight: '900', color: '#f8fafc', letterSpacing: 0.5, textShadowColor: 'rgba(139, 92, 246, 0.8)', textShadowRadius: 10, textShadowOffset: { width: 0, height: 2 } },
  subtitleGlass: { fontSize: 13, color: '#94A3B8', fontWeight: '700', marginTop: 4 },

  // Search Bar
  searchContainerGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, paddingHorizontal: 14, height: 46, marginHorizontal: 16, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#f8fafc', fontSize: 15, fontWeight: '600' },

  // Filters
  filtersWrapper: { marginBottom: 24, height: 40 },
  filtersContainer: { paddingHorizontal: 16, gap: 10, alignItems: 'center' },
  chipGlass: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  chipActiveNeon: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6', shadowColor: '#8b5cf6', shadowOpacity: 0.5, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  chipTextGlass: { color: '#94A3B8', fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  chipTextActiveNeon: { color: '#f8fafc', textShadowColor: '#c084fc', textShadowRadius: 8 },

  // List Sections
  sectionDivider: { paddingHorizontal: 20, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: '#8b5cf6', marginLeft: 16 },
  sectionLabelNeon: { color: '#e2e8f0', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, textShadowColor: 'rgba(255,255,255,0.2)', textShadowRadius: 5 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },

  // Cards (Glassmorphism & Staggered)
  glassCard: { backgroundColor: '#121220', borderRadius: 24, marginBottom: 16, width: (SCREEN_WIDTH - 32 - 14) / 2, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 8 } },
  cardImageContainer: { width: '100%', height: 130, backgroundColor: 'rgba(0,0,0,0.5)' },
  cardImage: { width: '100%', height: '100%' },
  imageGradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 },
  lockOverlayGlass: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'center', alignItems: 'center' },
  cardContent: { padding: 14, paddingTop: 4, backgroundColor: '#121220' },
  title: { fontSize: 14, fontWeight: '900', color: '#f8fafc', lineHeight: 20, height: 40, marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 2 },
  categoryBadgeGlass: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1 },
  categoryText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.8, textTransform: 'uppercase' },

  // Empty State
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 60, paddingHorizontal: 40 },
  emptyTextGlass: { color: '#64748B', textAlign: 'center', fontSize: 14, lineHeight: 22, fontWeight: '600' },

  // FAB
  fabNeon: { position: 'absolute', bottom: 30, right: 20, width: 64, height: 64, borderRadius: 32, shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 12, zIndex: 100 },
  fabGradientFill: { flex: 1, borderRadius: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  fabText: { fontSize: 26 },
});
