import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTES } from './routes/paths';
import AppRoutes, { registerRouteComponents } from './routes/AppRoutes';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, Search, BookOpen, GraduationCap, ChevronRight, Share2, 
  ArrowLeft, Lightbulb, Zap, Lock, Play, CheckCircle, User
} from 'lucide-react';
import { ALL_ELEMENTS, COURSES, LESSONS, COURSE_QUIZZES, getLocalizedCourse, getLocalizedLesson, getLocalizedQuiz } from './data/elements';
import { ChemicalElement, Course, ElementCategory, Lesson, QuizQuestion } from './types';
import { AtomModel } from './components/AtomModel';
import ChaosButton from './components/ChaosButton';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen, SignupScreen } from './components/auth';
import { UserProfile } from './components/UserProfile';
import { ProfileScreen } from './components/ProfileScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { PrivacyPolicyScreen } from './components/PrivacyPolicyScreen';
import { AboutScreen } from './components/AboutScreen';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage, translations } from './contexts/LanguageContext';
import { calculateQuizXP } from './types/user';

const AdBanner300x250 = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const cfg = document.createElement('script');
    cfg.text = `atOptions = {'key':'4667224bc2d72b32b9ea9f39bba98114','format':'iframe','height':250,'width':300,'params':{}};`;
    ref.current.appendChild(cfg);
    const inv = document.createElement('script');
    inv.src = 'https://www.highperformanceformat.com/4667224bc2d72b32b9ea9f39bba98114/invoke.js';
    inv.async = true;
    ref.current.appendChild(inv);
    return () => { if (ref.current) ref.current.innerHTML = ''; };
  }, []);
  return (
    <div className="flex justify-center my-6">
      <div ref={ref} style={{ width: 300, height: 250 }} />
    </div>
  );
};

const AdNativeBanner = () => {
  useEffect(() => {
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29656390.effectivecpmnetwork.com/df84483d64500455669730e614a8a09f/invoke.js';
    document.body.appendChild(s);
    return () => { if (document.body.contains(s)) document.body.removeChild(s); };
  }, []);
  return <div id="container-df84483d64500455669730e614a8a09f" className="my-6" />;
};

// --- Auth Wrapper ---
const AppWithAuth: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

// --- Auth Screen Wrapper ---
const AuthScreen: React.FC<{ initialMode: 'login' | 'signup' }> = ({ initialMode }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.elements, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return initialMode === 'login' ? (
    <LoginScreen onSwitchToSignup={() => navigate(ROUTES.signup)} />
  ) : (
    <SignupScreen onSwitchToLogin={() => navigate(ROUTES.login)} />
  );
};

// --- Welcome Screen ---

