import React from 'react';

const FloatingElements = () => {
  const elements = [
    { icon: '🌸', size: 'w-12 h-12', left: '5%', top: '10%', delay: '0s', duration: '6s' },
    { icon: '✨', size: 'w-8 h-8', left: '85%', top: '15%', delay: '1s', duration: '8s' },
    { icon: '💕', size: 'w-10 h-10', left: '10%', top: '70%', delay: '2s', duration: '7s' },
    { icon: '⭐', size: 'w-6 h-6', left: '90%', top: '80%', delay: '0.5s', duration: '5s' },
    { icon: '🌷', size: 'w-14 h-14', left: '15%', top: '40%', delay: '1.5s', duration: '9s' },
    { icon: '🦋', size: 'w-10 h-10', left: '80%', top: '45%', delay: '2.5s', duration: '7.5s' },
    { icon: '💖', size: 'w-8 h-8', left: '50%', top: '85%', delay: '0.8s', duration: '6.5s' },
    { icon: '🌟', size: 'w-6 h-6', left: '70%', top: '20%', delay: '1.8s', duration: '5.5s' },
    { icon: '🌺', size: 'w-12 h-12', left: '3%', top: '55%', delay: '3s', duration: '10s' },
    { icon: '🪷', size: 'w-9 h-9', left: '88%', top: '65%', delay: '2.2s', duration: '8.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, idx) => (
        <div
          key={idx}
          className={`absolute ${el.size} animate-float opacity-30`}
          style={{
            left: el.left,
            top: el.top,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          <span className="text-2xl">{el.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;