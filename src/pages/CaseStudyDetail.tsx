import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
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

const caseStudyData: Record<string, any> = {
 "ecommerce-support-automation": {
 industry: "E-Commerce",
 title: "How We Cut Support Response Times By 75% With A Multi-Agent AI System",
 badges: ["75% Faster Responses", "60% Fewer Escalations", "4 Weeks To Production"],
 client: "A rapidly scaling e-commerce brand operating across North America. At the time of engagement, they were processing 800–1,200 support tickets per day with a team of 12 agents. Average response time: 6.2 hours. Customer satisfaction score: 61%.",
 challenge: [
 "As order volume grew, support costs grew with it — linearly. The team was hiring just to keep up, not to improve quality. Over 70% of tickets were variations of the same five questions: order status, returns policy, shipping delays, product sizing, and discount codes.",
 "Leadership knew AI was the answer. They'd tried a basic chatbot 18 months prior. It deflected 12% of tickets and frustrated the rest. They came to us needing a real solution, not another demo."
 ],
 approach: [
 "We started with a 3-day audit of their support operation — reading 2,000 historical tickets, mapping resolution flows, and identifying the 15 ticket types that made up 80% of their volume.",
 "From there we designed a 3-layer agent system:",
 "Layer 1: Classifier Agent\nReads incoming tickets and classifies by type, urgency, and sentiment. Routes to the appropriate resolution path within 2 seconds of submission.",
 "Layer 2: Resolution Agents (5 specialised agents)\nEach handles a specific ticket category. Pulls live data from their Shopify store, order management system, and returns portal to generate accurate, personalised responses.",
 "Layer 3: Escalation Agent\nIdentifies tickets that require human handling — complex complaints, high-value customers, edge cases — and routes to the right team member with full context attached."
 ],
 stats: [
 { label: "Average response time", old: "6.2 hours", new: "1.4 hours" },
 { label: "Human agent required", old: "100%", new: "38%" },
 { label: "Customer satisfaction", old: "61%", new: "84%" }
 ],
 bulletStats: [
 "Support cost per ticket: reduced by 52%",
 "Time to production from kickoff: 4 weeks"
 ],
 quote: {
 text: "We'd tried chatbots before and they always made things worse. AJ and Co actually understood our operation before they built anything. The system they shipped handles things our human agents struggled with.",
 author: "Head of Customer Experience"
 }
 },
 "sales-lead-qualification": {
 industry: "B2B SaaS",
 title: "How We Helped A SaaS SDR Team Generate 3x More Qualified Pipeline With AI Scoring",
 badges: ["3x Qualified Leads", "55% Less Time On Cold Outreach", "6 Weeks To Production"],
 client: "A B2B SaaS company selling mid-market workflow management software. 8-person sales team, $2M ARR target, growing inbound volume but declining close rates. Average deal size: $18,000.",
 challenge: [
 "Their inbound funnel was generating 300–400 leads per month. The problem: less than 15% were genuinely qualified. SDRs were spending the majority of their week on discovery calls that went nowhere — draining morale and burning capacity that should have been spent closing.",
 "Manual lead scoring existed but was inconsistent. Different SDRs applied different criteria. High-intent signals were being missed. Good leads were going cold."
 ],
 approach: [
 "We built a 3-component AI qualification system:",
 "Component 1: Enrichment Pipeline\nEvery new lead is automatically enriched with company size, tech stack, funding stage, hiring activity, and recent news. All within 90 seconds of form submission.",
 "Component 2: Fit Scoring Model\nA custom scoring model trained on 18 months of historical closed-won and closed-lost data. Each lead receives a fit score (1–100) based on firmographic and behavioural signals.",
 "Component 3: Intent Detection\nMonitors lead behaviour — page visits, content downloads, email engagement — and triggers priority alerts when high-fit leads show buying intent signals.",
 "Results are pushed directly into their HubSpot CRM with a recommended next action for each lead."
 ],
 stats: [
 { label: "Qualified leads per month", old: "45", new: "138" },
 { label: "Discovery-to-demo conv.", old: "22%", new: "41%" },
 { label: "Pipeline generated", old: "1.0x", new: "2.4x" }
 ],
 bulletStats: [
 "SDR time on unqualified outreach: reduced by 55%",
 "Time to production from kickoff: 6 weeks"
 ],
 quote: {
 text: "Our SDRs went from dreading Monday mornings to actually looking forward to their pipeline. The system tells them exactly who to call and why. Close rates are up, morale is up, and we're hitting numbers we haven't seen in two years.",
 author: "VP of Sales"
 }
 },
 "internal-operations-assistant": {
 industry: "Professional Services",
 title: "How We Gave An Operations Team 40% Of Their Week Back With An Internal AI Assistant",
 badges: ["40% Less Manual Work", "12 Hours Saved Per Week", "5 Weeks To Production"],
 client: "A 60-person professional services firm with a 5-person operations team responsible for project tracking, resource allocation, reporting, and internal communications across 20+ active client engagements.",
 challenge: [
 "The ops team was the connective tissue of the business — and they were stretched to breaking point. Every Monday they manually compiled project status updates from 6 different tools. Every Friday they produced utilisation reports that took half a day. Every day they fielded the same questions from project managers: 'What's the status on X?' 'Who's available next week?' 'Has the client signed off on Y?'",
 "They weren't doing operations. They were doing manual data entry and answering questions that should have been answerable in seconds."
 ],
 approach: [
 "We built an internal AI assistant connected to all their core tools:",
 "Integrations built:\n· Notion (project documentation)\n· Monday.com (task and resource tracking)\n· Google Workspace (email, calendar, Drive)\n· Slack (primary communication)\n· Harvest (time tracking and billing)",
 "The assistant lives in Slack and can:\n→ Answer natural language questions about any project, resource, or deadline in real time\n→ Generate weekly status reports automatically every Monday at 8am\n→ Produce utilisation and capacity reports on demand\n→ Flag projects at risk based on timeline and budget signals\n→ Draft client update emails from project data"
 ],
 stats: [
 { label: "Manual reporting time", old: "100%", new: "-40%" },
 { label: "Monday report generation", old: "4 hours", new: "Auto" },
 { label: "Repetitive Q's fielded", old: "100%", new: "-70%" }
 ],
 bulletStats: [
 "Time saved per ops team member per week: 12 hours",
 "Time to production from kickoff: 5 weeks"
 ],
 quote: {
 text: "I keep waiting for someone to tell me there's a catch. There isn't. The assistant just works. Our ops team is actually doing strategic work for the first time in two years.",
 author: "Director of Operations"
 }
 }
};

