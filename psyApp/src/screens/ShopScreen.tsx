import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  StatusBar,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/gameContext';
import { SHOP_ITEMS, ShopItem, ItemType } from '../data/items';
import { PSY_EFFECTS } from '../data/effects';
import { PSYCHOMETRIC_TESTS } from '../data/psychometricTests';
import { FORBIDDEN_ARCHIVES } from '../data/forbiddenArchives';
import DrPsyAvatar from '../components/DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS: { id: ItemType | 'BOX'; label: string; emoji: string }[] = [
  { id: 'ARCHIVE_KEY', label: 'Lý Thuyết', emoji: '📚' },
  { id: 'TEST_KEY', label: 'Phân Tích', emoji: '🧪' },
  { id: 'MISSION_CONTRACT', label: 'Thực Địa', emoji: '🔭' },
  { id: 'APP_PERSONA', label: 'Giảng Viên', emoji: '👨‍🏫' },
  { id: 'BOX', label: 'Tiếp Tế', emoji: '🎁' },
];

const ShopScreen: React.FC = () => {
  const game = useGame();
  const [activeTab, setActiveTab] = useState<ItemType | 'BOX'>('ARCHIVE_KEY');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const filteredItems = SHOP_ITEMS.filter(item => item.type === activeTab);

  const switchTab = (tabId: ItemType | 'BOX') => {
    if (tabId === activeTab) return;
    
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 10, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setActiveTab(tabId);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    });
  };

  const navigation = useNavigation<any>();

  const handleBuyItem = (item: ShopItem) => {
    // Check if already unlocked
    let isUnlocked = false;
    if (item.type === 'ARCHIVE_KEY') isUnlocked = game.isArchiveUnlocked(item.targetId);
    if (item.type === 'TEST_KEY') isUnlocked = game.isTestUnlocked(item.targetId);
    if (item.type === 'MISSION_CONTRACT') isUnlocked = game.isMissionCompleted(item.targetId);
    if (item.type === 'APP_PERSONA') isUnlocked = game.isItemUnlocked(item.id) || item.targetId === 'default';

    if (isUnlocked) {
      handleItemPress(item, true);
      return;
    }

    if (game.gems < item.price) {
      Alert.alert('Hết tiền', 'Không đủ Gems rồi sếp ơi! Cày thêm Quiz nhé! 💎');
      return;
    }

    if (game.spendGems(item.price)) {
      if (item.type === 'ARCHIVE_KEY') game.unlockArchive(item.targetId);
      if (item.type === 'TEST_KEY') game.unlockTest(item.targetId);
      if (item.type === 'MISSION_CONTRACT') game.completeMission(item.targetId); // Start mission
      if (item.type === 'APP_PERSONA') game.setPersona(item.targetId as any);

      game.triggerCelebration({
        type: 'purchase',
        itemName: item.name,
        itemEmoji: item.emoji,
      });
    }
  };

  const handleItemPress = (item: ShopItem, isOwned: boolean) => {
    if (!isOwned) {
      handleBuyItem(item);
      return;
    }

    // Nếu đã sở hữu, điều hướng tới bài học tương ứng
    switch (item.type) {
      case 'ARCHIVE_KEY':
        // Kiểm tra xem là Hiệu ứng tâm lý hay Hồ sơ cấm
        const effect = PSY_EFFECTS.find(e => e.id === item.targetId);
        if (effect) {
          navigation.navigate('Detail', { effect });
          return;
        }

        const archive = FORBIDDEN_ARCHIVES.find(a => a.id === item.targetId);
        if (archive) {
          navigation.navigate('ArchiveDetail', { archive });
          return;
        }

        Alert.alert('Lỗi', 'Hồ sơ này đang được cập nhật, sếp quay lại sau nhé!');
        break;
      
      case 'TEST_KEY':
        const test = PSYCHOMETRIC_TESTS.find(t => t.id === item.targetId);
        if (test) {
          navigation.navigate('PsychometricTest', { test });
        } else {
          Alert.alert('Lỗi', 'Bài trắc nghiệm này chưa sẵn sàng, thám tử hãy đợi chút!');
        }
        break;

      case 'MISSION_CONTRACT':
        navigation.navigate('Quiz'); // Chuyển sang Tab chứa các nhiệm vụ
        break;

      case 'APP_PERSONA':
        game.setPersona(item.targetId as any);
        // Hiệu ứng ăn mừng khi đổi giảng viên
        game.triggerCelebration({
          type: 'purchase',
          itemName: `Giảng viên: ${item.name.replace('Giảng viên: ', '')}`,
          itemEmoji: item.emoji,
        });
        break;
      
      default:
        break;
    }
  };

  const renderItem = ({ item }: { item: ShopItem }) => {
    let isOwned = false;
    let isCompleted = false;
    let progress = 0;
    let actionText = 'ĐĂNG KÝ';

    if (item.type === 'ARCHIVE_KEY') {
      isOwned = game.isArchiveUnlocked(item.targetId);
      isCompleted = game.isArchiveRead(item.targetId);
    } else if (item.type === 'TEST_KEY') {
      isOwned = game.isTestUnlocked(item.targetId);
      isCompleted = game.isTestCompleted(item.targetId);
    } else if (item.type === 'MISSION_CONTRACT') {
      isOwned = game.isMissionCompleted(item.targetId); // Missions are instant for now or based on state
      isCompleted = isOwned;
    } else if (item.type === 'APP_PERSONA') {
      isOwned = game.isItemUnlocked(item.id); 
      isCompleted = isOwned;
    }

    if (isOwned) {
      if (item.type === 'APP_PERSONA') {
        const isActive = game.activePersona === item.targetId;
        actionText = isActive ? 'ĐANG DÙNG' : 'SỬ DỤNG';
        isCompleted = isActive;
        progress = isActive ? 100 : 0;
      } else if (isCompleted) {
        actionText = 'HOÀN THÀNH';
        progress = 100;
      } else {
        actionText = 'VÀO HỌC';
        progress = 30; // Just started
      }
    }

    return (
      <TouchableOpacity
        style={[styles.itemCard, isOwned && styles.itemCardOwned]}
        onPress={() => handleItemPress(item, isOwned)}
        activeOpacity={0.8}
      >
        <View style={[styles.rarityBadge, { backgroundColor: item.rarityColor + '20' }]}>
          <Text style={[styles.rarityText, { color: item.rarityColor }]}>{item.rarity}</Text>
        </View>
        
        <Text style={styles.itemEmoji}>{item.emoji}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
        
        {isOwned && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}

        <View style={styles.priceRow}>
          {isOwned ? (
            <Text style={[styles.ownedLabel, isCompleted && styles.completedLabel]}>
              {isCompleted ? '✅ ' : '⏳ '}{actionText}
            </Text>
          ) : (
            <>
              <Text style={styles.priceValue}>💎 {item.price}</Text>
              <View style={styles.buyBtn}>
                <Text style={styles.buyBtnText}>HỌC</Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMysteryBox = () => (
    <View style={styles.boxContainer}>
      <Text style={styles.boxEmoji}>🎁</Text>
      <Text style={styles.boxTitle}>Hộp Tiếp Tế Thám Tử</Text>
      <Text style={styles.boxDesc}>
        Chứa Gems, XP hoặc Chìa khóa ngẫu nhiên. Mỗi ngày sếp được mở 1 hộp miễn phí!
      </Text>
      
      <TouchableOpacity 
        style={[styles.openBoxBtn, !game.canOpenMysteryBox() && styles.openBoxBtnDisabled]}
        onPress={() => {
          if (game.canOpenMysteryBox()) {
            const result = game.openMysteryBox();
            if (result.success) {
              Alert.alert('Chúc mừng sếp!', `Sếp vừa nhận được ${result.reward} từ Trạm Tiếp Tế! 🥂`);
            }
          } else {
            Alert.alert('Thông báo', 'Hôm nay sếp mở rồi, mai quay lại nhé! 😴');
          }
        }}
      >
        <Text style={styles.openBoxBtnText}>
          {game.canOpenMysteryBox() ? 'MỞ MIỄN PHÍ' : 'HẸN MAI NHÉ'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>HỌC VIỆN THÁM TỬ</Text>
          <Text style={styles.headerSub}>Đào tạo kỹ năng thực chiến cùng Dr. Psy</Text>
        </View>
        <View style={styles.gemBadge}>
          <Text style={styles.gemText}>💎 {game.gems}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={{ height: 60 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.tabContainer}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => switchTab(tab.id)}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {activeTab === 'BOX' ? (
          renderMysteryBox()
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Mục này đang chờ thám tử thu thập thêm hồ sơ... 🕵️‍♂️</Text>
              </View>
            }
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#D4AF37', // Gold
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSub: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  gemBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF3740',
  },
  gemText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },

  // Tabs
  tabContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  activeTab: {
    backgroundColor: '#3D0000', // Deep Crimson
    borderColor: '#D4AF37',
  },
  tabEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  tabLabel: {
    color: '#888',
    fontSize: 13,
    fontWeight: '700',
  },
  activeTabLabel: {
    color: '#D4AF37',
  },

  // Content
  content: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: '#121212',
    width: (SCREEN_WIDTH - 48) / 2,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  itemCardOwned: {
    borderColor: '#3D0000',
    opacity: 0.9,
  },
  rarityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: '900',
  },
  itemEmoji: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 8,
  },
  itemName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDesc: {
    color: '#666',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
    height: 30,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 10,
  },
  priceValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  buyBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buyBtnText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  ownedLabel: {
    color: '#FFD700', // Gold for in progress
    fontSize: 11,
    fontWeight: '900',
  },
  completedLabel: {
    color: '#4CAF50', // Green for completed
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#1A1A1A',
    borderRadius: 2,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
  progressText: {
    position: 'absolute',
    right: -2,
    top: -12,
    color: '#D4AF37',
    fontSize: 8,
    fontWeight: '800',
  },

  // Mystery Box
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  boxEmoji: {
    fontSize: 100,
    marginBottom: 20,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  boxTitle: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  boxDesc: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  openBoxBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  openBoxBtnDisabled: {
    backgroundColor: '#222',
    shadowOpacity: 0,
  },
  openBoxBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },

  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#444',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
});
