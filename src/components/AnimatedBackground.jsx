import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-400/10 to-teal-400/10 blur-3xl animate-float-slow"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-amber-400/5 to-blue-400/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-400/8 to-indigo-400/8 blur-3xl animate-float-fast"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute top-[15%] left-[5%] w-16 h-16 border-2 border-blue-200/30 rounded-lg animate-rotate-slow"></div>
      <div className="absolute bottom-[20%] right-[8%] w-12 h-12 border-2 border-cyan-200/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-[60%] left-[10%] w-20 h-20 border-2 border-indigo-200/30 rotate-45 animate-float"></div>
      <div className="absolute top-[30%] right-[15%] w-10 h-10 border-2 border-teal-200/30 rounded-full animate-pulse-slow"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;