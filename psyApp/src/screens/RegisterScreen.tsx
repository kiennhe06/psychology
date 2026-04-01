import React, { useState } from 'react';
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
  Animated,
  ScrollView
} from 'react-native';
import { useGame } from '../context/gameContext';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const game = useGame();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = () => {
    if (!username || !password || !name) {
      Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ các trường để tạo hồ sơ.');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Mật khẩu quá yếu', 'Mật khẩu cần ít nhất 4 ký tự.');
      return;
    }

    const success = game.registerAccount({ username, password, name });
    
    if (success) {
      Alert.alert(
        'Thành công', 
        'Hồ sơ của bạn đã được khởi tạo. Hãy đăng nhập để bắt đầu.',
        [{ text: 'Đăng nhập ngay', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Lỗi', 'Tên tài khoản này đã tồn tại trong kho dữ liệu.');
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
        
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.header}>
              <Text style={styles.title}>Tạo Hồ Sơ Mới</Text>
              <Text style={styles.subtitle}>Gia nhập mạng lưới thám tử tâm lý.</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TÊN NGƯỜI DÙNG (CÔNG KHAI)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: Watson..."
                placeholderTextColor="#555"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TÀI KHOẢN (ĐĂNG NHẬP)</Text>
              <TextInput
                style={styles.input}
                placeholder="account123"
                placeholderTextColor="#555"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
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

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>ĐĂNG KÝ HỒ SƠ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>Đã có hồ sơ? <Text style={styles.linkHighlight}>Đăng nhập</Text></Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)', 
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(25, 25, 40, 0.85)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.25)',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#A0A0D0',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 14,
    padding: 16,
    color: '#FFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#888',
    fontSize: 13,
  },
  linkHighlight: {
    color: '#6C63FF',
    fontWeight: '700',
  },
});

export default RegisterScreen;
