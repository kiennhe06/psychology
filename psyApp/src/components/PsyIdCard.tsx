import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useGame } from '../context/gameContext';
import { QUIZZES } from '../data/quizzes';
import DrPsyAvatar from './DrPsyAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = CARD_WIDTH * 0.62;

// ─── Radar Data Calculation ──────────────────────────────────────────────────

interface RadarData {
  label: string;
  emoji: string;
  value: number; // 0-100
  color: string;
}

const getRadarData = (completedQuizIds: string[]): RadarData[] => {
  const regions = [
    { id: 'r1', label: 'Nhận thức', emoji: '🧠', color: '#BA68C8' },
    { id: 'r2', label: 'Cảm xúc', emoji: '❤️', color: '#F06292' },
    { id: 'r3', label: 'Xã hội', emoji: '👥', color: '#64B5F6' },
    { id: 'r4', label: 'Trí nhớ', emoji: '🌀', color: '#FFD54F' },
    { id: 'r5', label: 'Quyết định', emoji: '⚖️', color: '#81C784' },
    { id: 'r6', label: 'Chống TT', emoji: '🛡️', color: '#FF7043' },
  ];

  return regions.map(region => {
    const regionQuizzes = QUIZZES.filter(q => q.regionId === region.id);
    const completed = regionQuizzes.filter(q => completedQuizIds.includes(q.id)).length;
    const total = regionQuizzes.length || 1;
    const value = Math.round((completed / total) * 100);
    return { ...region, value };
  });
};

// ─── Level Config ────────────────────────────────────────────────────────────

const getCardTier = (level: number) => {
  if (level >= 36) return { name: 'KIM CƯƠNG', colors: ['#00BCD4', '#E0F7FA', '#00BCD4'], border: '#00E5FF', glow: '#00BCD450' };
  if (level >= 21) return { name: 'VÀNG', colors: ['#FFD700', '#FFF8E1', '#FFD700'], border: '#FFAB00', glow: '#FFD70050' };
  if (level >= 11) return { name: 'BẠC', colors: ['#B0BEC5', '#ECEFF1', '#B0BEC5'], border: '#90A4AE', glow: '#B0BEC550' };
  return { name: 'ĐỒNG', colors: ['#A1887F', '#EFEBE9', '#A1887F'], border: '#8D6E63', glow: '#A1887F50' };
};

const getTitle = (level: number) => {
  if (level >= 40) return 'DR. PSY TỐI THƯỢNG';
  if (level >= 30) return 'BẬC THẦY THAO TÚNG';
  if (level >= 20) return 'THÁM TỬ TÂM LÝ';
  if (level >= 10) return 'CHUYÊN GIA PHÂN TÍCH';
  if (level >= 5) return 'THÁM TỬ TẬP SỰ';
  return 'TÂN BINH';
};

// ─── Mini Radar Chart (Pure View) ────────────────────────────────────────────

