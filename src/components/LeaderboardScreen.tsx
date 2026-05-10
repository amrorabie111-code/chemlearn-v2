import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Medal, ArrowLeft, User } from 'lucide-react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';

interface LeaderboardUser {
  uid: string;
  name: string;
  avatar: string;
  xp: number;
}

const LEADERBOARD_CACHE_KEY = 'chemistry_beacon_leaderboard_cache';
const LEADERBOARD_CACHE_TTL_MS = 2 * 60 * 1000;

export const LeaderboardScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user: currentUser } = useAuth();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getCachedLeaderboard = (): LeaderboardUser[] | null => {
      try {
        const raw = localStorage.getItem(LEADERBOARD_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { timestamp: number; data: LeaderboardUser[] };
        if (!parsed?.timestamp || !Array.isArray(parsed?.data)) return null;
        if (Date.now() - parsed.timestamp > LEADERBOARD_CACHE_TTL_MS) return null;
        return parsed.data;
      } catch {
        return null;
      }
    };

    const setCachedLeaderboard = (data: LeaderboardUser[]) => {
      try {
        localStorage.setItem(
          LEADERBOARD_CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data })
        );
      } catch {
        // Ignore cache write errors
      }
    };

    const normalize = (users: LeaderboardUser[]) =>
      users
        .filter((entry) => entry.uid)
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 50);

    const fetchLeaderboard = async () => {
      let hasCachedLeaderboard = false;
      try {
        const cached = getCachedLeaderboard();
        if (cached && isMounted) {
          hasCachedLeaderboard = true;
          setLeaderboard(normalize(cached));
          setLoading(false);
        }

        // Read all users then sort client-side so users missing xp are still visible.
        // Avoid an aggressive timeout here; slow networks previously caused false fallbacks.
        const snapshot = await getDocs(collection(db, 'users'));
        const users = snapshot.docs.map((doc) => ({
          uid: doc.id,
          name: doc.data().name || 'User',
          avatar: doc.data().avatar || '',
          xp: Number(doc.data().xp || 0)
        })) as LeaderboardUser[];

        const normalizedUsers = normalize(users);
        if (!isMounted) return;

        setLeaderboard(normalizedUsers);
        setCachedLeaderboard(normalizedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);

        // If fetch fails and no cached leaderboard is available, show current user as fallback.
        if (isMounted && !hasCachedLeaderboard && currentUser) {
          setLeaderboard([{
            uid: currentUser.uid,
            name: currentUser.name,
            avatar: currentUser.avatar,
            xp: currentUser.xp
          }]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: <Crown className="w-6 h-6 text-yellow-500" />,
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/50',
          text: 'text-yellow-500'
        };
      case 2:
        return {
          icon: <Medal className="w-6 h-6 text-gray-400" />,
          bg: 'bg-gray-500/10',
          border: 'border-gray-400/50',
          text: 'text-gray-400'
        };
      case 3:
        return {
          icon: <Medal className="w-6 h-6 text-amber-700" />,
          bg: 'bg-amber-700/10',
          border: 'border-amber-700/50',
          text: 'text-amber-700'
        };
      default:
        return {
          icon: null,
          bg: '',
          border: 'border-white/10',
          text: ''
        };
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#16181D]' : 'bg-white'}`}>
        <div className="w-10 h-10 border-[3px] border-primary-container/30 border-t-primary-container rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-32 pt-24 px-6 ${theme === 'dark' ? 'bg-[#16181D]' : 'bg-white'}`}>
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-headline text-3xl text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            {t.leaderboard}
          </h1>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-2xl mx-auto space-y-3">
        {leaderboard.map((entry, index) => {
          const rank = index + 1;
          const isCurrentUser = entry.uid === currentUser?.uid;
          const style = getRankStyle(rank);

          return (
            <motion.div
              key={entry.uid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card rounded-2xl p-4 flex items-center gap-4 transition-all ${
                isCurrentUser ? 'ring-2 ring-primary-container bg-primary-container/10' : ''
              } ${style.bg} border ${style.border}`}
            >
              {/* Rank */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                rank <= 3 ? style.bg + ' ' + style.text : 'bg-white/10 text-white/60'
              }`}>
                {style.icon || rank}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                {entry.avatar ? (
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-white/60" />
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex-1">
                <p className="text-white font-medium">{entry.name}</p>
                {isCurrentUser && (
                  <p className="text-primary-container text-xs">{t.you}</p>
                )}
              </div>

              {/* XP */}
              <div className="text-right">
                <p className={`text-xl font-bold ${rank <= 3 ? style.text : 'text-white'}`}>
                  {entry.xp}
                </p>
                <p className="text-white/40 text-sm">{t.xp}</p>
              </div>
            </motion.div>
          );
        })}

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">{t.noUsersOnLeaderboard}</p>
          </div>
        )}
      </div>
    </div>
  );
};
