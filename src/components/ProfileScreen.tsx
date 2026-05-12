import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Trophy, LogOut, ChevronRight, 
  Languages, Crown, Star, Sparkles, GraduationCap, X, Shield, Info
} from 'lucide-react';
import { DayNightToggle } from './DayNightToggle';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';
import { getLevelInfo, UserLevel } from '../types/user';

interface ProfileScreenProps {
  onNavigateToLeaderboard: () => void;
  onNavigateToPrivacyPolicy: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onLogout: () => Promise<void>;
}

// Generate avatar paths - assuming avatars are named avatar1.png through avatar30.png
const AVATAR_PATHS = Array.from({ length: 30 }, (_, i) => `/avatars/avatar${i + 1}.png`);

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToLeaderboard,
  onNavigateToPrivacyPolicy,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToSignup,
  onLogout
}) => {
  const { user, uploadAvatar, updateUserData } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [showAvatarGrid, setShowAvatarGrid] = useState(false);
  const [selectError, setSelectError] = useState('');

  // Sync theme from user data on mount
  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, [user?.theme, setTheme]);

  // Sync language from user data on mount
  useEffect(() => {
    if (user?.language) {
      setLanguage(user.language);
    }
  }, [user?.language, setLanguage]);

  if (!user) {
    return (
      <div className="pb-32 pt-24 px-6 max-w-lg mx-auto">
        <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-5 text-center">
          <p className="text-white/80 text-base">{t.signInToTrackProgress}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNavigateToLogin}
              className="flex-1 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
            >
              {t.signIn}
            </button>
            <button
              onClick={onNavigateToSignup}
              className="flex-1 py-3 rounded-full bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-opacity"
            >
              {t.signup}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(user.xp);
  const nextLevelXP = levelInfo.name === 'Crystal' ? user.xp : 
    levelInfo.name === 'Platinum' ? 1000 :
    levelInfo.name === 'Gold' ? 600 :
    levelInfo.name === 'Silver' ? 300 : 100;
  
  const progressToNext = levelInfo.name === 'Crystal' ? 100 :
    ((user.xp - levelInfo.minXP) / (nextLevelXP - levelInfo.minXP)) * 100;

  const closeAvatarGrid = () => {
    setShowAvatarGrid(false);
    setSelectError('');
  };

  const handleAvatarSelect = async (path: string) => {
    setSelectError('');

    // Close immediately for a faster UX; avatar is already updated optimistically.
    setShowAvatarGrid(false);
    try {
      await uploadAvatar(path);
    } catch (error: any) {
      console.error('Failed to select avatar:', error);
      // Reopen so the user can retry if persistence fails.
      setShowAvatarGrid(true);
      setSelectError(error.message || 'Failed to save. Try again.');
    }
  };

  const getLevelIcon = (level: UserLevel) => {
    switch (level) {
      case 'bronze': return <Crown className="w-5 h-5 text-amber-600" />;
      case 'silver': return <Star className="w-5 h-5 text-gray-400" />;
      case 'gold': return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'platinum': return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'crystal': return <Crown className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <>
      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={closeAvatarGrid}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#1a1d26] w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-xl text-white">Choose Avatar</h2>
                <button
                  onClick={closeAvatarGrid}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Error Message */}
              {selectError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {selectError}
                </div>
              )}

              {/* Avatar Grid */}
              <div className="grid grid-cols-5 gap-3">
                {AVATAR_PATHS.map((path, index) => (
                  <button
                    key={path}
                    onClick={() => handleAvatarSelect(path)}
                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                      user.avatar === path 
                        ? 'ring-2 ring-primary-container ring-offset-2 ring-offset-[#1a1d26]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={path}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {user.avatar === path && (
                      <div className="absolute inset-0 bg-primary-container/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center">
                          <svg className="w-4 h-4 text-on-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          {/* Avatar */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowAvatarGrid(true)}
              className={`w-32 h-32 rounded-full overflow-hidden border-4 ${
                levelInfo.borderColor
              } ${levelInfo.glowColor || ''} transition-all duration-300 hover:scale-105`}
            >
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-white/60" />
                </div>
              )}
            </button>
            
            {/* Change Avatar Button */}
            <button
              onClick={() => setShowAvatarGrid(true)}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border-2 border-surface hover:scale-110 transition-transform"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

        {/* User Info */}
        <div className="space-y-2">
          <h1 className="font-headline text-3xl text-white">{user.name}</h1>
          <div className="flex items-center justify-center gap-2">
            {getLevelIcon(getLevelInfo(user.xp).name as UserLevel)}
            <span className="text-white/80 font-medium">{t[levelInfo.name.toLowerCase() as keyof typeof t] || levelInfo.name}</span>
          </div>
          <p className="text-primary-container font-display text-xl">{user.xp} {t.xp}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>{t.progress} {levelInfo.name === 'Crystal' ? t.maxLevel : 
              levelInfo.name === 'Platinum' ? t.crystal :
              levelInfo.name === 'Gold' ? t.platinum :
              levelInfo.name === 'Silver' ? t.gold : t.silver}</span>
            <span>{Math.round(progressToNext)}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center space-y-2">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto" />
          <p className="text-2xl font-bold text-white">{user.lessonsCompleted}</p>
          <p className="text-white/60 text-xs font-medium">{t.lessons}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center space-y-2">
          <GraduationCap className="w-8 h-8 text-blue-400 mx-auto" />
          <p className="text-2xl font-bold text-white">{Object.keys(user.completedCourses || {}).length}</p>
          <p className="text-white/60 text-xs font-medium">{t.courses}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        {/* Theme */}
        <div className="glass-card rounded-2xl p-4 space-y-4">
          <h3 className="font-medium text-white/80">{t.appearance}</h3>
          
          <div className="flex justify-center py-2">
            <DayNightToggle 
              isDark={theme === 'dark'}
              onToggle={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                updateUserData({ theme: newTheme });
              }}
            />
          </div>
        </div>

        {/* Language */}
        <div className="glass-card rounded-2xl p-4 space-y-4">
          <h3 className="font-medium text-white/80">{translations[language].language}</h3>
          
          <button 
            onClick={() => {
              const newLang = language === 'ar' ? 'en' : 'ar';
              setLanguage(newLang);
              updateUserData({ language: newLang });
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-white/60" />
              <span className="text-white">{language === 'ar' ? 'English' : 'العربية'}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Legal and Info */}
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <button
            onClick={onNavigateToPrivacyPolicy}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-white/60" />
              <span className="text-white">Privacy Policy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>

          <button
            onClick={onNavigateToAbout}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-white/60" />
              <span className="text-white">About</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onNavigateToLeaderboard}
          className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-white">{t.leaderboard}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40" />
        </button>

        <button
          onClick={onLogout}
          className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-red-500/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-red-400">{t.logout}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400/40" />
        </button>
      </div>
      </div>
    </>
  );
};
