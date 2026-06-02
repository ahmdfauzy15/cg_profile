import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Organization from './components/Organization';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import { useFetch } from './hooks/useFetch';

function App() {
  const { data, loading, error } = useFetch('/data.json');

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-blue-300/30 border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-cyan-300/30 border-b-cyan-500 animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-indigo-300/30 border-r-indigo-500 animate-spin animation-delay-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center glass-card p-8">
          <div className="text-6xl mb-4 text-blue-500">⚠</div>
          <div className="text-red-500 text-lg">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 btn-primary text-white rounded-full transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero personal={data.personal} />
      <About personal={data.personal} />
      <Experience experiences={data.experiences} />
      <Education education={data.education} />
      <Organization organizations={data.organizations} />
      <Skills skills={data.skills} />
      <Certifications certifications={data.certifications} />
      <Footer personal={data.personal} />
    </div>
  );
}

export default App;