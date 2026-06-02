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
          {/* Bagian Kiri - Foto Profil */}
          <div className="glass-card p-8 hover-lift">
            {/* Foto Profil dengan animasi */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-indigo-400 p-[3px] animate-glow">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img 
                      src="/profile.png" 
                      alt={personal.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-4xl font-bold text-blue-400">CG</div>';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nama dan Info */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">{personal.name}</h3>
              <p className="text-blue-500 text-sm mt-1">Information Systems Graduate</p>
              <div className="flex justify-center gap-4 mt-3">
                <span className="text-xs text-gray-500">{personal.location}</span>
                <span className="text-xs text-gray-500">{personal.email}</span>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mt-4">
              <p className="text-gray-600 leading-relaxed text-center">
                {personal.about}
              </p>
            </div>
          </div>
          
          {/* Bagian Kanan - Stats */}
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