'use client';

import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

const colorThemes = [
  { name: 'cyan', label: '🌊 Water of Life', colors: ['#06b6d4', '#14b8a6', '#0891b2'] },
  { name: 'purple', label: '🔮 One Ring', colors: ['#a855f7', '#8b5cf6', '#7c3aed'] },
  { name: 'emerald', label: '🌿 Bag End', colors: ['#10b981', '#059669', '#34d399'] },
  { name: 'orange', label: '🔥 Arrakis', colors: ['#f97316', '#fb923c', '#ea580c'] },
  { name: 'blue', label: '⚔️ Dueling Lightsabers', colors: ['#3b82f6', '#60a5fa', '#2563eb'] },
] as const;

export function ThemeSwitcher() {
  const { mode, colorTheme, toggleMode, setColorTheme } = useTheme();

  const handleThemeChange = (themeName: string) => {
    // Trigger theme change with animation
    document.documentElement.style.transition = 'filter 0.5s ease-in-out';
    document.documentElement.style.filter = 'brightness(1.3) saturate(1.5)';

    setTimeout(() => {
      setColorTheme(themeName as any);
    }, 250);

    setTimeout(() => {
      document.documentElement.style.filter = 'brightness(1) saturate(1)';
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 500);
    }, 500);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleMode}
        className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-300 dark:border-white/10 shadow-lg hover:scale-105 transition-all"
        aria-label="Toggle dark/light mode"
      >
        {mode === 'dark' ? (
          <FiSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FiMoon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Color Theme Selector */}
      <div className="flex flex-col gap-2 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-300 dark:border-white/10 shadow-lg">
        {colorThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={`group relative p-2 rounded-lg transition-all ${
              colorTheme === theme.name
                ? 'bg-gray-200 dark:bg-white/10 ring-2 ring-offset-2 ring-gray-400 dark:ring-white/20'
                : 'hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
            title={theme.label}
            aria-label={`Switch to ${theme.label} theme`}
          >
            <div className="flex gap-1">
              {theme.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border border-gray-300 dark:border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
