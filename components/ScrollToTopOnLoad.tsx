'use client';

import { useEffect } from 'react';

export function ScrollToTopOnLoad() {
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    // Also handle browser back/forward navigation
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
