import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ───────────────────────────────────────────────────────────────────
export type PersonaType = 'default' | 'killer' | 'philosopher' | 'sherlock' | 'mystic' | 'mastermind' | 'manipulator';

export interface CelebrationData {
  type: 'levelUp' | 'badge' | 'purchase';
  level?: number;
  badgeEmoji?: string;
  badgeName?: string;
  itemEmoji?: string;
  itemName?: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  gems: number;
  completedQuizIds: string[];
  unlockedBadgeIds: string[];
  bookmarkedEffectIds: string[];
  readEffectIds: string[];
  lastPlayedDate: string | null;
  dailyChallengeQuizId: string | null;
  dailyChallengeDate: string | null;
  lastMysteryBoxOpenDate: string | null;
  lastDailyChallengePlayedDate: string | null;
  totalGemsEarned: number;
  mysteryBoxOpenCount: number;
  perfectQuizCount: number;
  unlockedItemIds: string[];
  activeDrPsySkin: string;
  unlockedArchiveIds: string[];
  completedMissionIds: string[];
  unlockedTestIds: string[];
  readArchiveIds: string[];
  completedTestIds: string[];
  activePersona: PersonaType;
}

export interface UserAccount {
  username: string;
  password: string;
  name: string;
  progress: UserProgress;
}

export interface GameState {
  accounts: UserAccount[];
  activeUsername: string | null;
  isLoggedIn: boolean;
  rememberMe: boolean;
  savedAccount: { username: string; password: string } | null;
}

interface GameContextType extends UserProgress {
  isLoggedIn: boolean;
  userName: string;
  accounts: UserAccount[];
  rememberMe: boolean;
  savedAccount: { username: string; password: string } | null;

  // Actions
  addXp: (amount: number) => void;
  addGems: (amount: number) => void;
  completeQuiz: (quizId: string, isPerfect?: boolean) => void;
  unlockBadge: (badgeId: string) => void;
  checkAndUpdateStreak: () => void;
  setDailyChallenge: (quizId: string) => void;
  isQuizCompleted: (quizId: string) => boolean;
  isBadgeUnlocked: (badgeId: string) => boolean;
  toggleBookmark: (effectId: string) => void;
  isBookmarked: (effectId: string) => boolean;
  markEffectRead: (effectId: string) => void;
  isEffectRead: (effectId: string) => boolean;
  spendGems: (amount: number) => boolean;
  unlockItem: (itemId: string) => void;
  equipSkin: (skinEmoji: string) => void;
  isItemUnlocked: (itemId: string) => boolean;
  recordMysteryBoxOpen: () => void;
  openMysteryBox: () => { success: boolean; reward?: string; type?: 'gems' | 'xp' };
  recordDailyChallengePlayed: () => void;
  canOpenMysteryBox: () => boolean;
  canPlayDailyChallenge: () => boolean;
  pendingCelebration: CelebrationData | null;
  triggerCelebration: (data: CelebrationData) => void;
  clearCelebration: () => void;

  // New Detective Actions
  unlockArchive: (id: string) => void;
  completeMission: (id: string) => void;
  unlockTest: (id: string) => void;
  markArchiveRead: (id: string) => void;
  completeTest: (id: string) => void;
  setPersona: (persona: PersonaType) => void;
  isArchiveUnlocked: (id: string) => boolean;
  isArchiveRead: (id: string) => boolean;
  isMissionCompleted: (id: string) => boolean;
  isTestUnlocked: (id: string) => boolean;
  isTestCompleted: (id: string) => boolean;

  // Auth
  registerAccount: (acc: Omit<UserAccount, 'progress'>) => boolean;
  loginWithCredentials: (username: string, password: string, remember: boolean) => boolean;
  logout: () => void;
}

// ─── Level Calculation ───────────────────────────────────────────────────────
const calculateMaxXp = (level: number): number => 50 + (level - 1) * 30;

// ─── Default Progress ─────────────────────────────────────────────────────────
const createDefaultProgress = (): UserProgress => ({
  level: 1,
  xp: 0,
  maxXp: calculateMaxXp(1),
  streak: 0,
  gems: 200,
  completedQuizIds: [],
  unlockedBadgeIds: [],
  bookmarkedEffectIds: [],
  readEffectIds: [],
  lastPlayedDate: null,
  dailyChallengeQuizId: null,
  dailyChallengeDate: null,
  lastMysteryBoxOpenDate: null,
  lastDailyChallengePlayedDate: null,
  totalGemsEarned: 0,
  mysteryBoxOpenCount: 0,
  perfectQuizCount: 0,
  unlockedItemIds: [],
  activeDrPsySkin: '🐱',
  unlockedArchiveIds: [],
  completedMissionIds: [],
  unlockedTestIds: [],
  readArchiveIds: [],
  completedTestIds: [],
  activePersona: 'default',
});

