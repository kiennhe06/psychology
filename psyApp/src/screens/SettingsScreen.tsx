import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/gameContext';

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const game = useGame();

  const handleSave = () => {
    Alert.alert("Hệ thống thông báo", "Đã cập nhật các cấu hình thám tử thành công! 🕵️‍♂️✨");
    navigation.goBack();
  };

  const openAiStudio = () => {
    Linking.openURL('https://aistudio.google.com/app/apikey');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CÀI ĐẶT GIAO THỨC AI</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🛡️ TRÍ TUỆ NỘI TẠI (OFFLINE-FIRST)</Text>
          <Text style={styles.infoDesc}>
            Dr. Psy hiện đã sở hữu một "Siêu bộ não 51 quy luật" độc lập. 
            Mọi quá trình phân tích đều diễn ra 100% cục bộ trên thiết bị của sếp, 
            đảm bảo tốc độ tối thượng và bảo mật dữ liệu tuyệt đối mà không cần tới bất kỳ API Key nào. 🕵️‍♂️💎
          </Text>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>LƯU CẤU HÌNH</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Bảo mật: Dữ liệu của sếp được xử lý bằng thuật toán thám tử nội bộ và không bao giờ được gửi ra khỏi thiết bị này.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07070F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    color: '#6C63FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  scrollContent: {
    padding: 20,
  },
  infoBox: {
    backgroundColor: '#161625',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6C63FF30',
    marginBottom: 25,
  },
  infoTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoDesc: {
    color: '#A0A0B0',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 15,
  },
  linkBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#333345',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  linkBtnText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: 2,
    marginLeft: 5,
  },
  inputWrapper: {
    backgroundColor: '#121220',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333345',
    paddingHorizontal: 15,
    height: 55,
    justifyContent: 'center',
  },
  input: {
    color: '#FFF',
    fontSize: 14,
  },
  statusText: {
    marginTop: 12,
    color: '#666',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 5,
  },
  saveBtn: {
    backgroundColor: '#6C63FF',
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  securityNote: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#1E1E1E30',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#333',
  },
  securityText: {
    color: '#555',
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
  },
});


export default SettingsScreen;
