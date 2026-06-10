import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

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

const serviceData: Record<string, any> = {
 "ai-opportunity-assessment": {
 headline: "Find The 5% Of AI Opportunities Worth Building",
 sub: "Most businesses have dozens of places where AI could theoretically help. We find the small number that actually will — and build the case for investing in them.",
 section1: {
 title: "The Problem",
 body: [
 "Most AI initiatives start with a tool, not a problem. A vendor sells leadership on a platform. A pilot gets approved. Six months later, the ROI never materialised and nobody knows why.",
 "The root cause is almost always the same: the wrong opportunity was chosen.",
 "We fix that before a single line of code is written."
 ]
 },
 section2: {
 title: "What We Do",
 cards: [
 { title: "Executive Alignment Workshop", desc: "We facilitate structured sessions with your leadership team to map strategic priorities against AI capabilities. We surface where AI creates use — and where it doesn't." },
 { title: "Workflow & Process Audit", desc: "We interview your team leads, observe how work actually happens, and identify where time is lost, decisions stall, and manual effort compounds. This is where the real opportunities live." },
 { title: "ROI Modeling", desc: "For each opportunity, we model the business case. Time saved, cost reduced, revenue enabled. Every recommendation comes with a number attached — not a feeling." },
 { title: "AI Readiness Report", desc: "You receive a prioritized roadmap: which opportunities to pursue first, what data and infrastructure you'll need, and a realistic timeline and investment estimate." }
 ]
 },
 section3: {
 title: "Who This Is For",
 items: [
 "Have heard a lot about AI but aren't sure where to start",
 "Tried AI pilots that went nowhere and want a better approach",
 "Need to present a clear AI business case to leadership or a board",
 "Want to move fast but can't afford to waste resources on the wrong problem"
 ]
 },
 cta: {
 headline: "Ready To Find Your AI Opportunities?",
 btn: "Book A Strategy Call"
 }
 },
 "custom-agent-development": {
 headline: "AI Agents Built For Production. Not Demos.",
 sub: "We build AI agents that work inside your real stack, handle real edge cases, and get used by real teams. No fragile prototypes. No vendor lock-in.",
 section1: {
 title: "What We Build",
 cards: [
 { title: "Customer Support Agents", desc: "Multi-layer triage, resolution, and escalation systems. Handles repetitive queries autonomously, routes complex cases to the right human, and learns from every interaction." },
 { title: "Sales & Lead Qualification Agents", desc: "AI that scores inbound leads, enriches contact data, drafts personalised outreach, and flags high-intent prospects before your SDR team even opens their inbox." },
 { title: "Internal Operations Assistants", desc: "Connected to your Slack, Notion, CRM, and project tools. Answers team questions, generates status reports, surfaces blockers, and keeps projects moving without the manual overhead." },
 { title: "Data & Research Agents", desc: "Agents that monitor competitors, aggregate industry news, pull financial data, and produce structured briefings — so your team always has the context they need." },
 { title: "Custom Workflow Agents", desc: "If your use case doesn't fit a template, we build from scratch. We've built agents for legal document review, healthcare triage, logistics coordination, and more." }
 ]
 },
 section2: {
 title: "Our Build Process",
 timeline: [
 { step: "Step 1: Technical Architecture", desc: "We design the system before we write a line of code. Data flows, API dependencies, fallback logic, and security boundaries." },
 { step: "Step 2: Integration Design", desc: "We map every system the agent needs to touch and design clean, reversible integrations." },
 { step: "Step 3: PoC Build", desc: "A working prototype in 2 weeks. Real data. Real edge cases. Stakeholder review before full build." },
 { step: "Step 4: Production Build", desc: "Full build with error handling, logging, monitoring, and performance tuning." },
 { step: "Step 5: Security & Governance", desc: "Data handling policies, access controls, audit logs, and compliance documentation." }
 ]
 },
 cta: {
 headline: "Have A Use Case In Mind?",
 btn: "Let's Scope It"
 }
 },
 "workflow-automation": {
 headline: "Automate The Work That Shouldn't Need Humans",
 sub: "Every hour your team spends on repetitive, rule-based tasks is an hour not spent on the work that actually moves the needle. We change that.",
 section1: {
 title: "What We Automate",
 cards: [
 { title: "Lead & CRM Automation", desc: "New lead comes in → enriched, scored, assigned, and followed up — without anyone touching it." },
 { title: "Reporting & Analytics", desc: "Weekly reports, KPI dashboards, and performance summaries generated and distributed automatically." },
 { title: "Document Processing", desc: "Invoices, contracts, intake forms — extracted, classified, routed, and filed without manual review." },
 { title: "Communication Workflows", desc: "Automated follow-ups, onboarding sequences, and internal notifications triggered by real events in your systems." },
 { title: "Data Sync & Integration", desc: "Keep your CRM, project management, support desk, and finance tools in sync — no more manual data entry between platforms." },
 { title: "Approval & Review Flows", desc: "Multi-step approvals, compliance checks, and review cycles automated with full audit trails." }
 ]
 },
 section2: {
 title: "Tools We Work With",
 badges: [
 "Make.com", "n8n", "Zapier", "HubSpot", "Salesforce", "Notion",
 "Slack", "Airtable", "Monday.com", "Jira", "Google Workspace", "Stripe"
 ]
 },
 section3: {
 title: "The Result",
 stats: [
 "Teams reclaim 15–20 hours per week on average",
 "Error rates in manual processes drop by 80–90%",
 "Most automations go live within 2–3 weeks"
 ]
 },
 cta: {
 headline: "Show Us One Process. We'll Show You What's Possible.",
 btn: "Book A Strategy Call"
 }
 },
 "enterprise-ai-training": {
 headline: "AI Adoption Doesn't Happen By Itself",
 sub: "The biggest reason AI projects fail isn't the technology. It's the people. We make sure your team doesn't just have access to AI — they actually use it.",
 section1: {
 title: "The Adoption Problem",
 body: [
 "Research consistently shows that 70% of digital transformation initiatives fail not because of bad technology, but because of poor adoption. Teams revert to old habits. Tools go unused. The investment evaporates.",
 "We've seen this pattern dozens of times. Our adoption framework exists specifically to prevent it."
 ]
 },
 section2: {
 title: "What's Included",
 cards: [
 { title: "AI Enablement Workshops", desc: "Hands-on sessions tailored to each team's actual workflows. Not generic AI literacy training — specific, practical instruction on using the exact systems we've built." },
 { title: "Change Management Support", desc: "We work with team leads and managers to embed AI into existing processes, address resistance, and build internal champions who sustain adoption after we leave." },
 { title: "Playbook & Documentation", desc: "Every system we build comes with clear documentation: how it works, when to use it, how to escalate edge cases, and how to measure whether it's working." },
 { title: "Performance Tracking & Iteration", desc: "We monitor usage and outcomes for 30–90 days post-launch. If adoption is stalling, we diagnose why and fix it." }
 ]
 },
 section3: {
 title: "Outcomes",
 items: [
 "90%+ of users actively use the AI system within 30 days",
 "Teams report confidence scores of 8/10+ on AI tool usage",
 "Managers report measurable time savings within the first week"
 ],
 listType: "standard"
 },
 cta: {
 headline: "Adoption Is Where AI Projects Win Or Lose.",
 btn: "Let's Get It Right"
 }
 }
};

