'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMaximize, FiX } from 'react-icons/fi';

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

interface ScreenshotShowcaseProps {
  screenshots: Screenshot[];
}

export function ScreenshotShowcase({ screenshots }: ScreenshotShowcaseProps) {
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div className="space-y-6">
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="group relative bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all"
          >
            {/* Screenshot Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200 dark:bg-[#0a0a0a]">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <button
                  onClick={() => setLightboxImage(screenshot)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 rounded-lg hover:bg-cyan-500/30"
                  title="View fullscreen"
                >
                  <FiMaximize className="w-6 h-6 text-cyan-400" />
                </button>
              </div>
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
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setLightboxImage(null)}
        >
          {/* Fixed Close Button - Always Visible at Top */}
          <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-black/80 to-transparent">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
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
                />
              </div>

              {/* Caption */}
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed text-center">
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
        </div>
      )}
    </>
  );
}
