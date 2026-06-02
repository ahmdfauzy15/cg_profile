import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = ({ personal }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { value: personal.gpa, label: 'GPA', icon: '🎓', color: 'from-blue-400 to-cyan-400' },
    { value: '17K+', label: 'Records Processed', icon: '📊', color: 'from-cyan-400 to-teal-400' },
    { value: '2x', label: 'BUMN Scholar', icon: '🏆', color: 'from-indigo-400 to-blue-400' },
    { value: 'Top 5%', label: 'RevoU Project', icon: '⭐', color: 'from-amber-400 to-orange-400' },
  ];

  return (
    <section id="about" className="py-28 px-6 max-w-6xl mx-auto relative" ref={ref}>
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-blue-600 text-sm font-medium">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Get to Know Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="glass-card p-8 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Who Am I?</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {personal.about}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-blue-500">🏛</span>
                <span>{personal.university}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-blue-500">📘</span>
                <span>{personal.major}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`glass-card p-6 text-center hover-lift cursor-pointer group animate-fade-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;