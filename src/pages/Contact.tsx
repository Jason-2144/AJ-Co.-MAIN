import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contact() {
  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-[#0A0A0A] flex-grow flex flex-col justify-center">
      <div className="absolute inset-0 hero-gradient opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl mt-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
           
           <motion.div initial="hidden" animate="visible" variants={{
               hidden: { opacity: 0, x: -30 },
               visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
           }}>
              <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
                Let's Figure Out What AI Can Do For Your Business
              </h1>
              <p className="text-xl text-[#10B981] font-mono tracking-widest uppercase font-bold mb-16">
                Start with a free 30-minute strategy call. No commitment. No hard sell. Just clarity.
              </p>
              
              <div className="glass p-10 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-emerald-400 uppercase tracking-widest font-bold mb-6 text-sm">What Happens On The Call:</h3>
                  <p className="text-gray-300 mb-6">In 30 minutes we will:</p>
                  <ul className="space-y-4 mb-8">
                      <li className="flex gap-3 text-gray-300">
                         <span className="text-emerald-400 font-bold mt-1">→</span>
                         Understand your business and current challenges
                      </li>
                      <li className="flex gap-3 text-gray-300">
                         <span className="text-emerald-400 font-bold mt-1">→</span>
                         Identify 2–3 AI opportunities worth exploring
                      </li>
                      <li className="flex gap-3 text-gray-300">
                         <span className="text-emerald-400 font-bold mt-1">→</span>
                         Give you an honest assessment of what's realistic
                      </li>
                      <li className="flex gap-3 text-gray-300">
                         <span className="text-emerald-400 font-bold mt-1">→</span>
                         Outline a rough scope and timeline if there's a fit
                      </li>
                  </ul>
                  <p className="text-gray-400 italic">
                      You'll leave with more clarity than you had going in — whether or not we end up working together.
                  </p>
              </div>
           </motion.div>

           <motion.div initial="hidden" animate="visible" variants={{
               hidden: { opacity: 0, x: 30 },
               visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
           }}>
               <form className="glass p-10 rounded-2xl border border-white/10 bg-[#0A0A0A] flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Full Name *</label>
                         <input required type="text" className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Work Email *</label>
                         <input required type="email" className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Company Name *</label>
                         <input required type="text" className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Company Size</label>
                         <select className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                             <option className="bg-[#0A0A0A]">1–10</option>
                             <option className="bg-[#0A0A0A]">11–50</option>
                             <option className="bg-[#0A0A0A]">51–200</option>
                             <option className="bg-[#0A0A0A]">201–1000</option>
                             <option className="bg-[#0A0A0A]">1000+</option>
                         </select>
                      </div>
                  </div>

                  <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-400">What best describes your situation?</label>
                      <select className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                          <option className="bg-[#0A0A0A]">I'm exploring AI for the first time</option>
                          <option className="bg-[#0A0A0A]">I've tried AI but it didn't stick</option>
                          <option className="bg-[#0A0A0A]">I have a specific use case in mind</option>
                          <option className="bg-[#0A0A0A]">I need help with an existing AI system</option>
                      </select>
                  </div>

                  <div className="flex flex-col gap-2 mb-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Tell us about your challenge</label>
                      <textarea rows={4} className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#10B981] hover:brightness-110 text-black px-12 py-5 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest">
                     Book My Strategy Call
                  </button>
               </form>

               <div className="mt-10 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="text-gray-400">
                       Prefer email? <span className="text-emerald-400 font-bold mx-2">→</span> <a href="mailto:hello@ajandco.ai" className="text-white hover:text-emerald-400 transition-colors">hello@ajandco.ai</a>
                       <div className="text-sm mt-1">Response within 24 hours.</div>
                   </div>
                   <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Linkedin className="w-4 h-4"/></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Twitter className="w-4 h-4"/></a>
                   </div>
               </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
