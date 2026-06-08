import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans min-h-screen bg-[#0A0A0A] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Additional routes will be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
