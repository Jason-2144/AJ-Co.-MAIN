import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';
import { Bot, Cpu, Plug, MessageSquare, Globe, Layers, Shield } from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-emerald-400 mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-emerald-400 inline-flex">
    {children}
  </div>
);

const RobotCanvas = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let frame: number;
    const update = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1
      }));
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const eyeOffsetX = smoothMouse.x * 6;
  const eyeOffsetY = smoothMouse.y * 6;
  const rotateAngle = smoothMouse.x * 2;

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-emerald-500/10 blur-[80px]" />
      <div 
        ref={robotRef}
        className="relative z-10 animate-float sm:animate-none"
        style={{ transform: `rotate(${rotateAngle}deg)` }}
      >
        <svg width="200" height="340" viewBox="0 0 200 340" className="overflow-visible">
           {/* Antenna */}
           <line x1="100" y1="20" x2="100" y2="60" stroke="#10B981" strokeWidth="2" />
           <circle cx="100" cy="20" r="8" fill="#10B981" />
           
           {/* Head */}
           <rect x="50" y="60" width="100" height="80" rx="16" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" />
           
           {/* Eyes inner tracks */}
           <circle cx="75" cy="100" r="14" fill="rgba(16,185,129,0.1)" />
           <circle cx="125" cy="100" r="14" fill="rgba(16,185,129,0.1)" />
           
           {/* Eyes */}
           <circle cx={75 + eyeOffsetX} cy={100 + eyeOffsetY} r="9" fill="#10B981" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }} />
           <circle cx={125 + eyeOffsetX} cy={100 + eyeOffsetY} r="9" fill="#10B981" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }} />

           {/* Neck */}
           <rect x="90" y="140" width="20" height="10" fill="#10B981" opacity="0.5" />
           
           {/* Arms */}
           <rect x="25" y="160" width="15" height="70" rx="7.5" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" className="origin-[32.5px_160px]" style={{ transform: `rotate(${smoothMouse.x * -15}deg)` }} />
           <rect x="160" y="160" width="15" height="70" rx="7.5" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" className="origin-[167.5px_160px]" style={{ transform: `rotate(${smoothMouse.x * 15}deg)` }} />

           {/* Body */}
           <rect x="40" y="150" width="120" height="160" rx="20" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" />
           
           {/* Circuit lines inside body */}
           <path d="M 40 180 L 80 180 L 100 200 L 160 200" stroke="#10B981" strokeWidth="1" opacity="0.3" fill="none" />
           <path d="M 40 220 L 70 220 L 90 240 L 160 240" stroke="#10B981" strokeWidth="1" opacity="0.3" fill="none" />
           <path d="M 40 260 L 100 260 L 120 280 L 160 280" stroke="#10B981" strokeWidth="1" opacity="0.3" fill="none" />
           <circle cx="80" cy="180" r="3" fill="#10B981" opacity="0.3" />
           <circle cx="70" cy="220" r="3" fill="#10B981" opacity="0.3" />
           <circle cx="100" cy="260" r="3" fill="#10B981" opacity="0.3" />

           {/* Legs */}
           <rect x="60" y="310" width="20" height="30" rx="10" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" />
           <rect x="120" y="310" width="20" height="30" rx="10" fill="rgba(16,185,129,0.05)" stroke="#10B981" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};



const ScrollPath = () => {
  const [progress, setProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = rect.top - viewportHeight / 2;
      const total = rect.height;
      let p = -start / total;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);

      const pathLength = pathRef.current.getTotalLength();
      if (pathLength) {
        const point = pathRef.current.getPointAtLength(p * pathLength);
        setDotPos({ x: point.x, y: point.y });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 hidden md:flex justify-center pointer-events-none" style={{ height: '100%' }}>
      <svg className="w-full h-full max-w-6xl mx-auto overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path 
           ref={pathRef}
           d="M 150 0 C 150 400, 850 400, 850 500 C 850 600, 150 600, 150 1000" 
           fill="none" 
           stroke="#10B981" 
           strokeWidth="1.5" 
           strokeOpacity="0.12" 
           vectorEffect="non-scaling-stroke"
        />
        {progress > 0 && progress < 1 && (
          <g transform={`translate(${dotPos.x}, ${dotPos.y})`}>
             <circle r="20" fill="url(#glow)" />
             <circle r="5" fill="#10B981" />
          </g>
        )}
      </svg>
    </div>
  );
};

