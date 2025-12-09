import { FiGithub, FiMail, FiHeart, FiLinkedin } from 'react-icons/fi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 sm:flex-row sm:items-end sm:justify-between sm:text-left">
          {/* Left side: Logo and Built with */}
          <div className="flex flex-col gap-3 items-center sm:items-start">
            {/* Full Stack Vibes Logo */}
            <div className="font-bold text-accent leading-tight text-lg font-mono">
              Full Stack Vibes
            </div>

            {/* Built with section - stacked on mobile */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                Built with
                <FiHeart className="w-4 h-4 text-accent animate-pulse" />
                using
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold gradient-text">Next.js</span>
                <span>&</span>
                <span className="font-semibold gradient-text">Tailwind</span>
                <span>&</span>
                <span className="inline-block" style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
                  WebkitMask: 'url(/claude_code.svg) no-repeat center',
                  mask: 'url(/claude_code.svg) no-repeat center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  width: '20px',
                  height: '20px'
                }} />
              </span>
            </div>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-6 order-first sm:order-none">
            <a
              href="https://github.com/d4vid4nderson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors p-2"
              aria-label="GitHub"
            >
              <FiGithub className="w-6 h-6 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/d4v1d4nd3rs0n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors p-2"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-accent transition-colors p-2"
              aria-label="Contact"
            >
              <FiMail className="w-6 h-6 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Right: Copyright and Version */}
          <div className="text-center sm:text-right">
            <p className="text-gray-500 text-xs sm:text-sm">
              © {currentYear} David Anderson
            </p>
            <p className="text-gray-600 text-xs font-mono mt-1">
              v{process.env.NEXT_PUBLIC_VERSION || 'dev'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
