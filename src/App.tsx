import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages for route-based code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const Process = React.lazy(() => import('./pages/Process'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

export default function App() {
 return (
 <BrowserRouter>
 <ScrollToTop />
 <div className="font-sans min-h-screen bg-[#0A0A0A] text-white flex flex-col">
 <Navbar />
 <main className="flex-grow pt-24">
 <Suspense fallback={<div aria-hidden /> }>
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
 </Suspense>
 </main>
 <Footer />
 </div>
 </BrowserRouter>
 );
}
