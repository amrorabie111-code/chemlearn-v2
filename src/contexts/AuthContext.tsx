import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserData, AuthState, calculateQuizXP } from '../types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (updates: Partial<UserData>) => Promise<void>;
  uploadAvatar: (avatarPath: string) => Promise<string>;
  completeLesson: (lessonId: string, courseId: string) => Promise<void>;
  completeQuiz: (courseId: string, score: number) => Promise<void>;
  startQuiz: (courseId: string) => Promise<void>;
  saveQuizProgress: (courseId: string, currentQuestion: number, answers: number[]) => Promise<void>;
  clearCurrentQuiz: () => Promise<void>;
  checkCourseCompletion: (courseId: string, totalLessons: number) => Promise<boolean>;
  isLessonCompleted: (lessonId: string) => boolean;
  isCourseCompleted: (courseId: string) => boolean;
  getQuizHistory: (courseId: string) => number[];
  getQuizStatus: (courseId: string) => 'not-started' | 'in-progress' | 'completed';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_CACHE_KEY_PREFIX = 'chemistry_beacon_user_data';

const getCacheKey = (uid?: string) => (uid ? `${USER_CACHE_KEY_PREFIX}_${uid}` : USER_CACHE_KEY_PREFIX);

const createInitialUserData = (uid: string, email: string, name: string): UserData => ({
  uid,
  name,
  email,
  avatar: '',
  xp: 0,
  lessonsCompleted: 0,
  progress: {},
  completedCourses: {},
  quizHistory: {},
  quizStatus: {},
  currentQuiz: null,
  theme: 'dark',
  language: 'ar',
  createdAt: new Date(),
  updatedAt: new Date()
});

const getCachedUserData = (uid?: string): UserData | null => {
  try {
    const scoped = localStorage.getItem(getCacheKey(uid));
    if (scoped) return JSON.parse(scoped) as UserData;

    // Backward compatibility with old cache key.
    const legacy = localStorage.getItem(getCacheKey());
    return legacy ? (JSON.parse(legacy) as UserData) : null;
  } catch {
    return null;
  }
};

const setCachedUserData = (user: UserData) => {
  try {
    localStorage.setItem(getCacheKey(user.uid), JSON.stringify(user));
    // Keep legacy key in sync for older sessions.
    localStorage.setItem(getCacheKey(), JSON.stringify(user));
  } catch {
    // Ignore cache write errors
  }
};

const toMs = (value: unknown): number => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Date.parse(value) || 0;
  if (value instanceof Date) return value.getTime();
  return 0;
};

