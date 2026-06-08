import { Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-24 pb-10">
      <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
              <div className="md:col-span-2">
                  <Link to="/" className="font-syne text-3xl font-extrabold flex items-center text-white mb-6">
                    AJ <span className="text-[#10B981] mx-1">&amp;</span> Co.
                  </Link>
                  <p className="text-gray-400 text-lg max-w-sm mb-10">We don't just build AI. We identify, develop, and embed it.</p>
                  <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Linkedin className="w-5 h-5"/></a>
                      <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5"/></a>
                      <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"><Youtube className="w-5 h-5"/></a>
                  </div>
              </div>
              <div>
                  <h4 className="text-white font-syne font-bold text-lg mb-8 uppercase tracking-wider">Services</h4>
                  <ul className="space-y-4 text-gray-400 font-medium">
                      <li><Link to="/services/ai-opportunity-assessment" className="hover:text-emerald-400 transition-colors">AI Opportunity Assessment</Link></li>
                      <li><Link to="/services/custom-agent-development" className="hover:text-emerald-400 transition-colors">Custom Agent Development</Link></li>
                      <li><Link to="/services/workflow-automation" className="hover:text-emerald-400 transition-colors">Workflow Automation</Link></li>
                      <li><Link to="/services/enterprise-ai-training" className="hover:text-emerald-400 transition-colors">Enterprise AI Training</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="text-white font-syne font-bold text-lg mb-8 uppercase tracking-wider">Company</h4>
                  <ul className="space-y-4 text-gray-400 font-medium">
                      <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                      <li><Link to="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
                      <li><Link to="/process" className="hover:text-emerald-400 transition-colors">Our Process</Link></li>
                      <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                  </ul>
              </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-mono">
              <p>© 2026 AJ and Co. All rights reserved.</p>
              <div className="flex gap-8">
                  <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
              </div>
          </div>
      </div>
    </footer>
  );
}
