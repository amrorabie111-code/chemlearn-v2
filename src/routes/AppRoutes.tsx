import React, { createContext, useContext, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_ELEMENTS, LESSONS } from '../data/elements';
import { ChemicalElement } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';
import { ROUTES } from './paths';

export type MainLayoutContextValue = {
  requireAuth: () => boolean;
  onLogout: () => Promise<void>;
};

const MainLayoutContext = createContext<MainLayoutContextValue | null>(null);

const useMainLayoutContext = () => {
  const context = useContext(MainLayoutContext);
  if (!context) {
    throw new Error('useMainLayoutContext must be used within MainLayout');
  }
  return context;
};

type RouteComponents = {
  WelcomeScreen: React.FC;
  AuthScreen: React.FC<{ initialMode: 'login' | 'signup' }>;
  Header: React.FC<{ showBack?: boolean }>;
  BottomNav: React.FC;
  ElementsScreen: React.FC<{ onSelectElement: (e: ChemicalElement) => void }>;
  ElementDetailScreen: React.FC<{ element: ChemicalElement }>;
  SearchScreen: React.FC<{ onSelectElement: (e: ChemicalElement) => void }>;
  CoursesScreen: React.FC<{ onSelectCourse: (courseId: string) => void }>;
  CourseDetailScreen: React.FC<{
    courseId: string;
    onBack: () => void;
    onSelectLesson: (lessonId: string) => void;
  }>;
  LessonScreen: React.FC<{
    lesson: import('../types').Lesson;
    onBack: () => void;
    onNextLesson?: (lessonId: string) => void;
  }>;
  QuizScreen: React.FC<{
    canAccessQuiz: boolean;
    onRequireAccount: () => void;
    initialCourseId?: string;
    onCourseSelect?: (courseId: string) => void;
    onQuizHome?: () => void;
  }>;
  ProfileScreen: React.FC<{
    onNavigateToLeaderboard: () => void;
    onNavigateToPrivacyPolicy: () => void;
    onNavigateToAbout: () => void;
    onNavigateToLogin: () => void;
    onNavigateToSignup: () => void;
    onLogout: () => Promise<void>;
  }>;
  LeaderboardScreen: React.FC<{ onBack: () => void }>;
  PrivacyPolicyScreen: React.FC<{ onBack: () => void }>;
  AboutScreen: React.FC<{ onBack: () => void }>;
};

let registeredComponents: RouteComponents | null = null;

export function registerRouteComponents(c: RouteComponents) {
  registeredComponents = c;
}

const useRegisteredComponents = () => {
  if (!registeredComponents) {
    throw new Error('Route components are not registered');
  }
  return registeredComponents;
};

function ElementsPage() {
  const navigate = useNavigate();
  const { ElementsScreen } = useRegisteredComponents();
  return (
    <ElementsScreen
      onSelectElement={(el) => navigate(ROUTES.elementDetail(el.symbol))}
    />
  );
}

function ElementDetailPage() {
  const { symbol } = useParams();
  const { ElementDetailScreen } = useRegisteredComponents();
  const element = ALL_ELEMENTS.find(
    (e) => e.symbol.toLowerCase() === decodeURIComponent(symbol ?? '').toLowerCase()
  ) as ChemicalElement | undefined;
  if (!element) return <Navigate to={ROUTES.elements} replace />;
  return <ElementDetailScreen element={element} />;
}

function SearchPage() {
  const navigate = useNavigate();
  const { SearchScreen } = useRegisteredComponents();
  return (
    <SearchScreen
      onSelectElement={(el) => navigate(ROUTES.elementDetail(el.symbol))}
    />
  );
}

function CoursesPage() {
  const navigate = useNavigate();
  const { requireAuth } = useMainLayoutContext();
  const { CoursesScreen } = useRegisteredComponents();
  return (
    <CoursesScreen
      onSelectCourse={(courseId) => {
        if (requireAuth()) return;
        navigate(ROUTES.courseDetail(courseId));
      }}
    />
  );
}

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useMainLayoutContext();
  const { CourseDetailScreen } = useRegisteredComponents();
  if (!courseId) return <Navigate to={ROUTES.courses} replace />;
  return (
    <CourseDetailScreen
      courseId={courseId}
      onBack={() => navigate(-1)}
      onSelectLesson={(lessonId) => {
        if (requireAuth()) return;
        navigate(ROUTES.lesson(courseId, lessonId));
      }}
    />
  );
}

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { LessonScreen } = useRegisteredComponents();
  const lesson = lessonId ? LESSONS.find((l) => l.id === lessonId) : null;
  if (!lesson || !courseId) return <Navigate to={ROUTES.courses} replace />;
  return (
    <LessonScreen
      lesson={lesson}
      onBack={() => navigate(ROUTES.courseDetail(courseId))}
      onNextLesson={(nextLessonId) => navigate(ROUTES.lesson(courseId, nextLessonId))}
    />
  );
}

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { requireAuth } = useMainLayoutContext();
  const { QuizScreen } = useRegisteredComponents();

  return (
    <QuizScreen
      key={quizId ?? 'home'}
      initialCourseId={quizId}
      canAccessQuiz={isAuthenticated}
      onRequireAccount={() => {
        requireAuth();
      }}
      onCourseSelect={(courseId) => navigate(ROUTES.quiz(courseId))}
      onQuizHome={() => navigate(ROUTES.quizHome)}
    />
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const { onLogout } = useMainLayoutContext();
  const { ProfileScreen } = useRegisteredComponents();
  return (
    <ProfileScreen
      onNavigateToLeaderboard={() => navigate(ROUTES.leaderboard)}
      onNavigateToPrivacyPolicy={() => navigate(ROUTES.privacyPolicy)}
      onNavigateToAbout={() => navigate(ROUTES.about)}
      onNavigateToLogin={() => navigate(ROUTES.login)}
      onNavigateToSignup={() => navigate(ROUTES.signup)}
      onLogout={onLogout}
    />
  );
}

