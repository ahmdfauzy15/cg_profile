import React from 'react';
import { useInView } from 'react-intersection-observer';

const Experience = ({ experiences }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const getIconColor = (title) => {
    if (title.includes('Research')) return 'from-blue-400 to-cyan-400';
    if (title.includes('Intern')) return 'from-indigo-400 to-blue-400';
    if (title.includes('Capstone')) return 'from-cyan-400 to-teal-400';
    return 'from-blue-400 to-indigo-400';
  };

  return (
    <section id="experience" className="py-28 px-6 max-w-5xl mx-auto relative" ref={ref}>
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-4">
            <span className="text-cyan-600 text-sm font-medium">Work & Research</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-secondary">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 border-l-4 border-l-blue-400 hover:border-l-cyan-400 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getIconColor(exp.title)} flex items-center justify-center text-white text-xl font-bold`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-500 mt-1 font-medium">{exp.place}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                  {exp.date}
                </span>
              </div>
              
              <ul className="space-y-2 ml-4">
                {exp.desc.map((item, i) => (
                  <li key={i} className="text-gray-600 text-sm leading-relaxed flex gap-2">
                    <span className="text-blue-400 mt-1">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              {exp.projectLink && (
                <div className="mt-5 flex justify-end">
                  <a
                    href={exp.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-sm font-medium text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>View Detail
                      
                    </span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;