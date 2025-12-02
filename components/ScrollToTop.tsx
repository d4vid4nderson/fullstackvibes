'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useChatContext } from './ChatContext';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isChatOpen } = useChatContext();

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

  // Calculate position based on visibility and chat state
  const getPosition = () => {
    if (!isVisible) return 'bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-0 pointer-events-none';
    if (isChatOpen) return 'bottom-4 left-4 sm:bottom-[618px] sm:left-auto sm:right-6 opacity-100'; // Left side on mobile when chat open, above chat on desktop
    return 'bottom-[72px] right-4 sm:bottom-[88px] sm:right-6 opacity-100'; // Above chat button
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-40 p-3 sm:p-4 bg-gradient-accent rounded-full text-white shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:glow ${getPosition()}`}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
