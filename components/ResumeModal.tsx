'use client';

import { useState, useEffect } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleDownload = () => {
    window.print();
  };

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
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resume</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                aria-label="Download PDF"
              >
                <FiDownload className="w-5 h-5" />
              </button>
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
