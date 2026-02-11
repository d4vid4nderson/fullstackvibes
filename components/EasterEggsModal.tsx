'use client';

import { FiX } from 'react-icons/fi';

interface EasterEggsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommandClick: (command: string) => void;
}

export function EasterEggsModal({ isOpen, onClose, onCommandClick }: EasterEggsModalProps) {
  if (!isOpen) return null;

  const easterEggs = [
    {
      category: '🦨 Skunk Works',
      commands: [
        { cmd: 'blackbird', desc: 'Legendary aircraft projects' },
        { cmd: 'skunkworks', desc: 'Kelly Johnson\'s 14 rules' },
        { cmd: 'sr71', desc: 'Innovation at the speed of need' },
      ],
    },
    {
      category: '🎮 Gaming & Pop Culture',
      commands: [
        { cmd: 'konami', desc: 'The legendary Konami code' },
        { cmd: '42', desc: 'Hitchhiker\'s Guide answer' },
        { cmd: 'matrix', desc: 'Red pill or blue pill?' },
      ],
    },
    {
      category: '☕ Developer Humor',
      commands: [
        { cmd: 'coffee', desc: 'ASCII coffee art' },
        { cmd: 'brew', desc: 'Brew some coffee' },
        { cmd: 'vim', desc: 'How to exit Vim' },
        { cmd: 'hello world', desc: 'Classic first program' },
        { cmd: 'sudo', desc: 'Permission denied' },
        { cmd: 'rm -rf', desc: 'Dangerous command warning' },
        { cmd: 'make me a sandwich', desc: 'xkcd reference' },
        { cmd: 'sudo make me a sandwich', desc: 'xkcd with sudo powers' },
      ],
    },
    {
      category: '🖥️ Unix Commands',
      commands: [
        { cmd: 'ls', desc: 'List directory contents' },
        { cmd: 'pwd', desc: 'Present working directory' },
        { cmd: 'whoami', desc: 'Who are you?' },
        { cmd: 'ping', desc: 'Network ping response' },
        { cmd: 'exit', desc: 'Try to leave' },
        { cmd: 'fortune', desc: 'Random fortune cookie' },
        { cmd: 'neofetch', desc: 'System info ASCII art' },
      ],
    },
    {
      category: '📊 Career Info',
      commands: [
        { cmd: 'hire', desc: 'Hiring sequence animation' },
        { cmd: 'status', desc: 'Current availability' },
        { cmd: 'skills', desc: 'Skills with progress bars' },
        { cmd: 'cat hire_me.please', desc: 'Cover letter' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[10000] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a]">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              🥚 Easter Eggs
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-4 sm:p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try typing these commands in the terminal to discover hidden features and surprises!
            </p>

            <div className="space-y-6">
              {easterEggs.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <div
                        key={cmdIdx}
                        onClick={() => {
                          onClose();
                          onCommandClick(cmd.cmd);
                        }}
                        className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-accent hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                      >
                        <code className="text-accent font-bold text-sm">
                          {cmd.cmd}
                        </code>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {cmd.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-accent">💡 Tip:</span> Some commands have multiple variations.
                Try experimenting with different spellings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