export default function ServiceDetail() {
 const { id } = useParams();
 const data = serviceData[id || ''];

 if (!data) return <div className="py-16 sm:py-20 lg:py-28 text-center text-white">Service not found.</div>;

 return (
 <>
 <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-8 text-white"
 >
 {data.headline.split(data.headline.split(' ').slice(-2).join(' ')).map((item:string, i:number) => i===0 ? item : null)}
 <span className="text-[#10B981]">{data.headline.split(' ').slice(-2).join(' ')}</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
 className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
 >
 {data.sub}
 </motion.p>
 </div>
 </section>

 <section className="py-16 sm:py-20 lg:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 {data.section1 && (
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-24">
 <motion.h2 variants={fadeUp} className="font-syne text-3xl font-bold mb-8 text-white">{data.section1.title}</motion.h2>
 {data.section1.body ? (
 <div className="space-y-6">
 {data.section1.body.map((p:string, i:number) => (
 <motion.p key={i} variants={fadeUp} className="text-gray-300 text-lg leading-relaxed">{p}</motion.p>
 ))}
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
 {data.section1.cards?.map((card:any, i:number) => (
 <motion.div key={i} variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 hover:border-[#10B981]/30 transition-colors bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-white mb-4">{card.title}</h3>
 <p className="text-gray-400 leading-relaxed">{card.desc}</p>
 </motion.div>
 ))}
 </div>
 )}
 </motion.div>
 )}

 {data.section2 && (
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-24">
 <motion.h2 variants={fadeUp} className="font-syne text-3xl font-bold mb-8 text-white">{data.section2.title}</motion.h2>
 {data.section2.cards && (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 {data.section2.cards.map((card:any, i:number) => (
 <motion.div key={i} variants={fadeUp} className="glass p-8 rounded-xl border border-white/10 bg-white/[0.02]">
 <h3 className="font-syne text-xl font-bold text-white mb-4">{card.title}</h3>
 <p className="text-gray-400 leading-relaxed">{card.desc}</p>
 </motion.div>
 ))}
 </div>
 )}
 {data.section2.timeline && (
 <div className="space-y-12 pl-6 md:pl-10 border-l-2 border-white/10 relative">
 {data.section2.timeline.map((step:any, i:number) => (
 <motion.div key={i} variants={fadeUp} className="relative">
 <span className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#0A0A0A] border-4 border-[#10B981]"></span>
 <h3 className="font-syne text-xl font-bold text-white mb-3">{step.step}</h3>
 <p className="text-gray-300 leading-relaxed">{step.desc}</p>
 </motion.div>
 ))}
 </div>
 )}
 {data.section2.badges && (
 <div className="flex flex-wrap gap-4 mt-8">
 {data.section2.badges.map((b:string, i:number) => (
 <motion.span key={i} variants={fadeUp} className="px-4 sm:px-6 lg:px-8 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono text-sm tracking-wider">
 {b}
 </motion.span>
 ))}
 </div>
 )}
 </motion.div>
 )}

 {data.section3 && (
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="mb-24">
 <motion.h2 variants={fadeUp} className="font-syne text-3xl font-bold mb-8 text-white">{data.section3.title}</motion.h2>
 {data.section3.stats ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {data.section3.stats.map((s:string, i:number) => (
 <motion.div key={i} variants={fadeUp} className="glass p-8 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 text-center flex items-center justify-center">
 <p className="font-syne text-xl font-bold text-white">{s}</p>
 </motion.div>
 ))}
 </div>
 ) : (
 <div className="space-y-4">
 {data.section3.items?.map((item:string, i:number) => (
 <motion.div key={i} variants={fadeUp} className="flex gap-4 items-start">
 <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
 <span className="text-gray-300 text-lg">{item}</span>
 </motion.div>
 ))}
 </div>
 )}
 </motion.div>
 )}
 </section>

 <section className="py-16 sm:py-20 lg:py-28 relative text-center border-t border-white/5 bg-white/[0.01]">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">{data.cta.headline}</h2>
 <Link to="/contact" className="inline-flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest w-full sm:w-auto text-center justify-center flex">
 {data.cta.btn}
 </Link>
 </div>
 </section>
 </>
 );
}
