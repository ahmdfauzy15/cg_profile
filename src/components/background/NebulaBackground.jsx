import React from 'react';
import { motion } from 'framer-motion';

export const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a2a] via-[#1a0a3a] to-[#0a0a2a]" />
      
      {/* Animated Nebula Clouds */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)',
          filter: 'blur(80px)'
        }}
      />
      
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0) 70%)',
          filter: 'blur(70px)'
        }}
      />
      
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 8 }}
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>
      
      {/* Milky Way Effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 30%, rgba(59,130,246,0.3) 50%, rgba(236,72,153,0.3) 70%, transparent 100%)',
          transform: 'rotate(25deg) scale(2)',
        }}
      />
    </div>
  );
};