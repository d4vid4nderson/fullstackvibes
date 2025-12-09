'use client';

import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { FiMapPin, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { ResumeModal } from './ResumeModal';
import { useChatContext } from './ChatContext';
import { useTerminal } from './TerminalContext';

// Fun theme names with epic movie/book references
const THEME_OPTIONS = [
  {
    key: 'cyan',
    name: 'Water of Life',
    description: 'The spice must flow - cyan essence of Arrakis',
    tagline: 'He who controls the Spice controls the universe!'
  },
  {
    key: 'purple',
    name: 'One Ring',
    description: 'One theme to rule them all - mystical purples',
    tagline: 'One theme to rule them all!'
  },
  {
    key: 'emerald',
    name: 'Bag End',
    description: 'Home of the Hobbits - peaceful greens',
    tagline: 'There and back again!'
  },
  {
    key: 'orange',
    name: 'Arrakis',
    description: 'Burning sands and spice melange - desert oranges',
    tagline: 'Fear is the mind-killer... but this theme is fire!'
  },
  {
    key: 'blue',
    name: 'Saber Battle',
    description: 'Blue vs Red - the eternal clash',
    tagline: 'Choose your side!'
  },
];

export function Hero() {
  const { mode, setMode, setColorTheme } = useTheme();
  const { setIsChatOpen } = useChatContext();
  const { careerState, projectsState, contactState, restoreTerminal } = useTerminal();
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const [isHistoryFading, setIsHistoryFading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-reset terminal output after 20 seconds of inactivity with fade effect
  useEffect(() => {
    if (commandHistory.length > 0 && !isHistoryFading) {
      // Clear any existing timer
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      // Set new timer to fade and clear history after 20 seconds
      resetTimerRef.current = setTimeout(() => {
        // Start fade out
        setIsHistoryFading(true);

        // Clear history after fade animation completes
        setTimeout(() => {
          setCommandHistory([]);
          setShowThemeMenu(false);
          setIsHistoryFading(false);
        }, 500);
      }, 20000);
    }

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [commandHistory, isHistoryFading]);

  const handleThemeSelection = (themeKey: string) => {
    const theme = THEME_OPTIONS.find(t => t.key === themeKey);
    if (!theme) return;

    setShowThemeMenu(false);

    // Add loading animation message
    setCommandHistory(prev => [...prev,
      `Activating ${theme.name}...`,
      `${theme.tagline}`,
      '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
      `Theme "${theme.name}" activated! ✨`
    ]);

    // Trigger theme change with animation
    document.documentElement.style.transition = 'filter 0.5s ease-in-out';
    document.documentElement.style.filter = 'brightness(1.3) saturate(1.5)';

    setTimeout(() => {
      setColorTheme(themeKey as any);
    }, 250);

    setTimeout(() => {
      document.documentElement.style.filter = 'brightness(1) saturate(1)';
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 500);
    }, 500);
  };

  const handleCommand = (cmd: string, delayAction: boolean = false) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Handle theme menu selection (numbers 1-5)
    if (showThemeMenu && ['1', '2', '3', '4', '5'].includes(trimmedCmd)) {
      const selectedTheme = THEME_OPTIONS[parseInt(trimmedCmd) - 1];
      setCommandHistory(prev => [...prev, `> ${cmd}`]);
      handleThemeSelection(selectedTheme.key);
      setCommand('');
      return;
    }

    // Show command in history first
    setCommandHistory(prev => [...prev, `> ${cmd}`]);

    // If delayAction is true, wait 1 second before executing, but show messages immediately
    if (delayAction) {
      // Show the message immediately
      const messageResult = getCommandMessage(trimmedCmd);
      if (messageResult) {
        setCommandHistory(prev => [...prev, messageResult.message]);
        setTimeout(() => executeCommandAction(trimmedCmd, messageResult.action), 1000);
      } else {
        setTimeout(() => executeCommandAction(trimmedCmd, null), 1000);
      }
      setCommand('');
      return;
    }

    // Immediate execution (for keyboard input)
    const messageResult = getCommandMessage(trimmedCmd);
    if (messageResult) {
      setCommandHistory(prev => [...prev, messageResult.message]);
      executeCommandAction(trimmedCmd, messageResult.action);
    } else {
      executeCommandAction(trimmedCmd, null);
    }
    setCommand('');
  };

  const getCommandMessage = (trimmedCmd: string): { message: string; action: string } | null => {
    switch (trimmedCmd) {
      case '/projects':
      case 'projects':
        const projectMessages = [
          'One does not simply scroll to projects... But here we go!',
          'The spice must flow... to the projects section!',
          'Engaging hyperspace jump... Projects ahead!',
          'I\'m going to make you an offer you can\'t refuse... Check out my projects!',
          'These aren\'t the projects you\'re looking for... Wait, yes they are!'
        ];
        return { message: projectMessages[Math.floor(Math.random() * projectMessages.length)], action: 'scrollProjects' };

      case '/career':
      case 'career':
      case 'experience':
      case 'history':
      case 'timeline':
        const careerMessages = [
          'git log --career | The full commit history of my professional journey!',
          'The story of how I got here... Spoiler: It involves a lot of code!',
          'From design ops to AI applications... Let me show you the path!',
          '12+ years of evolution, documented in one timeline!',
          'The archives are comprehensive and totally secure... Let me show you!'
        ];
        return { message: careerMessages[Math.floor(Math.random() * careerMessages.length)], action: 'scrollCareer' };

      case '/contact':
      case 'contact':
        const contactMessages = [
          'You shall not pass... without saying hello first!',
          'The sleeper has awakened... Time to connect!',
          'I need your help... Let\'s talk!',
          'This is the way... to get in touch!',
          'Help me, Obi-Wan... You\'re my only hope! (Or just email me)'
        ];
        return { message: contactMessages[Math.floor(Math.random() * contactMessages.length)], action: 'scrollContact' };

      case '/resume':
      case '/cv':
      case 'resume':
      case 'cv':
      case 'download':
        const resumeMessages = [
          'My precious... I mean, my resume! Here it is!',
          'He who controls the resume, controls the universe!',
          'It\'s not who I am underneath, but my resume that defines me!',
          'Do or do not download my resume... There is no try!',
          'And so it begins... The great resume of our time!'
        ];
        return { message: resumeMessages[Math.floor(Math.random() * resumeMessages.length)], action: 'openResume' };

      case '/linkedin':
      case 'linkedin':
        const linkedinMessages = [
          'A wizard is never late to LinkedIn, nor is he early... He arrives precisely when he means to!',
          'Fear is the mind-killer... But LinkedIn is the career-maker!',
          'In the land of LinkedIn, where the professionals lie...',
          'I find your lack of connections disturbing... Let\'s fix that!',
          'With great power comes great LinkedIn connections!'
        ];
        return { message: linkedinMessages[Math.floor(Math.random() * linkedinMessages.length)], action: 'openLinkedin' };

      case '/github':
      case 'github':
        const githubMessages = [
          'The code is strong with this one... Opening GitHub!',
          'I must not fear the code. Code is the mind-killer... Opening GitHub anyway!',
          'Even the smallest commit can change the course of the future... Check it out!',
          'Why so serious? Let\'s look at some code!',
          'In the beginning, there was nothing... Then I pushed to GitHub!'
        ];
        return { message: githubMessages[Math.floor(Math.random() * githubMessages.length)], action: 'openGithub' };

      case 'light':
        const lightMessages = [
          'The Force is strong with this one... Welcome to the Light Side!',
          'Switching to Light Mode... May the Force be with you!',
          'Embracing the Light Side of the Force... Balance restored!',
          'Light Mode activated! The Force flows through you.',
          'Welcome to the Light Side, young Padawan!'
        ];
        return { message: lightMessages[Math.floor(Math.random() * lightMessages.length)], action: 'setLight' };

      case 'dark':
        const darkMessages = [
          'I\'m Batman. Dark Mode activated.',
          'Why do we fall? So we can learn to pick ourselves up... in Dark Mode.',
          'It\'s not who I am underneath, but what I do that defines me... in Dark Mode.',
          'The night is darkest just before the dawn... Welcome to Dark Mode.',
          'I am vengeance. I am the night. I am Dark Mode!',
          'Welcome to the shadows, Dark Knight.'
        ];
        return { message: darkMessages[Math.floor(Math.random() * darkMessages.length)], action: 'setDark' };

      case 'ai':
      case '/ai':
      case 'chat':
      case '/chat':
      case 'bot':
      case '/bot':
      case 'chatbot':
      case 'assistant':
      case 'claude':
      case 'ask':
      case 'hal':
        const aiMessages = [
          'I\'m sorry, I\'m afraid I can... Actually, I CAN do that! Opening AI assistant!',
          'Hello there! You\'re looking well today. Let me help you...',
          'The AI is strong with this one... Summoning assistant!',
          'Open the pod bay doors, HAL... I mean, opening AI chat!',
          'A new challenger approaches! AI assistant activated!',
          'Shall we play a game? Let\'s chat with AI!'
        ];
        return { message: aiMessages[Math.floor(Math.random() * aiMessages.length)], action: 'openAI' };

      default:
        return null;
    }
  };

  const executeCommandAction = (trimmedCmd: string, action: string | null) => {
    // If action is provided, execute it directly
    if (action) {
      switch (action) {
        case 'scrollProjects':
          // Restore terminal if closed, then scroll
          if (projectsState === 'closed') {
            restoreTerminal('projects');
            setCommandHistory(prev => [...prev, '✓ ~/projects terminal restored']);
          }
          setTimeout(() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        case 'scrollCareer':
          // Restore terminal if closed, then scroll
          if (careerState === 'closed') {
            restoreTerminal('career');
            setCommandHistory(prev => [...prev, '✓ ~/career terminal restored']);
          }
          setTimeout(() => {
            document.getElementById('career')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        case 'scrollContact':
          // Restore terminal if closed, then scroll
          if (contactState === 'closed') {
            restoreTerminal('contact');
            setCommandHistory(prev => [...prev, '✓ ~/contact terminal restored']);
          }
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        case 'openResume':
          setShowResumeModal(true);
          return;
        case 'openLinkedin':
          window.open('https://www.linkedin.com/in/d4v1d4nd3rs0n', '_blank');
          return;
        case 'openGithub':
          window.open('https://github.com/d4vid4nderson', '_blank');
          return;
        case 'setLight':
          setMode('light');
          return;
        case 'setDark':
          setMode('dark');
          return;
        case 'openAI':
          setIsChatOpen(true);
          return;
      }
    }

    // Fuzzy command matching
    const darkVariants = ['dakr', 'drak', 'drka', 'drk', 'arkd', 'krad', 'kard', 'dard', 'dar'];
    const lightVariants = ['lihgt', 'lghit', 'lit', 'lite', 'litgh', 'thgil', 'hgilt', 'ligh', 'ligt'];
    const resetVariants = ['rest', 'reet', 'reste', 'teser', 'reest', 'rset', 'rese'];
    const clearVariants = ['cler', 'clea', 'claer', 'clr', 'clar'];
    const helpVariants = ['hlep', 'hepl', 'hep', 'hlp', 'halp', 'helps'];
    const projectsVariants = ['projet', 'projetcs', 'porjects', 'projets', 'proects', 'prjects', 'projet'];
    const contactVariants = ['contct', 'contac', 'contat', 'cotact', 'conact', 'ccontact'];
    const resumeVariants = ['resme', 'reume', 'rsume', 'resumee', 'resum', 'resue'];
    const linkedinVariants = ['linkedn', 'linkdin', 'linkin', 'linkedni', 'liknedin', 'lnkedin'];
    const githubVariants = ['gthub', 'githb', 'gitub', 'gihub', 'gihtub'];

    if (darkVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'dark' mode? Type 'dark' to switch to dark mode.`]);
      setCommand('');
      return;
    }

    if (lightVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'light' mode? Type 'light' to switch to light mode.`]);
      setCommand('');
      return;
    }

    if (resetVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'reset' terminal? Type 'reset' to reset the terminal.`]);
      setCommand('');
      return;
    }

    if (clearVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'clear'? Type 'clear' to clear the terminal.`]);
      setCommand('');
      return;
    }

    if (helpVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'help'? Type 'help' to see available commands.`]);
      setCommand('');
      return;
    }

    if (projectsVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'projects'? Type 'projects' to view my projects.`]);
      setCommand('');
      return;
    }

    if (contactVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'contact'? Type 'contact' to get in touch.`]);
      setCommand('');
      return;
    }

    if (resumeVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'resume'? Type 'resume' to download my resume.`]);
      setCommand('');
      return;
    }

    if (linkedinVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'linkedin'? Type 'linkedin' to visit my LinkedIn.`]);
      setCommand('');
      return;
    }

    if (githubVariants.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, `Did you mean 'github'? Type 'github' to visit my GitHub.`]);
      setCommand('');
      return;
    }

    switch (trimmedCmd) {
      case 'theme':
      case 'themes':
        setShowThemeMenu(true);
        const themeIntros = [
          '🎨 Paint your experience! Choose your vibe:',
          '✨ Transform your world! Pick a theme:',
          '🌈 Color your journey! Select your style:',
          '💫 Make it yours! Choose your aesthetic:',
          '🎭 Set the mood! Pick your palette:'
        ];
        setCommandHistory(prev => [...prev,
          '',
          themeIntros[Math.floor(Math.random() * themeIntros.length)],
          '',
          ...THEME_OPTIONS.map((theme, idx) =>
            `  ${idx + 1}. ${theme.name} - ${theme.description}`
          ),
          '',
          'Type a number (1-5) to select your theme'
        ]);
        break;
      case 'help':
      case '/help':
        const helpIntros = [
          'Ask and you shall receive... Here are the sacred commands:',
          'The spice extends life, the spice expands consciousness... Here are the commands:',
          'Always remember: This is the help menu:',
          'These commands will aid you on your journey:',
          'Use the Force... Or just use these commands:'
        ];
        setCommandHistory(prev => [...prev,
          helpIntros[Math.floor(Math.random() * helpIntros.length)],
          '',
          '  --bio      - About me',
          '  --stats    - My impact stats',
          '  --stack    - Tech stack',
          '  --ai       - AI & ML tools',
          '',
          '  /projects  - View my projects',
          '  /career    - View my career timeline',
          '  /contact   - Get in touch',
          '  /resume    - Download my resume',
          '  /linkedin  - Visit my LinkedIn',
          '  /github    - Visit my GitHub',
          '',
          '  ai         - Chat with AI assistant',
          '  theme      - Choose your color theme',
          '  light/dark - Switch display mode',
          '  clear      - Clear terminal',
          '  help       - Show this message'
        ]);
        break;
      case 'clear':
        const clearMessages = [
          'Fly, you fools! *clears terminal*',
          'The desert takes the weak... But I\'ll clear this terminal!',
          'Let\'s put a smile on that face... With a clean terminal!',
          'Your focus determines your reality... Clearing terminal!',
          'All those moments will be lost in time... Terminal cleared!'
        ];
        setCommandHistory(prev => [...prev, clearMessages[Math.floor(Math.random() * clearMessages.length)]]);
        setTimeout(() => setCommandHistory([]), 500);
        break;
      case 'reset':
        const resetMessages = [
          'Back to the beginning of the age... Terminal reset!',
          'A beginning is a very delicate time... Resetting now!',
          'It\'s a reset, but not as we know it... Terminal rebooted!',
          'I\'m going to reset this terminal... And nobody is going to stop me!',
          'The ability to reset this terminal is insignificant... But here we go!'
        ];
        setCommandHistory(prev => [...prev, resetMessages[Math.floor(Math.random() * resetMessages.length)]]);
        setTimeout(() => {
          setCommandHistory([]);
          setCommand('');
        }, 500);
        break;

      // 🥚 EASTER EGGS 🥚
      case 'konami':
      case '↑↑↓↓←→←→ba':
        setCommandHistory(prev => [...prev,
          '',
          '🎮 ↑ ↑ ↓ ↓ ← → ← → B A',
          '',
          '  +30 lives activated!',
          '  Just kidding... but you\'ve unlocked',
          '  the mass respect of nerds everywhere.',
          '',
          '  🏆 Achievement Unlocked: Knows The Code',
          ''
        ]);
        break;

      case '42':
        setCommandHistory(prev => [...prev,
          '',
          '🌌 The Answer to the Ultimate Question of',
          '   Life, the Universe, and Everything.',
          '',
          '   But what was the question?',
          '',
          '   "I always thought something was fundamentally',
          '    wrong with the universe." - Arthur Dent',
          ''
        ]);
        break;

      case 'sudo':
      case 'sudo su':
      case 'sudo rm':
        setCommandHistory(prev => [...prev,
          '',
          '🔐 Nice try...',
          '',
          '   David is not in the sudoers file.',
          '   This incident will be reported.',
          '',
          '   (Just kidding, I\'m a portfolio website)',
          ''
        ]);
        break;

      case 'rm -rf':
      case 'rm -rf /':
      case 'rm -rf /*':
        setCommandHistory(prev => [...prev,
          '',
          '💀 Whoa there, cowboy!',
          '',
          '   I see you like to live dangerously.',
          '   Fortunately, this terminal is read-only.',
          '',
          '   Your destructive tendencies have been noted.',
          '   HR will be in touch.',
          ''
        ]);
        break;

      case 'hello world':
      case 'hello, world':
      case 'helloworld':
        setCommandHistory(prev => [...prev,
          '',
          '👋 Hello, World!',
          '',
          '   printf("The classic first program!");',
          '   console.log("Every journey starts here");',
          '   print("Welcome, fellow developer!")',
          '',
          '   You never forget your first.',
          ''
        ]);
        break;

      case 'coffee':
      case 'brew':
        setCommandHistory(prev => [...prev,
          '',
          '      ☕',
          '    ~~~~~~~~~~~~',
          '    )  ~~~~~~  (',
          '    )  COFFEE  (',
          '    )__________(',
          '    |__________|',
          '',
          '   A developer\'s best friend.',
          '   Current status: Caffeinated ✓',
          ''
        ]);
        break;

      case 'matrix':
        setCommandHistory(prev => [...prev,
          '',
          '💊 Red pill or blue pill?',
          '',
          '   "I\'m trying to free your mind, Neo.',
          '    But I can only show you the door.',
          '    You\'re the one that has to walk through it."',
          '',
          '   Wake up, Neo...',
          '   The Matrix has you...',
          ''
        ]);
        break;

      case 'vim':
      case ':q':
      case ':q!':
      case ':wq':
        setCommandHistory(prev => [...prev,
          '',
          '📝 How to exit Vim:',
          '',
          '   Step 1: Don\'t panic',
          '   Step 2: Press Esc (maybe a few times)',
          '   Step 3: Type :q! and hit Enter',
          '   Step 4: Question your life choices',
          '',
          '   Congratulations, you\'ve escaped!',
          ''
        ]);
        break;

      case 'ping':
        setCommandHistory(prev => [...prev,
          '',
          '🏓 PONG!',
          '',
          '   64 bytes from portfolio: icmp_seq=1 ttl=64 time=0.042ms',
          '   64 bytes from portfolio: icmp_seq=2 ttl=64 time=0.039ms',
          '   64 bytes from portfolio: icmp_seq=3 ttl=64 time=0.041ms',
          '',
          '   --- portfolio ping statistics ---',
          '   3 packets transmitted, 3 received, 0% packet loss',
          '   Connection to David\'s portfolio: Excellent',
          ''
        ]);
        break;

      case 'make me a sandwich':
      case 'makemeasandwich':
        setCommandHistory(prev => [...prev,
          '',
          '🥪 What? Make it yourself.',
          ''
        ]);
        break;

      case 'sudo make me a sandwich':
        setCommandHistory(prev => [...prev,
          '',
          '🥪 Okay.',
          '',
          '   🍞 Bread',
          '   🥬 Lettuce',
          '   🍅 Tomato',
          '   🧀 Cheese',
          '   🥓 Bacon',
          '   🍞 Bread',
          '',
          '   Your sandwich is ready, master.',
          ''
        ]);
        break;

      case 'exit':
      case 'quit':
      case 'logout':
        setCommandHistory(prev => [...prev,
          '',
          '👋 Where do you think you\'re going?',
          '',
          '   This isn\'t a real terminal, friend.',
          '   You\'re already free.',
          '',
          '   But since you\'re here... hire David?',
          ''
        ]);
        break;

      case 'ls':
      case 'dir':
        setCommandHistory(prev => [...prev,
          '',
          '📁 Contents of /david/portfolio:',
          '',
          '   drwxr-xr-x  projects/',
          '   drwxr-xr-x  skills/',
          '   -rw-r--r--  resume.pdf',
          '   -rw-r--r--  cover_letter.txt',
          '   drwxr-xr-x  coffee_addiction/',
          '   -rw-r--r--  hire_me.please',
          ''
        ]);
        break;

      case 'whoami':
        setCommandHistory(prev => [...prev,
          '',
          '🤔 You are a visitor exploring David\'s portfolio.',
          '',
          '   But the real question is...',
          '   Who do you want to be?',
          '',
          '   (Deep, right?)',
          ''
        ]);
        break;

      case 'pwd':
        setCommandHistory(prev => [...prev,
          '',
          '📍 /home/visitor/davids-awesome-portfolio',
          ''
        ]);
        break;

      case '--bio':
      case 'bio':
      case '--about':
      case 'about':
        setCommandHistory(prev => [...prev,
          '',
          '💡 About David:',
          '',
          '   David builds AI-powered tools that solve real workflow problems.',
          '   From concept to deployment, he bridges the gap between',
          '   business needs and technical solutions.',
          ''
        ]);
        break;

      case '--stats':
      case 'stats':
        setCommandHistory(prev => [...prev,
          '',
          '📊 Impact Stats:',
          '',
          '   → 6 production AI applications shipped',
          '   → $400K+ annual cost savings delivered',
          '   → 80% efficiency gains measured',
          ''
        ]);
        break;

      case '--stack':
      case 'stack':
        setCommandHistory(prev => [...prev,
          '',
          '🛠️ Tech Stack:',
          '',
          '   Languages:  Go, Python, TypeScript',
          '   Frontend:   React, Next.js, Tailwind CSS',
          '   Backend:    FastAPI, HTMX, PostgreSQL',
          '   DevOps:     Docker, Playwright, CI/CD',
          ''
        ]);
        break;

      case '--ai':
        setCommandHistory(prev => [...prev,
          '',
          '🤖 AI & ML Tools:',
          '',
          '   Models:     Claude, GPT-4, Azure OpenAI',
          '   Skills:     Prompt Engineering, RAG Pipelines',
          '   Focus:      Enterprise AI Integration',
          ''
        ]);
        break;

      // Easter Eggs - Fun Commands
      case 'sudo hire-me':
      case 'sudo hire me':
      case 'hire-me':
      case 'hire me':
      case 'hire':
        setCommandHistory(prev => [...prev,
          '',
          '🚀 INITIATING HIRING SEQUENCE...',
          '',
          '   [■■■■■■■■■■] 100% - Scanning resume',
          '   [■■■■■■■■■■] 100% - Verifying AI skills',
          '   [■■■■■■■■■■] 100% - Checking project portfolio',
          '   [■■■■■■■■■■] 100% - Confirming $400K+ impact',
          '',
          '   ✅ CANDIDATE VERIFIED: David Anderson',
          '   📧 Contact: david4nderson@pm.me',
          '   🔗 LinkedIn: linkedin.com/in/d4v1d4nd3rs0n',
          '',
          '   Ready when you are! 🤝',
          ''
        ]);
        break;

      case 'status':
      case 'availability':
      case 'available':
      case 'open to work':
        setCommandHistory(prev => [...prev,
          '',
          '🟢 STATUS: OPEN TO OPPORTUNITIES',
          '',
          '   Currently exploring:',
          '   • Product Owner / Technical PM roles',
          '   • Full-Stack Developer positions',
          '   • AI/ML Engineering opportunities',
          '',
          '   Location: Texas (Remote-friendly)',
          '   Notice: Can start within 2 weeks',
          '',
          '   Type "contact" to reach out!',
          ''
        ]);
        break;

      case 'cat skills.txt':
      case 'cat skills':
      case 'skills':
        setCommandHistory(prev => [...prev,
          '',
          '📄 skills.txt',
          '',
          '   LANGUAGES',
          '   ├── Go ████████████ Expert',
          '   ├── Python ████████████ Expert',
          '   ├── TypeScript ██████████░░ Advanced',
          '   └── JavaScript ██████████░░ Advanced',
          '',
          '   FRAMEWORKS',
          '   ├── React/Next.js ██████████░░ Advanced',
          '   ├── FastAPI ████████████ Expert',
          '   └── HTMX ████████████ Expert',
          '',
          '   AI/ML',
          '   ├── Claude/Anthropic ████████████ Expert',
          '   ├── OpenAI/GPT-4 ████████████ Expert',
          '   └── RAG Pipelines ██████████░░ Advanced',
          ''
        ]);
        break;

      case 'cat hire_me.please':
      case 'cat hire_me':
        setCommandHistory(prev => [...prev,
          '',
          '📄 hire_me.please',
          '',
          '   Dear Future Employer,',
          '',
          '   I build things that make people\'s lives easier.',
          '   I\'ve saved companies $400K+ with AI tools.',
          '   I ship 6 production apps that teams use daily.',
          '   I bridge the gap between tech and business.',
          '',
          '   Let\'s build something amazing together.',
          '',
          '   - David',
          '',
          '   P.S. I also make great coffee. ☕',
          ''
        ]);
        break;

      case 'fortune':
      case 'cowsay':
        const fortunes = [
          '"Any sufficiently advanced bug is indistinguishable from a feature." - Unknown',
          '"It works on my machine." - Every developer ever',
          '"99 little bugs in the code, 99 little bugs... Take one down, patch it around... 127 little bugs in the code."',
          '"A good programmer is someone who looks both ways before crossing a one-way street." - Doug Linder',
          '"The best error message is the one that never shows up." - Thomas Fuchs',
        ];
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setCommandHistory(prev => [...prev,
          '',
          '🔮 Fortune:',
          '',
          `   ${randomFortune}`,
          ''
        ]);
        break;

      case 'neofetch':
      case 'screenfetch':
        setCommandHistory(prev => [...prev,
          '',
          '        ████████████████        david@fullstackvibes',
          '      ██              ██        ──────────────────────',
          '    ██   ██████████   ██        OS: macOS Sequoia',
          '    ██   ██      ██   ██        Host: David Anderson',
          '    ██   ██████████   ██        Shell: zsh 5.9',
          '    ██                ██        Terminal: iTerm2',
          '    ██   ██████████   ██        Editor: VS Code + Cursor',
          '    ██                ██        Languages: Go, Python, TS',
          '      ██              ██        Coffee: ████████████ 100%',
          '        ████████████████        Status: Open to Work 🟢',
          ''
        ]);
        break;

      default:
        if (trimmedCmd) {
          setCommandHistory(prev => [...prev, `Command not found: ${trimmedCmd}. Type 'help' for available commands.`]);
        }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(command, false);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    if (!navMenuRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setNavWidth(entry.contentRect.width);
      }
    });

    observer.observe(navMenuRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-expand navigation on page load, hold for 2 seconds, then collapse
  useEffect(() => {
    // Expand after a brief delay to trigger the animation
    const expandTimer = setTimeout(() => {
      setIsNavExpanded(true);
    }, 100);

    // Collapse after 2 seconds of being expanded
    const collapseTimer = setTimeout(() => {
      setIsNavExpanded(false);
    }, 2100);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  const navSpacing = 28;
  const navShift = navWidth + navSpacing;
  const closingTransformStyle = { '--nav-shift': `${navShift}px` } as React.CSSProperties;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-8 transition-colors duration-300">

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Full Stack Vibes with hidden navigation easter egg - desktop only */}
        <nav className="absolute -top-12 left-0 group/nav cursor-pointer hidden md:block" aria-label="Main navigation">
          <div className="flex items-center text-accent dark:text-accent font-mono text-lg">
            <div className="flex items-center relative gap-0">
              {/* Opening bracket stays in place */}
              <span>&lt;</span>

              {/* Hidden navigation - appears between brackets on hover or expanded on page load */}
              <div
                ref={navMenuRef}
                className={`absolute left-7 flex items-center divide-x divide-gray-300 dark:divide-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out pr-7 ${
                  isNavExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto`}
              >
                <a href="/" className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Home
                </a>
                <a href="#career" onClick={() => { if (careerState === 'closed') restoreTerminal('career'); }} className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Career
                </a>
                <a href="#projects" onClick={() => { if (projectsState === 'closed') restoreTerminal('projects'); }} className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Projects
                </a>
                <button onClick={() => setShowResumeModal(true)} className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Resume
                </button>
                <a href="#contact" onClick={() => { if (contactState === 'closed') restoreTerminal('contact'); }} className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Contact
                </a>
                <div className="relative group/themes px-3">
                  <button className="hover-accent hover-glow-accent transition-all whitespace-nowrap">
                    Themes
                  </button>
                  {/* Theme Selection Dropdown - Desktop */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 pointer-events-none group-hover/themes:opacity-100 group-hover/themes:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-300 dark:border-white/10 p-4 min-w-[300px]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Select Theme</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setMode('light')}
                            className={`p-2 rounded-lg transition-colors ${
                              mode === 'light'
                                ? 'bg-accent text-white'
                                : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333]'
                            }`}
                            aria-label="Light mode"
                          >
                            <FiSun className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setMode('dark')}
                            className={`p-2 rounded-lg transition-colors ${
                              mode === 'dark'
                                ? 'bg-accent text-white'
                                : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333]'
                            }`}
                            aria-label="Dark mode"
                          >
                            <FiMoon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {THEME_OPTIONS.map((theme) => (
                          <button
                            key={theme.key}
                            onClick={() => handleThemeSelection(theme.key)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-left"
                          >
                            <div className="flex gap-1">
                              {/* Water of Life: Cyan → Sky Blue → Blue */}
                              {theme.key === 'cyan' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#06b6d4] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#0ea5e9] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#3b82f6] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {/* One Ring: Gold → Amber → Orange */}
                              {theme.key === 'purple' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#eab308] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ea580c] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {/* The Shire: Light Green → Green → Dark Green */}
                              {theme.key === 'emerald' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#4ade80] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#22c55e] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#15803d] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {/* Arrakis: Orange tones */}
                              {theme.key === 'orange' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#f97316] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#fb923c] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ea580c] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {/* Saber Battle: Blue → Fuchsia → Red */}
                              {theme.key === 'blue' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#3b82f6] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#c026d3] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ef4444] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {theme.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing bracket and text move together to the right */}
              <div
                className={`flex items-center transition-all duration-500 ease-in-out ${
                  isNavExpanded ? 'translate-x-[var(--nav-shift)]' : ''
                } group-hover/nav:translate-x-[var(--nav-shift)]`}
                style={closingTransformStyle}
              >
                <span className="transition-all duration-500 ease-in-out">&gt;</span>
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${isNavExpanded ? 'ml-3' : 'ml-0 group-hover/nav:ml-3'}`}>Full Stack Vibes</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile site title with tap-to-reveal nav */}
        <nav className="absolute -top-12 left-0 md:hidden" aria-label="Mobile navigation">
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="text-accent dark:text-accent font-mono text-base flex items-center"
            aria-expanded={isNavExpanded}
            aria-controls="mobile-nav-links"
          >
            <span>&lt;</span>
            {/* Nav links - expand from left */}
            <div
              id="mobile-nav-links"
              className={`flex items-center gap-1.5 overflow-hidden transition-all duration-500 ease-out ${
                isNavExpanded ? 'w-[280px] opacity-100 px-2' : 'w-0 opacity-0 px-0'
              }`}
            >
              <a href="#career" onClick={(e) => { e.stopPropagation(); setIsNavExpanded(false); if (careerState === 'closed') restoreTerminal('career'); }} className="text-gray-700 dark:text-gray-300 hover-accent transition-colors text-xs whitespace-nowrap focus:outline-none focus:text-accent">
                Career
              </a>
              <span className="text-gray-500 text-xs">|</span>
              <a href="#projects" onClick={(e) => { e.stopPropagation(); setIsNavExpanded(false); if (projectsState === 'closed') restoreTerminal('projects'); }} className="text-gray-700 dark:text-gray-300 hover-accent transition-colors text-xs whitespace-nowrap focus:outline-none focus:text-accent">
                Projects
              </a>
              <span className="text-gray-500 text-xs">|</span>
              <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setIsNavExpanded(false); setShowResumeModal(true); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setIsNavExpanded(false); setShowResumeModal(true); }}} className="text-gray-700 dark:text-gray-300 hover-accent transition-colors text-xs whitespace-nowrap focus:outline-none focus:text-accent cursor-pointer">
                Resume
              </span>
              <span className="text-gray-500 text-xs">|</span>
              <a href="#contact" onClick={(e) => { e.stopPropagation(); setIsNavExpanded(false); if (contactState === 'closed') restoreTerminal('contact'); }} className="text-gray-700 dark:text-gray-300 hover-accent transition-colors text-xs whitespace-nowrap focus:outline-none focus:text-accent">
                Contact
              </a>
            </div>
            <span>&gt;</span>
            {/* Title - contracts to FSV when nav open */}
            <span className="overflow-hidden transition-all duration-500 ease-out whitespace-nowrap">
              {isNavExpanded ? 'FSV' : 'FullStackVibes'}
            </span>
          </button>
        </nav>


        <div className="flex flex-col items-center gap-8">
          {/* Content */}
          <div className="w-full">
            <div className="w-full">
              {/* Terminal Window */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden max-w-7xl mx-auto transition-colors duration-300 text-left">
                {/* Terminal Header */}
                <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~</span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 sm:p-8 font-mono text-sm sm:text-base leading-relaxed relative">
                  {/* Photo - responsive: inline on mobile, absolute on desktop */}
                  <div className="lg:absolute lg:top-8 lg:right-8 flex justify-center lg:justify-end mb-4 lg:mb-0">
                    <div className="relative rounded-full p-[3px] bg-gradient-accent-to-r w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[160px] lg:h-[160px]">
                      <div className="relative rounded-full overflow-hidden w-full h-full bg-white dark:bg-[#1a1a1a]">
                        <Image
                          src="/david-headshot-square.jpg"
                          alt="David Anderson"
                          width={160}
                          height={160}
                          className="rounded-full object-cover w-full h-full"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* whoami - command small, name large white, role colored */}
                  <div className="lg:pr-44 mb-4 text-center lg:text-left">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <span className="text-accent">$</span> whoami{' '}
                      <span className="text-accent">--profile</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      David Anderson
                    </h2>
                    <p className="text-base sm:text-lg font-medium gradient-text">
                      Digital Experience Architect / Product Owner
                    </p>
                  </div>

                  {/* Key Metrics - recruitment hook */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                      <span className="text-accent font-bold">$400K+</span>
                      <span className="text-gray-600 dark:text-gray-400">saved</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                      <span className="text-accent font-bold">6</span>
                      <span className="text-gray-600 dark:text-gray-400">AI apps shipped</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                      <span className="text-accent font-bold">12+</span>
                      <span className="text-gray-600 dark:text-gray-400">years exp</span>
                    </div>
                  </div>

                  {/* CTA Buttons - above the fold */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-5">
                    <a
                      href="#projects"
                      onClick={() => { if (projectsState === 'closed') restoreTerminal('projects'); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      View Projects
                    </a>
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent/10 font-medium rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      View Resume
                    </button>
                    <a
                      href="https://www.linkedin.com/in/d4v1d4nd3rs0n/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent/10 font-medium rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/d4vid4nderson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent/10 font-medium rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                  </div>

                  {/* Tech Stack - Text */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div>
                      <span className="text-accent">$</span>
                      <span className="text-gray-500 dark:text-gray-500"> --stack</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 pl-4">
                      → go, python, typescript, react, next.js, fastapi, postgresql
                    </div>
                    <div className="mt-3">
                      <span className="text-accent">$</span>
                      <span className="text-gray-500 dark:text-gray-500"> --ai</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 pl-4">
                      → claude, gpt-4, azure-openai, rag-pipelines
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-white/10 my-5"></div>

                  {/* Command History - scrollable if needed */}
                  <div
                    ref={terminalRef}
                    className={`cursor-text transition-all duration-500 ease-out overflow-y-auto overscroll-contain touch-pan-y ${
                      isHistoryFading
                        ? 'opacity-0 max-h-0 mb-0'
                        : commandHistory.length > 0
                          ? 'opacity-100 max-h-32 sm:max-h-48 mb-3'
                          : 'max-h-0 mb-0'
                    }`}
                    onClick={focusInput}
                  >
                    {commandHistory.map((line, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Command Input */}
                  <div className="flex gap-2 items-center mt-3">
                    <span className="text-accent dark:text-accent select-none">&gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 caret-accent dark:caret-accent placeholder:text-gray-500 dark:placeholder:text-gray-500"
                      placeholder="type your command to begin."
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-white/10 my-5"></div>

                  {/* Commands */}
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    <div className="hidden sm:block">
                      Commands: <button onClick={() => handleCommand('help', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">help</button> | <button onClick={() => handleCommand('projects', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">projects</button> | <button onClick={() => handleCommand('career', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">career</button> | <button onClick={() => handleCommand('contact', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">contact</button> | <button onClick={() => handleCommand('resume', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">resume</button> | <button onClick={() => handleCommand('github', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">github</button> | <button onClick={() => handleCommand('linkedin', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">linkedin</button> | <button onClick={() => handleCommand('ai', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">ai</button> | <button onClick={() => handleCommand('theme', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">theme</button>
                    </div>
                    <div className="sm:hidden flex flex-wrap gap-x-2 gap-y-1">
                      <span>Commands:</span>
                      <button onClick={() => handleCommand('help', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">help</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('projects', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">projects</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('career', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">career</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('contact', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">contact</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('resume', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">resume</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('github', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">github</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('linkedin', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">linkedin</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('ai', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">ai</button>
                      <span>|</span>
                      <button onClick={() => handleCommand('theme', true)} className="text-accent dark:text-accent hover:underline cursor-pointer">theme</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}