const StatsTicker = () => {
  return (
    <section className="bg-[#111111] py-10 border-y border-white/8 overflow-hidden pointer-events-none select-none">
      <div className="flex ticker-track w-max">
         {[...Array(2)].map((_, arrIdx) => (
            <div key={arrIdx} className="flex items-center shrink-0">
               <div className="flex items-center gap-3 px-10 shrink-0">
                 <span className="font-syne font-extrabold text-2xl sm:text-3xl text-white">23+</span>
                 <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/30">successful client engagements</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mx-6 shrink-0" />
               <div className="flex items-center gap-3 px-10 shrink-0">
                 <span className="font-syne font-extrabold text-2xl sm:text-3xl text-white">7+</span>
                 <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/30">industries served</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mx-6 shrink-0" />
               <div className="flex items-center gap-3 px-10 shrink-0">
                 <span className="font-syne font-extrabold text-2xl sm:text-3xl text-white">700+</span>
                 <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/30">trained through our programs</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mx-6 shrink-0" />
               <div className="flex items-center gap-3 px-10 shrink-0">
                 <span className="font-syne font-extrabold text-2xl sm:text-3xl text-white">95%</span>
                 <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/30">Client Retention</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mx-6 shrink-0" />
            </div>
         ))}
      </div>
    </section>
  );
};

