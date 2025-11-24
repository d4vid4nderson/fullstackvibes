'use client';

import Link from 'next/link';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

export function Navigation() {
  return (
    <nav className="fixed top-12 right-12 z-50">
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="font-medium text-gray-300 hover:text-purple-400 transition-all text-sm hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
