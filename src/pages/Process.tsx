import { motion } from 'motion/react';
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

const processPhases = [
  {
    id: "01",
    label: "PHASE 01 — IDENTIFY (4–6 days)",
    title: "Find What's Worth Building",
    desc: [
      "We start every engagement the same way: by understanding your business before we touch any technology.",
      "This phase is about asking better questions than your team has time to ask. Where is work getting stuck? What decisions are being made with incomplete information? Where is manual effort compounding?",
      "Most AI agencies skip this step. They start with a tool and work backwards. We start with your business and work forwards. That's why our projects succeed."
    ],
    deliverables: [
      "Stakeholder Interviews (all relevant team leads)",
      "Process Mapping Sessions",
      "Data Infrastructure Audit",
      "Opportunity Prioritisation Matrix",
      "ROI Modeling for Top 3 Opportunities",
      "AI Readiness Report (delivered as executive document)"
    ]
  },
  {
    id: "02",
    label: "PHASE 02 — DEVELOP (3–12 weeks depending on scope)",
    title: "Build It Right, The First Time",
    desc: [
      "Once we know what to build, we move fast. But fast doesn't mean reckless. Our build process is structured to catch problems early — at the PoC stage when they're cheap to fix, not after full deployment when they're expensive.",
      "Every system we build is designed to plug into your existing stack from day one. We don't create isolated AI tools that live outside your workflow. We build systems your team encounters every time they do their job."
    ],
    deliverables: [
      "System Architecture Document",
      "Data & API Integration Map",
      "Working Proof of Concept (Week 2)",
      "Stakeholder Review & Sign-Off",
      "Full Production Build",
      "Security & Governance Documentation",
      "Pre-Launch QA & Performance Testing"
    ]
  },
  {
    id: "03",
    label: "PHASE 03 — ADOPT (30–90 days post-launch)",
    title: "Shipping Is The Beginning, Not The End",
    desc: [
      "This is the phase most agencies skip entirely. They ship the system and call it done. We've seen what happens when that approach is taken — tools sit unused, teams revert to old habits, and the investment evaporates.",
      "We stay. We run training sessions, track adoption metrics, identify where teams are struggling, and iterate until the system is just how work gets done.",
      "Adoption isn't a nice-to-have. It's the entire point."
    ],
    deliverables: [
      "Rollout & Change Management Plan",
      "Team Enablement Sessions (role-specific)",
      "User Documentation & Playbooks",
      "30-Day Adoption Review",
      "Performance Dashboard Setup",
      "Ongoing Optimisation (as needed)"
    ]
  }
];

const faqs = [
  {
    q: "How long does a full engagement take?",
    a: "Typically 8–16 weeks from kickoff to full adoption. Smaller, focused projects can move faster — 3–6 weeks for a single automation or agent build."
  },
  {
    q: "Do we need to have our data infrastructure sorted first?",
    a: "No. Part of Phase 01 is auditing what you have and designing around it. We've worked with companies that had no data infrastructure at all."
  },
  {
    q: "What if we only need one phase?",
    a: "We can scope individual phases. But we'll always be honest with you — if we think skipping adoption support will cause the project to fail, we'll say so."
  },
  {
    q: "How involved does our team need to be?",
    a: "You'll need 2–3 key stakeholders available for the Identify phase (roughly 4–6 hours total). After that, your involvement scales down significantly until training."
  }
];

export default function Process() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-syne text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-8 text-white"
          >
            A Process Built Around One Thing: <span className="text-[#10B981]">Results That Stick</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Most agencies hand off a deliverable and disappear. We stay until AI is embedded in how your business actually runs.
          </motion.p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <div className="space-y-32 relative">
           <div className="hidden md:block absolute top-[2%] bottom-[2%] left-10 w-px bg-white/10"></div>
           
           {processPhases.map((phase, idx) => (
             <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer} className="relative md:pl-24">
                <motion.div variants={fadeUp} className="hidden md:flex absolute top-2 left-5 w-10 h-10 -translate-x-1/2 bg-[#0A0A0A] border-4 border-[#10B981] rounded-full items-center justify-center font-mono text-xs font-bold text-white z-10">
                   {phase.id}
                </motion.div>
                
                <motion.div variants={fadeUp}>
                   <div className="font-mono text-xs md:text-sm text-emerald-400 uppercase tracking-widest font-bold mb-4">{phase.label}</div>
                   <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8">{phase.title}</h2>
                   
                   <div className="space-y-6 mb-12">
                     {phase.desc.map((p, i) => (
                        <p key={i} className="text-gray-300 text-lg leading-relaxed">{p}</p>
                     ))}
                   </div>
                   
                   <div className="glass p-8 rounded-xl bg-white/[0.02] border border-white/10">
                      <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">Deliverables in this phase:</h3>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {phase.deliverables.map((d, i) => (
                           <li key={i} className="flex items-start gap-4">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                               <span className="text-gray-300">{d}</span>
                           </li>
                        ))}
                      </ul>
                   </div>
                </motion.div>
             </motion.div>
           ))}
        </div>
      </section>

      <section className="py-32 bg-white/[0.01] border-t border-white/5">
         <div className="container mx-auto px-6 max-w-4xl">
             <motion.h2 
               initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
               className="font-syne text-3xl md:text-4xl font-bold text-center text-white mb-16"
             >
                 Frequently Asked Questions
             </motion.h2>
             
             <div className="grid md:grid-cols-2 gap-12">
                {faqs.map((faq, i) => (
                   <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
                      <h3 className="font-syne text-xl font-bold text-white mb-4 line-clamp-2">{faq.q}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                   </motion.div>
                ))}
             </div>
         </div>
      </section>

      <section className="py-32 relative text-center border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-12">Ready To Start?</h2>
          <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-12 py-5 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest">
            Book A Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  );
}
