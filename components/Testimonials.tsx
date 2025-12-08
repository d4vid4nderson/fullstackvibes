'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiLinkedin } from 'react-icons/fi';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Add Your First Testimonial',
    role: 'Colleague / Manager / Client',
    company: 'Company Name',
    relationship: 'Worked together at Company',
    quote: 'Request testimonials from colleagues, managers, or clients who can speak to your skills and work ethic. LinkedIn recommendations work great here!',
    linkedinUrl: 'https://linkedin.com/in/d4vid4nderson',
  },
  // Add more testimonials as you collect them
  // {
  //   id: '2',
  //   name: 'Jane Smith',
  //   role: 'Engineering Manager',
  //   company: 'Tech Corp',
  //   relationship: 'Managed David directly',
  //   quote: 'David consistently delivered high-quality solutions...',
  //   linkedinUrl: 'https://linkedin.com/in/janesmith',
  // },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  // Don't render if no real testimonials yet (only placeholder)
  if (testimonials.length === 1 && testimonials[0].id === '1') {
    return null; // Hide until real testimonials are added
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-300">
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Terminal Window */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/testimonials</span>
          </div>

          {/* Terminal Content */}
          <div className="p-5 sm:p-8 font-mono">
            {/* Command header */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-accent">$</span>
                <span className="text-gray-600 dark:text-gray-300">cat</span>
                <span className="text-accent">recommendations.txt</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                What colleagues and clients say about working with me
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="relative bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 p-6">
              {/* Quote */}
              <div className="mb-6">
                <span className="text-4xl text-accent/30 font-serif">&ldquo;</span>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed -mt-4 ml-6">
                  {current.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 dark:text-white">{current.name}</p>
                    {current.linkedinUrl && (
                      <a
                        href={current.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                        aria-label={`View ${current.name}'s LinkedIn profile`}
                      >
                        <FiLinkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {current.role} at {current.company}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {current.relationship}
                  </p>
                </div>

                {/* Navigation */}
                {testimonials.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full hover:bg-accent/10 transition-colors text-gray-500 hover:text-accent"
                      aria-label="Previous testimonial"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs text-gray-500 tabular-nums">
                      {currentIndex + 1} / {testimonials.length}
                    </span>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full hover:bg-accent/10 transition-colors text-gray-500 hover:text-accent"
                      aria-label="Next testimonial"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                <span className="text-accent">tip:</span> connect on{' '}
                <a
                  href="https://linkedin.com/in/d4vid4nderson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
                {' '}for more recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
