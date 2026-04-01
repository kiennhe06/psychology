import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Animated
} from 'react-native';
import { useGame } from '../context/gameContext';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Tự động điền nếu có thông tin ghi nhớ
    if (game.rememberMe && game.savedAccount) {
      setUsername(game.savedAccount.username);
      setPassword(game.savedAccount.password);
      setRememberMe(true);
    }
  }, [game.rememberMe, game.savedAccount]);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Hồ sơ chưa hoàn thiện', 'Vui lòng điền đủ tài khoản và mật khẩu.');
      return;
    }

    const success = game.loginWithCredentials(username, password, rememberMe);
    
    if (success) {
      navigation.replace('Tabs');
    } else {
      Alert.alert('Lỗi truy cập', 'Sai tài khoản hoặc mật khẩu. Hãy kiểm tra lại hồ sơ của bạn.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground 
        source={require('../assets/images/welcome_bg.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Truy Cập Hộp Đen</Text>
            <Text style={styles.subtitle}>Nhập mã hồ sơ của bạn để giải mã bí mật.</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>TÀI KHOẢN</Text>
            <TextInput
              style={styles.input}
              placeholder="account..."
              placeholderTextColor="#555"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>MẬT KHẨU</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#555"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Ghi nhớ mật khẩu Checkbox */}
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Text style={styles.checkIcon}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Ghi nhớ mật khẩu</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>XÁC THỰC HỒ SƠ</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerLink} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>Chưa có hồ sơ mật? <Text style={styles.linkHighlight}>Đăng ký ngay</Text></Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)', 
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(25, 25, 40, 0.9)',
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.25)',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0D0',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 14,
    padding: 18,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6C63FF80',
    backgroundColor: 'rgba(108, 99, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  checkIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  checkboxLabel: {
    color: '#D0D0E0',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#888',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#6C63FF',
    fontWeight: '700',
  },
});

export default LoginScreen;
