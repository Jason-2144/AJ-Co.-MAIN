import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Process from './pages/Process';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
 return (
 <HelmetProvider>
      <BrowserRouter>
 <ScrollToTop />
 <div className="font-sans min-h-screen bg-[#0A0A0A] text-white flex flex-col">
 <Navbar />
 <main className="flex-grow pt-24">
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/services" element={<Services />} />
 <Route path="/services/:id" element={<ServiceDetail />} />
 <Route path="/process" element={<Process />} />
 <Route path="/case-studies" element={<CaseStudies />} />
 <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
 <Route path="/about" element={<About />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/privacy-policy" element={<PrivacyPolicy />} />
 <Route path="/terms-of-service" element={<TermsOfService />} />
 </Routes>
 </main>
 <Footer />
 </div>
 </BrowserRouter>
    </HelmetProvider>
 );
}