// ─── Context ─────────────────────────────────────────────────────────────────
const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

// ─── Provider ────────────────────────────────────────────────────────────────
const STORAGE_KEY = '@psy_game_state_v2';
const defaultState: GameState = {
  accounts: [],
  activeUsername: null,
  isLoggedIn: false,
  rememberMe: false,
  savedAccount: null,
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(defaultState);
  const [pendingCelebration, setPendingCelebration] = useState<CelebrationData | null>(null);

  // Load state from AsyncStorage
  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as GameState;
          if (!parsed.accounts) parsed.accounts = [];
          parsed.accounts = parsed.accounts.map(acc => ({
            ...acc,
            progress: acc.progress || createDefaultProgress()
          }));
          setState(parsed);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    };
    loadState();
  }, []);

  // Save state to AsyncStorage
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    };
    saveState();
  }, [state]);

  // Derived state
  const activeUser = useMemo(() => state.accounts.find(a => a.username === state.activeUsername), [state.accounts, state.activeUsername]);
  const activeProgress = useMemo(() => (activeUser && activeUser.progress ? { ...createDefaultProgress(), ...activeUser.progress } : createDefaultProgress()), [activeUser]);

  // Helper: Update progress
  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setState(prev => {
      if (!prev.activeUsername) return prev;
      return {
        ...prev,
        accounts: prev.accounts.map(acc => acc.username === prev.activeUsername ? { ...acc, progress: updater(acc.progress || createDefaultProgress()) } : acc)
      };
    });
  }, []);

  // Actions
  const addXp = useCallback((amount: number) => {
    updateProgress(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;
      let leveledUp = false;
      while (newXp >= newMaxXp) {
        newXp -= newMaxXp;
        newLevel += 1;
        newMaxXp = calculateMaxXp(newLevel);
        leveledUp = true;
      }
      if (leveledUp) setTimeout(() => setPendingCelebration({ type: 'levelUp', level: newLevel }), 1500);
      return { ...prev, xp: newXp, level: newLevel, maxXp: newMaxXp };
    });
  }, [updateProgress]);

  const addGems = useCallback((amount: number) => {
    updateProgress(prev => ({ ...prev, gems: prev.gems + amount, totalGemsEarned: prev.totalGemsEarned + (amount > 0 ? amount : 0) }));
  }, [updateProgress]);

  const completeQuiz = useCallback((quizId: string, isPerfect: boolean = false) => {
    updateProgress(prev => ({
      ...prev,
      completedQuizIds: prev.completedQuizIds.includes(quizId) ? prev.completedQuizIds : [...prev.completedQuizIds, quizId],
      perfectQuizCount: isPerfect ? prev.perfectQuizCount + 1 : prev.perfectQuizCount,
    }));
  }, [updateProgress]);

  const unlockBadge = useCallback((badgeId: string) => {
    updateProgress(prev => prev.unlockedBadgeIds.includes(badgeId) ? prev : { ...prev, unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId] });
  }, [updateProgress]);

  const checkAndUpdateStreak = useCallback(() => {
    updateProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.lastPlayedDate === today) return prev;
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const newStreak = (prev.lastPlayedDate === yesterdayStr) ? prev.streak + 1 : 1;
      return { ...prev, streak: newStreak, lastPlayedDate: today };
    });
  }, [updateProgress]);

  const setDailyChallenge = useCallback((quizId: string) => {
    const today = new Date().toISOString().split('T')[0];
    updateProgress(prev => ({ ...prev, dailyChallengeQuizId: quizId, dailyChallengeDate: today }));
  }, [updateProgress]);

  const isQuizCompleted = useCallback((id: string) => activeProgress.completedQuizIds.includes(id), [activeProgress.completedQuizIds]);
  const isBadgeUnlocked = useCallback((id: string) => activeProgress.unlockedBadgeIds.includes(id), [activeProgress.unlockedBadgeIds]);
  const isBookmarked = useCallback((id: string) => activeProgress.bookmarkedEffectIds.includes(id), [activeProgress.bookmarkedEffectIds]);
  const isEffectRead = useCallback((id: string) => activeProgress.readEffectIds.includes(id), [activeProgress.readEffectIds]);
  const isItemUnlocked = useCallback((id: string) => activeProgress.unlockedItemIds.includes(id), [activeProgress.unlockedItemIds]);

  const toggleBookmark = useCallback((effectId: string) => {
    updateProgress(prev => ({
      ...prev,
      bookmarkedEffectIds: prev.bookmarkedEffectIds.includes(effectId) ? prev.bookmarkedEffectIds.filter(id => id !== effectId) : [...prev.bookmarkedEffectIds, effectId]
    }));
  }, [updateProgress]);

  const markEffectRead = useCallback((effectId: string) => {
    updateProgress(prev => prev.readEffectIds.includes(effectId) ? prev : { ...prev, readEffectIds: [...prev.readEffectIds, effectId] });
  }, [updateProgress]);

  const spendGems = useCallback((amount: number) => {
    if (activeProgress.gems >= amount) {
      updateProgress(prev => ({ ...prev, gems: prev.gems - amount }));
      return true;
    }
    return false;
  }, [activeProgress.gems, updateProgress]);

  const unlockItem = useCallback((itemId: string) => {
    updateProgress(prev => prev.unlockedItemIds.includes(itemId) ? prev : { ...prev, unlockedItemIds: [...prev.unlockedItemIds, itemId] });
  }, [updateProgress]);

  const equipSkin = useCallback((skinEmoji: string) => updateProgress(prev => ({ ...prev, activeDrPsySkin: skinEmoji })), [updateProgress]);

  const canOpenMysteryBox = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return activeProgress.lastMysteryBoxOpenDate !== today;
  }, [activeProgress.lastMysteryBoxOpenDate]);

  const recordMysteryBoxOpen = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    updateProgress(prev => ({ ...prev, lastMysteryBoxOpenDate: today, mysteryBoxOpenCount: (prev.mysteryBoxOpenCount || 0) + 1 }));
  }, [updateProgress]);

  const triggerCelebration = useCallback((data: CelebrationData) => setPendingCelebration(data), []);

  const openMysteryBox = useCallback(() => {
    if (!canOpenMysteryBox()) return { success: false };
    const isGems = Math.random() < 0.7;
    const rewardValue = isGems ? (Math.floor(Math.random() * 26) + 15) : (Math.floor(Math.random() * 71) + 50);
    const rewardString = isGems ? `💎 ${rewardValue} Gems` : `⚡ ${rewardValue} XP`;
    if (isGems) addGems(rewardValue); else addXp(rewardValue);
    recordMysteryBoxOpen();
    triggerCelebration({ type: 'purchase', itemName: rewardString, itemEmoji: '🎁' });
    return { success: true, reward: rewardString, type: (isGems ? 'gems' : 'xp') };
  }, [canOpenMysteryBox, addGems, addXp, recordMysteryBoxOpen, triggerCelebration]);

  const recordDailyChallengePlayed = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    updateProgress(prev => ({ ...prev, lastDailyChallengePlayedDate: today }));
  }, [updateProgress]);

  const canPlayDailyChallenge = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return activeProgress.lastDailyChallengePlayedDate !== today;
  }, [activeProgress.lastDailyChallengePlayedDate]);

  const unlockArchive = useCallback((id: string) => updateProgress(prev => ({ ...prev, unlockedArchiveIds: [...(prev.unlockedArchiveIds || []), id] })), [updateProgress]);
  const markArchiveRead = useCallback((id: string) => updateProgress(prev => ({ ...prev, readArchiveIds: [...(prev.readArchiveIds || []), id] })), [updateProgress]);
  const completeMission = useCallback((id: string) => updateProgress(prev => ({ ...prev, completedMissionIds: [...(prev.completedMissionIds || []), id] })), [updateProgress]);
  const unlockTest = useCallback((id: string) => updateProgress(prev => ({ ...prev, unlockedTestIds: [...(prev.unlockedTestIds || []), id] })), [updateProgress]);
  const completeTest = useCallback((id: string) => updateProgress(prev => ({ ...prev, completedTestIds: [...(prev.completedTestIds || []), id] })), [updateProgress]);

  const setPersona = useCallback((persona: PersonaType) => {
    updateProgress(prev => {
      const personaItemId = `persona_${persona}`;
      const newUnlockedIds = prev.unlockedItemIds.includes(personaItemId) || persona === 'default' ? prev.unlockedItemIds : [...prev.unlockedItemIds, personaItemId];
      return { ...prev, activePersona: persona, unlockedItemIds: newUnlockedIds };
    });
  }, [updateProgress]);

  const isArchiveUnlocked = useCallback((id: string) => (activeProgress.unlockedArchiveIds || []).includes(id), [activeProgress.unlockedArchiveIds]);
  const isArchiveRead = useCallback((id: string) => (activeProgress.readArchiveIds || []).includes(id), [activeProgress.readArchiveIds]);
  const isMissionCompleted = useCallback((id: string) => (activeProgress.completedMissionIds || []).includes(id), [activeProgress.completedMissionIds]);
  const isTestUnlocked = useCallback((id: string) => (activeProgress.unlockedTestIds || []).includes(id), [activeProgress.unlockedTestIds]);
  const isTestCompleted = useCallback((id: string) => (activeProgress.completedTestIds || []).includes(id), [activeProgress.completedTestIds]);

  // Badge Watcher
  useEffect(() => {
    if (!state.isLoggedIn || !state.activeUsername) return;
    const newBadges: string[] = [];
    const p = activeProgress;
    if (p.streak >= 3) newBadges.push('b2');
    if (p.streak >= 7) newBadges.push('b7');
    if (p.streak >= 30) newBadges.push('b8');
    if (p.level >= 5) newBadges.push('b6');
    if (p.level >= 10) newBadges.push('b12');
    if (p.totalGemsEarned >= 100) newBadges.push('b5');
    if (p.totalGemsEarned >= 1000) newBadges.push('b16');
    if (p.readEffectIds.length >= 15) newBadges.push('b9');
    if (p.unlockedItemIds.filter(id => id.startsWith('skin_')).length >= 3) newBadges.push('b10');
    if (['e13', 'e14', 'e15'].every(id => p.unlockedItemIds.includes(id))) newBadges.push('b13');
    if (p.mysteryBoxOpenCount >= 5) newBadges.push('b15');
    if (p.completedQuizIds.length >= 23) newBadges.push('b11');
    if (p.perfectQuizCount >= 5) newBadges.push('b14');
    if (p.completedMissionIds.length >= 1) newBadges.push('b_field_agent');
    if (p.completedMissionIds.length >= 5) newBadges.push('b_mission_expert');
    if (p.completedMissionIds.length >= 10) newBadges.push('b_silent_hunter');
    if (p.unlockedItemIds.filter(id => id.startsWith('persona_')).length >= 6) newBadges.push('b_persona_master');

    const toUnlock = newBadges.filter(id => !p.unlockedBadgeIds.includes(id));
    if (toUnlock.length > 0) {
      updateProgress(prev => ({ ...prev, unlockedBadgeIds: [...prev.unlockedBadgeIds, ...toUnlock] }));
    }
  }, [activeProgress, state.isLoggedIn, state.activeUsername, updateProgress]);

  const clearCelebration = useCallback(() => setPendingCelebration(null), []);

  // Auth Actions
  const registerAccount = useCallback((acc: Omit<UserAccount, 'progress'>) => {
    let success = false;
    setState(prev => {
      if (prev.accounts.find(a => a.username === acc.username)) return prev;
      success = true;
      return { ...prev, accounts: [...prev.accounts, { ...acc, progress: createDefaultProgress() }] };
    });
    return success;
  }, []);

  const loginWithCredentials = useCallback((username: string, password: string, remember: boolean) => {
    const user = state.accounts.find(a => a.username === username && a.password === password);
    if (user) {
      setState(prev => ({ ...prev, isLoggedIn: true, activeUsername: username, rememberMe: remember, savedAccount: remember ? { username, password } : null }));
      return true;
    }
    return false;
  }, [state.accounts]);

  const logout = useCallback(() => setState(prev => ({ ...prev, isLoggedIn: false, activeUsername: null })), []);

  const value: GameContextType = {
    ...activeProgress, isLoggedIn: state.isLoggedIn, userName: activeUser?.name || '', accounts: state.accounts, rememberMe: state.rememberMe, savedAccount: state.savedAccount,
    addXp, addGems, completeQuiz, unlockBadge, checkAndUpdateStreak, setDailyChallenge, isQuizCompleted, isBadgeUnlocked, toggleBookmark, isBookmarked, markEffectRead, isEffectRead, spendGems, unlockItem, equipSkin, isItemUnlocked, recordMysteryBoxOpen, openMysteryBox, recordDailyChallengePlayed, canOpenMysteryBox, canPlayDailyChallenge, pendingCelebration, triggerCelebration, clearCelebration, unlockArchive, completeMission, unlockTest, markArchiveRead, completeTest, setPersona, isArchiveUnlocked, isArchiveRead, isMissionCompleted, isTestUnlocked, isTestCompleted, registerAccount, loginWithCredentials, logout,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
