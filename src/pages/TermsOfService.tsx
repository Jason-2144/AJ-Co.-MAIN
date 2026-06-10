import { motion } from 'motion/react';

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TermsOfService() {
 return (
 <section className="pt-40 pb-32 bg-[#0A0A0A] min-h-screen">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
 <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
 <h1 className="font-syne text-4xl md:text-5xl font-extrabold text-white mb-4">Terms of Service</h1>
 <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest">Last Updated: June 2026</p>
 </motion.div>

 <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-12 text-gray-300 leading-relaxed font-sans">
 
 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">1. Agreement to Terms</h2>
 <p>By accessing or using our Website (ajandco.ai) or services, you agree to be bound by these Terms. If you disagree, you must not use our website.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
 <p>All content on this website (text, graphics, logos, images) is the property of AJ and Co or its content suppliers and is protected by intellectual property laws. You may not reproduce it without permission.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">3. User Representations</h2>
 <p>You warrant that all information you submit to us is true, accurate, and current. You will not use the website for any illegal or unauthorised purpose.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">4. Disclaimers</h2>
 <p className="p-4 bg-white/5 border-l-2 border-emerald-500 italic mb-4">
 The website is provided on an AS-IS and AS-AVAILABLE basis. We make no representations or warranties, express or implied.
 </p>
 <p>Case studies and statistics represent past performance and do not guarantee future results for your specific business.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">5. Professional Services Engagement</h2>
 <p>Booking a strategy call via this website does not constitute an agreement for professional services or consulting. Any professional engagement will be governed by a separate, signed Master Services Agreement (MSA) and Statement of Work (SOW).</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">6. Third-Party Websites</h2>
 <p>Our website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party websites.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">7. Limitations of Liability</h2>
 <p>In no event shall AJ and Co be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the website or the content within it.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">8. Governing Law</h2>
 <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AJ and Co operates, without regard to its conflict of law principles.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">9. Changes to Terms</h2>
 <p>We reserve the right to modify these terms at any time. We will indicate modifications by updating the "Last Updated" date at the top of this page.</p>
 </div>

 <div>
 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">10. Contact Us</h2>
 <p>For questions about these terms: <a href="mailto:legal@ajandco.ai" className="text-emerald-400 hover:text-emerald-300">legal@ajandco.ai</a></p>
 </div>

 </motion.div>
 </div>
 </section>
 );
}
