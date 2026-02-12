'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FiMaximize, FiX } from 'react-icons/fi';

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

interface ScreenshotShowcaseProps {
  screenshots: Screenshot[];
  onLightboxChange?: (isOpen: boolean) => void;
}

export function ScreenshotShowcase({ screenshots, onLightboxChange }: ScreenshotShowcaseProps) {
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
        onLightboxChange?.(false);
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
      onLightboxChange?.(true);
    } else {
      onLightboxChange?.(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage, onLightboxChange]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div className="space-y-6">
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="group relative bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all max-w-4xl mx-auto"
          >
            {/* Screenshot Image */}
            <div className="relative w-full overflow-hidden bg-gray-200 dark:bg-[#0a0a0a] rounded-lg">
              <button
                onClick={() => setLightboxImage(screenshot)}
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase bg-white/80 dark:bg-black/60 text-gray-900 dark:text-white border border-white/40 dark:border-white/20 rounded-full shadow-lg backdrop-blur-sm hover:bg-white/95 dark:hover:bg-black/80 transition-colors"
                title="View full screenshot"
              >
                <FiMaximize className="w-4 h-4" />
                View Full
              </button>
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={1920}
                height={1080}
                className="w-full h-auto"
                quality={100}
                unoptimized={true}
              />
            </div>

            {/* Caption */}
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                {screenshot.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {mounted && lightboxImage && createPortal(
        <div
          className="fixed inset-0 z-[100000] bg-slate-900/15 backdrop-blur-lg backdrop-saturate-150 overflow-y-auto"
          onClick={() => {
            setLightboxImage(null);
            onLightboxChange?.(false);
          }}
        >
          {/* Fixed Close Button - Always Visible at Top */}
          <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-black/40 to-transparent">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
                onLightboxChange?.(false);
              }}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
              title="Close (ESC)"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-col items-center justify-start min-h-screen px-4 pb-8 -mt-16 pt-16">
            <div
              className="relative w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  quality={100}
                  unoptimized={true}
                />
              </div>

              {/* Caption */}
              <div className="mt-6 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-gray-100 text-sm leading-relaxed text-center">
                  {lightboxImage.caption}
                </p>
              </div>

              {/* Hint */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Click outside or press ESC to close • Scroll to view full image
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
