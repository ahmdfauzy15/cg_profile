import React from 'react';

const Footer = ({ personal }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'LinkedIn', href: personal.linkedin, color: 'hover:text-blue-500' },
    { label: 'Email', href: `mailto:${personal.email}`, color: 'hover:text-cyan-500' },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 opacity-50"></div>
      <div className="relative py-12 border-t border-blue-200 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="text-gray-500 hover:text-blue-500 transition text-sm">Home</a>
            <a href="#about" className="text-gray-500 hover:text-blue-500 transition text-sm">About</a>
            <a href="#experience" className="text-gray-500 hover:text-blue-500 transition text-sm">Experience</a>
            <a href="#education" className="text-gray-500 hover:text-blue-500 transition text-sm">Education</a>
            <a href="#organization" className="text-gray-500 hover:text-blue-500 transition text-sm">Organization</a>
            <a href="#skills" className="text-gray-500 hover:text-blue-500 transition text-sm">Skills</a>
            <a href="#certifications" className="text-gray-500 hover:text-blue-500 transition text-sm">Certifications</a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 ${link.color} transition-all duration-300 hover:scale-110 text-sm`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} {personal.name}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Data driven & continuously learning
          </p>
          
          {/* Back to Top */}
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>↑</span>
            <span>Back to Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;