function LeaderboardPage() {
  const navigate = useNavigate();
  const { LeaderboardScreen } = useRegisteredComponents();
  return <LeaderboardScreen onBack={() => navigate(-1)} />;
}

function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const { PrivacyPolicyScreen } = useRegisteredComponents();
  return <PrivacyPolicyScreen onBack={() => navigate(-1)} />;
}

function AboutPage() {
  const navigate = useNavigate();
  const { AboutScreen } = useRegisteredComponents();
  return <AboutScreen onBack={() => navigate(-1)} />;
}

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const { isAuthenticated, logout } = useAuth();
  const { Header, BottomNav } = useRegisteredComponents();
  const [showCourseAccessModal, setShowCourseAccessModal] = useState(false);
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);

  const requireAuth = () => {
    if (!isAuthenticated) {
      setShowCourseAccessModal(true);
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    await logout();
    setShowLogoutSuccessModal(true);
  };

  const layoutContext: MainLayoutContextValue = {
    requireAuth,
    onLogout: handleLogout,
  };

  const isDetail =
    /^\/elements\/[^/]+$/.test(location.pathname) ||
    /^\/courses\/[^/]+$/.test(location.pathname) ||
    /^\/courses\/[^/]+\/lesson\/[^/]+$/.test(location.pathname) ||
    location.pathname === ROUTES.leaderboard ||
    location.pathname === ROUTES.privacyPolicy ||
    location.pathname === ROUTES.about;

  return (
    <motion.div
      className={`min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-white'}`}
    >
      <Header showBack={isDetail} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <MainLayoutContext.Provider value={layoutContext}>
              <Outlet />
            </MainLayoutContext.Provider>
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />

      <AnimatePresence>
        {showCourseAccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowCourseAccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md glass-card rounded-2xl border border-white/10 p-6 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <h3 className="font-headline text-2xl text-white">{t.accountRequired}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{t.accountRequiredMessage}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCourseAccessModal(false)}
                  className="flex-1 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                >
                  {t.close}
                </button>
                <button
                  onClick={() => {
                    setShowCourseAccessModal(false);
                    navigate(ROUTES.signup);
                  }}
                  className="flex-1 py-3 rounded-full bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-opacity"
                >
                  {t.signup}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowLogoutSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md glass-card rounded-2xl border border-white/10 p-6 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <h3 className="font-headline text-2xl text-white">{t.loggedOutSuccess}</h3>
              </div>
              <button
                onClick={() => {
                  setShowLogoutSuccessModal(false);
                  navigate(ROUTES.home, { replace: true });
                }}
                className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-opacity"
              >
                {t.ok}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AppRoutes() {
  const {
    WelcomeScreen,
    AuthScreen,
  } = useRegisteredComponents();

  return (
    <Routes>
      <Route path={ROUTES.home} element={<WelcomeScreen />} />
      <Route path={ROUTES.login} element={<AuthScreen initialMode="login" />} />
      <Route path={ROUTES.signup} element={<AuthScreen initialMode="signup" />} />
      <Route element={<MainLayout />}>
        <Route path={ROUTES.elements} element={<ElementsPage />} />
        <Route path={`${ROUTES.elements}/:symbol`} element={<ElementDetailPage />} />
        <Route path={ROUTES.search} element={<SearchPage />} />
        <Route path={ROUTES.courses} element={<CoursesPage />} />
        <Route path={`${ROUTES.courses}/:courseId`} element={<CourseDetailPage />} />
        <Route path={`${ROUTES.courses}/:courseId/lesson/:lessonId`} element={<LessonPage />} />
        <Route path={ROUTES.quizHome} element={<QuizPage />} />
        <Route path={`${ROUTES.quizHome}/:quizId`} element={<QuizPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.leaderboard} element={<LeaderboardPage />} />
        <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
