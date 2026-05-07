export const translations = {
  en: {
    // Auth
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    switchToLogin: "Login",
    switchToSignup: "Sign Up",
    
    // Profile
    profile: "Profile",
    leaderboard: "Leaderboard",
    appearance: "Appearance",
    language: "Language",
    logout: "Logout",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    selectAvatar: "Select Avatar",
    avatar: "Avatar",
    
    // Stats
    level: "Level",
    xp: "XP",
    lessons: "Lessons",
    courses: "Courses",
    
    // Main Navigation
    elements: "Elements",
    courses: "Courses",
    search: "Search",
    
    // Elements Screen
    exploreElements: "Explore the building blocks of the universe.",
    all: "All",
    alkaliMetal: "Alkali Metal",
    alkalineEarthMetal: "Alkaline Earth Metal",
    transitionMetal: "Transition Metal",
    postTransitionMetal: "Post-Transition Metal",
    metalloid: "Metalloid",
    nonmetal: "Nonmetal",
    halogen: "Halogen",
    nobleGas: "Noble Gas",
    lanthanide: "Lanthanide",
    actinide: "Actinide",
    mass: "Mass",
    
    // Search
    searchElements: "Search elements...",
    trending: "Trending",
    recentSearches: "Recent Searches",
    noRecentSearches: "No recent searches yet. Search for elements to see them here!",
    
    // Courses
    masterArchitecture: "Master the architecture of matter through our learning modules.",
    
    // Quiz
    question: "Question",
    exit: "Exit",
    next: "Next",
    finish: "Finish",
    correct: "Correct",
    incorrect: "Incorrect",
    score: "Score",
    of: "of",
    
    // Leaderboard
    leaderboardTitle: "Leaderboard",
    rank: "Rank",
    
    // Welcome
    welcome: "Welcome",
    start: "Start",
    
    // Category Labels
    atomicNo: "Atomic No.",
  },
  
  ar: {
    // Auth
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    confirmPassword: "تأكيد كلمة المرور",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    dontHaveAccount: "ليس لديك حساب؟",
    switchToLogin: "تسجيل الدخول",
    switchToSignup: "إنشاء حساب",
    
    // Profile
    profile: "الملف الشخصي",
    leaderboard: "لوحة الصدارة",
    appearance: "المظهر",
    language: "اللغة",
    logout: "تسجيل الخروج",
    theme: "المظهر",
    dark: "داكن",
    light: "فاتح",
    selectAvatar: "اختر الصورة الرمزية",
    avatar: "الصورة الرمزية",
    
    // Stats
    level: "المستوى",
    xp: "نقاط الخبرة",
    lessons: "الدروس",
    courses: "الدورات",
    
    // Main Navigation
    elements: "العناصر",
    courses: "الدورات",
    search: "البحث",
    
    // Elements Screen
    exploreElements: "استكشف لبنات الكون الأساسية.",
    all: "الكل",
    alkaliMetal: "فلز قلوي",
    alkalineEarthMetal: "فلز قلوي ترابي",
    transitionMetal: "فلز انتقالي",
    postTransitionMetal: "فلز ما بعد انتقالي",
    metalloid: "شبه فلز",
    nonmetal: "لا فلز",
    halogen: "هالوجين",
    nobleGas: "غاز نبيل",
    lanthanide: "لانثانيد",
    actinide: "أكتينيد",
    mass: "الكتلة",
    
    // Search
    searchElements: "ابحث عن العناصر...",
    trending: "الرائج",
    recentSearches: "عمليات البحث الأخيرة",
    noRecentSearches: "لا توجد عمليات بحث حديثة. ابحث عن العناصر لرؤيتها هنا!",
    
    // Courses
    masterArchitecture: "أتقن بنية المادة من خلال وحدات التعلم الخاصة بنا.",
    
    // Quiz
    question: "سؤال",
    exit: "خروج",
    next: "التالي",
    finish: "إنهاء",
    correct: "صحيح",
    incorrect: "خطأ",
    score: "النتيجة",
    of: "من",
    
    // Leaderboard
    leaderboardTitle: "لوحة الصدارة",
    rank: "الترتيب",
    
    // Welcome
    welcome: "أهلاً وسهلاً",
    start: "ابدأ",
    
    // Category Labels
    atomicNo: "العدد الذري",
  }
};

export function t(key) {
  const lang = localStorage.getItem("lang") || "ar";
  return translations[lang][key] || key;
}
