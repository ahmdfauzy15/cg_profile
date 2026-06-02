import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['about', 'experience', 'education', 'organization', 'skills', 'certifications'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'organization', label: 'Organization' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/85 backdrop-blur-xl py-4 shadow-lg shadow-blue-200/30' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="group relative text-2xl font-bold overflow-hidden"
          >
            <span className="gradient-text-multicolor relative z-10">
              CG Portfolio
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></span>
          </a>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-up">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-gray-600 hover:text-blue-500 transition py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;