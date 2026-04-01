import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GameProvider } from './src/context/gameContext';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import QuizPlayScreen from './src/screens/QuizPlayScreen';
import QuizResultScreen from './src/screens/QuizResultScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShopScreen from './src/screens/ShopScreen';
import AnalyzerScreen from './src/screens/AnalyzerScreen';
import ArchiveDetailScreen from './src/screens/ArchiveDetailScreen';
import PsychometricTestScreen from './src/screens/PsychometricTestScreen';
import CelebrationOverlay from './src/components/CelebrationOverlay';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MissionReportScreen from './src/screens/MissionReportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Compass, Brain, ShoppingBag, User } from 'lucide-react-native';
import { useGame } from './src/context/gameContext';

import { EffectModel } from './src/data/effects';
import { Quiz } from './src/data/quizzes';
import { ArchiveFile } from './src/data/forbiddenArchives';
import { PsychometricTest } from './src/data/psychometricTests';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  Analyzer: undefined;
  Settings: undefined;
  Detail: { effect: EffectModel };
  ArchiveDetail: { archive: ArchiveFile };
  PsychometricTest: { test: PsychometricTest };
  QuizPlay: { quiz: Quiz; isDaily?: boolean };
  QuizResult: {
    quizId: string;
    quizTitle: string;
    correctCount: number;
    totalQuestions: number;
    earnedXp: number;
    earnedGems: number;
    isPerfect: boolean;
    isDaily: boolean;
  };
  MissionReport: { missionId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 12,
          borderTopColor: 'rgba(255,255,255,0.05)',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#707080',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconSize = focused ? 26 : 24;
          if (route.name === 'Explore') {
            return <Compass color={color} size={iconSize} />;
          } else if (route.name === 'Quiz') {
            return <Brain color={color} size={iconSize} />;
          } else if (route.name === 'Shop') {
            return <ShoppingBag color={color} size={iconSize} />;
          } else if (route.name === 'Profile') {
            return <User color={color} size={iconSize} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{ tabBarLabel: 'Khám phá' }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ tabBarLabel: 'Hành trình' }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{ tabBarLabel: 'Gems Shop' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Hồ sơ' }}
      />
    </Tab.Navigator>
  );
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1A1A1A',
    text: '#FFFFFF',
    border: 'rgba(255,255,255,0.1)',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen
              name="Analyzer"
              component={AnalyzerScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="ArchiveDetail"
              component={ArchiveDetailScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="PsychometricTest"
              component={PsychometricTestScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="QuizPlay"
              component={QuizPlayScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="QuizResult"
              component={QuizResultScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen
              name="MissionReport"
              component={MissionReportScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <GlobalCelebrationOverlay />
      </GameProvider>
    </SafeAreaProvider>
  );
};

const GlobalCelebrationOverlay = () => {
  const game = useGame();

  if (!game?.pendingCelebration) return null;

  return (
    <CelebrationOverlay
      celebration={game.pendingCelebration}
      onDismiss={game.clearCelebration}
    />
  );
};

export default App;
