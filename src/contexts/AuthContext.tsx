import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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

const USER_CACHE_KEY = 'chemistry_beacon_user_data';

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

const getCachedUserData = (): UserData | null => {
  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    return cached ? (JSON.parse(cached) as UserData) : null;
  } catch {
    return null;
  }
};

const setCachedUserData = (user: UserData) => {
  try {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
  } catch {
    // Ignore cache write errors
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Load user data from Firestore with timeout
  const loadUserData = async (firebaseUser: FirebaseUser): Promise<UserData | null> => {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Firestore timeout')), 5000);
      });
      
      // Race between Firestore get and timeout
      const userDoc = await Promise.race([
        getDoc(doc(db, 'users', firebaseUser.uid)),
        timeoutPromise
      ]);
      
      if (userDoc && userDoc.exists()) {
        const data = userDoc.data() as UserData;
        const loadedUser = { ...data, uid: firebaseUser.uid };
        setCachedUserData(loadedUser);
        return loadedUser;
      }
      return null;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    console.log('Setting up auth listener...');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed, user:', firebaseUser?.uid || 'null');
      if (firebaseUser) {
        try {
          const userData = await loadUserData(firebaseUser);
          if (userData) {
            setState({
              user: userData,
              isLoading: false,
              isAuthenticated: true
            });
          } else {
            const cachedUser = getCachedUserData();
            const fallbackUser = cachedUser?.uid === firebaseUser.uid
              ? cachedUser
              : createInitialUserData(
                  firebaseUser.uid,
                  firebaseUser.email || '',
                  firebaseUser.displayName || 'User'
                );

            if (!cachedUser) {
              try {
                await setDoc(doc(db, 'users', firebaseUser.uid), fallbackUser);
              } catch (firestoreError) {
                console.warn('Firestore write failed, using local data:', firestoreError);
              }
            }

            setState({
              user: fallbackUser,
              isLoading: false,
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error('Auth state error:', error);
          const cachedUser = getCachedUserData();
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
      console.log('Attempting login...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful, user:', result.user.uid);
      
      // Force auth state update since listener might be delayed
      const userData = await loadUserData(result.user);
      if (userData) {
        setState({
          user: userData,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        const cachedUser = getCachedUserData();
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
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(firebaseUser, { displayName: name });
    
    const newUser = createInitialUserData(firebaseUser.uid, email, name);
    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      setCachedUserData(newUser);
    } catch (firestoreError) {
      console.warn('Firestore write failed during signup:', firestoreError);
      setCachedUserData(newUser);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserData = async (updates: Partial<UserData>) => {
    if (!state.user) return;
    
    // Update local state immediately for responsive UI
    setState(prev => {
      const updatedUser = prev.user ? { ...prev.user, ...updates, updatedAt: new Date() } : null;
      if (updatedUser) setCachedUserData(updatedUser);
      return {
        ...prev,
        user: updatedUser
      };
    });
    
    // Try to update Firestore with a timeout
    try {
      const userRef = doc(db, 'users', state.user.uid);
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Firestore update timeout')), 8000);
      });
      
      await Promise.race([
        updateDoc(userRef, {
          ...updates,
          updatedAt: new Date()
        }),
        timeoutPromise
      ]);
      
      console.log('Firestore update successful');
    } catch (error: any) {
      console.warn('Firestore update failed (using local only):', error.message);
      // Local cache already contains the latest user state
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
