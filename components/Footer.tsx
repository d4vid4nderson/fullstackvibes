import { FiGithub, FiMail, FiHeart, FiLinkedin } from 'react-icons/fi';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Left side: Logo and Built with */}
          <div className="flex flex-col gap-3">
            {/* Full Stack Vibes Logo */}
            <div className="font-bold text-accent leading-tight text-lg font-mono">
              Full Stack Vibes
            </div>

            {/* Built with section */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>Built with</span>
              <FiHeart className="w-4 h-4 text-accent animate-pulse" />
              <span>using</span>
              <span className="font-semibold gradient-text">Next.js</span>
              <span>&</span>
              <span className="font-semibold gradient-text">Tailwind CSS</span>
              <span>&</span>
              <span className="inline-block" style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
                WebkitMask: 'url(/claude_code.svg) no-repeat center',
                mask: 'url(/claude_code.svg) no-repeat center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                width: '24px',
                height: '24px'
              }} />
            </div>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/d4vid4nderson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors group/link"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5 group-hover-accent transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/d4v1d4nd3rs0n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors group/link"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5 group-hover-accent transition-colors" />
            </a>
            <a
              href="#contact"
              className="text-gray-400 transition-colors group/link"
              aria-label="Contact"
            >
              <FiMail className="w-5 h-5 group-hover-accent transition-colors" />
            </a>
          </div>

          {/* Right: Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} David Anderson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
