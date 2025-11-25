'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiUser, FiRefreshCw } from 'react-icons/fi';
import { useChatContext } from './ChatContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Dave built?",
  "What's Dave's tech stack?",
  "How does Dave use AI?",
];

export function AIChat() {
  const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useChatContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showJobMatcher, setShowJobMatcher] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent, customMessage?: string) => {
    e?.preventDefault();
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again later or reach out directly at david4nderson@pm.me"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobMatch = () => {
    setShowJobMatcher(true);
    setInput('');
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setShowJobMatcher(false);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        // Bold - convert **text** to styled spans
        let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent-light font-semibold">$1</span>');

        // Headers
        if (line.startsWith('### ')) {
          formattedLine = formattedLine.slice(4);
          return <h4 key={i} className="font-bold text-accent mt-3 mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        if (line.startsWith('## ')) {
          formattedLine = formattedLine.slice(3);
          return <h3 key={i} className="font-bold text-accent text-lg mt-4 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        // Bullet points
        if (line.startsWith('- ')) {
          formattedLine = formattedLine.slice(2);
          return (
            <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: formattedLine }} />
          );
        }
        // Regular paragraph
        if (line.trim()) {
          return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        return <br key={i} />;
      });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[9998] p-4 rounded-full bg-gradient-accent-to-r text-white shadow-lg transition-all duration-300 hover:scale-110 hover:glow ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open chat"
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] w-[400px] max-w-[calc(100vw-48px)] h-[580px] max-h-[calc(100vh-100px)] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-gradient-accent-to-r rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <FiUser size={14} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Ask about Dave</h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <FiRefreshCw size={14} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
              aria-label="Close chat"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300 text-sm mb-4">
                  Hi! I can answer questions about Dave&apos;s experience, projects, and skills. I can also analyze job descriptions to show how his background fits specific roles.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Try asking:</p>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(undefined, q)}
                      className="block w-full text-left text-sm p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Matcher CTA */}
              <button
                onClick={handleJobMatch}
                className="w-full p-4 rounded-xl border-2 border-dashed border-accent/30 hover:border-accent hover:bg-accent/5 transition-all text-left group"
              >
                <p className="font-semibold text-accent group-hover:text-accent-light transition-colors">
                  Match a Job Description
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Paste a JD and I&apos;ll analyze how Dave&apos;s experience aligns
                </p>
              </button>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-accent-to-r text-white'
                      : 'bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-2xl p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Job Matcher Input */}
        {showJobMatcher && messages.length === 0 && (
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2">Paste a job description:</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-32 p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm resize-none focus:outline-none focus:border-accent placeholder-gray-600"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowJobMatcher(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (input.trim()) {
                    handleSubmit(undefined, `Please analyze this job description and show how Dave's experience matches the requirements:\n\n${input}`);
                    setShowJobMatcher(false);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-accent-to-r text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Analyze Fit
              </button>
            </div>
          </div>
        )}

        {/* Regular Input */}
        {(!showJobMatcher || messages.length > 0) && (
          <div className="border-t border-white/10">
            {/* Quick Prompts */}
            <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                "Projects",
                "Tech stack",
                "AI experience"
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(undefined, `Tell me about Dave's ${prompt.toLowerCase()}`)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-accent hover:border-accent/50 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="px-4 pb-4">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Dave's experience..."
                  rows={1}
                  className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm resize-none focus:outline-none focus:border-accent placeholder-gray-600"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 rounded-xl bg-gradient-accent-to-r text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  aria-label="Send message"
                >
                  <FiSend size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Built with Claude API
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
