import React from 'react';
import { useInView } from 'react-intersection-observer';

const Organization = ({ organizations }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const orgColors = ['from-blue-400 to-cyan-400', 'from-indigo-400 to-blue-400', 'from-cyan-400 to-teal-400'];

  return (
    <section id="organization" className="py-28 px-6 max-w-5xl mx-auto relative" ref={ref}>
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-4">
            <span className="text-teal-600 text-sm font-medium">Leadership</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Organization Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {organizations.map((org, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-6 group animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${orgColors[idx % orgColors.length]} flex items-center justify-center mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{org.role}</h3>
              <p className="text-blue-500 text-sm mt-1 font-medium">{org.organization}</p>
              <p className="text-gray-500 text-xs mt-1">{org.period}</p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{org.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organization;