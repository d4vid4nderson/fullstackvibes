'use client';

import { useState, useRef, useEffect } from 'react';
import { useTerminal } from './TerminalContext';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMac, setIsMac] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { contactState, setContactState } = useTerminal();

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setCommandHistory([]);

    // Simulate terminal command sequence
    const addLine = (line: string, delay: number) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setCommandHistory(prev => [...prev, line]);
          resolve();
        }, delay);
      });
    };

    // Build command sequence
    await addLine(`$ send-message \\`, 100);
    await addLine(`    --to "david@fullstackvibes.io" \\`, 150);
    await addLine(`    --from "${formData.name}" \\`, 150);
    await addLine(`    --email "${formData.email}" \\`, 150);
    await addLine(`    --body "${formData.message.substring(0, 40)}${formData.message.length > 40 ? '...' : ''}"`, 150);
    await addLine('', 200);
    await addLine('Connecting to mail server...', 300);
    await addLine('Authenticating...', 400);
    await addLine('Composing message...', 300);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await addLine('Sending...', 200);
        await addLine('', 300);
        setStatus('success');
        setCommandHistory(prev => [...prev, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━']);
        setCommandHistory(prev => [...prev, '✓ Message delivered successfully!']);
        setCommandHistory(prev => [...prev, '']);
        setCommandHistory(prev => [...prev, '  Thanks for reaching out! I\'ll review your']);
        setCommandHistory(prev => [...prev, '  message and get back to you soon.']);
        setCommandHistory(prev => [...prev, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━']);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
          setCommandHistory([]);
        }, 8000);
      } else {
        setStatus('error');
        setCommandHistory(prev => [...prev, '']);
        setCommandHistory(prev => [...prev, '✗ Error: Failed to deliver message']);
        setCommandHistory(prev => [...prev, '  Server returned an error. Please try again.']);
        setTimeout(() => {
          setStatus('idle');
          setCommandHistory([]);
        }, 5000);
      }
    } catch {
      setStatus('error');
      setCommandHistory(prev => [...prev, '']);
      setCommandHistory(prev => [...prev, '✗ Error: Connection failed']);
      setCommandHistory(prev => [...prev, '  Please check your network and try again.']);
      setTimeout(() => {
        setStatus('idle');
        setCommandHistory([]);
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (status !== 'loading' && status !== 'success') {
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  if (contactState === 'closed') {
    return (
      <section id="contact" className="relative py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-lg border border-gray-300 dark:border-white/10 px-4 py-3 font-mono text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
            <span className="text-accent">~/contact</span> terminal closed. Type <code className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-accent">contact</code> in the main terminal to restore.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Terminal Window */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
            <div className="flex gap-2">
              <button
                onClick={() => setContactState('closed')}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Close terminal"
                title="Close terminal"
              />
              <button
                onClick={() => setContactState('minimized')}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
                aria-label="Minimize terminal"
                title="Minimize terminal"
              />
              <button
                onClick={() => setContactState('open')}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
                aria-label="Maximize terminal"
                title="Maximize terminal"
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/contact</span>
          </div>

          {/* Terminal Content - Hidden when minimized */}
          <div className={`transition-all duration-300 overflow-hidden ${
            contactState === 'minimized' ? 'max-h-0' : 'max-h-[5000px]'
          }`}>
          <div className="p-5 sm:p-8 font-mono">
            {/* Command header */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                <span className="text-accent">$</span> compose{' '}
                <span className="gradient-text">--message</span>
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Have a project in mind or want to collaborate? Let&apos;s connect.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input */}
              <div className="flex items-start gap-2">
                <span className="text-accent mt-3 select-none">$</span>
                <div className="flex-1">
                  <label htmlFor="name" className="text-gray-500 dark:text-gray-500 text-sm">
                    --from-name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent outline-none py-2 transition-colors disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="flex items-start gap-2">
                <span className="text-accent mt-3 select-none">$</span>
                <div className="flex-1">
                  <label htmlFor="email" className="text-gray-500 dark:text-gray-500 text-sm">
                    --from-email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent outline-none py-2 transition-colors disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Message input */}
              <div className="flex items-start gap-2">
                <span className="text-accent mt-3 select-none">$</span>
                <div className="flex-1">
                  <label htmlFor="message" className="text-gray-500 dark:text-gray-500 text-sm">
                    --body
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    rows={4}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent outline-none py-2 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              {/* Command history / Status output */}
              {commandHistory.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-black/30 rounded-lg border border-gray-200 dark:border-white/10 font-mono text-sm">
                  {commandHistory.map((line, index) => (
                    <div key={index} className={`${
                      line.startsWith('✓') ? 'text-green-600 dark:text-green-400 font-semibold' :
                      line.startsWith('✗') ? 'text-red-600 dark:text-red-400 font-semibold' :
                      line.startsWith('━') ? 'text-accent/50' :
                      line.startsWith('$') ? 'text-accent' :
                      line.startsWith('Connecting') || line.startsWith('Authenticating') || line.startsWith('Composing') || line.startsWith('Sending') ? 'text-yellow-600 dark:text-yellow-400' :
                      line.startsWith('  Thanks') || line.startsWith('  message') ? 'text-gray-600 dark:text-gray-300' :
                      line.startsWith('    --') ? 'text-gray-500 dark:text-gray-500' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

              {/* Submit instruction styled as terminal prompt */}
              <div className="flex items-center gap-2">
                <span className="text-accent select-none">&gt;</span>
                {status === 'loading' ? (
                  <span className="flex items-center gap-2 text-accent animate-pulse">
                    <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                    sending message...
                  </span>
                ) : status === 'success' ? (
                  <span className="text-green-600 dark:text-green-400">
                    ✓ message sent successfully
                  </span>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    press <kbd className="px-1.5 py-0.5 mx-1 rounded bg-gray-200 dark:bg-white/10 text-accent font-semibold">{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd className="px-1.5 py-0.5 mx-1 rounded bg-gray-200 dark:bg-white/10 text-accent font-semibold">Enter</kbd> to send
                  </span>
                )}
              </div>
            </form>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                <span className="text-accent">tip:</span> fill out the form and press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-accent font-semibold">{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-accent font-semibold">Enter</kbd> to send
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
