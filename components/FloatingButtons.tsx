'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { FiArrowUp, FiMessageSquare } from 'react-icons/fi';
import { useChatContext } from './ChatContext';
import { useFooterVisibility } from '../hooks/useFooterVisibility';

export function FloatingButtons() {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const { isChatOpen, setIsChatOpen } = useChatContext();
  const { isFooterVisible, footerHeight } = useFooterVisibility();
  const prevFooterVisible = useRef(isFooterVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrollVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Detect footer visibility changes to trigger bounce animation
  useEffect(() => {
    if (prevFooterVisible.current !== isFooterVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      prevFooterVisible.current = isFooterVisible;
      return () => clearTimeout(timer);
    }
  }, [isFooterVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate footer offset
  const footerOffset = isFooterVisible ? footerHeight : 0;

  // Base positions - add overshoot during animation
  const overshoot = isAnimating ? 12 : 0;
  const chatButtonBottom = 24 + footerOffset + overshoot;
  const scrollButtonBottom = 88 + footerOffset + overshoot;

  // Bounce easing for gooey effect - overshoots then settles
  const transition = isAnimating
    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' // Bounce/overshoot easing
    : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; // Smooth settle

  return (
    <>
      {/* SVG Filter for Gooey Effect - only used during animation */}
      <svg className="absolute" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Container - gooey filter only during animation */}
      <div
        className="fixed bottom-0 right-0 z-[9998] pointer-events-none"
        style={{
          filter: isAnimating ? 'url(#gooey)' : 'none',
          transition: 'filter 0.2s ease-out'
        }}
      >
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          style={{
            bottom: `${scrollButtonBottom}px`,
            right: '24px',
            transition,
            transform: isScrollVisible ? 'scale(1)' : 'scale(0)',
          } as CSSProperties}
          className={`fixed z-40 p-3 sm:p-4 bg-gradient-accent rounded-full text-white shadow-lg pointer-events-auto hover:scale-110 ${
            isScrollVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
            transition,
          } as CSSProperties}
          className={`fixed z-[9998] p-3 sm:p-4 rounded-full bg-gradient-accent-to-r text-white shadow-lg pointer-events-auto hover:scale-110 hover:glow ${
            isChatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Open chat"
        >
          <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </>
  );
}
