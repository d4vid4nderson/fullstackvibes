'use client';

import { useState, useEffect } from 'react';

export function useFooterVisibility() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setFooterHeight(entry.boundingClientRect.height);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return { isFooterVisible, footerHeight };
}
