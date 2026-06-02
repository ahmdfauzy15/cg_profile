import React, { useState, useEffect } from 'react';

const Hero = ({ personal }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    'Data Enthusiast',
    'Data Analyst',
    'Information Systems Graduate',
    'Tech Professional'
  ];

  useEffect(() => {
    const currentRole = roles[textIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % roles.length);
      }
    } else {
      if (charIndex < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, textIndex, roles]);

  const cvPdfPath = "/CV_Clarissa.pdf";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background decoration - Modern geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        
        {/* Profile Image - Fully Responsive */}
        <div className="animate-float inline-block mb-4 sm:mb-6 md:mb-8 lg:mb-10 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 p-[2px] sm:p-[3px] animate-glow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">CG</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Welcome Badge - Responsive */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full mb-3 sm:mb-4 md:mb-6 shadow-sm animate-fade-up group hover:shadow-md transition-all duration-300">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-blue-500"></span>
          </span>
          <span className="text-blue-600 text-[11px] xs:text-xs sm:text-sm font-medium">Welcome to my portfolio</span>
        </div>
        
        {/* Greeting - Responsive */}
        <div className="animate-fade-up animation-delay-100">
          <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 mb-1 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl">👋</span>
            <span className="text-sm xs:text-base sm:text-lg md:text-xl">Hello, I'm</span>
          </h2>
        </div>
        
        {/* Name - Fully Responsive */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 animate-fade-up animation-delay-200 px-2">
          <span className="text-gray-800">{personal.name.split(' ')[0]}</span>{' '}
          <span className="gradient-text-primary whitespace-normal break-words">
            {personal.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        {/* Role text with cursor - Responsive */}
        <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-6 animate-fade-up animation-delay-300 px-2">
          <span className="font-semibold">
            {displayText}
            <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-blue-400 ml-0.5 animate-blink"></span>
          </span>
        </div>
        
        {/* Description - Fully Responsive with better mobile text */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 leading-relaxed animate-fade-up animation-delay-400 px-4 sm:px-6">
          {personal.about}
        </p>
        
        {/* Button Group - Fully Responsive */}
        <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 animate-fade-up animation-delay-500 px-3 xs:px-4">
          <a
            href="#experience"
            className="btn-primary px-4 xs:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-white font-medium transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 group text-xs xs:text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <span>View Portfolio</span>
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="glass-card px-4 xs:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </a>
          <a
            href={cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 xs:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            CV
          </a>
        </div>
        
        {/* Contact Info - Responsive with icons */}
        <div className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 mt-8 xs:mt-10 sm:mt-12 text-[10px] xs:text-xs sm:text-sm text-gray-500 animate-fade-up animation-delay-600 px-2">
          <div className="flex items-center gap-1 xs:gap-1.5 group cursor-pointer">
            <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="group-hover:text-blue-500 transition-colors">{personal.location}</span>
          </div>
          <div className="flex items-center gap-1 xs:gap-1.5 group cursor-pointer">
            <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="group-hover:text-blue-500 transition-colors">{personal.phone}</span>
          </div>
          <div className="flex items-center gap-1 xs:gap-1.5 group">
            <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a 
              href={`mailto:${personal.email}`} 
              className="group-hover:text-blue-500 transition-colors truncate max-w-[120px] xs:max-w-[150px] sm:max-w-none"
            >
              {personal.email}
            </a>
          </div>
          <div className="flex items-center gap-1 xs:gap-1.5 group">
            <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4" />
            </svg>
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group-hover:text-blue-500 transition-colors text-[10px] xs:text-xs"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll indicator - Responsive (hidden on very small screens) */}
        <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors group">
            <span className="text-[10px] xs:text-xs">Scroll</span>
            <svg className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        /* Extra small screen breakpoint */
        @media (min-width: 480px) {
          .xs\:text-base { font-size: 1rem; }
          .xs\:text-lg { font-size: 1.125rem; }
          .xs\:text-xl { font-size: 1.25rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;