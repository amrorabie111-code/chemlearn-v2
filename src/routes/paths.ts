export const ROUTES = {
  home: '/',
  elements: '/elements',
  elementDetail: (symbol: string) => `/elements/${encodeURIComponent(symbol)}`,
  courses: '/courses',
  courseDetail: (courseId: string) => `/courses/${encodeURIComponent(courseId)}`,
  lesson: (courseId: string, lessonId: string) =>
    `/courses/${encodeURIComponent(courseId)}/lesson/${encodeURIComponent(lessonId)}`,
  leaderboard: '/leaderboard',
  profile: '/profile',
  privacyPolicy: '/privacy-policy',
  about: '/about',
  login: '/login',
  signup: '/signup',
  search: '/search',
  quiz: (quizId: string) => `/quiz/${encodeURIComponent(quizId)}`,
  quizHome: '/quiz',
} as const;
