import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const fadeUp: any = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1 }
 }
};

export default function About() {
 return (
 <>
	 <SEO
		 title="About AJ & Co. | AI Consulting & Automation"
		 description="About AJ & Co. — we design and deliver AI systems that embed into your business processes and produce measurable results."
		 keywords="About AJ & Co, AI consulting, AI automation"
	 />
  
 <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-5xl font-extrabold tracking-tight mb-8 text-white leading-tight"
 >
 We Started AJ <span className="mx-1">&amp;</span> Co. Because We Were Tired Of Watching AI Projects Fail For The Wrong Reasons
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
 className="text-lg md:text-xl text-[#10B981] max-w-2xl mx-auto font-mono uppercase tracking-widest font-bold"
 >
 Not because AI isn't capable. Because the process around it was broken.
 </motion.p>
 </div>
 </section>

 <section className="py-16 sm:py-20 lg:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-sans mb-32">
 <motion.p variants={fadeUp}>
 The promise of AI is obvious. The gap between that promise and what most businesses actually experience is enormous.
 </motion.p>
 <motion.p variants={fadeUp}>
 We've seen it from every angle — the vendor selling platforms without understanding the problem, the consultant producing strategy documents with no one to build anything, the developer shipping a system nobody trained their team to use.
 </motion.p>
 <motion.p variants={fadeUp} className="text-white font-bold border-l-4 border-emerald-500 pl-6 py-2">
 AJ &amp; Co. was built to close that gap. End-to-end. No handoffs. No excuses.
 </motion.p>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-32">
 <h2 className="font-syne text-3xl font-bold mb-12 text-white">Our Values</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 <motion.div variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-emerald-400 mb-4">Business First, Technology Second</h3>
 <p className="text-gray-400 text-base leading-relaxed">We don't start with AI. We start with your workflows, your team, and your goals. Technology is the tool, not the strategy.</p>
 </motion.div>
 <motion.div variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-cyan-400 mb-4">Honest Over Impressive</h3>
 <p className="text-gray-400 text-base leading-relaxed">We'll tell you when AI isn't the right solution. We'd rather lose a project than set up a client to fail. Our reputation is built on outcomes, not proposals.</p>
 </motion.div>
 <motion.div variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-emerald-400 mb-4">Depth Over Volume</h3>
 <p className="text-gray-400 text-base leading-relaxed">We take fewer engagements than most agencies our size. That's by design. Every client gets senior attention, not a team of juniors managed from a distance.</p>
 </motion.div>
 <motion.div variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-cyan-400 mb-4">Adoption Is The Deliverable</h3>
 <p className="text-gray-400 text-base leading-relaxed">A system that isn't used isn't a success. We measure ourselves by whether your team is actually using what we built — not by whether we shipped on time.</p>
 </motion.div>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-32">
 <h2 className="font-syne text-3xl font-bold mb-12 text-white text-center">By The Numbers</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
 <motion.div variants={fadeUp} className="text-center p-6 border border-white/5 rounded-xl bg-black">
 <div className="font-mono text-4xl text-emerald-400 font-bold mb-2">50+</div>
 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Projects Delivered</div>
 </motion.div>
 <motion.div variants={fadeUp} className="text-center p-6 border border-white/5 rounded-xl bg-black">
 <div className="font-mono text-4xl text-cyan-400 font-bold mb-2">15+</div>
 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Industries Served</div>
 </motion.div>
 <motion.div variants={fadeUp} className="text-center p-6 border border-white/5 rounded-xl bg-black">
 <div className="font-mono text-4xl text-emerald-400 font-bold mb-2">95%</div>
 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Client Retention</div>
 </motion.div>
 <motion.div variants={fadeUp} className="text-center p-6 border border-white/5 rounded-xl bg-black">
 <div className="font-mono text-4xl text-cyan-400 font-bold mb-2">4 Wks</div>
 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Avg to Production</div>
 </motion.div>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
 <h2 className="font-syne text-3xl font-bold mb-8 text-white">Our Approach</h2>
 <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-sans glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-[#10B981]/5">
 <motion.p variants={fadeUp} className="text-white font-bold text-xl">We are workflow specialists first and AI specialists second. That distinction matters.</motion.p>
 <motion.p variants={fadeUp}>
 Most AI projects fail because someone decided to use a particular tool before they understood the problem. We go in the opposite direction — we map the problem exhaustively, then choose the right technology to solve it.
 </motion.p>
 <motion.p variants={fadeUp}>
 We are completely tool-agnostic. We work with OpenAI, Anthropic, Google, and open-source models. We use Make.com, n8n, and custom-built pipelines. We integrate with whatever your team already uses. We don't have vendor relationships that influence our recommendations.
 </motion.p>
 </div>
 </motion.div>
 </section>

 <section className="py-16 sm:py-20 lg:py-28 relative text-center border-t border-white/5 bg-white/[0.01]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">Want To Work With A Team That Stays Until It Works?</h2>
 <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest w-full sm:w-auto text-center justify-center flex">
 Book A Strategy Call
 </Link>
 </div>
 </section>
 </>
 );
}
