'use client';

import { FiTerminal, FiLayout, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { useViewMode } from './ViewModeProvider';

export function PersistentControls() {
  const { mode, setMode } = useTheme();
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <div className="fixed top-6 right-4 sm:right-6 lg:right-8 flex items-center gap-3 z-50">
      {/* View mode toggle - pill style like Claude */}
      <div className="flex items-center bg-gray-100 dark:bg-[#1a1a1a] rounded-full p-0.5">
        <button
          onClick={viewMode === 'backend' ? undefined : toggleViewMode}
          className={`p-2 rounded-full transition-all ${
            viewMode === 'backend'
              ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label={viewMode === 'backend' ? 'Terminal view (active)' : 'Switch to Terminal view'}
        >
          <FiTerminal className="w-4 h-4" />
        </button>
        <button
          onClick={viewMode === 'frontend' ? undefined : toggleViewMode}
          className={`p-2 rounded-full transition-all ${
            viewMode === 'frontend'
              ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label={viewMode === 'frontend' ? 'Frontend view (active)' : 'Switch to Frontend view'}
        >
          <FiLayout className="w-4 h-4" />
        </button>
      </div>
      {/* Theme toggle */}
      <button
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors text-gray-600 dark:text-gray-400"
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {mode === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
      </button>
    </div>
  );
}
