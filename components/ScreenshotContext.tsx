'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ScreenshotContextType {
  isScreenshotModalOpen: boolean;
  setScreenshotModalOpen: (open: boolean) => void;
}

const ScreenshotContext = createContext<ScreenshotContextType | undefined>(undefined);

export function ScreenshotProvider({ children }: { children: ReactNode }) {
  const [isScreenshotModalOpen, setScreenshotModalOpen] = useState(false);

  return (
    <ScreenshotContext.Provider value={{ isScreenshotModalOpen, setScreenshotModalOpen }}>
      {children}
    </ScreenshotContext.Provider>
  );
}

export function useScreenshot() {
  const context = useContext(ScreenshotContext);
  if (context === undefined) {
    throw new Error('useScreenshot must be used within a ScreenshotProvider');
  }
  return context;
}