const HlsVideo = ({ src, className }: { src: string, className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls;
    if (videoRef.current) {
      if (Hls.isSupported()) {
        hls = new Hls({ autoStartLoad: true });
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} autoPlay loop muted playsInline className={className} />;
};

const CtaFooter = () => {
  return (
    <footer className="relative bg-[#0A0A0A] overflow-hidden border-t border-white/5 pt-10">
      <div className="absolute inset-0 z-0">
         <HlsVideo src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" className="w-full h-full object-cover opacity-30 object-center" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/40"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="liquid-glass-strong rounded-3xl p-10 md:p-16 max-w-4xl text-center w-full">
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 italic leading-tight">
              Your next AI transformation starts here.
            </h2>
            <p className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Book a free strategy call. No commitment. No hard sell. Just clarity on what AI can do for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link to="/contact" className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:bg-white/10 text-white px-8 py-4 rounded-none font-sans font-bold uppercase text-xs tracking-widest w-full sm:w-auto transition-colors text-center">
                 Book a Strategy Call
               </Link>
               <Link to="/case-studies" className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-sans font-bold uppercase text-xs tracking-widest w-full sm:w-auto transition-colors text-center">
                 View Our Work
               </Link>
            </div>
         </motion.div>
      </div>
      
      <div className="border-t border-white/10 relative z-10 py-8 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-gray-400">
            <a href="tel:+918500071123" className="hover:text-emerald-400 transition-colors">+91 85000 71123</a>
            <a href="mailto:team.ajandco@gmail.com" className="hover:text-emerald-400 transition-colors">team.ajandco@gmail.com</a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
            <p className="font-mono text-xs text-gray-500 text-center md:text-left">© 2026 AJ and Co. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-gray-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const StickyScrollServices = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(100vw - 100%)"]);

  const services = [
    { num: "01", icon: Bot, title: "AI Automation", desc: "Replace repetitive workflows with intelligent automation pipelines." },
    { num: "02", icon: Cpu, title: "AI Agents", desc: "Custom agents that work, decide, and execute tasks without human input." },
    { num: "03", icon: Plug, title: "AI Integrations", desc: "Connect AI to your existing tools — CRM, Slack, ERPs, anything." },
    { num: "04", icon: MessageSquare, title: "AI Chatbots", desc: "24/7 intelligent chat for sales, support, and internal ops." },
    { num: "05", icon: Globe, title: "Web Development", desc: "Production-grade web systems built to perform and convert." }
  ];

  return (
    <section ref={targetRef} className="bg-[#0A0A0A] border-t border-white/5 relative h-[250vh]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-24">
        <div className="container mx-auto flex flex-col items-center px-4 max-w-3xl text-center mb-10 md:mb-16 shrink-0">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-syne font-extrabold text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            One firm. Every AI capability your business needs.
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-sans text-gray-400 text-lg mx-auto max-w-2xl">
            From replacing repetitive work to building intelligent agents that run entire workflows — we cover the full stack of AI transformation.
          </motion.p>
        </div>
        
        {/* On mobile, use standard horizontal scroll. On md and up, use sticky scroll. */}
        <div className="hidden md:block border-y border-white/10 shrink-0 w-full overflow-hidden">
          <motion.div style={{ x }} className="flex flex-row gap-0 w-max">
             {services.map((srv, i) => (
               <div key={i} className="min-w-[320px] max-w-[320px] border-r border-white/10 last:border-r-0 p-8 lg:p-10 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer group shrink-0 h-full">
                  <span className="font-mono text-xs text-white/20 tracking-widest">{srv.num}</span>
                  <div className="w-10 h-10 bg-emerald-500/10 p-2 rounded-lg text-emerald-400 shrink-0">
                    <srv.icon className="w-full h-full" />
                  </div>
                  <h3 className="font-syne font-bold text-white text-xl group-hover:text-emerald-400 transition-colors mt-2">{srv.title}</h3>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed flex-grow">{srv.desc}</p>
                  <div className="text-white/20 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 mt-4">
                    →
                  </div>
               </div>
             ))}
          </motion.div>
        </div>

        {/* Mobile static horizontal scroll (no sticky) */}
        <div className="md:hidden border-y border-white/10 shrink-0 w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden flex flex-row gap-0 snap-x snap-mandatory">
             {services.map((srv, i) => (
               <div key={i} className="min-w-[85vw] border-r border-white/10 last:border-r-0 p-8 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer group snap-start shrink-0">
                  <span className="font-mono text-xs text-white/20 tracking-widest">{srv.num}</span>
                  <div className="w-10 h-10 bg-emerald-500/10 p-2 rounded-lg text-emerald-400 shrink-0">
                    <srv.icon className="w-full h-full" />
                  </div>
                  <h3 className="font-syne font-bold text-white text-xl group-hover:text-emerald-400 transition-colors mt-2">{srv.title}</h3>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed flex-grow">{srv.desc}</p>
                  <div className="text-white/20 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 mt-4">
                    →
                  </div>
               </div>
             ))}
        </div>

      </div>
    </section>
  );
};

export default function Home() {
  const cases = [
    {
      id: "01", industry: "E-commerce", badge: "75%", metricSub: "Faster Responses",
      title: "AI Customer Support Automation", challenge: "Support team drowning in repetitive tickets and unhappy customers.", solution: "Multi-agent triage and resolution system.", link: "/case-studies/ecommerce-support-automation"
    },
    {
      id: "02", industry: "B2B SaaS", badge: "3x", metricSub: "More Qualified Leads",
      title: "Sales Lead Qualification Agent", challenge: "SDR team wasting time on cold, unfit leads.", solution: "AI scoring and enrichment pipeline.", link: "/case-studies/sales-lead-qualification"
    },
    {
      id: "03", industry: "Professional Services", badge: "40%", metricSub: "Less Manual Ops Work",
      title: "Internal Operations Assistant", challenge: "Ops team buried in status updates and reporting.", solution: "Custom internal AI assistant connected to all tools.", link: "/case-studies/internal-operations-assistant"
    }
  ];

  const workCards = [
    {
      tag: "E-Mobility", name: "NURA Electric Mobility",
      quote: "AJ and Co built our entire web presence from scratch. Clean, fast, and exactly on brand.", author: "— Nura Electric Mobility Team",
      link: "nuraemobility.co.in"
    },
    {
      tag: "Sports", name: "High Performance Athletics",
      quote: "Our booking platform and site went live in record time. The team knew exactly what we needed.", author: "— HPA Leadership",
      link: "playhpa.com"
    },
    {
      tag: "Luxury Retail", name: "Balani Custom Suits",
      quote: "A premium site that matches the quality of our tailoring. Response and attention to detail was exceptional.", author: "— Balani Team",
      link: "balanicustom.com"
    },
    {
      tag: "SEO", name: "Stan Ventures",
      quote: "Technically precise, fast turnaround, and they understood our space immediately.", author: "— Stan Ventures",
      link: "stanventures.com"
    }
  ];

  return (
    <>
      <SEO
        title="AJ & Co. | AI Automation Agency"
        description="AJ & Co. helps businesses automate workflows, build AI agents, and implement AI systems that generate measurable business results."
        keywords="AI automation, AI development, AI agents, workflow automation"
      />
      <main className="relative bg-[#0A0A0A]">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-4xl">
          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">AJ & Co. — AI Automation Agency</h1>
          <p className="text-lg text-gray-400 mb-6">We help businesses identify high-impact AI opportunities, build production-ready agents, and embed automation into operations to deliver measurable results.</p>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{__html:`
        .liquid-glass-strong {
          background: rgba(255,255,255,0.01);
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
          box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass-strong::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 22s linear infinite; }
        .emerald-glow { box-shadow: 0 0 20px rgba(16,185,129,0.3); }
        .emerald-glow:hover { box-shadow: 0 0 35px rgba(16,185,129,0.5); }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}} />

      {/* Hero Section */}
      <section className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row pt-24 pb-16">
        <div className="w-full md:w-[55%] flex flex-col justify-center pl-6 sm:pl-10 lg:pl-20 order-2 md:order-1 relative z-10 pt-10 md:pt-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.3em] text-emerald-400 mb-6 flex items-center h-6">
               <div className="w-[2px] h-6 bg-emerald-400 mr-4"></div>
               AI AUTOMATION AGENCY
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-syne font-extrabold text-[clamp(2.2rem,5.5vw,5rem)] md:text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.05] tracking-tight text-white max-w-2xl text-center md:text-left mx-auto md:mx-0">
              We Automate Your<br/> Business Operations<br/> with AI.
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans font-light text-gray-400 text-[clamp(1rem,1.8vw,1.25rem)] mt-4 mb-10 max-w-xl text-center md:text-left mx-auto md:mx-0">
              Automate Work. Increase Revenue. Scale Faster.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
               <Link to="/contact" className="bg-[#10B981] text-black font-syne font-bold px-7 py-3.5 text-sm tracking-widest uppercase rounded-none emerald-glow hover:brightness-110 transition-all w-full sm:w-auto text-center">
                 Book Strategy Call
               </Link>
               <Link to="/case-studies" className="border border-white/20 text-white/70 font-sans text-sm px-7 py-3.5 rounded-none hover:border-white/50 hover:text-white transition-all w-full sm:w-auto text-center">
                 See Our Work →
               </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="font-mono text-[11px] text-white/25 tracking-widest mt-6 text-center md:text-left">
              Trusted across 15+ industries · 50+ projects delivered
            </motion.div>
          </motion.div>
        </div>
        
        <div className="w-full md:w-[45%] flex items-center justify-center relative order-1 md:order-2 mt-8 md:mt-0">
          <div className="w-[60vw] md:w-full max-w-[400px]">
             <RobotCanvas />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <StickyScrollServices />

      {/* How We Do It */}
      <section className="bg-[#0A0A0A] py-24 lg:py-40 relative px-4 text-center">
        <div className="container mx-auto flex flex-col items-center mb-20 text-center">
           <Eyebrow>HOW WE DO IT</Eyebrow>
           <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-syne font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-white">
             Three steps. Zero shortcuts.
           </motion.h2>
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-10 flex flex-col gap-12 lg:gap-32 text-left">
           <ScrollPath />
             
             {/* Step 01 */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="max-w-sm w-full md:w-auto bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-8 rounded-2xl mx-auto md:ml-[8%] md:mr-auto relative z-10 text-center md:text-left">
                <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                  <span className="font-mono text-5xl font-bold text-emerald-400/20">01</span>
                  <span className="font-mono text-xs tracking-[0.3em] text-emerald-400">IDENTIFY</span>
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mt-2">Find what's worth building.</h3>
                <p className="font-sans text-gray-400 leading-relaxed text-sm mt-3">
                  We map your workflows, find where time bleeds, and model ROI before a single line of code is written.
                </p>
                <div className="font-mono text-xs text-white/40 mt-6 space-y-1">
                  <p>· Executive Workshop</p>
                  <p>· ROI Modeling</p>
                  <p>· AI Readiness Report</p>
                </div>
             </motion.div>

             {/* Step 02 */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="max-w-sm w-full md:w-auto bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-8 rounded-2xl mx-auto md:ml-auto md:mr-[8%] relative z-10 text-center md:text-left">
                <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                  <span className="font-mono text-5xl font-bold text-emerald-400/20">02</span>
                  <span className="font-mono text-xs tracking-[0.3em] text-emerald-400">DEVELOP</span>
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mt-2">Build it right, the first time.</h3>
                <p className="font-sans text-gray-400 leading-relaxed text-sm mt-3">
                  Fast builds integrated into your existing stack. A working prototype in 2 weeks — not a demo, a real system with real data.
                </p>
                <div className="font-mono text-xs text-white/40 mt-6 space-y-1">
                  <p>· Architecture</p>
                  <p>· PoC → Production</p>
                  <p>· Security & Governance</p>
                </div>
             </motion.div>

             {/* Step 03 */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="max-w-sm w-full md:w-auto bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-8 rounded-2xl mx-auto md:ml-[8%] md:mr-auto relative z-10 text-center md:text-left">
                <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                  <span className="font-mono text-5xl font-bold text-emerald-400/20">03</span>
                  <span className="font-mono text-xs tracking-[0.3em] text-emerald-400">ADOPT</span>
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mt-2">Stay until it sticks.</h3>
                <p className="font-sans text-gray-400 leading-relaxed text-sm mt-3">
                  Most agencies ship and vanish. We run training, track adoption, and iterate until AI is just how your team works.
                </p>
                <div className="font-mono text-xs text-white/40 mt-6 space-y-1">
                  <p>· Team Training</p>
                  <p>· 30-Day Review</p>
                  <p>· Performance Tracking</p>
                </div>
             </motion.div>
        </div>
      </section>

      <StatsTicker />

      {/* Case Studies */}
      <section className="bg-[#0A0A0A] py-24 lg:py-32 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16">
            <Eyebrow>CASE STUDIES</Eyebrow>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-syne font-extrabold text-white text-[clamp(2rem,4vw,3.5rem)] mb-4">
              Real Problems. Real Results.
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-sans text-gray-400">
              Every engagement is different. The goal is always the same.
            </motion.p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {cases.map((cs, i) => (
               <motion.div key={i} variants={fadeUp} className="bg-[#111111] border border-white/10 hover:border-emerald-500/30 transition-all rounded-2xl p-8 flex flex-col group">
                 <div className="flex justify-between items-start mb-6">
                   <span className="font-mono text-xs text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full">{cs.industry}</span>
                   <span className="font-mono text-white/20">{cs.id}</span>
                 </div>
                 <h3 className="font-syne text-2xl font-bold text-white mb-6">{cs.title}</h3>
                 
                 <div className="mb-6 pb-6 border-b border-white/10">
                   <div className="font-syne text-5xl font-extrabold text-emerald-400 mb-2">{cs.badge}</div>
                   <div className="font-mono text-xs text-white/40 uppercase tracking-widest">{cs.metricSub}</div>
                 </div>

                 <div className="flex-grow space-y-6 mb-8">
                   <div>
                     <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Challenge</div>
                     <p className="font-sans text-sm text-gray-400 leading-relaxed">{cs.challenge}</p>
                   </div>
                   <div>
                     <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-2">Solution</div>
                     <p className="font-sans text-sm text-gray-400 leading-relaxed">{cs.solution}</p>
                   </div>
                 </div>

                 <Link to={cs.link} className="font-mono text-xs text-emerald-400 flex items-center group-hover:gap-3 gap-2 transition-all w-max mt-auto">
                   Read Full Study →
                 </Link>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us (AI That Actually Moves The Needle) */}
      <section className="bg-[#0A0A0A] py-24 border-b border-white/5">
         <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-16">
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-white">AI That Actually Moves The Needle</h2>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
               <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                    <Layers />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-3">Workflow First</h3>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-sm">We understand your business before we touch a model. We build around how your team actually works.</p>
               </motion.div>
               <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                    <Cpu />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-3">Tool Agnostic</h3>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-sm">We use what works. Not what we're paid to sell. We design systems utilizing the best models for the specific task.</p>
               </motion.div>
               <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                    <Shield />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-3">End-to-End</h3>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-sm">We stay through adoption. Not just delivery. A model is useless if your team isn't trained and confident using it.</p>
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* Previous Work */}
      <section className="bg-[#0A0A0A] py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16 text-center sm:text-left flex flex-col items-center sm:items-start">
             <Eyebrow>PREVIOUS WORK</Eyebrow>
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="font-syne font-extrabold text-white text-[clamp(2rem,4vw,3.5rem)]">
               Built for real clients. Proven results.
             </motion.h2>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {workCards.map((wk, i) => (
                <motion.div key={i} variants={fadeUp} className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all bg-[#111111] p-8 flex flex-col gap-6">
                   <div className="flex flex-wrap items-center justify-between gap-4">
                     <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">{wk.tag.split('|')[0].trim()}</span>
                     <span className="font-mono text-[10px] text-white/30">{wk.tag.split('|')[1]?.trim() || ''}</span>
                   </div>
                   <h3 className="font-syne font-bold text-2xl text-white">{wk.name}</h3>
                   <div className="flex-grow">
                     <p className="font-sans text-gray-400 text-sm leading-relaxed italic border-l-2 border-emerald-500/30 pl-4 mb-4">
                       "{wk.quote}"
                     </p>
                     <p className="font-mono text-xs text-white/40">
                       {wk.author}
                     </p>
                   </div>
                   <div className="mt-4 pt-4 border-t border-white/5">
                      <a href={`https://${wk.link}`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white/20 hover:text-emerald-400 transition-colors">
                        {wk.link}
                      </a>
                   </div>
                </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
