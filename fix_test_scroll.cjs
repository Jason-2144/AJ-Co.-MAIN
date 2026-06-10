const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');

const newComponent = `
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
`;

let sectionRegex = /\{\/\* What We Do \*\/\}([\s\S]*?)<\/section>/;
content = content.replace(sectionRegex, '{/* What We Do */}\n      <StickyScrollServices />');

// Remove HorizontalScrollContainer from top
content = content.replace(/const HorizontalScrollContainer = \(\{ children, className \}: \{ children: React\.ReactNode, className\?: string \}\) => \{[\s\S]*?return \([\s\S]*?<\/div>[\s\S]*?\);[\s\S]*?\};/, '');

// Find where to insert StickyScrollServices
content = content.replace('export default function Home() {', newComponent + '\nexport default function Home() {');

fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
