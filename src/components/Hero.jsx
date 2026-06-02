import React, { useState, useEffect } from 'react';

const Hero = ({ personal }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    'Data Engineer Enthusiast',
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

  const cvPdfPath = "/cv_clarissa_auliya_ghavira.pdf";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        
        {/* Profile Image - Responsive sizing */}
        <div className="animate-float inline-block mb-6 sm:mb-8 md:mb-10 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 p-[3px] animate-glow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center text-2xl sm:text-3xl font-bold text-blue-400">CG</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Title - Responsive text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 animate-fade-up">
          <span className="text-gray-800">{personal.name.split(' ')[0]}</span>{' '}
          <span className="gradient-text-primary whitespace-normal break-words">
            {personal.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        {/* Role text - Responsive */}
        <div className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 animate-fade-up animation-delay-200 px-2">
          <span className="font-semibold border-r-2 border-blue-400 pr-1">{displayText}</span>
        </div>
        
        {/* Description - Full text with better spacing */}
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed animate-fade-up animation-delay-400 px-4 sm:px-6">
          {personal.about}
        </p>
        
        {/* Button Group - Responsive buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-up animation-delay-600 px-4">
          <a
            href="#experience"
            className="btn-primary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-white font-medium transition-all duration-300 inline-flex items-center gap-2 group text-sm sm:text-base"
          >
            <span>View Portfolio</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="btn-secondary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
          >
            Contact
          </a>
          <a
            href={cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
          >
            CV
          </a>
        </div>
        
        {/* Contact Info - Responsive layout */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-8 sm:mt-10 text-xs sm:text-sm text-gray-500 animate-fade-up animation-delay-800 px-2">
          <span className="flex items-center gap-1">{personal.location}</span>
          <span className="w-1 h-1 rounded-full bg-blue-300 my-auto hidden sm:block"></span>
          <span className="flex items-center gap-1">{personal.phone}</span>
          <span className="w-1 h-1 rounded-full bg-blue-300 my-auto hidden sm:block"></span>
          <a 
            href={personal.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            LinkedIn Profile
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;