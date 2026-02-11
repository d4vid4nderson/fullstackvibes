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

  // Always start with backend (terminal mode) on mount
  useEffect(() => {
    setMounted(true);
    // Removed localStorage loading to always default to 'backend' (terminal mode)
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
