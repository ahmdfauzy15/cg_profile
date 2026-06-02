import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Skills = ({ skills }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Gradasi warna yang konsisten dengan palette utama (Blue, Cyan, Teal, Indigo)
  const categoryColors = {
    'Languages': { 
      from: 'from-blue-500', 
      to: 'to-blue-600', 
      bgHover: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      lightHover: 'bg-blue-100',
      textHover: 'text-white'
    },
    'Programming': { 
      from: 'from-cyan-500', 
      to: 'to-cyan-600', 
      bgHover: 'from-cyan-500 to-cyan-600',
      light: 'bg-cyan-50',
      lightHover: 'bg-cyan-100',
      textHover: 'text-white'
    },
    'Database': { 
      from: 'from-blue-500', 
      to: 'to-cyan-500', 
      bgHover: 'from-blue-500 to-cyan-500',
      light: 'bg-blue-50',
      lightHover: 'bg-blue-100',
      textHover: 'text-white'
    },
    'Tools': { 
      from: 'from-indigo-500', 
      to: 'to-indigo-600', 
      bgHover: 'from-indigo-500 to-indigo-600',
      light: 'bg-indigo-50',
      lightHover: 'bg-indigo-100',
      textHover: 'text-white'
    },
    'Data Analytics': { 
      from: 'from-blue-500', 
      to: 'to-cyan-500', 
      bgHover: 'from-blue-500 to-cyan-500',
      light: 'bg-blue-50',
      lightHover: 'bg-blue-100',
      textHover: 'text-white'
    },
    'Soft Skills': { 
      from: 'from-indigo-500', 
      to: 'to-purple-500', 
      bgHover: 'from-indigo-500 to-purple-500',
      light: 'bg-indigo-50',
      lightHover: 'bg-indigo-100',
      textHover: 'text-white'
    },
  };

  return (
    <section id="skills" className="py-28 px-6 max-w-6xl mx-auto relative" ref={ref}>
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-blue-600 text-sm font-medium">Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Technical & Soft Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], idx) => {
            const colors = categoryColors[category] || { 
              from: 'from-blue-500', 
              to: 'to-blue-600', 
              bgHover: 'from-blue-500 to-blue-600',
              light: 'bg-blue-50',
              lightHover: 'bg-blue-100',
              textHover: 'text-white'
            };
            const isHovered = hoveredCategory === category;
            
            return (
              <div
                key={category}
                className="glass-card p-6 transition-all duration-300 animate-fade-up hover-lift"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                    {category.charAt(0)}
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    isHovered ? `bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent` : 'text-gray-700'
                  }`}>
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-default ${
                        isHovered 
                          ? `bg-gradient-to-r ${colors.bgHover} ${colors.textHover} shadow-md scale-105` 
                          : `${colors.light} text-gray-700 ${colors.lightHover.replace('bg-', 'hover:bg-')}`
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;