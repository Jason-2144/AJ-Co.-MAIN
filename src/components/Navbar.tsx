import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const location = useLocation();

 useEffect(() => {
 const handleScroll = () => setScrolled(window.scrollY > 50);
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const isActive = (path: string) => {
 if (path === '/' && location.pathname !== '/') return false;
 return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
 };

 const navLinks = [
 { name: 'Services', path: '/services' },
 { name: 'Process', path: '/process' },
 { name: 'Case Studies', path: '/case-studies' },
 { name: 'About', path: '/about' },
 ];

 return (
 <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/85 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto max-w-7xl">
 <Link to="/" className="font-syne text-xl font-bold flex items-center text-white">
 AJ <span className="text-[#10B981] mx-1">&amp;</span> Co
 <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1 mb-1"></span>
 </Link>
 <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
 {navLinks.map((link) => (
 <Link 
 key={link.name} 
 to={link.path} 
 className={`transition-colors ${isActive(link.path) ? 'text-emerald-400 underline underline-offset-4' : 'hover:text-emerald-400'}`}
 >
 {link.name}
 </Link>
 ))}
 </nav>
 <Link to="/contact" className="hidden md:flex items-center justify-center bg-[#10B981] hover:brightness-110 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-none font-syne font-bold hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase text-xs tracking-widest whitespace-nowrap">
 Book Strategy Call
 </Link>
 <button className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
 {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
 </button>
 </div>
 {mobileMenuOpen && (
 <motion.div 
 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
 className="absolute top-full left-0 w-full h-screen bg-[#0A0A0A] border-t border-white/5 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
 >
 {navLinks.map((link) => (
 <Link
 key={link.name}
 to={link.path}
 onClick={() => setMobileMenuOpen(false)}
 className={`font-syne text-xl py-4 border-b border-white/5 ${isActive(link.path) ? 'text-emerald-400 underline underline-offset-4' : 'text-gray-300 hover:text-emerald-400'}`}
 >
 {link.name}
 </Link>
 ))}
 <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full mt-4 py-4 block text-center bg-[#10B981] hover:brightness-110 text-black rounded-none font-syne font-bold uppercase text-sm tracking-widest hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all">
 Book Strategy Call
 </Link>
 </motion.div>
 )}
 </header>
 );
}
