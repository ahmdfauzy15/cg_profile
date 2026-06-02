import React from 'react';
import { motion } from 'framer-motion';

const ToolSkillCard = ({ skill, index, gradient }) => {
  const IconComponent = skill.icon;
  const levelPercentage = skill.level;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
      
      <div className="relative flex items-center gap-3">
        {/* Icon with glowing effect */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}05)`,
            boxShadow: `0 0 20px ${skill.color}40`
          }}
        >
          {IconComponent && <IconComponent className="w-5 h-5" style={{ color: skill.color }} />}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white font-medium text-sm">{skill.name}</span>
            <span className="text-xs text-gray-400">{levelPercentage}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${levelPercentage}%` }}
              transition={{ duration: 1, delay: index * 0.05 }}
              className="h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                boxShadow: `0 0 5px ${skill.color}`
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolSkillCard;