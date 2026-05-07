import React from 'react';
import { motion } from 'motion/react';
import { User, Star, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const { user } = useAuth();

  if (!user) return null;

  const level = Math.floor(user.xp / 100) + 1;
  const xpInCurrentLevel = user.xp % 100;
  const xpToNextLevel = 100;
  const progressPercent = (xpInCurrentLevel / xpToNextLevel) * 100;

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center">
          <User className="w-7 h-7 text-on-primary-container" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg text-white">{user.name}</h3>
          <p className="text-on-surface-variant text-xs">{user.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Level & XP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary-container" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Level {level}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-data text-sm text-white">{user.xp} XP</span>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary-container to-secondary"
          />
        </div>
        <p className="text-on-surface-variant text-[10px] text-right">
          {xpInCurrentLevel} / {xpToNextLevel} XP to Level {level + 1}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="font-display text-2xl text-white">{user.lessonsCompleted}</p>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-wider">Lessons</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="font-display text-2xl text-white">
            {Object.keys(user.completedCourses).length}
          </p>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-wider">Courses</p>
        </div>
      </div>
    </div>
  );
};
