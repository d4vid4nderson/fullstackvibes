'use client';

import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg glass-dark hover:bg-white/10 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-gray-300 hover:text-purple-400 transition-colors" />
      ) : (
        <FiSun className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition-colors" />
      )}
    </button>
  );
}
