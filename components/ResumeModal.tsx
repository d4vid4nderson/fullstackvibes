'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiX, FiDownload, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

const themeColors: Record<string, { primary: string; secondary: string; tertiary: string; light: string; dark: string }> = {
  'cyan': { primary: '#06b6d4', secondary: '#14b8a6', tertiary: '#0891b2', light: '#67e8f9', dark: '#0e7490' },
  'purple': { primary: '#a855f7', secondary: '#8b5cf6', tertiary: '#7c3aed', light: '#c084fc', dark: '#7c3aed' },
  'emerald': { primary: '#10b981', secondary: '#059669', tertiary: '#34d399', light: '#6ee7b7', dark: '#047857' },
  'orange': { primary: '#f97316', secondary: '#fb923c', tertiary: '#ea580c', light: '#fdba74', dark: '#c2410c' },
  'blue': { primary: '#3b82f6', secondary: '#60a5fa', tertiary: '#2563eb', light: '#93c5fd', dark: '#1d4ed8' }
};

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [resumeTheme, setResumeTheme] = useState<'dark' | 'light'>('dark');
  const [iframeReady, setIframeReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { colorTheme } = useTheme();

  // Send theme to iframe
  const sendThemeToIframe = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      const colors = themeColors[colorTheme] || themeColors['cyan'];
      iframeRef.current.contentWindow.postMessage({
        type: 'setTheme',
        mode: resumeTheme,
        colors
      }, '*');
    }
  }, [colorTheme, resumeTheme]);

  // Listen for iframe ready message
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframeReady') {
        setIframeReady(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Send theme when iframe is ready or theme changes
  useEffect(() => {
    if (iframeReady && isOpen) {
      sendThemeToIframe();
    }
  }, [iframeReady, isOpen, sendThemeToIframe]);

  // Also send on colorTheme change
  useEffect(() => {
    if (isOpen && iframeReady) {
      sendThemeToIframe();
    }
  }, [colorTheme, isOpen, iframeReady, sendThemeToIframe]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleResumeTheme = () => {
    const newTheme = resumeTheme === 'dark' ? 'light' : 'dark';
    setResumeTheme(newTheme);

    // Send theme update to iframe via postMessage
    if (iframeRef.current?.contentWindow) {
      const colors = themeColors[colorTheme] || themeColors['cyan'];
      iframeRef.current.contentWindow.postMessage({
        type: 'setTheme',
        mode: newTheme,
        colors
      }, '*');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 z-[10001]">
        <div
          className={`relative bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl transition-all z-[10001] ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-4 border-b border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Resume</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleResumeTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-accent transition-colors"
                aria-label="Toggle resume theme"
                title={resumeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {resumeTheme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <a
                href="/david-anderson-resume.pdf"
                download="David-Anderson-Resume.pdf"
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Resume Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <iframe
              ref={iframeRef}
              src="/resume.html"
              className="w-full h-[calc(90vh-80px)] border-0"
              title="Resume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
