'use client';

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left orb */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />

      {/* Top right orb */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-accent-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Middle left orb */}
      <div className="absolute top-[45%] left-[5%] w-[400px] h-[400px] bg-accent-tertiary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Middle right orb */}
      <div className="absolute top-[55%] right-[15%] w-[450px] h-[450px] bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Bottom left orb */}
      <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] bg-accent-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Bottom right orb */}
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-accent-tertiary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2.5s' }} />
    </div>
  );
}
