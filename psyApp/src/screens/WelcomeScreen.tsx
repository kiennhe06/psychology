import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  StatusBar
} from 'react-native';
import { useGame } from '../context/gameContext';

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Logo and title animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigation after 4 seconds
    const timer = setTimeout(() => {
      if (game.isLoggedIn) {
        navigation.replace('Tabs');
      } else {
        navigation.replace('Login');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [game.isLoggedIn]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={require('../assets/images/welcome_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🕵️‍♂️</Text>
          </View>
          <Text style={styles.title}>PSY PROJECT</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>BẮT ĐẦU GIẢI MÃ TÂM TRÍ</Text>
          <Text style={styles.drPsyQuote}>
            "Chào mừng bạn đến với văn phòng riêng của ta..."
          </Text>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.loadingText}>Đang truy cập hồ sơ mật...</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Phủ lớp tối để chữ dễ đọc
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6C63FF80',
    marginBottom: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(108, 99, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#6C63FF',
    marginVertical: 15,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A0A0D0',
    letterSpacing: 3,
    marginBottom: 30,
  },
  drPsyQuote: {
    fontSize: 16,
    color: '#FFF',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  loadingText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    opacity: 0.7,
  },
});

export default WelcomeScreen;
