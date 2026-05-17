import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ isDarkMode, toggle }: { isDarkMode: boolean; toggle: () => void }) => {
  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      className="p-3 neu-button-light dark:neu-button-dark transition-all duration-500"
    >
      {isDarkMode ? (
        <Sun className="text-amber-500 fill-amber-500" size={20} />
      ) : (
        <Moon className="text-slate-600 fill-slate-600" size={20} />
      )}
    </button>
  );
};
