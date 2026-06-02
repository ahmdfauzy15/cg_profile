import React from 'react';
import { useInView } from 'react-intersection-observer';

const Education = ({ education }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section id="education" className="py-28 px-6 max-w-4xl mx-auto relative" ref={ref}>
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
            <span className="text-indigo-600 text-sm font-medium">Education</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-accent">
            Academic Background
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="glass-card p-8 text-center hover-lift relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-4">🏛</div>
            <h3 className="text-2xl font-semibold text-gray-800">{education.institution}</h3>
            <p className="text-blue-500 mt-2 font-medium">{education.degree} | GPA {education.gpa}</p>
            <p className="text-gray-500 text-sm mt-1">{education.period}</p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {education.achievements.map((achievement, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full text-sm text-blue-600 font-medium">
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;