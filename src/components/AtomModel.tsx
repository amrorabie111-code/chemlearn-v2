import React from 'react';

interface AtomModelProps {
  atomicNumber: number;
  shells: number[];
}

export const AtomModel: React.FC<AtomModelProps> = ({ atomicNumber, shells }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Nucleus */}
      <div 
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_20px_#22c55e]"
        style={{ background: 'radial-gradient(circle, #22c55e 0%, #15803d 100%)' }}
      >
        <span className="font-data text-white font-bold text-xs">
          {atomicNumber}+
        </span>
      </div>

      {/* Orbits */}
      <div className="absolute inset-0 flex items-center justify-center">
        {shells.map((electrons, shellIndex) => {
          const orbitSize = 80 + shellIndex * 40; 
          const duration = 10 + shellIndex * 5; 
          
          return (
            <div 
              key={shellIndex}
              className="absolute border border-white/10 rounded-full pointer-events-none"
              style={{ 
                width: `${orbitSize}px`, 
                height: `${orbitSize}px`,
              } as React.CSSProperties}
            >
              <div 
                className="absolute inset-0 animate-orbit"
                style={{ '--orbit-duration': `${duration}s` } as React.CSSProperties}
              >
                {[...Array(electrons)].map((_, electronIndex) => {
                  const angle = (electronIndex / electrons) * 360;
                  return (
                    <div
                      key={electronIndex}
                      className="absolute w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_#22d3ee]"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translate(${orbitSize / 2}px) translate(-50%, -50%)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, #22c55e 0%, transparent 70%)' }}>
      </div>
    </div>
  );
};
