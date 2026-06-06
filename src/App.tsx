import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ArrowRight, Menu, X, Activity, Zap, BarChart, 
  Layers, Shield, Cpu, Quote, Linkedin, Twitter, Youtube 
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const CountUp = ({ end, duration = 2, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      let frameId: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
        }
      };
      frameId = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(frameId);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/85 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between pointer-events-auto">
        <a href="#" className="font-syne text-2xl font-extrabold flex items-center text-white">
          AJ <span className="text-[#10B981] mx-1">&amp;</span> Co.
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-emerald-400 transition-colors">Services</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Process</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Case Studies</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
        </nav>
        <button className="hidden md:flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-2.5 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-xs tracking-widest">
          Book Strategy Call
        </button>
        <button className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-[#0A0A0A] border-b border-white/5 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
        >
          <a href="#" className="text-gray-300 font-syne text-lg hover:text-emerald-400 pb-4 border-b border-white/5">Services</a>
          <a href="#" className="text-gray-300 font-syne text-lg hover:text-emerald-400 pb-4 border-b border-white/5">Process</a>
          <a href="#" className="text-gray-300 font-syne text-lg hover:text-emerald-400 pb-4 border-b border-white/5">Case Studies</a>
          <a href="#" className="text-gray-300 font-syne text-lg hover:text-emerald-400 pb-4 border-b border-white/5">About</a>
          <button className="w-full mt-4 py-4 bg-[#10B981] hover:brightness-110 text-black rounded-none font-syne font-bold uppercase text-xs tracking-widest emerald-glow">
            Book Strategy Call
          </button>
        </motion.div>
      )}
    </header>
  );
};

const ClientTicker = () => {
    const items = ["Financial Services", "Healthcare Tech", "E-Commerce", "B2B SaaS", "Global Logistics", "Legal & Compliance"];
    return (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-white/5 py-6 bg-white/[0.01]">
            <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="flex whitespace-nowrap items-center w-max"
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-16 items-center px-8">
                       {items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-16">
                           <span className="font-syne text-lg text-white/40 uppercase tracking-[0.2em] font-semibold">{item}</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></span>
                         </div>
                       ))}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden bg-[#0A0A0A]">
      <div className="hero-gradient absolute inset-0 z-0 pointer-events-none"></div>
      
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
         <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter mb-8 leading-[0.95] text-white uppercase"
         >
            Stop Experimenting With AI.<br/>
            <span className="text-[#10B981]">Start Deploying It.</span>
         </motion.h1>
         <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
         >
            AJ &amp; Co. helps companies identify high-impact AI opportunities, build custom solutions, and train teams to deliver measurable outcomes.
         </motion.p>
         
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
         >
            <button className="bg-white text-black px-8 py-4 rounded-none font-syne font-bold uppercase text-xs tracking-widest hover:bg-[#10B981] transition-colors w-full sm:w-auto flex items-center justify-center">
                Book Strategy Call
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-none font-syne font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center">
                See Our Work
            </button>
         </motion.div>
      </div>
      <ClientTicker />
    </section>
  )
}

const ProblemSection = () => {
    return (
        <section className="py-32 relative container mx-auto px-6">
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-4xl mx-auto text-center mb-20"
            >
                <motion.h2 variants={fadeUp} className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
                    You Bought The Tools.<br className="hidden md:block"/> Read The Case Studies. <span className="text-gray-500">Attended The Webinars.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-400">
                    But months later — the tools sit unused. The pilots never scaled. Nobody can explain the ROI.
                </motion.p>
            </motion.div>

            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
            >
               <motion.div variants={fadeUp} className="glass p-10 rounded-xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <Activity className="w-12 h-12 text-emerald-400 mb-8 group-hover:scale-110 transition-transform duration-300" />
                   <h3 className="font-syne text-2xl font-bold mb-4 text-white">Stalled Pilots</h3>
                   <p className="text-gray-400 text-base leading-relaxed">Great demos that never survive contact with real customer data.</p>
               </motion.div>
               <motion.div variants={fadeUp} className="glass p-10 rounded-xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <Zap className="w-12 h-12 text-cyan-400 mb-8 group-hover:scale-110 transition-transform duration-300" />
                   <h3 className="font-syne text-2xl font-bold mb-4 text-white">Shadow AI</h3>
                   <p className="text-gray-400 text-base leading-relaxed">Employees using random tools, creating massive data privacy risks.</p>
               </motion.div>
               <motion.div variants={fadeUp} className="glass p-10 rounded-xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <BarChart className="w-12 h-12 text-emerald-400 mb-8 group-hover:scale-110 transition-transform duration-300" />
                   <h3 className="font-syne text-2xl font-bold mb-4 text-white">Undefined ROI</h3>
                   <p className="text-gray-400 text-base leading-relaxed">Spending thousands on AI subscriptions with no measurable impact.</p>
               </motion.div>
            </motion.div>
        </section>
    )
}

