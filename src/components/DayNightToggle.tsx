import React, { useEffect, useRef, useId } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DayNightToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DayNightToggle: React.FC<DayNightToggleProps> = ({ isDark, onToggle }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const uniqueId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync checkbox state with theme
  useEffect(() => {
    if (inputRef.current) {
      // In RTL: unchecked (right) = dark, checked (left) = light
      // In LTR: unchecked (left) = dark, checked (right) = light
      inputRef.current.checked = !isDark;
    }
  }, [isDark]);

  const handleChange = () => {
    onToggle();
  };

  return (
    <div className={`day-night-toggle-wrapper ${isRTL ? 'rtl' : ''}`}>
      <label className="day-night-switch">
        <input
          ref={inputRef}
          type="checkbox"
          onChange={handleChange}
          className="toggle-input"
        />
        <span className="toggle-slider"></span>
        
        {/* Background SVG */}
        <svg className="toggle-bg" width="221" height="97" viewBox="0 0 221 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 13.5V28.5L8.5 68C23.6667 73.5 55.1 84.8 59.5 86C65 87.5 113.5 95.5 116 96.5C118 97.3 186.5 72.1667 220.5 59.5L209.5 17.5L165.5 10.5L121.5 6.5L105 8.5L79.5 0L0 13.5Z" fill={`url(#bgGradient-${uniqueId})`}/>
          <defs>
            <linearGradient id={`bgGradient-${uniqueId}`} x1="110.25" y1="0" x2="110.25" y2="96.5187" gradientUnits="userSpaceOnUse">
              <stop id={`bgStop1-${uniqueId}`} stopColor="#6A86EB"/>
              <stop id={`bgStop2-${uniqueId}`} offset="0.553516" stopColor="#010203"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Circle SVG */}
        <svg className="toggle-circle-svg" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="21" fill={`url(#circleGradient-${uniqueId})`}/>
          <defs>
            <linearGradient id={`circleGradient-${uniqueId}`} x1="21" y1="-4.5" x2="21" y2="42" gradientUnits="userSpaceOnUse">
              <stop id={`circleStop1-${uniqueId}`} offset="0.261829" stopColor="#A5C5EB"/>
              <stop id={`circleStop2-${uniqueId}`} offset="0.699362" stopColor="#51EAFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Stars */}
        <div className="star star-1 size-2"></div>
        <div className="star star-2 size-1"></div>
        <div className="star star-3 size-4"></div>
        <div className="star star-4 size-1"></div>
        <div className="star star-5 size-3"></div>
        <div className="star star-6 size-3"></div>
        <div className="star star-7 size-2"></div>
        <div className="star star-8 size-2"></div>
        <div className="star star-9 size-4"></div>
        <div className="star star-10 size-1"></div>
        <div className="star star-11 size-3"></div>

        {/* Clouds */}
        <svg className="cloud cloud-1" width="21" height="7" viewBox="0 0 21 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 6.86046H0C0.252123 4.92493 1.90727 3.43021 3.91152 3.43021C4.06622 3.43021 4.21883 3.43912 4.36888 3.45644C5.37417 1.40919 7.47974 0 9.91444 0C12.6817 0 15.0237 1.82039 15.8084 4.32896C16.2197 4.19101 16.6601 4.11626 17.1179 4.11626C18.9102 4.11626 20.4349 5.2617 21 6.86046Z" fill={`url(#cloud1-${uniqueId})`}/>
          <defs>
            <linearGradient id={`cloud1-${uniqueId}`} x1="10.5" y1="0" x2="10.5" y2="6.86046" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8E0FF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="cloud cloud-2" width="41" height="14" viewBox="0 0 41 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M41 13.3943H0C0.492246 9.61538 3.72371 6.69713 7.63678 6.69713C7.93879 6.69713 8.23674 6.71451 8.52968 6.74833C10.4924 2.7513 14.6033 0 19.3567 0C24.7594 0 29.332 3.55411 30.8639 8.45182C31.6671 8.18248 32.5269 8.03655 33.4207 8.03655C36.9199 8.03655 39.8967 10.2729 41 13.3943Z" fill={`url(#cloud2-${uniqueId})`}/>
          <defs>
            <linearGradient id={`cloud2-${uniqueId}`} x1="20.5" y1="0" x2="20.5" y2="13.3943" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94DFFF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="cloud cloud-3" width="21" height="7" viewBox="0 0 21 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 6.86046H0C0.252123 4.92493 1.90727 3.43021 3.91152 3.43021C4.06622 3.43021 4.21883 3.43912 4.36888 3.45644C5.37417 1.40919 7.47974 0 9.91444 0C12.6817 0 15.0237 1.82039 15.8084 4.32896C16.2197 4.19101 16.6601 4.11626 17.1179 4.11626C18.9102 4.11626 20.4349 5.2617 21 6.86046Z" fill={`url(#cloud3-${uniqueId})`}/>
          <defs>
            <linearGradient id={`cloud3-${uniqueId}`} x1="10.5" y1="0" x2="10.5" y2="6.86046" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8E0FF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Mountains */}
        <svg className="mountain mountain-1" width="115" height="72" viewBox="0 0 115 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8763 34.7586L0 68.8965L115 72L88.414 44.069H85.3226L72.3387 24.2069H66.1559L49.4624 0L30.914 34.7586H22.8763Z" fill={`url(#mtn1-${uniqueId})`}/>
          <defs>
            <linearGradient id={`mtn1-${uniqueId}`} x1="57.5" y1="0" x2="57.5" y2="72" gradientUnits="userSpaceOnUse">
              <stop id={`mtn1Stop1-${uniqueId}`} offset="0.290234" stopColor="#6783CA"/>
              <stop id={`mtn1Stop2-${uniqueId}`} offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="mountain mountain-2" width="93" height="58" viewBox="0 0 93 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 28L0 55.5L93 58L71.5 35.5H69L58.5 19.5H53.5L40 0L25 28H18.5Z" fill={`url(#mtn2-${uniqueId})`}/>
          <defs>
            <linearGradient id={`mtn2-${uniqueId}`} x1="46.5" y1="0" x2="46.5" y2="58" gradientUnits="userSpaceOnUse">
              <stop id={`mtn2Stop1-${uniqueId}`} offset="0.290234" stopColor="#6783CA"/>
              <stop id={`mtn2Stop2-${uniqueId}`} offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="mountain mountain-3" width="93" height="58" viewBox="0 0 93 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 28L0 55.5L93 58L71.5 35.5H69L58.5 19.5H53.5L40 0L25 28H18.5Z" fill={`url(#mtn3-${uniqueId})`}/>
          <defs>
            <linearGradient id={`mtn3-${uniqueId}`} x1="46.5" y1="0" x2="46.5" y2="58" gradientUnits="userSpaceOnUse">
              <stop id={`mtn3Stop1-${uniqueId}`} offset="0.290234" stopColor="#6783CA"/>
              <stop id={`mtn3Stop2-${uniqueId}`} offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="mountain mountain-4" width="115" height="72" viewBox="0 0 115 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8763 34.7586L0 68.8965L115 72L88.414 44.069H85.3226L72.3387 24.2069H66.1559L49.4624 0L30.914 34.7586H22.8763Z" fill={`url(#mtn4-${uniqueId})`}/>
          <defs>
            <linearGradient id={`mtn4-${uniqueId}`} x1="57.5" y1="0" x2="57.5" y2="72" gradientUnits="userSpaceOnUse">
              <stop id={`mtn4Stop1-${uniqueId}`} offset="0.290234" stopColor="#6783CA"/>
              <stop id={`mtn4Stop2-${uniqueId}`} offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
      </label>
    </div>
  );
};
