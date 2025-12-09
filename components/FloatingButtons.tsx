'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { FiArrowUp, FiMessageSquare } from 'react-icons/fi';
import { useChatContext } from './ChatContext';
import { useFooterVisibility } from '../hooks/useFooterVisibility';

export function FloatingButtons() {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [wasScrollVisible, setWasScrollVisible] = useState(false);
  const { isChatOpen, setIsChatOpen } = useChatContext();
  const { isFooterVisible, footerHeight } = useFooterVisibility();
  const [isGooeyActive, setIsGooeyActive] = useState(false);
  const gooeyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      const shouldBeVisible = window.scrollY > 300;

      if (shouldBeVisible !== isScrollVisible) {
        // Trigger gooey effect when visibility changes
        setIsGooeyActive(true);

        // Clear any existing timeout
        if (gooeyTimeoutRef.current) {
          clearTimeout(gooeyTimeoutRef.current);
        }

        // Keep gooey active during animation
        gooeyTimeoutRef.current = setTimeout(() => {
          setIsGooeyActive(false);
        }, 800);

        setWasScrollVisible(isScrollVisible);
        setIsScrollVisible(shouldBeVisible);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (gooeyTimeoutRef.current) {
        clearTimeout(gooeyTimeoutRef.current);
      }
    };
  }, [isScrollVisible]);

  // Also trigger gooey on footer visibility change
  const prevFooterVisible = useRef(isFooterVisible);
  useEffect(() => {
    if (prevFooterVisible.current !== isFooterVisible) {
      setIsGooeyActive(true);
      if (gooeyTimeoutRef.current) {
        clearTimeout(gooeyTimeoutRef.current);
      }
      gooeyTimeoutRef.current = setTimeout(() => {
        setIsGooeyActive(false);
      }, 800);
      prevFooterVisible.current = isFooterVisible;
    }
  }, [isFooterVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate footer offset
  const footerOffset = isFooterVisible ? footerHeight : 0;

  // Chat button position
  const chatButtonBottom = 24 + footerOffset;

  // Scroll button: starts at chat position, animates to final position
  // When not visible, position at chat button location (merged)
  const scrollButtonFinalBottom = 88 + footerOffset;
  const scrollButtonBottom = isScrollVisible ? scrollButtonFinalBottom : chatButtonBottom;

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Container with gooey filter */}
      <div
        className="fixed bottom-0 right-0 z-[9998] pointer-events-none"
        style={{
          filter: isGooeyActive ? 'url(#gooey)' : 'none',
        }}
      >
        {/* Scroll to Top Button - emerges from chat button */}
        <button
          onClick={scrollToTop}
          style={{
            bottom: `${scrollButtonBottom}px`,
            right: '24px',
            transition: 'bottom 0.6s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.3s ease',
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
            transition: 'bottom 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
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
