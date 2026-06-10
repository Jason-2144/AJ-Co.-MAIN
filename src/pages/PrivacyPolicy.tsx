import { motion } from 'motion/react';

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function PrivacyPolicy() {
 return (
 <section className="pt-40 pb-32 bg-[#0A0A0A] min-h-screen">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
 <h1 className="font-syne text-4xl md:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
 <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest">Last Updated: June 2026</p>
 </motion.div>

 <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-12 text-gray-300 leading-relaxed font-sans">
 
 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">1. Introduction</h2>
 <p>AJ and Co ("we", "our", "us") is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights regarding it.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">2. Information We Collect</h2>
 <ul className="list-none space-y-3">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> <strong>Information you provide:</strong> name, email, company name, messages submitted via contact forms</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> <strong>Usage data:</strong> pages visited, time on site, browser type, IP address (collected via analytics tools)</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> <strong>Cookies:</strong> session cookies, analytics cookies, preference cookies</li>
 </ul>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">3. How We Use Your Information</h2>
 <ul className="list-none space-y-3 mb-4">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> To respond to enquiries and schedule strategy calls</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> To send relevant communications (with your consent)</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> To improve our website and services</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> To comply with legal obligations</li>
 </ul>
 <p className="p-4 bg-white/5 border-l-2 border-emerald-500 italic">We do not sell, rent, or trade your personal data to any third parties.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">4. Data Retention</h2>
 <p>Contact form data is retained for 24 months unless you request deletion. Analytics data is retained in aggregated, anonymised form.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">5. Third-Party Services</h2>
 <p>We use the following third-party services that may process your data: Google Analytics (website analytics), Calendly (booking scheduling), standard email infrastructure.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">6. Your Rights</h2>
 <p className="mb-4">You have the right to:</p>
 <ul className="list-none space-y-3">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> Access the personal data we hold about you</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> Request correction of inaccurate data</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> Request deletion of your data</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> Withdraw consent at any time</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">→</span> Lodge a complaint with a relevant data authority</li>
 </ul>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">7. Cookies</h2>
 <p>We use minimal cookies. You can control cookie preferences via your browser settings.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">8. Security</h2>
 <p>We implement industry-standard security measures. No method of transmission is 100% secure — we will notify you promptly of any breach affecting your data.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">9. Contact</h2>
 <p>For privacy-related queries: <a href="mailto:privacy@ajandco.ai" className="text-emerald-400 hover:text-emerald-300">privacy@ajandco.ai</a></p>
 </div>

 </motion.div>
 </div>
 </section>
 );
}
