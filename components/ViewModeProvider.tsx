'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ViewMode = 'backend' | 'frontend';

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
}

// Default context value for SSR/static generation
const defaultContext: ViewModeContextType = {
  viewMode: 'backend',
  toggleViewMode: () => {},
  setViewMode: () => {},
};

const ViewModeContext = createContext<ViewModeContextType>(defaultContext);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('backend');
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('viewMode') as ViewMode;
    if (stored && (stored === 'backend' || stored === 'frontend')) {
      setViewModeState(stored);
    }
  }, []);

  // Apply to DOM and persist when viewMode changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.setAttribute('data-view-mode', viewMode);
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode, mounted]);

  const toggleViewMode = () => {
    setViewModeState(prev => prev === 'backend' ? 'frontend' : 'backend');
  };

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
