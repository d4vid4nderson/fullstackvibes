'use client';

import Image from 'next/image';

export function InteractiveImage() {
  return (
    <div className="flex-shrink-0 float-animation relative">
      <div className="relative group">
        {/* Animated gradient glow - theme aware */}
        <div className="absolute -inset-1 bg-gradient-accent-to-r rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-all"></div>

        {/* Gradient border - theme aware */}
        <div className="relative rounded-full p-1 bg-gradient-accent-to-r w-[400px] h-[400px] transition-all">
          <div className="relative rounded-full overflow-hidden w-full h-full">
            <Image
              src="/david-headshot-square.png"
              alt="David Anderson"
              width={400}
              height={400}
              className="relative rounded-full shadow-2xl object-cover w-full h-full"
              priority
            />
            {/* Theme-aware gradient overlay - bottom left */}
            <div className="absolute inset-0 rounded-full pointer-events-none headshot-overlay transition-all"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
