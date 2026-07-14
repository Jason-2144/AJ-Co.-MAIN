import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1 }
 }
};

const caseStudiesList = [
 {
 id: "ecommerce-support-automation",
 industry: "E-Commerce",
 title: "AI Customer Support Automation",
 badge: "75% Faster Responses",
 summary: "A fast-growing e-commerce brand drowning in support tickets needed a scalable solution without sacrificing response quality."
 },
 {
 id: "sales-lead-qualification",
 industry: "B2B SaaS",
 title: "Sales Lead Qualification Agent",
 badge: "3x More Qualified Leads",
 summary: "An SDR team spending 60% of their time on unqualified leads needed a way to surface the deals worth chasing."
 },
 {
 id: "internal-operations-assistant",
 industry: "Professional Services",
 title: "Internal Operations Assistant",
 badge: "40% Less Manual Work",
 summary: "An operations team buried in status updates and manual reporting needed an internal AI layer connected to all their tools."
 }
];

export default function CaseStudies() {
 return (
 <>
 <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-8 text-white"
 >
 Real Problems. <span className="text-[#10B981]">Real Results.</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
 className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
 >
 Every engagement is different. The goal is always the same.
 </motion.p>
 </div>
 </section>

 <section className="pb-32 container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-wrap justify-center gap-4 mb-16">
 {["All", "E-Commerce", "B2B SaaS", "Professional Services"].map((f, i) => (
 <button key={i} className={`px-4 sm:px-6 lg:px-8 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors ${i===0 ? 'bg-white text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10'}`}>
 {f}
 </button>
 ))}
 </div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
 {caseStudiesList.map((cs) => (
 <motion.div key={cs.id} variants={fadeUp} className="bg-[#111111] border-none md:border-solid md:glass md:border md:border-white/10 hover:border-[#10B981]/30 transition-all duration-300 flex flex-col group md:bg-white/[0.02] p-4 sm:p-6 lg:p-8 rounded-2xl">
 <div className="flex justify-between items-start mb-8">
 <span className="text-[10px] uppercase font-mono tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full">{cs.badge}</span>
 </div>
 <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">{cs.industry}</h4>
 <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">{cs.title}</h3>
 <p className="text-gray-400 leading-relaxed mb-10 flex-grow text-sm">
 {cs.summary}
 </p>
 <Link to={`/case-studies/${cs.id}`} className="mt-auto inline-flex items-center gap-3 text-white text-sm font-bold uppercase tracking-wider group-hover:text-emerald-400 transition-colors w-full sm:w-auto text-center justify-center flex">
 Read Full Study <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
 </Link>
 </motion.div>
 ))}
 </motion.div>
 </section>

 <section className="py-16 sm:py-20 lg:py-28 relative text-center border-t border-white/5 bg-white/[0.01]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">Want Results Like This?</h2>
 <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest w-full sm:w-auto text-center justify-center flex">
 Book A Strategy Call
 </Link>
 </div>
 </section>
 </>
 );
}
