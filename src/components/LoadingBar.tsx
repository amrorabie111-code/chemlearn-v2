import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingBarProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading, message }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      
      // Slow progress to 70%
      const timer1 = setTimeout(() => {
        setProgress(70);
      }, 100);

      // Complete to 100% after 2 seconds
      const timer2 = setTimeout(() => {
        setProgress(100);
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Reset when not loading
      setProgress(0);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-surface rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4">
        {message && (
          <p className="text-white/80 text-center text-sm">{message}</p>
        )}
        
        <div className="space-y-2">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-white/40 text-xs text-center">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};
