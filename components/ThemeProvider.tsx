'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Mode = 'light' | 'dark';
type ColorTheme = 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue';

interface ThemeContextType {
  mode: Mode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const defaultContext: ThemeContextType = {
  mode: 'light',
  colorTheme: 'cyan',
  toggleMode: () => {},
  setMode: () => {},
  setColorTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('cyan');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem('mode') as Mode;
    const storedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;

    if (storedMode) {
      setMode(storedMode);
    } else {
      setMode('dark');
    }

    if (storedColorTheme) {
      setColorTheme(storedColorTheme);
    } else {
      setColorTheme('cyan');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Handle dark/light mode
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Handle color theme
    root.setAttribute('data-theme', colorTheme);

    localStorage.setItem('mode', mode);
    localStorage.setItem('colorTheme', colorTheme);
  }, [mode, colorTheme, mounted]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, toggleMode, setMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
