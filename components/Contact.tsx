'use client';

import { useState, useRef } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setCommandHistory(prev => [...prev, `$ send-message --to david`]);
    setCommandHistory(prev => [...prev, `  --from "${formData.name}" <${formData.email}>`]);
    setCommandHistory(prev => [...prev, `  --body "${formData.message.substring(0, 50)}${formData.message.length > 50 ? '...' : ''}"`]);
    setCommandHistory(prev => [...prev, '']);
    setCommandHistory(prev => [...prev, 'Sending message...']);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setCommandHistory(prev => [...prev, '✓ Message sent successfully!']);
        setCommandHistory(prev => [...prev, '  Response: "Thanks! I\'ll get back to you soon."']);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
          setCommandHistory([]);
        }, 5000);
      } else {
        setStatus('error');
        setCommandHistory(prev => [...prev, '✗ Error: Failed to send message']);
        setCommandHistory(prev => [...prev, '  Please try again later.']);
        setTimeout(() => {
          setStatus('idle');
          setCommandHistory([]);
        }, 5000);
      }
    } catch {
      setStatus('error');
      setCommandHistory(prev => [...prev, '✗ Error: Network error']);
      setCommandHistory(prev => [...prev, '  Please check your connection.']);
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
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/contact</span>
          </div>

          {/* Terminal Content */}
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
                <div className="mt-4 p-4 bg-gray-50 dark:bg-black/30 rounded-lg border border-gray-200 dark:border-white/10">
                  {commandHistory.map((line, index) => (
                    <div key={index} className={`text-sm ${
                      line.startsWith('✓') ? 'text-green-600 dark:text-green-400' :
                      line.startsWith('✗') ? 'text-red-600 dark:text-red-400' :
                      line.startsWith('Sending') ? 'text-accent animate-pulse' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

              {/* Submit button styled as command */}
              <div className="flex items-center gap-2">
                <span className="text-accent select-none">&gt;</span>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-mono text-sm rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>sending...</span>
                    </>
                  ) : status === 'success' ? (
                    <span>message sent!</span>
                  ) : (
                    <span>send-message --execute</span>
                  )}
                </button>
              </div>
            </form>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                <span className="text-accent">tip:</span> type <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-accent">contact</code> in the terminal above for quick access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
