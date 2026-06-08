import { motion } from 'motion/react';
import { Scan, Bot, GitBranch, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const services = [
  {
    id: "ai-opportunity-assessment",
    title: "AI Opportunity Assessment",
    icon: <Scan className="w-10 h-10 text-emerald-400" />,
    desc: "Before we build anything, we find what's actually worth building. We audit your workflows, map your data, and model the ROI — so every decision is grounded in evidence, not hype."
  },
  {
    id: "custom-agent-development",
    title: "Custom Agent Development",
    icon: <Bot className="w-10 h-10 text-emerald-400" />,
    desc: "We build production-ready AI agents tailored to your stack. Customer support agents, sales assistants, internal ops bots — built to work inside your tools from day one."
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    icon: <GitBranch className="w-10 h-10 text-emerald-400" />,
    desc: "We connect AI to the tools your team already uses — CRMs, project managers, communication platforms. Repetitive work disappears. Your team focuses on what actually matters."
  },
  {
    id: "enterprise-ai-training",
    title: "Enterprise AI Training",
    icon: <GraduationCap className="w-10 h-10 text-emerald-400" />,
    desc: "Shipping a system is only half the job. We train your people until AI is embedded in how they think and work — not just something IT manages."
  }
];

export default function Services() {
  return (
    <>
      <section className="relative py-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-syne text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-8 text-white"
          >
            AI Services Built For <span className="text-[#10B981]">Real Business Outcomes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We don't offer generic AI tools. Every service we provide is designed around your workflows, your team, and your goals.
          </motion.p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <motion.div variants={fadeUp} className="glass p-12 rounded-2xl h-full flex flex-col group hover:border-[#10B981]/50 hover:bg-white/[0.04] transition-all duration-300">
                <div className="w-20 h-20 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-syne text-3xl font-bold mb-6 text-white group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed flex-grow mb-8">{service.desc}</p>
                <div className="mt-auto font-syne font-bold uppercase tracking-widest text-[#10B981] text-xs flex items-center gap-2">
                  Learn More <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="py-32 relative text-center border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8">Not sure which service fits?</h2>
          <p className="text-xl text-gray-400 mb-12">Start with a free strategy call to identify your high-impact opportunities.</p>
          <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-12 py-5 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest">
            Book Strategy Call
          </Link>
        </div>
      </section>
    </>
  );
}
