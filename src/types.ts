export type ElementCategory = 
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'nonmetal'
  | 'noble gas'
  | 'halogen'
  | 'lanthanide'
  | 'actinide';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  electronConfiguration: string;
  shells: number[];
  state: 'Gas' | 'Liquid' | 'Solid' | 'Unknown';
  category: ElementCategory;
  meltingPoint: string | null;
  boilingPoint: string | null;
  density: string | null;
  discoveredBy: string;
  summary: string;
  imageUrl: string;
}

export type Screen = 'welcome' | 'auth' | 'elements' | 'search' | 'courses' | 'quiz' | 'detail' | 'course-detail' | 'lesson' | 'profile' | 'leaderboard';

export interface LessonSection {
  id: string;
  type: 'title' | 'paragraph' | 'paragraph-with-list' | 'image' | 'diagram' | 'highlight-box' | 'formula-block' | 'law-container' | 'video';
  content?: string;
  items?: string[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
  highlights?: string[];
  icon?: string;
  variant?: 'purple' | 'yellow' | 'blue';
  label?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-3 index
}

export interface QuizHistory {
  [courseId: string]: number[]; // Array of scores (percentages)
}

export interface Lesson {
  id: string;
  courseId: string;
  number: number;
  title: string;
  sections: LessonSection[];
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  lessons: number;
  isFree: boolean;
  isLocked: boolean;
  image: string;
  description: string;
}
