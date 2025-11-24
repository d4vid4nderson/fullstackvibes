'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-8 bottom-8 z-50 p-5 bg-gradient-accent rounded-full text-white transition-all hover:scale-110 shadow-lg glow"
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-6 h-6" />
    </button>
  );
}
