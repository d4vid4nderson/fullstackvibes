'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { FiArrowUp, FiMessageSquare } from 'react-icons/fi';
import { useChatContext } from './ChatContext';
import { useFooterVisibility } from '../hooks/useFooterVisibility';

export function FloatingButtons() {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const { isChatOpen, setIsChatOpen } = useChatContext();
  const { isFooterVisible, footerHeight } = useFooterVisibility();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate footer offset
  const footerOffset = isFooterVisible ? footerHeight : 0;

  // Button positions
  const chatButtonBottom = 24 + footerOffset;
  const scrollButtonFinalBottom = 88 + footerOffset;
  // Scroll button starts behind chat button, moves to final position
  const scrollButtonBottom = isScrollVisible ? scrollButtonFinalBottom : chatButtonBottom;

  return (
    <>
      {/* Scroll to Top Button - emerges from behind chat button */}
      <button
        onClick={scrollToTop}
        style={{
          bottom: `${scrollButtonBottom}px`,
          right: '24px',
          transform: isScrollVisible ? 'scale(1)' : 'scale(0.5)',
          opacity: isScrollVisible ? 1 : 0,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out, bottom 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        } as CSSProperties}
        className={`fixed z-[9997] p-3 sm:p-4 bg-gradient-accent rounded-full text-white shadow-lg hover:scale-110 transition-transform ${
          isScrollVisible ? 'pointer-events-auto' : 'pointer-events-none'
        } ${isChatOpen ? 'hidden sm:block' : ''}`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        style={{
          bottom: `${chatButtonBottom}px`,
          right: '24px',
          transition: 'bottom 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        } as CSSProperties}
        className={`fixed z-[9998] p-3 sm:p-4 rounded-full bg-gradient-accent-to-r text-white shadow-lg pointer-events-auto hover:scale-110 hover:glow transition-transform ${
          isChatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Open chat"
      >
        <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
}
