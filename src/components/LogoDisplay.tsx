import React from 'react';
import { motion } from 'motion/react';
import { Brand, getLogoUrl } from '../data/brands';

export const LogoDisplay = ({ brand, difficulty }: { brand: Brand | null; difficulty: string }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(false);
  }, [brand]);

  if (!brand) return null;

  const getEffectClass = () => {
    switch (difficulty) {
      case 'Hard': return 'blur-md grayscale brightness-50';
      case 'Medium': return 'grayscale invert opacity-80';
      default: return '';
    }
  };

  return (
    <motion.div
      key={brand.id}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-56 h-56 p-8 neu-card neu-card-light dark:neu-card-dark flex items-center justify-center overflow-hidden"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50 dark:bg-slate-800/50 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      )}
      <img
        src={getLogoUrl(brand.domain)}
        alt="Logo Quiz"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.includes('google.com/s2/favicons')) {
            target.src = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`;
          }
        }}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${getEffectClass()}`}
      />
      {difficulty === 'Hard' && isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
      )}
    </motion.div>
  );
};
