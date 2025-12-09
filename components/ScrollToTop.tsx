'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useChatContext } from './ChatContext';
import { useFooterVisibility } from '../hooks/useFooterVisibility';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isChatOpen } = useChatContext();
  const { isFooterVisible, footerHeight } = useFooterVisibility();

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

  // Calculate bottom offset when footer is visible
  const footerOffset = isFooterVisible ? footerHeight + 16 : 0;

  // Calculate position based on visibility and chat state
  const getPosition = () => {
    if (!isVisible) return 'opacity-0 pointer-events-none';
    if (isChatOpen) return 'left-4 sm:left-auto opacity-100'; // Left side on mobile when chat open
    return 'opacity-100';
  };

  // Calculate bottom position dynamically
  const getBottomStyle = () => {
    if (!isVisible) return { bottom: '24px', right: '24px' };
    if (isChatOpen) {
      return {
        bottom: `${Math.max(16, footerOffset + 16)}px`,
        right: '24px'
      };
    }
    // Above chat button (72px on mobile, 88px on desktop) + footer offset
    const baseBottom = window.innerWidth >= 640 ? 88 : 72;
    return {
      bottom: `${baseBottom + footerOffset}px`,
      right: '24px'
    };
  };

  return (
    <button
      onClick={scrollToTop}
      style={getBottomStyle()}
      className={`fixed z-40 p-3 sm:p-4 bg-gradient-accent rounded-full text-white shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:glow ${getPosition()}`}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
