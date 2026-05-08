import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div className="pb-32 pt-24 px-6 max-w-lg mx-auto space-y-6">
      <button
        onClick={onBack}
        className="keep-white-button flex items-center gap-2 text-white/60 hover:text-primary-container transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-label text-sm uppercase tracking-widest">Back</span>
      </button>

      <div className="glass-card rounded-3xl p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Info className="w-6 h-6 text-primary-container" />
          <h1 className="font-headline text-2xl text-white">About</h1>
        </div>

        <p className="text-white/80 text-sm leading-relaxed">
          Chemistry Beacon is a free chemistry learning website for Sudanese secondary school students.
        </p>

        <p className="text-white/80 text-sm leading-relaxed">
          The platform is built with React and Firebase to provide a modern, reliable learning experience.
        </p>
      </div>
    </div>
  );
};
