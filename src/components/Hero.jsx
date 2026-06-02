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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Profile Image */}
        <div className="animate-float inline-block mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 p-[3px] animate-glow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center text-3xl font-bold text-blue-400">CG</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-up">
          <span className="text-gray-800">{personal.name.split(' ')[0]}</span>{' '}
          <span className="gradient-text-primary">
            {personal.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        <div className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 animate-fade-up animation-delay-200">
          <span className="font-semibold border-r-2 border-blue-400 pr-1">{displayText}</span>
        </div>
        
        {/* Deskripsi lengkap dari data.json tanpa batasan karakter */}
        <p className="text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-up animation-delay-400">
          {personal.about}
        </p>
        
        {/* Button Group */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-600">
          <a
            href="#experience"
            className="btn-primary px-8 py-3 rounded-full text-white font-medium transition-all duration-300 inline-flex items-center gap-2 group"
          >
            <span>View Portfolio</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="btn-secondary px-8 py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-2"
          >
            Contact
          </a>
          <a
            href={cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-8 py-3 rounded-full text-blue-600 font-medium transition-all duration-300 inline-flex items-center gap-2"
          >
            CV
          </a>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10 text-sm text-gray-500 animate-fade-up animation-delay-800">
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