export default function CaseStudyDetail() {
 const { id } = useParams();
 const data = caseStudyData[id || ''];

 if (!data) return <div className="py-16 sm:py-20 lg:py-28 text-center text-white">Case study not found.</div>;

 return (
 <>
	<SEO
		title={data ? `${data.title} | AJ & Co.` : 'Case Study | AJ & Co.'}
		description={data ? data.client?.slice(0, 140) : 'AJ & Co. case study.'}
		keywords={data ? `case study, ${data.industry}` : 'case study'}
	/>
 
 <section className="relative pt-32 pb-24 border-b border-white/5 bg-[#0A0A0A]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="mb-6 flex gap-4 flex-wrap">
 {data.badges.map((b:string, i:number) => (
 <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#10B981]">{b}</span>
 ))}
 </div>
 <h4 className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-6 border-l-2 border-emerald-500 pl-4">{data.industry}</h4>
 <motion.h1 
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]"
 >
 {data.title}
 </motion.h1>
 </div>
 </section>

 <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-24">
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
 <h3 className="font-mono text-emerald-400 uppercase tracking-widest font-bold mb-6 text-sm">The Client</h3>
 <p className="text-xl text-gray-300 leading-relaxed font-sans">{data.client}</p>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
 <h3 className="font-mono text-cyan-400 uppercase tracking-widest font-bold mb-6 text-sm">The Challenge</h3>
 <div className="space-y-6">
 {data.challenge.map((p:string, i:number) => (
 <p key={i} className="text-lg text-gray-300 leading-relaxed">{p}</p>
 ))}
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
 <h3 className="font-mono text-emerald-400 uppercase tracking-widest font-bold mb-6 text-sm">Our Approach</h3>
 <div className="space-y-8 p-8 rounded-2xl glass border border-white/10 bg-white/[0.02]">
 {data.approach.map((p:string, i:number) => (
 <p key={i} className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">{p}</p>
 ))}
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
 <h3 className="font-mono text-cyan-400 uppercase tracking-widest font-bold mb-8 text-sm">The Results (After 60-90 Days)</h3>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
 {data.stats.map((s:any, i:number) => (
 <motion.div key={i} variants={fadeUp} className="border border-white/10 rounded-xl p-6 bg-black">
 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-4 h-8">{s.label}</p>
 <div className="flex items-end gap-3 font-mono">
 <span className="text-lg text-gray-500 line-through">{s.old}</span>
 <span className="text-3xl font-bold text-emerald-400">{s.new}</span>
 </div>
 </motion.div>
 ))}
 </div>

 <div className="space-y-3 pl-4 md:pl-0">
 {data.bulletStats.map((bullet:string, i:number) => (
 <motion.div key={i} variants={fadeUp} className="flex gap-4 items-center">
 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
 <span className="text-gray-300 text-sm md:text-base font-mono bg-white/5 px-4 py-2 rounded-lg">{bullet}</span>
 </motion.div>
 ))}
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
 <div className="border-l-4 border-emerald-500 pl-8 md:pl-12 py-4">
 <p className="text-2xl md:text-3xl text-white font-syne italic mb-6 leading-relaxed">"{data.quote.text}"</p>
 <div className="text-emerald-400 font-mono font-bold">— {data.quote.author}</div>
 </div>
 </motion.div>

 </section>

 <section className="py-16 sm:py-20 lg:py-28 relative text-center border-t border-white/5 bg-[#0A0A0A]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">Want Results Like This?</h2>
 <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest w-full sm:w-auto text-center justify-center flex">
 Let's Scope It
 </Link>
 </div>
 </section>
 </>
 );
}
