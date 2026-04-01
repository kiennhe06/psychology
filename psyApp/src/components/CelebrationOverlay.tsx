import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { CelebrationData, useGame } from '../context/gameContext';
import { getRandomMessageByPersona } from '../data/drPsyMessages';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  celebration: CelebrationData;
  onDismiss: () => void;
}

// ─── Particle (emoji confetti) ───────────────────────────────────────────────

const CONFETTI_EMOJIS = ['✨', '🌟', '⭐', '💫', '🎉', '🎊', '💎', '🧠'];
const PARTICLE_COUNT = 16;

interface ParticleProps {
  emoji: string;
  delay: number;
  startX: number;
  startY: number;
}

const Particle: React.FC<ParticleProps> = ({ emoji, delay, startX, startY }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 1800,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const angle = Math.random() * Math.PI * 2;
  const distance = 120 + Math.random() * 180;

  return (
    <Animated.Text
      style={[
        styles.particle,
        {
          left: startX,
          top: startY,
          opacity: anim.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              translateX: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.cos(angle) * distance],
              }),
            },
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.sin(angle) * distance - 60],
              }),
            },
            {
              scale: anim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.3, 1.2, 0.5],
              }),
            },
            {
              rotate: anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${Math.random() * 720 - 360}deg`],
              }),
            },
          ],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

// ─── Main Celebration Overlay ────────────────────────────────────────────────

const CelebrationOverlay: React.FC<Props> = ({ celebration, onDismiss }) => {
  const game = useGame();
  const bgAnim = useRef(new Animated.Value(0)).current;
  const mainAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(mainAnim, {
        toValue: 1,
        tension: 40,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto dismiss after 4 seconds
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, []);

  const isLevelUp = celebration.type === 'levelUp';
  const mainEmoji = isLevelUp ? '🚀' : (celebration.badgeEmoji || '🏅');
  const title = isLevelUp ? `LEVEL ${celebration.level}!` : 'HUY HIỆU MỚI!';
  const subtitle = isLevelUp
    ? getRandomMessageByPersona(game.activePersona, 'levelUp')
    : celebration.badgeName
      ? `${celebration.badgeEmoji} ${celebration.badgeName}`
      : 'Một thành tựu mới đã được mở khóa!';
  const accentColor = isLevelUp ? '#6C63FF' : '#FFD700';

  // Map persona to emoji for avatar
  const personaEmoji = React.useMemo(() => {
    if (game.activePersona === 'killer') return '💀';
    if (game.activePersona === 'philosopher') return '📜';
    return '🐱';
  }, [game.activePersona]);

  // Generate particles
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
    delay: i * 80,
    startX: SCREEN_WIDTH / 2 - 12,
    startY: SCREEN_HEIGHT / 2 - 40,
  }));

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <Animated.View style={[styles.overlay, { opacity: bgAnim }]}>
        {/* Confetti particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Main content */}
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  scale: mainAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1.15, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Glow ring */}
          <Animated.View
            style={[
              styles.glowRing,
              {
                borderColor: accentColor,
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                transform: [
                  {
                    scale: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.15],
                    }),
                  },
                ],
              },
            ]}
          />

          {/* Emoji */}
          <Animated.Text
            style={[
              styles.mainEmoji,
              {
                transform: [
                  {
                    scale: mainAnim.interpolate({
                      inputRange: [0, 0.7, 1],
                      outputRange: [0, 1.3, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {mainEmoji}
          </Animated.Text>

          {/* Title */}
          <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Dr. Psy */}
          <View style={styles.drPsyRow}>
            <Text style={styles.drPsyAvatar}>{personaEmoji}</Text>
            <Text style={styles.drPsyText}>
              {game.activePersona === 'killer' ? 'Ngươi làm khá đấy. Tiếp tục đi.' : (game.activePersona === 'philosopher' ? 'Bạn đang đi đúng hướng của sự thông thái.' : 'Tiến sĩ Psy chúc mừng bạn!')}
            </Text>
          </View>

          <Text style={styles.tapHint}>Nhấn để tiếp tục</Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CelebrationOverlay;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
  particle: {
    position: 'absolute',
    fontSize: 24,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  glowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    top: -20,
  },
  mainEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 280,
  },
  drPsyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
  drPsyAvatar: {
    fontSize: 24,
    marginRight: 8,
  },
  drPsyText: {
    color: '#A0A0D0',
    fontSize: 14,
    fontWeight: '600',
  },
  tapHint: {
    color: '#555',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
