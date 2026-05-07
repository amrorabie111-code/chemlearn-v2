export interface UserData {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  lessonsCompleted: number;
  progress: Record<string, boolean>;
  completedCourses: Record<string, boolean>;
  quizHistory: Record<string, number[]>;
  quizStatus: Record<string, 'not-started' | 'in-progress' | 'completed'>;
  currentQuiz: {
    course: string;
    currentQuestion: number;
    answers: number[];
  } | null;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const QUIZ_XP_REWARDS = {
  excellent: 50, // 90-100
  good: 40,      // 70-89
  average: 30,   // 50-69
  poor: 10       // below 50
};

export const LESSON_XP_REWARD = 10;

export function calculateQuizXP(score: number): number {
  if (score >= 90) return QUIZ_XP_REWARDS.excellent;
  if (score >= 70) return QUIZ_XP_REWARDS.good;
  if (score >= 50) return QUIZ_XP_REWARDS.average;
  return QUIZ_XP_REWARDS.poor;
}

export type UserLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'crystal';

export interface LevelInfo {
  name: string;
  minXP: number;
  borderColor: string;
  glowColor?: string;
}

export const LEVELS: Record<UserLevel, LevelInfo> = {
  bronze: {
    name: 'Bronze',
    minXP: 0,
    borderColor: 'border-amber-700'
  },
  silver: {
    name: 'Silver',
    minXP: 101,
    borderColor: 'border-gray-400'
  },
  gold: {
    name: 'Gold',
    minXP: 301,
    borderColor: 'border-yellow-500'
  },
  platinum: {
    name: 'Platinum',
    minXP: 601,
    borderColor: 'border-blue-400',
    glowColor: 'shadow-[0_0_20px_rgba(96,165,250,0.4)]'
  },
  crystal: {
    name: 'Crystal',
    minXP: 1000,
    borderColor: 'border-purple-500',
    glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]'
  }
};

export function getUserLevel(xp: number): UserLevel {
  if (xp >= 1000) return 'crystal';
  if (xp >= 601) return 'platinum';
  if (xp >= 301) return 'gold';
  if (xp >= 101) return 'silver';
  return 'bronze';
}

export function getLevelInfo(xp: number): LevelInfo {
  const level = getUserLevel(xp);
  return LEVELS[level];
}
