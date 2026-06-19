import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { Linkedin, Twitter, CheckCircle2, Loader2 } from 'lucide-react';

const fadeUp: any = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contact() {
 const [formData, setFormData] = useState({
 fullName: '',
 workEmail: '',
 companyName: '',
 companySize: '1–10',
 situation: "I'm exploring AI for the first time",
 challenge: ''
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 const { name, value } = e.target;
 setFormData(prev => ({...prev, [name]: value }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');

 if (!formData.fullName || !formData.workEmail || !formData.companyName) {
 setErrorMsg('Please fill in all required fields.');
 return;
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(formData.workEmail)) {
 setErrorMsg('Please enter a valid email address.');
 return;
 }

 setIsSubmitting(true);

 try {
 // The Webhook URL (User will replace this in.env)
 const providedUrl = "https://script.google.com/macros/s/AKfycbyk3VT_AqU0ZL0YZGDBEnamiZtndlUlmalVpav5UV8o4pjHSic8VjhvrC_D14sHpQ/exec";
 const WEBHOOK_URL = (import.meta as any).env.VITE_GOOGLE_WEBHOOK_URL || providedUrl;
 
 if (!WEBHOOK_URL || WEBHOOK_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL") {
 setErrorMsg("Please set up your Google Apps Script Webhook URL in the Environment Variables (VITE_GOOGLE_WEBHOOK_URL) first.");
 setIsSubmitting(false);
 return;
 }

 const response = await fetch(WEBHOOK_URL, {
 method: "POST",
 mode: "no-cors",
 headers: {
 "Content-Type": "text/plain;charset=utf-8",
 },
 body: JSON.stringify(formData),
 });

 // With no-cors, the response is opaque and we cannot read JSON.
 // If the fetch didn't throw a network error, we assume it was sent successfully.
 setIsSuccess(true);
 } catch (error) {
 console.error(error);
 setErrorMsg(error instanceof Error ? error.message : "Something went wrong while submitting your request. Please try again.");
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <section className="relative pt-32 pb-32 overflow-hidden bg-[#0A0A0A] flex-grow flex flex-col justify-center">
	<SEO
		title="Contact AJ & Co."
		description="Book a free strategy call with AJ & Co. — start exploring high-impact AI opportunities for your business."
		keywords="contact, strategy call, AI consulting"
	/>
 <div className="absolute inset-0 hero-gradient opacity-20 pointer-events-none"></div>
 
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mt-10">
 <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
 
 <motion.div initial="hidden" animate="visible" variants={{
 hidden: { opacity: 0, x: -30 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
 }}>
 <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
 Let's Figure Out What AI Can Do For Your Business
 </h1>
 <p className="text-xl text-[#10B981] font-mono tracking-widest uppercase font-bold mb-16">
 Start with a free 30-minute strategy call. No commitment. No hard sell. Just clarity.
 </p>
 
 <div className="glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
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
 {!isSuccess ? (
 <form className="glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] flex flex-col gap-6" onSubmit={handleSubmit}>
 
 {errorMsg && (
 <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm font-sans">
 {errorMsg}
 </div>
 )}

 <div className="grid grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Full Name *</label>
 <input 
 required 
 type="text" 
 name="fullName"
 value={formData.fullName}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Work Email *</label>
 <input 
 required 
 type="email" 
 name="workEmail"
 value={formData.workEmail}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
 />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Company Name *</label>
 <input 
 required 
 type="text" 
 name="companyName"
 value={formData.companyName}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Company Size</label>
 <select 
 name="companySize"
 value={formData.companySize}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
 >
 <option className="bg-[#0A0A0A]" value="1–10">1–10</option>
 <option className="bg-[#0A0A0A]" value="11–50">11–50</option>
 <option className="bg-[#0A0A0A]" value="51–200">51–200</option>
 <option className="bg-[#0A0A0A]" value="201–1000">201–1000</option>
 <option className="bg-[#0A0A0A]" value="1000+">1000+</option>
 </select>
 </div>
 </div>

 <div className="flex flex-col gap-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">What best describes your situation?</label>
 <select 
 name="situation"
 value={formData.situation}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
 >
 <option className="bg-[#0A0A0A]" value="I'm exploring AI for the first time">I'm exploring AI for the first time</option>
 <option className="bg-[#0A0A0A]" value="I've tried AI but it didn't stick">I've tried AI but it didn't stick</option>
 <option className="bg-[#0A0A0A]" value="I have a specific use case in mind">I have a specific use case in mind</option>
 <option className="bg-[#0A0A0A]" value="I need help with an existing AI system">I need help with an existing AI system</option>
 </select>
 </div>

 <div className="flex flex-col gap-2 mb-2">
 <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Tell us about your challenge</label>
 <textarea 
 rows={4} 
 name="challenge"
 value={formData.challenge}
 onChange={handleInputChange}
 className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
 ></textarea>
 </div>

 <button 
 type="submit" 
 disabled={isSubmitting}
 className="w-full flex justify-center items-center gap-3 bg-[#10B981] hover:brightness-110 disabled:opacity-70 disabled:hover:brightness-100 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold emerald-glow transition-all uppercase text-sm tracking-widest"
 >
 {isSubmitting ? (
 <>
 <Loader2 className="w-5 h-5 animate-spin" />
 Submitting...
 </>
 ) : (
 "Book My Strategy Call"
 )}
 </button>
 </form>
 ) : (
 <div className="glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-emerald-500/30 bg-[#0A0A0A] flex flex-col items-center text-center">
 <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
 <CheckCircle2 className="w-10 h-10 text-emerald-400" />
 </div>
 <h2 className="font-syne text-3xl font-bold text-white mb-4">Thanks for reaching out.</h2>
 <p className="text-gray-300 text-lg mb-2">Your strategy call request has been received successfully.</p>
 <p className="text-gray-400 mb-8">We'll review your request and get back to you shortly.</p>
 </div>
 )}

 <div className="mt-10 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="text-gray-400">
 Prefer email? <span className="text-emerald-400 font-bold mx-2">→</span> <a href="mailto:team.ajandco@gmail.com" className="text-white hover:text-emerald-400 transition-colors">team.ajandco@gmail.com</a>
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
