/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Terminal as TerminalIcon, 
  Cpu, 
  Database, 
  Zap, 
  Award,
  ChevronRight,
  Menu,
  X,
  Code2,
  Activity,
  Box,
  Layers,
  Search,
  Command,
  Eye,
  CpuIcon,
  Globe,
  Lock,
  Wifi,
  Bot,
  Send,
  Sparkles,
  BarChart3,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PERSONAL_INFO, SKILLS, EXPERIENCE, PROJECTS, ACHIEVEMENTS } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootLogs = [
    "INITIALIZING KERNEL v2.4.0...",
    "LOADING NEURAL_LINK_MODULE...",
    "ESTABLISHING SECURE CONNECTION...",
    "MOUNTING DATA_SCIENCE_CORE...",
    "FETCHING TRISHA_DAS_PROFILE...",
    "OPTIMIZING INTERFACE_RENDERER...",
    "SYSTEM READY. BOOTING..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 bg-black z-[1000] flex items-center justify-center font-mono p-8"
    >
      <div className="max-w-md w-full space-y-2">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#00FF00] text-xs flex gap-4"
          >
            <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
            <span>{log}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="w-2 h-4 bg-[#00FF00] inline-block"
        />
      </div>
    </motion.div>
  );
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm Trisha's AI Assistant. Ask me anything about her work, skills, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const result = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are Trisha Das's AI Portfolio Assistant. 
          Trisha is a Data Science and AI student at IIT Guwahati and Masters' Union.
          She is currently an intern at AISmith.
          Her skills include Python, GenAI, LLMs, n8n, LangFlow, and Data Analysis.
          Her projects: Decorly.AI (Interior Design), Kairos (Automation), Priya (Chatbot).
          Be professional, technical, and helpful. Keep responses concise.`
        },
        contents: [{ role: 'user', parts: [{ text: userMsg }] }]
      });

      setMessages(prev => [...prev, { role: 'ai', text: result.text || "I'm not sure how to answer that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my neural network. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 h-96 bg-[#111] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot size={20} className="text-[#00FF00]" />
                <span className="font-black uppercase tracking-widest text-[10px]">Neural Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100"><X size={16} /></button>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl",
                    m.role === 'user' ? "bg-[#00FF00] text-black font-medium" : "bg-white/5 text-white"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-white/30 italic animate-pulse">Assistant is thinking...</div>}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Trisha..."
                className="flex-1 bg-white/5 border-none rounded-full px-4 py-2 text-xs outline-none text-white"
              />
              <button type="submit" className="p-2 bg-[#00FF00] text-black rounded-full"><Send size={14} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl group relative"
      >
        <div className="absolute inset-0 bg-[#00FF00] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
};

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 50 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-30" />;
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useMotionValue(32);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
      style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-[#00FF00] rounded-full shadow-[0_0_10px_#00FF00]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20" />
      </motion.div>
      <div className="absolute -right-16 top-0 text-[8px] font-mono text-white/20 whitespace-nowrap">
        X: {Math.round(mouseX.get())}<br />
        Y: {Math.round(mouseY.get())}
      </div>
    </motion.div>
  );
};

const TextScramble = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayValue, setDisplayValue] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayValue(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayValue}</span>;
};

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-[0.05]">
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
             backgroundSize: '40px 40px' 
           }} 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, -40, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '200px 200px' 
        }} 
      />
    </div>
  );
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['System initialized...', 'Type "help" for commands.']);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available: skills, projects, experience, contact, clear, whoami, build';
        break;
      case 'projects':
        response = 'Builds: Decorly.AI, Kairos, Priya. Type "build" to see status.';
        break;
      case 'skills':
        response = 'Stack: Python, GenAI, LLMs, n8n, LangFlow, React, SQL...';
        break;
      case 'experience':
        response = 'History: AISmith Intern, Analyst | GenAI Developer.';
        break;
      case 'contact':
        response = 'Email: trishad.1212@gmail.com';
        break;
      case 'whoami':
        response = 'guest@trisha-das-portfolio:~$ A curious human exploring the latent space.';
        break;
      case 'build':
        response = 'Executing build sequence... [SUCCESS] Portfolio v2.4.0 deployed.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div className="bg-black text-[#00FF00] font-mono text-[10px] p-4 rounded-xl border border-white/10 shadow-2xl h-64 flex flex-col">
      <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] opacity-50 uppercase tracking-widest ml-2">trisha_console_v2.0.0</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-2">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-white/70' : ''}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="mt-3 flex items-center gap-2">
        <span className="opacity-50">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-[#00FF00]"
          autoFocus
          placeholder="type command..."
        />
      </form>
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon, subtitle }: { title: string; icon: any; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-2">
      <motion.div 
        whileHover={{ rotate: 90, scale: 1.1 }}
        className="p-3 bg-white text-black rounded-xl shadow-xl"
      >
        <Icon size={24} />
      </motion.div>
      <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-white">
        <TextScramble text={title} />
      </h2>
    </div>
    {subtitle && <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 ml-16">{subtitle}</p>}
    <div className="h-[1px] bg-white/5 mt-8 w-full relative overflow-hidden">
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/4"
      />
    </div>
  </div>
);

const ProjectCard = ({ project, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-black text-white rounded-[3rem] overflow-hidden p-12 space-y-8 shadow-2xl border border-white/5"
    >
      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-white/20 z-20 pointer-events-none"
      />
      
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Code2 size={160} />
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-white/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/40">Build_Log_00{index + 1}</span>
        </div>
        <h3 className="text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-[#00FF00] transition-colors">
          {project.title.split(' – ')[0]}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string, ti: number) => (
            <span key={ti} className="text-[9px] font-mono border border-white/20 px-3 py-1 rounded-full uppercase tracking-widest bg-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {project.description.map((item: string, iIdx: number) => (
          <div key={iIdx} className="p-6 bg-white/5 border border-white/10 rounded-3xl text-xs leading-relaxed text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <div className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-white/20 mt-1.5 shrink-0" />
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 flex justify-between items-center relative z-10">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-white/30">
            <Activity size={12} />
            <span>Status: Active</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-white/30">
            <Lock size={12} />
            <span>Encrypted</span>
          </div>
        </div>
        <motion.button 
          whileHover={{ x: 8 }}
          className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-[#00FF00] transition-colors"
        >
          Access Repository <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeSection, setActiveSection] = useState('skills');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const radarData = [
    { subject: 'AI/ML', A: 95, fullMark: 100 },
    { subject: 'Automation', A: 92, fullMark: 100 },
    { subject: 'Data Analysis', A: 88, fullMark: 100 },
    { subject: 'Languages', A: 90, fullMark: 100 },
    { subject: 'Visualization', A: 85, fullMark: 100 },
    { subject: 'Tools', A: 80, fullMark: 100 },
  ];

  const navItems = [
    { id: 'skills', label: 'Stack', icon: Cpu },
    { id: 'projects', label: 'Builds', icon: Code2 },
    { id: 'experience', label: 'History', icon: Database },
    { id: 'achievements', label: 'Awards', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans selection:bg-[#00FF00] selection:text-black overflow-x-hidden cursor-none">
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <GridBackground />
      <NeuralNetwork />
      <AIAssistant />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#00FF00] z-[100] origin-left shadow-[0_0_10px_#00FF00]" 
        style={{ scaleX }} 
      />

      {/* Top Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md border-b border-white/5 z-[90] hidden lg:flex items-center justify-between px-12 text-[10px] font-mono uppercase tracking-widest text-white/60">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_5px_#00FF00]" />
            <span>System: Operational</span>
          </div>
          <div className="text-white/10">|</div>
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-white/40" />
            <span>Secure Connection</span>
          </div>
          <div className="text-white/10">|</div>
          <span>User: trisha_das</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Globe size={12} className="text-white/40" />
            <span>Region: ASIA/IN</span>
          </div>
          <div className="text-white/10">|</div>
          <span>{new Date().toLocaleDateString()}</span>
          <div className="text-white/10">|</div>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-white/40" />
            <span>Load: 12%</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[110] flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="text-white font-mono text-xs tracking-[0.5em] uppercase opacity-50">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white p-3 border border-white/20 rounded-full">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-12">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-6xl font-black text-white/40 hover:text-white transition-all text-left uppercase tracking-tighter"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="lg:sticky lg:top-32 space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#00FF00] text-black text-[10px] font-mono uppercase tracking-widest rounded-lg font-bold">
                    System Admin
                  </div>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <div 
                  onMouseEnter={() => setIsGlitching(true)}
                  onMouseLeave={() => setIsGlitching(false)}
                  className="cursor-pointer"
                >
                  <h1 className={`text-8xl font-black tracking-tighter leading-[0.8] uppercase transition-all text-white ${isGlitching ? 'text-glitch' : ''}`}>
                    <TextScramble text="Trisha" /><br />
                    <TextScramble text="Das" delay={500} />
                  </h1>
                </div>
                <p className="text-xl text-white/50 font-medium leading-relaxed max-w-sm">
                  Engineering the next generation of <span className="text-[#00FF00] font-bold">Intelligent Agents</span> and <span className="text-white font-bold">Data Pipelines</span>.
                </p>
              </motion.div>

              <Terminal />

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 pt-12 border-t border-white/5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Magnetic>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#00FF00] hover:text-black transition-all group shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
                      <Mail size={24} className="mb-4 opacity-40 group-hover:opacity-100" />
                      <span className="block text-[10px] font-mono uppercase tracking-widest opacity-50 mb-1">Direct Link</span>
                      <span className="block text-xs font-bold truncate">Email</span>
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#00FF00] hover:text-black transition-all group shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
                      <Linkedin size={24} className="mb-4 opacity-40 group-hover:opacity-100" />
                      <span className="block text-[10px] font-mono uppercase tracking-widest opacity-50 mb-1">Network</span>
                      <span className="block text-xs font-bold">LinkedIn</span>
                    </a>
                  </Magnetic>
                </div>
              </motion.div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`group flex items-center gap-6 py-5 px-8 rounded-[2rem] transition-all text-left ${
                      activeSection === item.id 
                        ? 'bg-white text-black shadow-2xl scale-105' 
                        : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={activeSection === item.id ? 'text-black' : 'text-white/20 group-hover:text-white'} />
                    <span className="font-black uppercase tracking-[0.2em] text-xs">{item.label}</span>
                    <div className={`ml-auto w-2 h-2 rounded-full transition-all ${activeSection === item.id ? 'bg-[#00FF00] scale-100 shadow-[0_0_10px_#00FF00]' : 'bg-white/10 scale-0 group-hover:scale-100'}`} />
                  </button>
                ))}
              </nav>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden fixed bottom-8 right-8 p-6 bg-black text-white rounded-full shadow-2xl z-[100] hover:scale-110 active:scale-95 transition-transform"
              >
                <Menu size={32} />
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 space-y-40">
            
            {/* System Metrics Dashboard */}
            <section className="scroll-mt-40">
              <SectionHeader title="System Metrics" icon={Activity} subtitle="Live Telemetry // v2.4.0" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Neural Load', value: '12.4%', trend: '+0.2%', icon: BrainCircuit },
                  { label: 'Uptime', value: '99.99%', trend: 'Stable', icon: Wifi },
                  { label: 'Data Throughput', value: '1.2GB/s', trend: '+12%', icon: TrendingUp },
                  { label: 'Active Agents', value: '4', trend: 'Online', icon: Bot },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-white/5 rounded-2xl text-white/40">
                        <stat.icon size={16} />
                      </div>
                      <span className="text-[8px] font-mono text-[#00FF00] bg-white/10 px-2 py-1 rounded-md">{stat.trend}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">{stat.label}</p>
                      <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills - Bento Grid */}
            <section id="skills" className="scroll-mt-40">
              <SectionHeader title="Tech Stack" icon={Cpu} subtitle="System Capabilities // Optimized" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Radar Chart Card */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="md:col-span-3 p-8 bg-black text-white rounded-[3rem] shadow-2xl overflow-hidden relative group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BrainCircuit size={120} />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        <Sparkles className="text-[#00FF00]" size={20} />
                        <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-white/40">Neural Proficiency Map</h3>
                      </div>
                      <h4 className="text-4xl font-black uppercase tracking-tighter leading-none">AI & Data Intelligence</h4>
                      <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                        Visual representation of core competencies across the modern AI stack, focusing on Large Language Models and automated data pipelines.
                      </p>
                    </div>
                    <div className="w-full md:w-80 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                          <Radar
                            name="Trisha"
                            dataKey="A"
                            stroke="#00FF00"
                            fill="#00FF00"
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>

                {SKILLS.map((group, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={cn(
                      "p-8 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col justify-between group shadow-sm hover:shadow-2xl transition-all",
                      (idx === 0 || idx === 3) && "md:col-span-2"
                    )}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-white/40">{group.category}</h3>
                        <div className="p-2 bg-white/5 rounded-xl group-hover:bg-[#00FF00] group-hover:text-black transition-all">
                          <Layers size={16} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {group.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-xs font-black uppercase tracking-widest px-4 py-2 bg-white/5 rounded-2xl group-hover:bg-[#00FF00] group-hover:text-black transition-all">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="scroll-mt-40">
              <SectionHeader title="Neural Builds" icon={Code2} subtitle="Prototype Repository // Open Source" />
              <div className="grid grid-cols-1 gap-12">
                {PROJECTS.map((project, idx) => (
                  <ProjectCard key={idx} project={project} index={idx} />
                ))}
              </div>
            </section>

            {/* Experience - Condensed */}
            <section id="experience" className="scroll-mt-40">
              <SectionHeader title="Deployment History" icon={Database} subtitle="Operational Experience // Condensed" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#00FF00] text-black rounded-2xl">
                        <Activity size={20} />
                      </div>
                      <span className="font-mono text-[9px] border border-white/10 px-3 py-1 rounded-full text-white/40">{exp.period}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tighter text-white">{exp.company}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF00]">{exp.role}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <ul className="space-y-3">
                        {exp.description.slice(0, 2).map((item, iIdx) => (
                          <li key={iIdx} className="text-[11px] text-white/60 flex gap-3">
                            <span className="text-[#00FF00] font-bold">»</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-40">
              <SectionHeader title="Recognition" icon={Award} subtitle="Milestone Log // Authenticated" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ACHIEVEMENTS.map((achievement, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                    className="p-12 bg-white/5 border border-white/10 rounded-[4rem] space-y-8 relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
                      <Award size={140} />
                    </div>
                    <div className="w-16 h-16 bg-[#00FF00] text-black rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                      <Zap size={32} />
                    </div>
                    <p className="text-xl font-black leading-tight uppercase tracking-tighter text-white">
                      {achievement.text}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/30">
                      <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
                      <span>Verified Milestone</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-40 pb-20 text-center space-y-12 border-t border-white/5">
              <div className="flex flex-col items-center gap-6">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-black font-black text-3xl shadow-2xl"
                >
                  T
                </motion.div>
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">
                    End of Transmission // 2026
                  </p>
                  <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.2em]">
                    Built with React + GenAI // v2.4.0
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-12">
                {[
                  { icon: Github, href: `https://${PERSONAL_INFO.github}` },
                  { icon: Linkedin, href: `https://${PERSONAL_INFO.linkedin}` },
                  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}` }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -8, scale: 1.3, color: '#00FF00' }}
                    href={social.href} 
                    target="_blank"
                    className="text-white/20 transition-all"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </footer>

          </main>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-black text-[#00FF00] font-mono text-[8px] uppercase tracking-[0.3em] flex items-center overflow-hidden z-[100]">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span>System Status: Optimal</span>
              <span>//</span>
              <span>Memory Usage: 4.2GB</span>
              <span>//</span>
              <span>Active Threads: 128</span>
              <span>//</span>
              <span>Neural Link: Stable</span>
              <span>//</span>
              <span>Build: v2.4.0-stable</span>
              <span>//</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
