'use client';

type TerminalState = 'open' | 'minimized' | 'closed';

interface TerminalHeaderProps {
  path: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export function TerminalHeader({ path, onClose, onMinimize, onMaximize }: TerminalHeaderProps) {
  return (
    <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          aria-label="Close terminal"
          title="Close terminal"
        />
        <button
          onClick={onMinimize}
          className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
          aria-label="Minimize terminal"
          title="Minimize terminal"
        />
        <button
          onClick={onMaximize}
          className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
          aria-label="Maximize terminal"
          title="Maximize terminal"
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:{path}</span>
    </div>
  );
}

interface TerminalWindowProps {
  path: string;
  state: TerminalState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  closedMessage?: string;
  showClosedMessage?: boolean;
  isMessageVisible?: boolean;
}

export function TerminalWindow({
  path,
  state,
  onClose,
  onMinimize,
  onMaximize,
  children,
  closedMessage,
  showClosedMessage = false,
  isMessageVisible = false,
}: TerminalWindowProps) {
  const pathName = path.replace('~/', '');

  if (state === 'closed') {
    if (!showClosedMessage) {
      return <div className="py-2" />;
    }
    return (
      <div className="relative py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto z-10">
          <div className={`bg-gray-100 dark:bg-[#2a2a2a] rounded-lg border border-gray-300 dark:border-white/10 px-4 py-3 font-mono text-sm text-gray-500 dark:text-gray-400 text-center transition-all duration-500 ${
            isMessageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <span className="text-accent">{path}</span> terminal closed. Type <code className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-accent">{pathName}</code> in the main terminal to restore.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300">
      <TerminalHeader
        path={path}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />
      <div className={`transition-all duration-300 overflow-hidden ${
        state === 'minimized' ? 'max-h-0' : 'max-h-[5000px]'
      }`}>
        {children}
      </div>
    </div>
  );
}