const MetricsBar = () => {
    const metrics = [
        { end: 50, suffix: "+", label: "Projects Delivered", color: "text-emerald-400" },
        { end: 15, suffix: "+", label: "Industries Served", color: "text-cyan-400" },
        { end: 95, suffix: "%", label: "Client Retention", color: "text-emerald-400" },
        { end: 2, prefix: "$", suffix: "M+", label: "Value Generated", color: "text-cyan-400" },
    ];
    
   return (
       <section className="border-y border-white/5 bg-white/[0.01]">
           <div className="container mx-auto px-6 py-20 text-center">
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/5">
                   {metrics.map((m, i) => (
                       <div key={i} className="px-4">
                           <div className={`font-mono text-5xl md:text-6xl font-bold ${m.color} mb-4 tracking-tight`}>
                               <CountUp end={m.end} prefix={m.prefix} suffix={m.suffix} duration={2.5} />
                           </div>
                           <div className="text-gray-400 text-sm md:text-xs uppercase tracking-[0.2em] font-bold">{m.label}</div>
                       </div>
                   ))}
               </div>
           </div>
       </section>
   )
}

const ProcessStep = ({ number, title, desc, deliverables, align, color }: any) => {
    const isLeft = align === 'left';
    const isEmerald = color === 'emerald';
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`w-full lg:max-w-none max-w-xl mx-auto lg:mx-0 lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:pr-0 lg:mr-auto' : 'lg:pl-0 lg:ml-auto'} relative group mb-16 lg:mb-0`}
        >
            <div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-[#0A0A0A] ${isEmerald ? 'bg-emerald-500' : 'bg-cyan-500'} items-center justify-center ${isLeft ? '-right-[calc(2rem+17px)]' : '-left-[calc(2rem+17px)]'} z-10 transition-transform duration-500 group-hover:scale-125`}>
            </div>

            <div className={`glass p-10 rounded-2xl relative overflow-hidden transition-all duration-500 ${isEmerald ? 'hover:emerald-glow border-white/10' : 'hover:cyan-glow border-[#06B6D4]/30'} hover:-translate-y-1`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isEmerald ? 'from-emerald-500' : 'from-cyan-500'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="font-mono text-[8rem] sm:text-[10rem] leading-none font-bold text-white/[0.03] absolute -top-10 -right-4 tracking-tighter pointer-events-none transition-transform duration-500 group-hover:scale-105 select-none">
                    {number}
                </div>
                
                <h3 className={`font-syne text-3xl font-bold mb-6 relative z-10 ${isEmerald ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    <span className="text-white mr-3">{number}.</span>{title}
                </h3>
                <p className="text-gray-300 text-lg mb-10 relative z-10 leading-relaxed font-sans">
                    {desc}
                </p>
                <div className="relative z-10">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-5">Deliverables</h4>
                    <ul className="space-y-4">
                        {deliverables.map((d:string, i:number) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className={`shrink-0 flex items-center justify-center w-6 h-6 mt-0.5 rounded-full bg-white/5 border border-white/10 ${isEmerald ? 'text-emerald-400' : 'text-cyan-400'}`}>
                                   <div className="w-2 h-2 rounded-full bg-current"></div>
                                </span>
                                <span className="text-gray-200 font-medium">{d}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

const ProcessSection = () => {
    return (
        <section className="py-32 relative container mx-auto px-6">
             <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-24 text-center text-white"
             >
                 Three Things. <span className="text-emerald-400">Done Right.</span>
             </motion.h2>

             <div className="space-y-16 lg:space-y-32 relative max-w-6xl mx-auto">
                 <div className="hidden lg:block absolute top-[5%] bottom-[5%] left-1/2 w-0.5 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>
                 
                 <ProcessStep 
                     number="01"
                     title="IDENTIFY"
                     desc="We analyse how your business actually works. Where time disappears. Where decisions stall. We find the 5% of AI opportunities worth building."
                     deliverables={["Executive Workshops", "ROI Modeling", "AI Readiness Report"]}
                     align="left"
                     color="emerald"
                 />
                 <ProcessStep 
                     number="02"
                     title="DEVELOP"
                     desc="We build fast and build right. AI systems that plug into your existing stack from day one. No fragile demos. No science projects."
                     deliverables={["Technical Architecture", "Systems Integration", "PoC → Production", "Security & Governance"]}
                     align="right"
                     color="cyan"
                 />
                 <ProcessStep 
                     number="03"
                     title="ADOPT"
                     desc="Shipping isn't success. Adoption is. We train your teams, embed workflows, and stay until it's just how work gets done."
                     deliverables={["Rollout Planning", "Enablement Sessions", "Performance Tracking"]}
                     align="left"
                     color="emerald"
                 />
             </div>
        </section>
    )
}

const CaseStudiesSection = () => {
   const cases = [
       {
           id: "01",
           title: "AI Customer Support Automation",
           industry: "E-commerce",
           result: "75%",
           metricSub: "Faster Responses",
           challenge: "Support team drowning in repetitive tickets and unhappy customers.",
           solution: "Multi-agent triage and resolution system."
       },
       {
           id: "02",
           title: "Sales Lead Qualification Agent",
           industry: "B2B SaaS",
           result: "3x",
           metricSub: "More Qualified Leads",
           challenge: "SDR team wasting time on cold, unfit leads.",
           solution: "AI scoring and enrichment pipeline."
       },
       {
           id: "03",
           title: "Internal Operations Assistant",
           industry: "Professional Services",
           result: "40%",
           metricSub: "Less Manual Ops Work",
           challenge: "Ops team buried in status updates and reporting.",
           solution: "Custom internal AI assistant connected to all tools."
       }
   ];

   return (
       <section className="py-32 bg-white/[0.01] border-y border-white/5 relative">
           <div className="container mx-auto px-6">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="max-w-3xl mb-24">
                   <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                       Real Problems.<br/>
                       <span className="text-gray-500">Real Results.</span>
                   </h2>
               </motion.div>

               <motion.div 
                   initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer}
                   className="grid lg:grid-cols-3 gap-8"
               >
                   {cases.map((cs) => (
                       <motion.div key={cs.id} variants={fadeUp} className="glass flex flex-col p-10 rounded-xl group hover:shadow-[0_0_40px_rgba(16,185,129,0.05)] hover:-translate-y-2 transition-all duration-500 bg-white/[0.02]">
                           <div className="flex justify-between items-start mb-10">
                               <span className="font-mono text-emerald-500/40 text-2xl font-bold">{cs.id}</span>
                               <span className="text-[10px] font-mono uppercase tracking-widest px-4 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-full text-gray-400">{cs.industry}</span>
                           </div>
                           <h3 className="font-syne text-2xl font-bold text-white mb-8 leading-snug">{cs.title}</h3>
                           
                           <div className="mb-8 pb-8 border-b border-white/5">
                               <div className="font-mono text-5xl font-bold text-emerald-400 mb-3 tracking-tight">{cs.result}</div>
                               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{cs.metricSub}</div>
                           </div>

                           <div className="space-y-8 mb-10 flex-grow">
                               <div>
                                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Challenge</div>
                                   <p className="text-gray-300 text-sm leading-relaxed">{cs.challenge}</p>
                               </div>
                               <div>
                                   <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] mb-3">Solution</div>
                                   <p className="text-gray-300 text-sm leading-relaxed">{cs.solution}</p>
                               </div>
                           </div>
                           
                           <a href="#" className="inline-flex items-center gap-3 text-emerald-400 text-sm font-bold group-hover:text-emerald-300 transition-colors mt-auto w-max uppercase tracking-wider">
                               Read Full Study <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                           </a>
                       </motion.div>
                   ))}
               </motion.div>
           </div>
       </section>
   )
}

const WhyUsSection = () => {
    return (
        <section className="py-32 container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="max-w-4xl mx-auto text-center mb-24">
               <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                   AI That Actually <br className="hidden md:block"/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Moves The Needle</span>
               </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer} className="grid lg:grid-cols-3 gap-16 lg:gap-24 relative">
                 <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                 
                 <motion.div variants={fadeUp} className="text-center group relative z-10">
                     <div className="w-24 h-24 mx-auto bg-[#0A0A0A] rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-emerald-500/50 transition-colors duration-500 relative overflow-hidden">
                         <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                         <Layers className="w-10 h-10 text-emerald-400 relative z-10" />
                     </div>
                     <h3 className="font-syne text-2xl font-bold mb-4 text-white">Workflow First</h3>
                     <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">We understand your business before we touch a model. We build around how your team actually works.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="text-center group relative z-10">
                     <div className="w-24 h-24 mx-auto bg-[#0A0A0A] rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500 relative overflow-hidden">
                         <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                         <Cpu className="w-10 h-10 text-cyan-400 relative z-10" />
                     </div>
                     <h3 className="font-syne text-2xl font-bold mb-4 text-white">Tool Agnostic</h3>
                     <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">We use what works. Not what we're paid to sell. We design systems utilizing the best models for the specific task.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="text-center group relative z-10">
                     <div className="w-24 h-24 mx-auto bg-[#0A0A0A] rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-emerald-500/50 transition-colors duration-500 relative overflow-hidden">
                         <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                         <Shield className="w-10 h-10 text-emerald-400 relative z-10" />
                     </div>
                     <h3 className="font-syne text-2xl font-bold mb-4 text-white">End-to-End</h3>
                     <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">We stay through adoption. Not just delivery. A model is useless if your team isn't trained and confident using it.</p>
                 </motion.div>
            </motion.div>
        </section>
    )
}

const TestimonialsSection = () => {
    const testimonials = [
        {
          quote: "AJ & Co. didn't just sell us a model. They dug into our operations and found the 5% of workflows that actually mapped to AI solutions. The results were immediate.",
          name: "Sarah Jenkins",
          role: "COO",
          company: "Acme Logistics"
        },
        {
           quote: "We spent 6 months trying to deploy an AI agent internally and failed. AJ & Co. came in and had a production-ready system integrated with our secure data in 4 weeks.",
           name: "Marcus Thorne",
           role: "VP of Engineering",
           company: "Finserve Global"
        },
        {
           quote: "The difference isn't in what they build, it's how they deploy it. Our team actually uses the system because AJ & Co. stayed until adoption was ingrained in our daily habits.",
           name: "Elena Rostova",
           role: "Director of Innovation",
           company: "HealthTech Solutions"
        }
    ];

    return (
        <section className="py-32 container mx-auto px-6 overflow-hidden relative">
            <div className="absolute -left-10 md:left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[100px] pointer-events-none"></div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="mb-20 max-w-4xl">
                <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Don't Take Our <span className="text-emerald-400">Word For It.</span>
                </h2>
            </motion.div>
            
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory pr-10">
                {testimonials.map((t, i) => (
                    <motion.div 
                        key={i} 
                        initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer}
                        className="glass min-w-[85vw] md:min-w-[500px] max-w-[600px] p-10 lg:p-12 rounded-2xl shrink-0 snap-start relative group hover:bg-white/[0.04] transition-colors duration-300"
                    >
                        <Quote className="absolute top-10 right-10 w-16 h-16 text-white/5 group-hover:text-emerald-500/10 transition-colors duration-500" />
                        <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-12 relative z-10 font-sans italic">
                            "{t.quote}"
                        </p>
                        <div className="flex flex-col relative z-10">
                            <span className="font-syne font-bold text-white text-xl">{t.name}</span>
                            <span className="text-sm font-mono text-emerald-400 mt-1 mb-3">{t.role}</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/10 pt-4 mt-2">{t.company}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

const FinalCTA = () => {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden border-t border-white/5 mt-16">
            <div className="absolute inset-0 hero-gradient opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-[100%] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10 text-center text-white">
                 <motion.h2 initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="font-syne text-4xl md:text-5xl lg:text-[4.5rem] font-bold mb-10 leading-[1.1] max-w-5xl mx-auto">
                    AI Is Here. Most Will React.<br className="hidden lg:block"/>
                    <span className="text-[#10B981]">The Few With A Plan Will Lead.</span>
                 </motion.h2>
                 <motion.p initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="text-xl md:text-2xl text-gray-400 mb-14 max-w-2xl mx-auto">
                     We build for those few.
                 </motion.p>
                 <motion.button initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-12 py-5 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest">
                     Book A Strategy Session
                 </motion.button>
            </div>
        </section>
    )
}

const Footer = () => {
   return (
       <footer className="bg-[#0A0A0A] border-t border-white/10 pt-24 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
                    <div className="md:col-span-2">
                        <a href="#" className="font-syne text-3xl font-extrabold flex items-center text-white mb-6">
                          AJ <span className="text-[#10B981] mx-1">&amp;</span> Co.
                        </a>
                        <p className="text-gray-400 text-lg max-w-sm mb-10">We don't just build AI. We identify, develop, and embed it.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Linkedin className="w-5 h-5"/></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5"/></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Youtube className="w-5 h-5"/></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-syne font-bold text-lg mb-8 uppercase tracking-wider">Services</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Opportunity Assessment</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Custom Agent Development</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Workflow Automation</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Enterprise AI Training</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-syne font-bold text-lg mb-8 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Case Studies</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Our Process</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-mono">
                    <p>© 2026 AJ and Co. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
       </footer>
   )
}

export default function App() {
  return (
    <div className="font-sans min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <MetricsBar />
      <ProcessSection />
      <CaseStudiesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}
