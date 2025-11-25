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
    if (!isVisible) return 'bottom-6 right-6 opacity-0 pointer-events-none';
    if (isChatOpen) return 'bottom-[618px] right-6 opacity-100'; // Above chat window
    return 'bottom-[88px] right-6 opacity-100'; // Above chat button when closed
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-40 p-4 bg-gradient-accent rounded-full text-white shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:glow ${getPosition()}`}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-6 h-6" />
    </button>
  );
}
