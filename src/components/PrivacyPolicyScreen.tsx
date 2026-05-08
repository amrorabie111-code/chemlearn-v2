import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
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
          <Shield className="w-6 h-6 text-primary-container" />
          <h1 className="font-headline text-2xl text-white">Privacy Policy</h1>
        </div>

        <p className="text-white/80 text-sm leading-relaxed">
          We collect your email and username only to create and manage your account authentication.
        </p>

        <p className="text-white/80 text-sm leading-relaxed">
          We store your lesson and quiz progress, XP, and quiz history in Firebase so you can continue learning and track your improvement.
        </p>

        <p className="text-white/80 text-sm leading-relaxed">
          Your data is used only for educational purposes within this chemistry learning platform.
        </p>
      </div>
    </div>
  );
};
