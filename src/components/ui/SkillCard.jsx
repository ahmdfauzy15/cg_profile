import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, BarChart3, Smartphone, Palette, Wrench, Shield, Link, Brain } from 'lucide-react';

const iconMap = {
  Code: Code,
  Server: Server,
  Database: Database,
  Cloud: Cloud,
  BarChart3: BarChart3,
  Smartphone: Smartphone,
  Palette: Palette,
  Wrench: Wrench,
  Shield: Shield,
  Link: Link,
  Brain: Brain
};

const SkillCard = ({ title, skills, gradient, iconName, delay = 0 }) => {
  const IconComponent = iconMap[iconName] || Code;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-500"
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-15 rounded-2xl transition-opacity duration-500 blur-xl`} />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
      
      <div className="relative">
        <motion.div 
          className={`w-14 h-14 rounded-xl ${gradient} bg-opacity-20 flex items-center justify-center mb-4`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.02 * idx }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;