const WelcomeScreen = ({ onStart }: { onStart?: () => void }) => {
  const navigate = useNavigate();
  const handleStart = onStart ?? (() => navigate(ROUTES.elements));
  const { language } = useLanguage();
  const t = translations[language];

  const featuredElements = [
    { number: 1, symbol: 'H', name: language === 'ar' ? 'هيدروجين' : 'Hydrogen', category: 'nonmetal' },
    { number: 6, symbol: 'C', name: language === 'ar' ? 'كربون' : 'Carbon', category: 'nonmetal' },
    { number: 8, symbol: 'O', name: language === 'ar' ? 'أكسجين' : 'Oxygen', category: 'nonmetal' },
    { number: 7, symbol: 'N', name: language === 'ar' ? 'نيتروجين' : 'Nitrogen', category: 'nonmetal' },
    { number: 26, symbol: 'Fe', name: language === 'ar' ? 'حديد' : 'Iron', category: 'transition metal' },
    { number: 79, symbol: 'Au', name: language === 'ar' ? 'ذهب' : 'Gold', category: 'transition metal' },
  ];

  const features = [
    { icon: '⚛️', title: language === 'ar' ? 'الجدول الدوري' : 'Periodic Table', desc: language === 'ar' ? 'استكشف 118 عنصراً كيميائياً مع معلومات تفصيلية عن كل عنصر' : 'Explore all 118 elements with detailed information about each one' },
    { icon: '📚', title: language === 'ar' ? 'دورات تعليمية' : 'Courses', desc: language === 'ar' ? 'دروس تفاعلية في الكيمياء الأساسية، الأحماض، الكهروكيمياء، وغيرها' : 'Interactive lessons in basic chemistry, acids, electrochemistry, and more' },
    { icon: '✍️', title: language === 'ar' ? 'اختبارات تفاعلية' : 'Quizzes', desc: language === 'ar' ? 'اختبر معرفتك بأسئلة متعددة الخيارات وتابع تقدمك' : 'Test your knowledge with multiple-choice questions and track your progress' },
    { icon: '🏆', title: language === 'ar' ? 'لوحة الصدارة' : 'Leaderboard', desc: language === 'ar' ? 'تنافس مع زملائك واربح النقاط لتصبح الأول' : 'Compete with peers, earn XP points, and climb to the top' },
  ];

  return (
    <div className="welcome-screen relative min-h-screen bg-[#16181D] overflow-x-hidden">
      {/* Fixed background particles */}
      <ParticleCanvas />

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-5 pt-5 pb-4 md:p-8">
          <div className="w-full max-w-5xl flex flex-col items-center py-4 md:py-12">
            <header className="mt-2 text-center md:mt-8">
              <div className="welcome-card overflow-hidden bg-white/5 backdrop-blur-sm px-4 py-3 md:p-8 rounded-[1.5rem] md:rounded-2xl border border-white/5 shadow-2xl transition-all duration-700 hover:border-blue-400/20 group">
                <h1 className="font-arabic text-[2.1rem] leading-none sm:text-5xl md:text-7xl font-bold tracking-tighter text-blue-400 drop-shadow-[0_0_20px_rgba(117,159,240,0.3)] select-none transition-colors">
                  منارة الكيمياء
                </h1>
                <div className="mt-3 h-1 w-0 bg-blue-400 group-hover:w-full transition-all duration-500 mx-auto rounded-full" />
              </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full gap-6 md:gap-12">
              <div className="welcome-card overflow-hidden bg-white/5 backdrop-blur-sm px-4 py-3 md:p-8 rounded-[1.25rem] md:rounded-2xl border border-white/5 shadow-2xl transition-all duration-700 hover:border-blue-400/20 group">
                <h2 className="font-arabic text-[1.55rem] sm:text-3xl md:text-5xl font-light text-white/90 tracking-wide select-none group-hover:text-blue-400 transition-colors">
                  {t.welcome}
                </h2>
                <div className="mt-3 h-1 w-0 bg-blue-400 group-hover:w-full transition-all duration-500 mx-auto rounded-full" />
              </div>

              <p className="text-white/70 text-base md:text-lg max-w-xl text-center leading-relaxed px-4">
                {language === 'ar'
                  ? 'منصة تعليمية تفاعلية لتعلم الكيمياء لطلاب المرحلة الثانوية في السودان. استكشف العناصر، وتعلم الدروس، واختبر معرفتك.'
                  : 'An interactive chemistry learning platform for Sudanese secondary school students. Explore elements, take courses, and test your knowledge.'}
              </p>

              <div className="flex flex-col items-center mt-4 md:mt-8 gap-6 relative">
                <ChaosButton onClick={handleStart} label={t.start} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <h3 className="text-center font-arabic text-2xl md:text-4xl font-bold text-white mb-4">
            {language === 'ar' ? 'ماذا نقدم؟' : 'What We Offer'}
          </h3>
          <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h4 className="font-arabic text-lg md:text-xl font-bold text-white mb-2">{f.title}</h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Element Preview Section */}
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <h3 className="text-center font-arabic text-2xl md:text-4xl font-bold text-white mb-4">
            {language === 'ar' ? 'العناصر الأساسية' : 'Key Elements'}
          </h3>
          <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full mb-4" />
          <p className="text-white/50 text-center text-sm md:text-base mb-12 max-w-lg mx-auto">
            {language === 'ar'
              ? 'نظرة سريعة على بعض العناصر المهمة في الجدول الدوري'
              : 'A quick look at some important elements in the periodic table'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {featuredElements.map((el) => (
              <div key={el.symbol}
                className="glass-card rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(ROUTES.elementDetail(el.symbol))}
              >
                <div className={`text-2xl md:text-3xl font-bold mb-1 ${
                  el.category === 'nonmetal' ? 'text-blue-400' : 'text-yellow-400'
                }`}>
                  {el.symbol}
                </div>
                <div className="text-white/40 text-xs">{el.number}</div>
                <div className="text-white/70 text-xs mt-1 font-medium truncate">{el.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Preview Section */}
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <h3 className="text-center font-arabic text-2xl md:text-4xl font-bold text-white mb-4">
            {language === 'ar' ? 'دوراتنا' : 'Our Courses'}
          </h3>
          <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COURSES.slice(0, 4).map((course) => {
              const localizedCourse = getLocalizedCourse(course, language);
              return (
                <div key={course.id}
                  className="glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(ROUTES.courses)}
                >
                  <div className="h-32 overflow-hidden relative bg-black/40">
                    <img src={course.image} alt={localizedCourse.title} className="w-full h-full object-cover opacity-60 hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-arabic text-lg font-bold text-white mb-1">{localizedCourse.title}</h4>
                    <p className="text-white/50 text-sm">{course.lessons} {language === 'ar' ? 'دروس' : 'lessons'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 md:py-24 text-center">
          <div className="max-w-lg mx-auto">
            <h3 className="font-arabic text-2xl md:text-3xl font-bold text-white mb-4">
              {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
            </h3>
            <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
              {language === 'ar'
                ? 'انطلق في رحلة شيقة لاستكشاف عالم الكيمياء. تعلم، اختبر، وتفوق!'
                : 'Embark on an exciting journey to explore the world of chemistry. Learn, test, and excel!'}
            </p>
            <ChaosButton onClick={() => navigate(ROUTES.elements)} label={language === 'ar' ? 'ابدأ الاستكشاف' : 'Start Exploring'} />
          </div>
        </section>

        <div className="flex justify-center py-8">
          <AdBanner300x250 />
        </div>

        {/* Footer */}
        <footer className="px-6 py-8 text-center text-white/30 text-xs md:text-sm font-medium tracking-widest select-none border-t border-white/5">
          CHEMISTRY LIGHTHOUSE &copy; 2024 &mdash; {language === 'ar' ? 'منارة الكيمياء' : 'Chemistry Beacon'}
        </footer>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();
  const t = translations[language];
  const tabs: { path: string; matchPrefix?: boolean; icon: any; label: string; isProfile?: boolean }[] = [
    { path: ROUTES.elements, matchPrefix: true, icon: LayoutGrid, label: t.elements },
    { path: ROUTES.search, icon: Search, label: t.search },
    { path: ROUTES.courses, matchPrefix: true, icon: BookOpen, label: t.coursesTab },
    { path: ROUTES.quizHome, matchPrefix: true, icon: GraduationCap, label: t.quiz },
    { path: ROUTES.profile, isProfile: true, icon: user?.avatar ? undefined : User, label: t.profile },
  ];

  const isTabActive = (tab: (typeof tabs)[number]) => {
    if (tab.matchPrefix) {
      return location.pathname === tab.path || location.pathname.startsWith(`${tab.path}/`);
    }
    return location.pathname === tab.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-neutral-950/60 backdrop-blur-2xl z-50 rounded-t-3xl border-t border-white/10 flex justify-around items-center px-4 pt-3 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => {
        const isActive = isTabActive(tab);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`bottom-nav-button flex flex-col items-center justify-center transition-all duration-300 relative ${
              isActive ? 'text-primary-container' : 'text-white/40 hover:text-white/80'
            }`}
          >
            {tab.isProfile && user?.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className={`w-6 h-6 mb-1 rounded-full object-cover border-2 ${
                  isActive ? 'border-primary-container' : 'border-white/40'
                }`}
              />
            ) : tab.icon ? (
              <tab.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-primary-container/20' : ''}`} />
            ) : null}
            <span className="font-display text-[10px] uppercase font-medium tracking-widest">{tab.label}</span>
            {isActive && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -bottom-2 w-1 h-1 bg-primary-container rounded-full shadow-[0_0_8px_#22c55e]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const Header = ({ showBack }: { showBack?: boolean }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="bg-neutral-950/40 backdrop-blur-2xl fixed top-0 w-full z-50 border-b border-white/10 flex justify-between items-center px-6 py-4 flex-nowrap">
      <div className="flex items-center gap-3 flex-nowrap shrink-0">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 -ml-2 text-white/60 hover:text-primary-container transition-all shrink-0">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <button 
          onClick={() => navigate(ROUTES.elements)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer shrink-0"
        >
          <h1 className="font-display text-lg md:text-xl font-bold text-primary-container drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] tracking-tight whitespace-nowrap">
            {t.appTitle}
          </h1>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <img src="/images/sudan-flag.png" alt="Sudan Flag" className="w-7 h-7 rounded-full object-cover shrink-0" />
        <img src="/images/ministry-logo.png" alt="Ministry of Education" className="w-8 h-8 rounded-full object-cover bg-white shrink-0" />
      </div>
    </header>
  );
};

// --- Screen Components ---

const getCategoryClass = (category: ElementCategory): string => {
  const classMap: Record<ElementCategory, string> = {
    'alkali metal': 'element-alkali',
    'alkaline earth metal': 'element-alkaline',
    'transition metal': 'element-transition',
    'post-transition metal': 'element-post-transition',
    'metalloid': 'element-metalloid',
    'nonmetal': 'element-nonmetal',
    'halogen': 'element-halogen',
    'noble gas': 'element-noble',
    'lanthanide': 'element-lanthanide',
    'actinide': 'element-actinide'
  };
  return classMap[category] || '';
};

const categoryOrder: ElementCategory[] = [
  'alkali metal', 'alkaline earth metal', 'transition metal',
  'post-transition metal', 'metalloid', 'nonmetal',
  'halogen', 'noble gas', 'lanthanide', 'actinide'
];

const categoryLabels: Record<ElementCategory, string> = {
  'alkali metal': 'Alkali Metals',
  'alkaline earth metal': 'Alkaline Earth Metals',
  'transition metal': 'Transition Metals',
  'post-transition metal': 'Post-Transition Metals',
  'metalloid': 'Metalloids',
  'nonmetal': 'Nonmetals',
  'halogen': 'Halogens',
  'noble gas': 'Noble Gases',
  'lanthanide': 'Lanthanides',
  'actinide': 'Actinides'
};

const categoryLabelKeys: Record<ElementCategory, string> = {
  'alkali metal': 'alkaliMetal',
  'alkaline earth metal': 'alkalineEarthMetal',
  'transition metal': 'transitionMetal',
  'post-transition metal': 'postTransitionMetal',
  'metalloid': 'metalloid',
  'nonmetal': 'nonmetal',
  'halogen': 'halogen',
  'noble gas': 'nobleGas',
  'lanthanide': 'lanthanide',
  'actinide': 'actinide'
};

const getCategoryLabel = (category: ElementCategory, t: any): string => {
  const key = categoryLabelKeys[category];
  return (key && t?.[key]) || categoryLabels[category] || category;
};

const getElementName = (symbol: string, fallbackName: string, t: any): string => {
  return t?.elementNames?.[symbol] || fallbackName;
};

const getStateLabel = (state: string, t: any): string => {
  switch (state) {
    case 'Solid': return t?.solid || state;
    case 'Liquid': return t?.liquid || state;
    case 'Gas': return t?.gas || state;
    default: return t?.unknown || state;
  }
};

const ElementsScreen = ({ onSelectElement }: { onSelectElement: (e: ChemicalElement) => void }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<ElementCategory | 'all'>('all');
  const [sortMode, setSortMode] = useState<'atomic' | 'category'>('atomic');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en-US'),
    [language]
  );

  const categories: (ElementCategory | 'all')[] = [
    'all', 'alkali metal', 'alkaline earth metal', 'transition metal',
    'post-transition metal', 'metalloid', 'nonmetal', 'halogen', 'noble gas',
    'lanthanide', 'actinide'
  ];

  const handleCategoryClick = (cat: ElementCategory | 'all') => {
    setActiveCategory(cat);
    if (cat !== 'all' && sortMode === 'category' && categoryRefs.current[cat]) {
      categoryRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const groupedElements = useMemo(() => {
    const groups: Record<string, ChemicalElement[]> = {};
    categoryOrder.forEach(cat => {
      groups[cat] = ALL_ELEMENTS.filter(el => el.category === cat);
    });
    return groups;
  }, []);

  const renderElementCard = (el: ChemicalElement) => {
    const isDimmed = activeCategory !== 'all' && el.category !== activeCategory;
    return (
      <motion.button
        key={el.number}
        onClick={() => onSelectElement(el)}
        animate={{ opacity: isDimmed ? 0.15 : 1, scale: isDimmed ? 0.95 : 1 }}
        transition={{ duration: 0.3 }}
        className={`element-grid-card aspect-square glass-card rounded-xl p-2 flex flex-col items-center justify-between relative group transition-colors ${getCategoryClass(el.category)}`}
      >
        <span className="absolute top-1 left-1.5 font-data text-[8px] text-white/40">{numberFormatter.format(el.number)}</span>
        <span className="font-display text-lg text-white mt-1 group-hover:scale-110 transition-transform">{el.symbol}</span>
        <span className="font-label text-[7px] text-on-surface-variant truncate w-full text-center">
          {getElementName(el.symbol, el.name, t)}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="font-headline text-3xl text-primary-container">{t.elements}</h2>
        <p className="text-on-surface-variant text-sm mt-1">{t.exploreElements}</p>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-6 sticky top-20 z-40 py-2 -mx-6 px-6">
        {/* Sort Toggle Button */}
        <button
          onClick={() => setSortMode(prev => prev === 'atomic' ? 'category' : 'atomic')}
          className={`flex-none w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
            sortMode === 'category'
              ? 'bg-primary-container text-on-primary-container border-primary-container shadow-[0_0_12px_rgba(251,191,36,0.4)]'
              : 'glass-card text-white/60 border-white/10 hover:text-white hover:border-white/30'
          }`}
          title={sortMode === 'atomic' ? t.sortByCategory : t.sortByAtomicNumber}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sortMode === 'atomic' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            )}
          </svg>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`flex-none px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-primary-container text-on-primary-container border-primary-container shadow-[0_0_12px_rgba(251,191,36,0.4)]' 
                : 'glass-card text-white/40 border-white/5 hover:text-white'
            }`}
          >
            {cat === 'all' ? t.all : getCategoryLabel(cat as ElementCategory, t)}
          </button>
        ))}
      </div>

      {sortMode === 'atomic' ? (
        // Default: Grid view by atomic number
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {ALL_ELEMENTS.map((el) => renderElementCard(el))}
        </div>
      ) : (
        // Category grouped view
        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const elements = groupedElements[cat];
            if (elements.length === 0) return null;
            const isHighlighted = activeCategory === 'all' || activeCategory === cat;
            
            return (
              <div 
                key={cat}
                ref={(el) => { categoryRefs.current[cat] = el; }}
                className={`transition-opacity duration-300 ${!isHighlighted ? 'opacity-30' : 'opacity-100'}`}
              >
                <h3 className={`font-headline text-xl mb-3 flex items-center gap-2 ${getCategoryClass(cat).replace('element-', 'text-')}`}>
                  <span className={`w-3 h-3 rounded-full ${getCategoryClass(cat).replace('element-', 'bg-')}`} />
                  {getCategoryLabel(cat, t)}
                  <span className="text-white/40 text-sm font-normal">({elements.length})</span>
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {elements.map((el) => renderElementCard(el))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CourseCard = ({ course, onClick }: { course: Course, onClick: () => void }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const localizedCourse = getLocalizedCourse(course, language);
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left"
    >
      <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary-container/30 transition-all">
        <div className="h-28 overflow-hidden relative">
          <img src={course.image} alt={localizedCourse.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4 relative">
          <h3 className="text-white font-headline font-semibold mb-2 text-sm leading-tight">{localizedCourse.title}</h3>
          <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-medium tracking-wide uppercase">
            <BookOpen className="w-3 h-3" />
            <span>{localizedCourse.lessons} {t.lessons}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const CoursesScreen = ({ onSelectCourse }: { onSelectCourse: (courseId: string) => void }) => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-10">
      <section>
        <h2 className="font-headline text-3xl text-primary-container mb-2">{t.coursesTab}</h2>
        <p className="text-on-surface-variant text-sm">{t.masterArchitecture}</p>
      </section>

      {/* 2-column grid - courses already in correct order in COURSES array */}
      <div className="grid grid-cols-2 gap-4">
        {COURSES.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={() => onSelectCourse(course.id)} 
          />
        ))}
      </div>
    </div>
  );
};

const ElementDetailScreen = ({ element }: { element: ChemicalElement }) => {
  const [imageError, setImageError] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en-US'),
    [language]
  );

  const formatNumericText = (value: string): string => {
    if (language !== 'ar') return value;
    return value.replace(/[0-9]+(?:\.[0-9]+)?/g, (m) => numberFormatter.format(Number(m)));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [element.number]);

  return (
    <div className="pb-32 pt-20 px-6 max-w-5xl mx-auto space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-8xl text-primary-container drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              {element.symbol}
            </span>
            <div>
              <h2 className="font-headline text-4xl text-white">{getElementName(element.symbol, element.name, t)}</h2>
              <span className="font-label text-xs text-primary-container tracking-[0.2em] uppercase font-bold">
                {getCategoryLabel(element.category, t)} â€¢ {t.atomicNo} {numberFormatter.format(element.number)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-5 glass-card rounded-3xl overflow-hidden p-4 min-h-[300px] flex items-center justify-center">
          <AtomModel atomicNumber={element.number} shells={element.shells} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-64 rounded-3xl overflow-hidden glass-card group">
          {!imageError ? (
            <img 
              src={element.imageUrl} 
              alt={element.name} 
              onError={() => setImageError(true)}
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-8xl font-display text-primary-container/20">
               {element.symbol}
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="font-label text-[10px] text-primary-container bg-neutral-950/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 font-bold uppercase tracking-widest">
              {t.physicalState}
            </span>
            <p className="font-headline text-2xl text-white mt-1">{getStateLabel(element.state, t)}</p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 flex flex-col justify-center border-l-4 border-primary-container">
          <Lightbulb className="w-10 h-10 text-primary-container mb-4" />
          <h3 className="font-headline text-2xl text-white mb-2">{t.didYouKnow}</h3>
          <p className="font-body text-lg text-on-surface-variant italic leading-relaxed">
            {language === 'ar'
              ? `"${t.didYouKnowFacts?.[element.symbol] || `${getElementName(element.symbol, element.name, t)} Ù‡Ùˆ Ø¹Ù†ØµØ± ÙƒÙŠÙ…ÙŠØ§Ø¦ÙŠ Ø±Ù…Ø²Ù‡ ${element.symbol} ÙˆØ¹Ø¯Ø¯Ù‡ Ø§Ù„Ø°Ø±ÙŠ ${numberFormatter.format(element.number)}.`}"`
              : `"${element.summary.split('.')[0]}."`}
          </p>
        </div>
      </section>

      <div className="glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {[
          { label: t.atomicMass, value: formatNumericText(element.atomicMass), primary: true },
          { label: t.state, value: getStateLabel(element.state, t) },
          { label: t.density, value: element.density ? `${formatNumericText(element.density)} g/cmÂ³` : t.na },
          { label: t.discoveredBy, value: element.discoveredBy },
          { label: t.meltingPoint, value: element.meltingPoint ? `${formatNumericText(element.meltingPoint)}Â°C` : t.na },
          { label: t.boilingPoint, value: element.boilingPoint ? `${formatNumericText(element.boilingPoint)}Â°C` : t.na },
          { label: t.config, value: element.electronConfiguration },
          { label: t.shells, value: language === 'ar' ? element.shells.map(n => numberFormatter.format(n)).join(', ') : element.shells.join(', ') },
        ].map((prop, idx) => (
          <div key={idx}>
            <p className="font-label text-sm text-white/40 uppercase tracking-widest mb-1 font-bold">{prop.label}</p>
            <p className={`font-data text-2xl ${prop.primary ? 'text-primary-container shadow-primary-container/20 drop-shadow-sm' : 'text-white'}`}>
              {prop.value}
            </p>
          </div>
        ))}
      </div>

      <AdBanner300x250 />
    </div>
  );
};

// Quiz History Storage
const getQuizHistory = (): Record<string, number[]> => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('chemistry_beacon_quiz_history');
  return stored ? JSON.parse(stored) : {};
};

const saveQuizHistory = (history: Record<string, number[]>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('chemistry_beacon_quiz_history', JSON.stringify(history));
};

// Quiz Home Screen - Shows course cards (single column like Trending Elements)
const QuizHomeScreen = ({
  onSelectCourse
}: {
  onSelectCourse: (courseId: string) => void;
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Define specific order for courses
  const courseOrder = [
    'basic-chemistry',
    'acids-bases',
    'electrochemistry',
    'thermochemistry',
    'organic-chemistry',
    'nuclear-chemistry'
  ];

  const orderedCourses = courseOrder
    .map(id => COURSES.find(c => c.id === id))
    .filter((c): c is Course => c !== undefined);
  const localizedOrderedCourses = orderedCourses.map((course) => ({
    course,
    localizedCourse: getLocalizedCourse(course, language)
  }));

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-10">
      <section>
        <h2 className="font-headline text-3xl text-primary-container mb-2">{t.quiz}</h2>
        <p className="text-on-surface-variant text-sm">{t.testYourKnowledge}</p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {localizedOrderedCourses.map(({ course, localizedCourse }) => (
          <motion.button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card rounded-2xl overflow-hidden group hover:border-primary-container/30 transition-all text-left"
          >
            <div className="h-32 bg-black/40 overflow-hidden relative">
              <img
                src={course.image}
                alt={localizedCourse.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2 glass-card px-2 py-0.5 rounded text-xs font-data text-white/60 font-bold">
                20 Q
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="font-display text-xl text-white">{localizedCourse.title}</span>
                <h3 className="text-on-surface-variant text-xs">{localizedCourse.description.slice(0, 40)}...</h3>
              </div>
              <div className="w-1 h-6 rounded-full bg-primary-container shadow-[0_0_8px_#22c55e]" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Quiz Intro Screen - Shows course info and history
const QuizIntroScreen = ({ 
  courseId, 
  onStart, 
  onBack 
}: { 
  courseId: string; 
  onStart: () => void;
  onBack: () => void;
}) => {
  const { getQuizHistory, startQuiz } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const course = COURSES.find(c => c.id === courseId);
  const history = getQuizHistory(courseId);

  const handleStart = () => {
    startQuiz(courseId);
    onStart();
  };

  if (!course) return null;
  const localizedCourse = getLocalizedCourse(course, language);

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-8">
      <button 
        onClick={onBack}
        className="keep-white-button flex items-center gap-2 text-white/60 hover:text-primary-container transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-label text-sm uppercase tracking-widest">{t.backToQuizzes}</span>
      </button>

      {/* Big Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl overflow-hidden neon-glow"
      >
        <div className="h-56 w-full relative bg-gradient-to-br from-surface-container-high to-surface-container overflow-hidden">
          <img
            src={course.image}
            alt={localizedCourse.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h2 className="font-display text-2xl text-white mb-1">{localizedCourse.title} {t.quiz}</h2>
            <p className="text-on-surface-variant text-sm">{localizedCourse.description}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <GraduationCap className="w-4 h-4" />
              <span>20 {t.questions}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Zap className="w-4 h-4" />
              <span>{t.testYourKnowledgeShort}</span>
            </div>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">
            {t.quizDescription} {localizedCourse.title} {t.quizDescription2}
          </p>

          <motion.button
            onClick={handleStart}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-full font-display font-bold uppercase tracking-widest bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all"
          >
            {t.startQuiz}
          </motion.button>
        </div>
      </motion.div>

      {/* History Section */}
      <div className="space-y-4">
        <h3 className="font-headline text-xl text-white">{t.historyResults}</h3>
        
        {history.length === 0 ? (
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-white/50 text-sm">{t.noQuizAttempts}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((score, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl p-4 flex items-center justify-between"
              >
                <span className="text-white/70 text-sm">Attempt {index + 1}</span>
                <span className={`font-display text-lg font-bold ${
                  score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {score}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Quiz Play Screen - Shows one question at a time
const QuizPlayScreen = ({ 
  courseId, 
  onFinish, 
  onBack 
}: { 
  courseId: string; 
  onFinish: (score: number, total: number) => void;
  onBack: () => void;
}) => {
  const { saveQuizProgress } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const originalQuiz = useMemo(
    () => getLocalizedQuiz(courseId, language),
    [courseId, language]
  );
  const [shuffledQuiz, setShuffledQuiz] = useState<QuizQuestion[]>(() => shuffleArray(originalQuiz));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Shuffle questions only when the course or language changes
  useEffect(() => {
    if (originalQuiz && originalQuiz.length > 0) {
      setShuffledQuiz(shuffleArray(originalQuiz));
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setHasAnswered(false);
    }
  }, [originalQuiz]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  if (!shuffledQuiz) return null;

  const currentQuestion = shuffledQuiz[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuiz.length) * 100;

  const handleAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Save progress to Firestore
    saveQuizProgress(courseId, currentIndex + 1, newAnswers);
    
    if (currentIndex < shuffledQuiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // Calculate score
      const correctCount = newAnswers.reduce((count, answer, idx) => {
        return count + (answer === shuffledQuiz[idx].correctAnswer ? 1 : 0);
      }, 0);
      onFinish(correctCount, shuffledQuiz.length);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="keep-white-button flex items-center gap-2 text-white/60 hover:text-primary-container transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-label text-sm uppercase tracking-widest">{t.exit}</span>
        </button>
        <span className="text-white/60 text-sm">
          {t.question} {currentIndex + 1} / {shuffledQuiz.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-primary-container shadow-[0_0_12px_rgba(251,191,36,0.8)]"
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="glass-card rounded-2xl p-6 space-y-6"
      >
        <h3 className="text-white text-lg font-medium leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={hasAnswered}
              whileTap={!hasAnswered ? { scale: 0.98 } : undefined}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                hasAnswered
                  ? idx === currentQuestion.correctAnswer
                    ? 'bg-green-500/20 border-2 border-green-500 text-white'
                    : selectedAnswer === idx
                    ? 'bg-red-500/20 border-2 border-red-500 text-white'
                    : 'bg-white/5 border-2 border-transparent text-white/50'
                  : selectedAnswer === idx
                  ? 'bg-primary-container/20 border-2 border-primary-container text-white'
                  : 'bg-white/5 border-2 border-transparent hover:border-white/20 text-white/80'
              }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-center ${
              isCorrect 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            <p className={isCorrect ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
              {isCorrect ? t.correctWellDone : t.incorrectAnswer}
            </p>
          </motion.div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-full font-display font-bold uppercase tracking-widest transition-all ${
            selectedAnswer !== null
              ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          {currentIndex < shuffledQuiz.length - 1 ? t.nextQuestion : t.finishQuiz}
        </button>
      </motion.div>
    </div>
  );
};

// Quiz Result Screen - Shows final score
const QuizResultScreen = ({ 
  courseId,
  score, 
  total, 
  onRetry, 
  onBack 
}: { 
  courseId: string;
  score: number; 
  total: number; 
  onRetry: () => void;
  onBack: () => void;
}) => {
  const { completeQuiz, user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const percentage = Math.round((score / total) * 100);
  const hasSaved = useRef(false);
  
  let message = '';
  let color = '';
  if (percentage >= 90) {
    message = t.outstanding;
    color = 'text-green-400';
  } else if (percentage >= 70) {
    message = t.greatJobWellDone;
    color = 'text-yellow-400';
  } else if (percentage >= 50) {
    message = t.goodEffort;
    color = 'text-orange-400';
  } else {
    message = t.keepStudying;
    color = 'text-red-400';
  }

  const xpEarned = calculateQuizXP(percentage);

  // Save to Firestore via auth context (with guard to prevent double recording in StrictMode)
  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;
    
    // Save to Firestore and award XP
    completeQuiz(courseId, percentage);
  }, [courseId, percentage, completeQuiz]);

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-6">
        {/* Score Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-40 h-40 mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-xl" />
          <div className="relative w-full h-full rounded-full glass-card flex flex-col items-center justify-center border-4 border-primary-container/30">
            <span className="font-display text-5xl font-bold text-white">{percentage}%</span>
            <span className="text-white/50 text-sm mt-1">{score}/{total} {t.correct}</span>
          </div>
        </motion.div>

        {/* XP Earned Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30"
        >
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="font-display text-lg text-yellow-400">+{xpEarned} XP</span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`font-headline text-2xl ${color}`}>{message}</h2>
          <p className="text-white/60 text-sm mt-2">
            {t.answeredCorrectly.replace('{score}', score.toString()).replace('{total}', total.toString())}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 pt-4"
        >
          <button
            onClick={onRetry}
            className="w-full py-4 rounded-full font-display font-bold uppercase tracking-widest bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all"
          >
            {t.tryAgain}
          </button>
          <button
            onClick={onBack}
            className="w-full py-4 rounded-full font-display font-bold uppercase tracking-widest bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            {t.backToQuizIntro}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Main Quiz Screen Component
const QuizScreen = ({
  canAccessQuiz,
  onRequireAccount,
  initialCourseId,
  onCourseSelect,
  onQuizHome,
}: {
  canAccessQuiz: boolean;
  onRequireAccount: () => void;
  initialCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
  onQuizHome?: () => void;
}) => {
  const [quizState, setQuizState] = useState<'home' | 'intro' | 'play' | 'result'>(
    initialCourseId ? 'intro' : 'home'
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId ?? '');
  const [result, setResult] = useState({ score: 0, total: 0 });

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
      setQuizState('intro');
    } else {
      setSelectedCourseId('');
      setQuizState('home');
    }
  }, [initialCourseId]);

  const handleSelectCourse = (courseId: string) => {
    if (!canAccessQuiz) {
      onRequireAccount();
    }
    if (onCourseSelect) {
      onCourseSelect(courseId);
    } else {
      setSelectedCourseId(courseId);
      setQuizState('intro');
    }
  };

  const handleStart = () => {
    setQuizState('play');
  };

  const handleFinish = (score: number, total: number) => {
    setResult({ score, total });
    setQuizState('result');
  };

  const handleRetry = () => {
    setQuizState('play');
  };

  const handleBackToHome = () => {
    if (onQuizHome) {
      onQuizHome();
    } else {
      setQuizState('home');
      setSelectedCourseId('');
    }
  };

  const handleBackToIntro = () => {
    setQuizState('intro');
  };

  switch (quizState) {
    case 'home':
      return <QuizHomeScreen onSelectCourse={handleSelectCourse} />;
    case 'intro':
      return <QuizIntroScreen courseId={selectedCourseId} onStart={handleStart} onBack={handleBackToHome} />;
    case 'play':
      return <QuizPlayScreen courseId={selectedCourseId} onFinish={handleFinish} onBack={handleBackToIntro} />;
    case 'result':
      return <QuizResultScreen courseId={selectedCourseId} score={result.score} total={result.total} onRetry={handleRetry} onBack={handleBackToIntro} />;
    default:
      return null;
  }
};

// Lesson Screen Component with Quiz
const LessonScreen = ({ lesson, onBack, onNextLesson }: { lesson: Lesson, onBack: () => void, onNextLesson?: (lessonId: string) => void }) => {
  const { completeLesson, isLessonCompleted, user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const localizedLesson = useMemo(() => getLocalizedLesson(lesson, language), [lesson, language]);
  const localizedLessonCourse = useMemo(() => {
    const baseCourse = COURSES.find((course) => course.id === lesson.courseId);
    return baseCourse ? getLocalizedCourse(baseCourse, language) : null;
  }, [lesson.courseId, language]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const quizSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Check if lesson is already completed
  useEffect(() => {
    setLessonCompleted(isLessonCompleted(lesson.id));
  }, [lesson.id, isLessonCompleted, user?.progress]);
  
  // Get next lesson info
  const nextLesson = useMemo(() => {
    return LESSONS.find(l => l.courseId === lesson.courseId && l.number === lesson.number + 1);
  }, [lesson]);

  // Reset all quiz states when lesson changes and scroll to top
  useEffect(() => {
    // Reset all quiz-related states
    setSelectedAnswer(null);
    setQuizState('idle');
    setIsNextEnabled(false);
    
    // Load a new random question for this lesson
    if (localizedLesson.quiz && localizedLesson.quiz.length > 0) {
      setCurrentQuestionIndex(Math.floor(Math.random() * localizedLesson.quiz.length));
    }
    
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, [lesson.id, localizedLesson.quiz]);

  const currentQuestion = localizedLesson.quiz?.[currentQuestionIndex];

  const getEmbeddableVideoUrl = (videoUrl?: string): string | null => {
    if (!videoUrl) return null;

    try {
      const parsedUrl = new URL(videoUrl);
      const hostname = parsedUrl.hostname.replace(/^www\./, '');

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        if (parsedUrl.pathname === '/watch') {
          const videoId = parsedUrl.searchParams.get('v');
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
        if (parsedUrl.pathname.startsWith('/embed/')) {
          return videoUrl;
        }
      }

      if (hostname === 'youtu.be') {
        const videoId = parsedUrl.pathname.replace('/', '');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      return videoUrl;
    } catch {
      return null;
    }
  };

  // Helper to highlight keywords in text
  const renderHighlightedText = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) return text;

    const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const normalizedHighlights = [...new Set(
      highlights
        .map((word) => word?.trim())
        .filter((word): word is string => Boolean(word))
    )].sort((a, b) => b.length - a.length);

    if (normalizedHighlights.length === 0) return text;

    const regex = new RegExp(normalizedHighlights.map(escapeRegExp).join('|'), 'giu');
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(regex)) {
      const start = match.index ?? 0;
      const matchedText = match[0];
      const end = start + matchedText.length;

      if (start > lastIndex) {
        parts.push(<span key={`text-${start}`}>{text.slice(lastIndex, start)}</span>);
      }

      parts.push(
        <span key={`highlight-${start}`} className="text-primary-container font-semibold">
          {matchedText}
        </span>
      );

      lastIndex = end;
    }

    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setQuizState('correct');
      setIsNextEnabled(true);
      setLessonCompleted(true);
      // Mark lesson as completed and award XP
      completeLesson(lesson.id, lesson.courseId);
    } else {
      setQuizState('wrong');
    }
  };

  const handleRetry = () => {
    // Get a different random question
    if (localizedLesson.quiz && localizedLesson.quiz.length > 1) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * localizedLesson.quiz.length);
      } while (newIndex === currentQuestionIndex);
      setCurrentQuestionIndex(newIndex);
    }
    setSelectedAnswer(null);
    setQuizState('idle');
  };

  return (
    <div className="pb-32 pt-20 px-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="keep-white-button p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex-1">
          <p className="text-white/40 text-xs uppercase tracking-widest">{localizedLessonCourse?.title || lesson.courseId.replace(/-/g, ' ')}</p>
          <div className="flex items-center gap-2">
            <p className="text-white/60 text-sm">{t.lesson} {lesson.number}</p>
            {lessonCompleted && (
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <CheckCircle className="w-3 h-3" />
                {t.completedLesson}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="space-y-8">
        {localizedLesson.sections.map((section) => {
          switch (section.type) {
            case 'title':
              return (
                <h1 key={section.id} className="font-headline text-3xl md:text-4xl text-white">
                  {section.content}
                </h1>
              );
              
            case 'paragraph':
              return (
                <div key={section.id} className="space-y-4">
                  <p className="text-white/80 text-base leading-relaxed">
                    {renderHighlightedText(section.content || '', section.highlights)}
                  </p>
                  {section.imageUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      {section.imageUrl.includes('/cola-animation/') || section.imageUrl.includes('/pizza-animation/') || section.imageUrl.endsWith('.html') ? (
                        <iframe
                          src={section.imageUrl}
                          title={section.imageAlt || 'Animation'}
                          className="w-full h-48 border-0"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={section.imageUrl}
                          alt={section.imageAlt || ''}
                          className="w-full h-48 object-cover"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
              
            case 'paragraph-with-list':
              return (
                <div key={section.id} className="space-y-4">
                  <p className="text-white/80 text-base leading-relaxed">
                    {section.content}
                  </p>
                  {section.items && (
                    <ul className="space-y-3 pl-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/70">
                          <span className="w-2 h-2 rounded-full bg-primary-container mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.imageUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-lg mt-4">
                      <img 
                        src={section.imageUrl} 
                        alt={section.imageAlt || ''}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              );
              
            case 'highlight-box':
              const isAd =
                section.id.toLowerCase().includes('ad') ||
                section.content?.includes('Advertisement') ||
                section.content?.includes('Ø¥Ø¹Ù„Ø§Ù†ÙŠØ©');
              if (isAd) {
                return <div key={section.id} style={{ display: 'none' }} />;
              }
              return (
                <div key={section.id} className={`rounded-2xl p-5 border-2 ${
                  section.variant === 'yellow'
                    ? 'bg-green-500/10 border-green-500/30'
                    : section.variant === 'blue'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-purple-500/10 border-purple-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    {section.icon && <span className="text-2xl">{section.icon}</span>}
                    <p className={`font-medium ${
                      section.variant === 'yellow'
                        ? 'text-green-400'
                        : section.variant === 'blue'
                        ? 'text-blue-400'
                        : 'text-purple-400'
                    }`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              );

            case 'formula-block':
              return (
                <div key={section.id} className="rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 text-center">
                  {section.label && (
                    <p className="text-white/50 text-sm uppercase tracking-widest mb-3">{section.label}</p>
                  )}
                  <p className="font-display text-3xl md:text-4xl text-white font-bold tracking-wider">
                    {section.content}
                  </p>
                </div>
              );

            case 'law-container':
              return (
                <div key={section.id} className={`rounded-2xl p-5 border-l-4 ${
                  section.variant === 'yellow'
                    ? 'bg-green-500/10 border-l-green-500'
                    : section.variant === 'purple'
                    ? 'bg-purple-500/10 border-l-purple-500'
                    : 'bg-blue-500/10 border-l-blue-500'
                }`}>
                  <div className={`font-medium whitespace-pre-line ${
                    section.variant === 'yellow'
                      ? 'text-green-300'
                      : section.variant === 'purple'
                      ? 'text-purple-300'
                      : 'text-blue-300'
                  }`}>
                    {section.content?.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              );

            case 'video':
              const embeddableVideoUrl = getEmbeddableVideoUrl(section.videoUrl);
              return (
                <div key={section.id} className="space-y-3">
                  {section.content && (
                    <p className="text-white/80 text-base leading-relaxed">{section.content}</p>
                  )}
                  {embeddableVideoUrl ? (
                    <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-black/50">
                      <iframe
                        src={embeddableVideoUrl}
                        title={section.videoTitle || t.watchVideo}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black/50 group">
                      {section.videoThumbnail ? (
                        <img
                          src={section.videoThumbnail}
                          alt={section.videoTitle || 'Video thumbnail'}
                          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <Play className="w-16 h-16 text-white/60" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-medium text-sm">{section.videoTitle || t.watchVideo}</p>
                      </div>
                    </div>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Quiz Section */}
      {currentQuestion && (
        <div ref={quizSectionRef} className="mt-12 pt-8 border-t border-white/10">
          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-container" />
              </div>
              <h3 className="font-headline text-xl text-white">{t.quickQuiz}</h3>
            </div>

            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-white/90 text-lg font-medium">
                {currentQuestion.question}
              </p>

              <div className="space-y-2">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => quizState !== 'correct' && setSelectedAnswer(idx)}
                    disabled={quizState === 'correct'}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === idx
                        ? quizState === 'wrong' && idx === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-500 text-white'
                          : quizState === 'wrong' && selectedAnswer === idx
                          ? 'bg-red-500/20 border-2 border-red-500 text-white'
                          : quizState === 'correct'
                          ? 'bg-green-500/20 border-2 border-green-500 text-white'
                          : 'bg-primary-container/20 border-2 border-primary-container text-white'
                        : quizState === 'wrong' && idx === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-500 text-white'
                          : 'bg-white/5 border-2 border-transparent hover:border-white/20 text-white/80'
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                  </motion.button>
                ))}
              </div>

              {/* Feedback Messages */}
              {quizState === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center"
                >
                  <p className="text-green-400 font-semibold">{t.correctWellDone}</p>
                </motion.div>
              )}

              {quizState === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <p className="text-red-400 font-semibold text-center mb-3">{t.tryAgainLesson}</p>
                  <button
                    onClick={handleRetry}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    {t.retryWithNewQuestion}
                  </button>
                </motion.div>
              )}

              {/* Submit Button */}
              {quizState !== 'correct' && quizState !== 'wrong' && (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`w-full py-4 rounded-full font-display font-bold uppercase tracking-widest transition-all ${
                    selectedAnswer !== null
                      ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {t.submitAnswer}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      )}

      <AdBanner300x250 />

      {/* Next Lesson Button */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <motion.button 
          disabled={!isNextEnabled}
          onClick={() => {
            if (isNextEnabled) {
              nextLesson && onNextLesson?.(nextLesson.id);
            } else {
              scrollToQuiz();
            }
          }}
          whileTap={!isNextEnabled ? { scale: 0.98 } : undefined}
          className={`w-full py-4 rounded-full font-display font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
            isNextEnabled
              ? 'bg-primary-container text-on-primary-container shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:shadow-[0_0_35px_rgba(251,191,36,0.7)] active:scale-95'
              : 'bg-white/15 text-white/60 hover:bg-white/20 hover:text-white/80 active:scale-95 cursor-pointer'
          }`}
        >
          {isNextEnabled ? (
            <>
              <span>{t.nextLesson}</span>
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>{t.answerQuestionToUnlock}</span>
            </>
          )}
        </motion.button>
        {!isNextEnabled && (
          <p className="text-white/40 text-xs text-center mt-3">
            {t.completeQuizToContinue}
          </p>
        )}
      </div>
    </div>
  );
};

const SearchScreen = ({ onSelectElement }: { onSelectElement: (e: ChemicalElement) => void }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [query, setQuery] = useState('');
  
  // Load search history from localStorage
  const [searchHistory, setSearchHistory] = useState<ChemicalElement[]>(() => {
    const saved = localStorage.getItem('chemistry_beacon_search_history');
    if (saved) {
      try {
        const historyNumbers = JSON.parse(saved);
        return historyNumbers.map((num: number) => ALL_ELEMENTS.find(e => e.number === num)).filter(Boolean);
      } catch {
        return [];
      }
    }
    return [];
  });
  
  // Save history to localStorage when it changes
  useEffect(() => {
    const historyNumbers = searchHistory.map(e => e.number);
    localStorage.setItem('chemistry_beacon_search_history', JSON.stringify(historyNumbers));
  }, [searchHistory]);
  
  const handleSelectElement = (element: ChemicalElement) => {
    // Add to history, keeping only last 3 unique elements
    setSearchHistory(prev => {
      const filtered = prev.filter(e => e.number !== element.number);
      return [element, ...filtered].slice(0, 3);
    });
    onSelectElement(element);
  };
  
  const results = useMemo(() => {
    if (!query) return [];
    return ALL_ELEMENTS.filter(e => 
      e.name.toLowerCase().includes(query.toLowerCase()) || 
      e.symbol.toLowerCase().includes(query.toLowerCase()) ||
      e.number.toString() === query
    ).slice(0, 10);
  }, [query]);

  const trending = [ALL_ELEMENTS.find(e => e.symbol === 'Au')!, ALL_ELEMENTS.find(e => e.symbol === 'C')!, ALL_ELEMENTS.find(e => e.symbol === 'U')!];

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-10">
      {/* Gooey Search Input */}
      <div className="search-orb-container">
        <div className="gooey-background-layer">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob-bridge"></div>
        </div>

        <div className="input-overlay">
          <div className="search-icon-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="modern-input"
            placeholder={t.searchElements}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="focus-indicator"></div>
        </div>

        <svg className="gooey-svg-filter" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="enhanced-goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="12"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="goo"
              ></feColorMatrix>
              <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
            </filter>
          </defs>
        </svg>
      </div>

      {query ? (
        <section className="space-y-4">
          <h2 className="font-headline text-xl text-white">Search Results</h2>
          <div className="space-y-3">
            {results.map(el => (
              <button 
                key={el.number}
                onClick={() => handleSelectElement(el)}
                className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-all border-white/5 active:scale-[0.98]"
              >
                 <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center border border-primary-container/20 text-primary-container font-display text-xl">
                    {el.symbol}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-headline">{el.name}</h4>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{el.category}</p>
                  </div>
                </div>
                <span className="font-data text-xs text-white/40">Mass: {el.atomicMass}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="space-y-6">
            <h2 className="font-headline text-2xl text-white">{t.trending}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trending.map(el => (
                <button 
                  key={el?.number} 
                  onClick={() => el && onSelectElement(el)}
                  className="glass-card rounded-2xl overflow-hidden group hover:border-primary-container/30 transition-all text-left"
                >
                  <div className="h-32 bg-black/40 overflow-hidden relative">
                    <img src={el?.imageUrl} alt={el?.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-2 right-2 glass-card px-2 py-0.5 rounded text-xs font-data text-white/60">{el?.number}</div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-display text-xl text-white">{el?.symbol}</span>
                      <h3 className="text-on-surface-variant text-xs">{el?.name}</h3>
                    </div>
                    <div className="w-1 h-6 rounded-full bg-primary-container shadow-[0_0_8px_#22c55e]" />
                  </div>
                </button>
              ))}
            </div>

            <AdNativeBanner />
          </section>

          <section className="space-y-6">
            <h2 className="font-headline text-2xl text-white">{t.recentSearches}</h2>
            <div className="space-y-3">
              {searchHistory.length > 0 ? searchHistory.map(el => (
                <button 
                  key={el.number}
                  onClick={() => handleSelectElement(el)}
                  className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-all border-white/5 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/60 font-display text-xl">
                      {el.symbol}
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-headline">{el.name}</h4>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{el.category}</p>
                    </div>
                  </div>
                  <span className="font-data text-xs text-white/40">Mass: {el.atomicMass}</span>
                </button>
              )) : (
                <p className="text-white/40 text-sm text-center py-8">{t.noRecentSearches}</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

// --- Main App ---

// Simple Course Detail Screen
const CourseDetailScreen = ({ courseId, onBack, onSelectLesson }: { courseId: string, onBack: () => void, onSelectLesson: (lessonId: string) => void }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const course = COURSES.find(c => c.id === courseId);
  const courseLessons = LESSONS.filter(l => l.courseId === courseId).map((lesson) => getLocalizedLesson(lesson, language));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [courseId]);

  if (!course) return null;
  const localizedCourse = getLocalizedCourse(course, language);

  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-8">
      <button 
        onClick={onBack}
        className="keep-white-button flex items-center gap-2 text-white/60 hover:text-primary-container transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-label text-sm uppercase tracking-widest">{t.backToCourses}</span>
      </button>

      <div className="glass-card rounded-3xl overflow-hidden neon-glow">
        <div className="h-48 w-full relative bg-gradient-to-br from-surface-container-high to-surface-container overflow-hidden">
          <img
            src={course.image}
            alt={localizedCourse.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container font-label text-xs px-3 py-1 rounded-full font-bold">
            {t.free}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h1 className="font-headline text-3xl text-white">{localizedCourse.title}</h1>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{localizedCourse.lessons} {t.lessons}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {localizedCourse.description}
          </p>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        <h3 className="font-headline text-xl text-white">{t.lessons}</h3>
        {courseLessons.length > 0 ? (
          courseLessons.map((lesson) => (
            <motion.button
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLesson(lesson.id)}
              className="w-full glass-card rounded-xl p-4 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container font-bold flex-shrink-0">
                {lesson.number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{lesson.title}</h4>
                <p className="text-white/40 text-xs">{t.lesson} {lesson.number}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 flex-shrink-0" />
            </motion.button>
          ))
        ) : (
          Array.from({ length: course.lessons }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4 opacity-50">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="text-white font-medium">{t.lesson} {i + 1}</h4>
                <p className="text-white/40 text-xs">{t.comingSoon}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

registerRouteComponents({
  WelcomeScreen,
  AuthScreen,
  Header,
  BottomNav,
  ElementsScreen,
  ElementDetailScreen,
  SearchScreen,
  CoursesScreen,
  CourseDetailScreen,
  LessonScreen,
  QuizScreen,
  ProfileScreen,
  LeaderboardScreen,
  PrivacyPolicyScreen,
  AboutScreen,
});

export default AppWithAuth;