const pickBestUserData = (remoteUser: UserData | null, cachedUser: UserData | null): UserData | null => {
  if (!remoteUser && !cachedUser) return null;
  if (!remoteUser) return cachedUser;
  if (!cachedUser) return remoteUser;

  if (cachedUser.uid !== remoteUser.uid) return remoteUser;

  const remoteUpdated = toMs(remoteUser.updatedAt);
  const cachedUpdated = toMs(cachedUser.updatedAt);

  if (cachedUpdated > remoteUpdated) return cachedUser;
  if (remoteUpdated > cachedUpdated) return remoteUser;

  const remoteProgress = Object.keys(remoteUser.progress || {}).length;
  const cachedProgress = Object.keys(cachedUser.progress || {}).length;
  if (cachedProgress > remoteProgress) return cachedUser;

  return remoteUser;
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeUserData = (data: Partial<UserData>, firebaseUser: FirebaseUser): UserData => ({
  uid: firebaseUser.uid,
  name: data.name || firebaseUser.displayName || 'User',
  email: data.email || firebaseUser.email || '',
  avatar: data.avatar || '',
  xp: typeof data.xp === 'number' ? data.xp : 0,
  lessonsCompleted: typeof data.lessonsCompleted === 'number' ? data.lessonsCompleted : 0,
  progress: data.progress || {},
  completedCourses: data.completedCourses || {},
  quizHistory: data.quizHistory || {},
  quizStatus: data.quizStatus || {},
  currentQuiz: data.currentQuiz || null,
  theme: data.theme || 'dark',
  language: data.language || 'ar',
  createdAt: data.createdAt || new Date(),
  updatedAt: data.updatedAt || new Date()
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Load user data from Firestore with timeout
  const loadUserData = async (firebaseUser: FirebaseUser): Promise<UserData | null> => {
    try {
      // Race between Firestore get and timeout
      const userDoc = await withTimeout(getDoc(doc(db, 'users', firebaseUser.uid)), 5000, 'Firestore timeout');
      
      if (userDoc && userDoc.exists()) {
        const data = userDoc.data() as Partial<UserData>;
        const loadedUser = normalizeUserData(data, firebaseUser);
        setCachedUserData(loadedUser);
        return loadedUser;
      }
      return null;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  };

  const loadUserDataWithRetry = async (firebaseUser: FirebaseUser): Promise<UserData | null> => {
    const attempts = 3;
    for (let i = 0; i < attempts; i += 1) {
      const userData = await loadUserData(firebaseUser);
      if (userData) return userData;
      if (i < attempts - 1) {
        await wait(600 * (i + 1));
      }
    }
    return null;
  };

  // Listen to auth state changes
  useEffect(() => {
    console.log('Setting up auth listener...');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed, user:', firebaseUser?.uid || 'null');
      if (firebaseUser) {
        try {
          const remoteUser = await loadUserDataWithRetry(firebaseUser);
          const cachedUser = getCachedUserData(firebaseUser.uid);
          const bestUser = pickBestUserData(remoteUser, cachedUser);

          if (bestUser) {
            setCachedUserData(bestUser);
            setState({
              user: bestUser,
              isLoading: false,
              isAuthenticated: true
            });

            // If local cache is newer/richer, sync it back in background.
            if (cachedUser && remoteUser && bestUser === cachedUser) {
              setDoc(doc(db, 'users', firebaseUser.uid), cachedUser, { merge: true }).catch((err) => {
                console.warn('Background sync failed:', err);
              });
            }
          } else {
            const legacyCached = getCachedUserData(firebaseUser.uid);
            const fallbackUser = legacyCached?.uid === firebaseUser.uid
              ? legacyCached
              : createInitialUserData(
                  firebaseUser.uid,
                  firebaseUser.email || '',
                  firebaseUser.displayName || 'User'
                );
            // Do not write fallback data here; this path can happen during transient
            // network issues and must never overwrite existing remote progress.
            setCachedUserData(fallbackUser);

            setState({
              user: fallbackUser,
              isLoading: false,
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error('Auth state error:', error);
          const cachedUser = getCachedUserData(firebaseUser.uid);
          const fallbackUser = cachedUser?.uid === firebaseUser.uid
            ? cachedUser
            : createInitialUserData(
                firebaseUser.uid,
                firebaseUser.email || '',
                firebaseUser.displayName || 'User'
              );

          setState({
            user: fallbackUser,
            isLoading: false,
            isAuthenticated: true
          });
        }
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const safeEmail = email.trim().toLowerCase();
      const safePassword = password.trim();
      if (!safeEmail || !safePassword) {
        throw new Error('Please enter both email and password.');
      }

      console.log('Attempting login...');
      const result = await signInWithEmailAndPassword(auth, safeEmail, safePassword);
      console.log('Login successful, user:', result.user.uid);
      
      // Force auth state update since listener might be delayed
      const remoteUser = await loadUserDataWithRetry(result.user);
      const cachedUser = getCachedUserData(result.user.uid);
      const bestUser = pickBestUserData(remoteUser, cachedUser);

      if (bestUser) {
        setState({
          user: bestUser,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        const fallbackUser = cachedUser?.uid === result.user.uid
          ? cachedUser
          : createInitialUserData(
              result.user.uid,
              result.user.email || '',
              result.user.displayName || 'User'
            );
        setState({
          user: fallbackUser,
          isLoading: false,
          isAuthenticated: true
        });
      }
      
      return result;
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    const safeName = name.trim();
    const safeEmail = email.trim().toLowerCase();

    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, safeEmail, password);
    await updateProfile(firebaseUser, { displayName: safeName });

    const newUser = createInitialUserData(firebaseUser.uid, safeEmail, safeName);
    setCachedUserData(newUser);
    setState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true
    });

    try {
      await withTimeout(
        setDoc(doc(db, 'users', firebaseUser.uid), newUser, { merge: true }),
        7000,
        'Saving profile timed out'
      );
    } catch (firestoreError) {
      console.warn('Firestore write failed during signup:', firestoreError);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserData = async (updates: Partial<UserData>) => {
    if (!state.user) return;

    const currentUser = state.user;
    const mergedUser = { ...currentUser, ...updates, updatedAt: new Date() };

    // Update local state immediately for responsive UI
    setCachedUserData(mergedUser);
    setState(prev => ({ ...prev, user: mergedUser }));

    // Upsert in Firestore with a timeout; merge prevents missing-doc failures.
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await withTimeout(setDoc(userRef, mergedUser, { merge: true }), 8000, 'Firestore update timeout');

      console.log('Firestore update successful');
    } catch (error: any) {
      console.warn('Firestore update failed (using local only):', error.message);
    }
  };

  const completeLesson = async (lessonId: string, courseId: string) => {
    if (!state.user) return;
    
    const isAlreadyCompleted = state.user.progress[lessonId];
    if (isAlreadyCompleted) return; // Prevent duplicate XP

    const newProgress = { ...state.user.progress, [lessonId]: true };
    const newLessonsCompleted = state.user.lessonsCompleted + 1;
    const newXP = state.user.xp + 10; // 10 XP per lesson

    await updateUserData({
      progress: newProgress,
      lessonsCompleted: newLessonsCompleted,
      xp: newXP
    });
  };

  const completeQuiz = async (courseId: string, score: number) => {
    if (!state.user) return;
    
    const existingHistory = state.user.quizHistory[courseId] || [];
    const newHistory = [...existingHistory, score];
    
    const newQuizHistory = { ...state.user.quizHistory, [courseId]: newHistory };
    const newQuizStatus = { ...state.user.quizStatus, [courseId]: 'completed' };
    
    const xpReward = calculateQuizXP(score);
    const newXP = state.user.xp + xpReward;

    await updateUserData({
      quizHistory: newQuizHistory,
      quizStatus: newQuizStatus,
      xp: newXP,
      currentQuiz: null
    });
  };

  const startQuiz = async (courseId: string) => {
    if (!state.user) return;
    
    const newQuizStatus = { ...state.user.quizStatus, [courseId]: 'in-progress' };
    await updateUserData({
      quizStatus: newQuizStatus,
      currentQuiz: {
        course: courseId,
        currentQuestion: 0,
        answers: []
      }
    });
  };

  const saveQuizProgress = async (courseId: string, currentQuestion: number, answers: number[]) => {
    if (!state.user) return;
    
    await updateUserData({
      currentQuiz: {
        course: courseId,
        currentQuestion,
        answers
      }
    });
  };

  const clearCurrentQuiz = async () => {
    if (!state.user) return;
    await updateUserData({ currentQuiz: null });
  };

  const checkCourseCompletion = async (courseId: string, totalLessons: number): Promise<boolean> => {
    if (!state.user) return false;
    
    const courseLessons = Object.entries(state.user.progress)
      .filter(([key]) => key.startsWith(courseId))
      .filter(([, completed]) => completed);
    
    const isComplete = courseLessons.length >= totalLessons;
    
    if (isComplete && !state.user.completedCourses[courseId]) {
      const newCompletedCourses = { ...state.user.completedCourses, [courseId]: true };
      await updateUserData({ completedCourses: newCompletedCourses });
    }
    
    return isComplete;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return state.user?.progress[lessonId] || false;
  };

  const isCourseCompleted = (courseId: string): boolean => {
    return state.user?.completedCourses[courseId] || false;
  };

  const getQuizHistory = (courseId: string): number[] => {
    return state.user?.quizHistory[courseId] || [];
  };

  const getQuizStatus = (courseId: string): 'not-started' | 'in-progress' | 'completed' => {
    return state.user?.quizStatus[courseId] || 'not-started';
  };

  const uploadAvatar = async (avatarPath: string): Promise<string> => {
    if (!state.user) throw new Error('User not authenticated');
    
    // Save avatar path to Firestore
    await updateUserData({ avatar: avatarPath });
    
    return avatarPath;
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    updateUserData,
    uploadAvatar,
    completeLesson,
    completeQuiz,
    startQuiz,
    saveQuizProgress,
    clearCurrentQuiz,
    checkCourseCompletion,
    isLessonCompleted,
    isCourseCompleted,
    getQuizHistory,
    getQuizStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
