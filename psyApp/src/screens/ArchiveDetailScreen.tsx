import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArchiveFile } from '../data/forbiddenArchives';

interface Props {
  route: {
    params: {
      archive: ArchiveFile;
    };
  };
  navigation: any;
}

const ArchiveDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { archive } = route.params;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← ĐÓNG HỒ SƠ</Text>
        </TouchableOpacity>
        <Text style={styles.caseCode}>{archive.caseCode}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Top Secret Stamp */}
          <View style={styles.stampContainer}>
            <View style={styles.stamp}>
              <Text style={styles.stampText}>TOP SECRET</Text>
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.archiveEmoji}>{archive.coverEmoji}</Text>
            <Text style={styles.archiveTitle}>{archive.title.toUpperCase()}</Text>
            <Text style={styles.archiveSubtitle}>{archive.subtitle}</Text>
          </View>

          <View style={styles.divider} />

          {/* Summary Box */}
          <View style={styles.summaryBox}>
            <Text style={styles.sectionLabel}>[ TÓM TẮT VỤ ÁN ]</Text>
            <Text style={styles.summaryText}>{archive.summary}</Text>
          </View>

          {/* Main Content */}
          <View style={styles.contentBox}>
             <Text style={styles.sectionLabel}>[ CHI TIẾT HỒ SƠ ]</Text>
             <Text style={styles.mainText}>{archive.fullContent}</Text>
          </View>

          {/* Warning */}
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>⚠ CẢNH BÁO: {archive.warning}</Text>
          </View>

          {/* Lessons/Takeaways */}
          <View style={styles.lessonsBox}>
            <Text style={styles.sectionLabel}>[ BÀI HỌC THÁM TỬ ]</Text>
            {archive.lessons.map((lesson, index) => (
              <View key={index} style={styles.lessonItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.lessonText}>{lesson}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 60 }} />
        </Animated.View>
      </ScrollView>

      {/* Background Graphic elements */}
      <View style={styles.confidentialOverlay}>
        <Text style={styles.confidentialText}>CONFIDENTIAL</Text>
      </View>
    </SafeAreaView>
  );
};

export default ArchiveDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backBtn: {
    paddingVertical: 4,
  },
  backBtnText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  caseCode: {
    color: '#555',
    fontFamily: 'serif',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
  },
  
  // Stamp
  stampContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  stamp: {
    borderWidth: 3,
    borderColor: '#900',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    transform: [{ rotate: '15deg' }],
    opacity: 0.8,
  },
  stampText: {
    color: '#900',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: 'serif',
  },

  // Title
  titleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  archiveEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  archiveTitle: {
    color: '#D4AF37', // Gold
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  archiveSubtitle: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
    marginBottom: 30,
  },

  // Sections
  sectionLabel: {
    color: '#555',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 30,
  },
  summaryText: {
    color: '#B0B0B0',
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'serif',
  },
  contentBox: {
    marginBottom: 30,
  },
  mainText: {
    color: '#D0D0D0',
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'serif',
    textAlign: 'justify',
  },
  warningBox: {
    borderWidth: 1,
    borderColor: '#900',
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#9001',
    marginBottom: 30,
  },
  warningText: {
    color: '#F44',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  lessonsBox: {
    backgroundColor: '#0F1A1A',
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D3333',
  },
  lessonItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    color: '#4CAF50',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '900',
  },
  lessonText: {
    color: '#A0D0A0',
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
    fontWeight: '600',
  },

  // Overlay
  confidentialOverlay: {
    position: 'absolute',
    bottom: 50,
    right: -30,
    transform: [{ rotate: '-90deg' }],
  },
  confidentialText: {
    color: '#222',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 10,
    opacity: 0.3,
  }
});