const MiniRadar: React.FC<{ data: RadarData[] }> = ({ data }) => {
  const size = 90;
  const center = size / 2;
  const maxRadius = center - 8;

  return (
    <View style={{ width: size, height: size }}>
      {/* Background rings */}
      {[0.33, 0.66, 1].map((scale, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: center - maxRadius * scale,
            top: center - maxRadius * scale,
            width: maxRadius * 2 * scale,
            height: maxRadius * 2 * scale,
            borderRadius: maxRadius * scale,
            borderWidth: 0.5,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        />
      ))}
      {/* Data points */}
      {data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const r = (d.value / 100) * maxRadius;
        const x = center + Math.cos(angle) * r - 3;
        const y = center + Math.sin(angle) * r - 3;
        return (
          <View
            key={d.label}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: d.color,
              shadowColor: d.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
        );
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const labelR = maxRadius + 6;
        const x = center + Math.cos(angle) * labelR - 6;
        const y = center + Math.sin(angle) * labelR - 5;
        return (
          <Text
            key={`label-${d.label}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontSize: 7,
              color: d.value > 0 ? d.color : '#555',
              fontWeight: '900',
            }}
          >
            {d.emoji}
          </Text>
        );
      })}
    </View>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const PsyIdCard: React.FC = () => {
  const game = useGame();
  const shimmerAnim = useRef(new Animated.Value(-1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const tier = getCardTier(game.level);
  const title = getTitle(game.level);
  const radar = getRadarData(game.completedQuizIds);
  const totalScore = Math.round(radar.reduce((sum, r) => sum + r.value, 0) / radar.length);

  useEffect(() => {
    // Holographic shimmer
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -3, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-CARD_WIDTH, CARD_WIDTH],
  });

  return (
    <Animated.View style={[styles.cardOuter, { transform: [{ translateY: floatAnim }] }]}>
      {/* Glow */}
      <View style={[styles.cardGlow, { shadowColor: tier.border, backgroundColor: tier.glow }]} />

      {/* Main Card */}
      <View style={[styles.card, { borderColor: tier.border }]}>
        {/* Holographic Shimmer Overlay */}
        <Animated.View
          style={[
            styles.shimmer,
            { transform: [{ translateX: shimmerTranslate }] },
          ]}
        />

        {/* Top Section */}
        <View style={styles.cardTop}>
          <View style={styles.cardTopLeft}>
            <Text style={[styles.tierBadge, { color: tier.border }]}>
              {tier.name}
            </Text>
            <Text style={styles.cardTitle}>THẺ THÁM TỬ</Text>
            <Text style={styles.drPsyLabel}>DR. PSY INSTITUTE</Text>
          </View>
          <View style={styles.avatarFrame}>
            <DrPsyAvatar emoji={game.activeDrPsySkin} size={44} />
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.cardMiddle}>
          <View style={styles.infoColumn}>
            <Text style={styles.agentName} numberOfLines={1}>
              {game.userName || 'Agent Unknown'}
            </Text>
            <Text style={[styles.agentTitle, { color: tier.border }]}>{title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatVal}>{game.level}</Text>
                <Text style={styles.miniStatLabel}>CẤP</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatVal}>{game.gems}</Text>
                <Text style={styles.miniStatLabel}>💎</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatVal}>{game.completedQuizIds.length}</Text>
                <Text style={styles.miniStatLabel}>VỤ ÁN</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={[styles.miniStatVal, { color: tier.border }]}>{totalScore}%</Text>
                <Text style={styles.miniStatLabel}>NĂNG LỰC</Text>
              </View>
            </View>
          </View>
          <MiniRadar data={radar} />
        </View>

        {/* Bottom barcode-style */}
        <View style={styles.cardBottom}>
          <View style={styles.barcode}>
            {Array.from({ length: 20 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.barcodeLine,
                  { width: Math.random() > 0.5 ? 2 : 1, opacity: 0.3 + Math.random() * 0.4 },
                ]}
              />
            ))}
          </View>
          <Text style={styles.serialNumber}>
            PSY-{game.level.toString().padStart(2, '0')}-{(game.completedQuizIds.length * 7 + 42).toString(16).toUpperCase()}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default PsyIdCard;

const styles = StyleSheet.create({
  cardOuter: {
    marginHorizontal: 24,
    marginBottom: 20,
  },
  cardGlow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: -4,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#0D0D1A',
    borderWidth: 1.5,
    padding: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: CARD_HEIGHT * 2,
    backgroundColor: 'rgba(255,255,255,0.04)',
    transform: [{ rotate: '15deg' }],
  },

  // Top
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTopLeft: {},
  tierBadge: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 2,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  drPsyLabel: {
    color: '#555',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 1,
  },
  avatarFrame: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  // Middle
  cardMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
    marginRight: 8,
  },
  agentName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  agentTitle: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  miniStat: {
    alignItems: 'center',
  },
  miniStatVal: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
  },
  miniStatLabel: {
    color: '#666',
    fontSize: 7,
    fontWeight: '800',
    marginTop: 1,
  },

  // Bottom
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barcode: {
    flexDirection: 'row',
    gap: 1.5,
    height: 14,
    alignItems: 'flex-end',
  },
  barcodeLine: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 0.5,
  },
  serialNumber: {
    color: '#555',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
