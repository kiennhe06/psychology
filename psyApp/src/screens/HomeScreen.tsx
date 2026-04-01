import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, Settings } from 'lucide-react-native';
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
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const CATEGORIES = ["Tất cả", "Nhận thức", "Cảm xúc", "Xã hội"];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [greeting, setGreeting] = useState('');

  React.useEffect(() => {
    setGreeting(getRandomMessageByPersona(game.activePersona, 'greetings'));
    game.checkAndUpdateStreak();
  }, [game.activePersona]);

  // Map persona to emoji for avatar
  const personaEmoji = React.useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    if (game.activePersona === 'sherlock') return '🕵️‍♂️';
    if (game.activePersona === 'mystic') return '🔮';
    if (game.activePersona === 'mastermind') return '🕴️';
    if (game.activePersona === 'manipulator') return '⛓️';
    return '🐱';
  }, [game.activePersona]);

  // Dynamic colors for persona
  const personaColors = React.useMemo(() => {
    switch (game.activePersona) {
      case 'killer': return { border: '#E53935', bg: '#1E1414', accent: '#FF1744' };
      case 'philosopher': return { border: '#43A047', bg: '#141E14', accent: '#00E676' };
      case 'sherlock': return { border: '#D4AF37', bg: '#1E1A14', accent: '#FFD700' };
      case 'mystic': return { border: '#7E57C2', bg: '#17141E', accent: '#B388FF' };
      case 'mastermind': return { border: '#757575', bg: '#131313', accent: '#EEEEEE' };
      case 'manipulator': return { border: '#FF5722', bg: '#1E1414', accent: '#FF7043' };
      default: return { border: '#6C63FF30', bg: '#161625', accent: '#6C63FF' };
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

  const renderItem = ({ item }: { item: EffectModel }) => {
    const isLocked = item.isPremium && !game.isArchiveUnlocked(item.id);

    const handlePress = () => {
      navigation.navigate('Detail', { effect: item });
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.cardImageContainer}>
          {item.image && (
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
          )}
          {isLocked && <View style={styles.lockOverlay}><Text style={{fontSize: 20}}>🔒</Text></View>}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: item.category === 'Nhận thức' ? '#4A148C30' : (item.category === 'Cảm xúc' ? '#AD145730' : '#0D47A130') }]}>
            <Text style={[styles.categoryText, { color: item.category === 'Nhận thức' ? '#BA68C8' : (item.category === 'Cảm xúc' ? '#F06292' : '#64B5F6') }]}>
              {item.category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEffects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Dr. Psy Briefing Card */}
            <View style={[styles.briefingCard, { borderColor: personaColors.border, backgroundColor: personaColors.bg }]}>
               <View style={styles.briefingHeader}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <DrPsyAvatar emoji={personaEmoji} size={44} />
                    <View style={styles.briefingInfo}>
                       <Text style={[styles.drName, { color: personaColors.accent }]}>DR. PSY (Giảng viên: {
                         game.activePersona === 'killer' ? 'Sát thủ' : 
                         (game.activePersona === 'philosopher' ? 'Triết gia' : 
                         (game.activePersona === 'sherlock' ? 'Sherlock' : 
                         (game.activePersona === 'mystic' ? 'Huyền bí' : 
                         (game.activePersona === 'mastermind' ? 'Bậc thầy' : 
                         (game.activePersona === 'manipulator' ? 'Kẻ giật dây' : 'Mặc định')))))
                       })</Text>
                       <Text style={styles.briefingStatus}>● ĐANG TRỰC</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.settingsBtn} 
                    onPress={() => (navigation as any).navigate('Settings')}
                  >
                    <Settings color={personaColors.accent} size={20} />
                  </TouchableOpacity>
               </View>
               <View style={[styles.bubble, { backgroundColor: personaColors.bg, borderLeftWidth: 3, borderLeftColor: personaColors.accent }]}>
                  <Text style={styles.greetingText}>{greeting}</Text>
               </View>
            </View>

            {/* Slim Header */}
            <View style={styles.headerArea}>
              <Text style={styles.headerTitle}>Hành Trình Tâm Lý</Text>
              <Text style={styles.subtitle}>Khám phá góc khuất của tâm trí</Text>
            </View>

            {/* Slim Search Bar */}
            <View style={styles.searchContainer}>
              <Search color="#666" size={16} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm hiệu ứng..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Slim Filter Chips */}
            <View style={styles.filtersWrapper}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.filtersContainer}
              >
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.chip,
                      activeCategory === category && styles.chipActive
                    ]}
                    onPress={() => setActiveCategory(category)}
                  >
                    <Text style={[
                      styles.chipText,
                      activeCategory === category && styles.chipTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.sectionDivider}>
               <Text style={styles.sectionLabel}>CÁC HỒ SƠ KHẢ DỤNG</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy kết quả.</Text>
        }
      />

      {/* FAB: AI Analyzer */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => (navigation as any).navigate('Analyzer')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>🤖</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: 50,
  },
  headerArea: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
  },
  briefingCard: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#161625',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6C63FF30',
  },
  briefingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  settingsBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  briefingInfo: {
    marginLeft: 12,
  },
  drName: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  briefingStatus: {
    color: '#4CAF50',
    fontSize: 8,
    fontWeight: '900',
    marginTop: 2,
  },
  bubble: {
    backgroundColor: '#1E1E2E',
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    marginTop: 8,
  },
  greetingText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  sectionDivider: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
  },
  sectionLabel: {
    color: '#555',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161625',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 38,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333345',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#161625',
    borderWidth: 1,
    borderColor: '#333345',
  },
  chipActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  chipText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#121220',
    borderRadius: 16,
    marginBottom: 16,
    width: (SCREEN_WIDTH - 32 - 12) / 2, // 2-col formula
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: '100%',
    height: 110, // Significantly shorter image
    backgroundColor: '#1E1E2E',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E0E0E0',
    lineHeight: 18,
    height: 36, // Force max 2 lines height
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 100,
  },
  fabText: {
    fontSize: 26,
  },
});
