'use client';

import { useViewMode } from './ViewModeProvider';
import { useState, useEffect } from 'react';

interface ViewModeWrapperProps {
  backendView: React.ReactNode;
  frontendView: React.ReactNode;
}

export function ViewModeWrapper({ backendView, frontendView }: ViewModeWrapperProps) {
  const { viewMode } = useViewMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayMode, setDisplayMode] = useState(viewMode);

  useEffect(() => {
    if (viewMode !== displayMode) {
      setIsTransitioning(true);
      // After fade out, switch content
      const timer = setTimeout(() => {
        setDisplayMode(viewMode);
        setIsTransitioning(false);
      }, 250); // Half of transition duration

      return () => clearTimeout(timer);
    }
  }, [viewMode, displayMode]);

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {displayMode === 'backend' ? backendView : frontendView}
    </div>
  );
}
