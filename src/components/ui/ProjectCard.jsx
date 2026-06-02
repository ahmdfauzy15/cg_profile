import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icons = {
    Brain: () => import('lucide-react').then(m => m.Brain),
    Shield: () => import('lucide-react').then(m => m.Shield),
    Zap: () => import('lucide-react').then(m => m.Zap),
    BarChart3: () => import('lucide-react').then(m => m.BarChart3),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Image/Icon Section */}
      <div className="relative h-48 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
          <div className="text-6xl font-bold text-white/20">AF</div>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a href={project.github} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <Github className="w-5 h-5 text-white" />
          </a>
          <a href={project.live} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <ExternalLink className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      <div className="relative p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="text-xs text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Read More Button */}
        <button className="text-indigo-400 text-sm font-medium flex items-center gap-1 group/btn hover:gap-2 transition-all">
          Read More
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Expandable Details (on click) */}
      <div className={`absolute inset-0 bg-gray-900/95 backdrop-blur-md p-6 transform transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="h-full overflow-y-auto">
          <h4 className="text-lg font-bold text-white mb-3">Project Details</h4>
          <p className="text-gray-300 text-sm mb-4">{project.longDescription}</p>
          <h5 className="text-sm font-semibold text-indigo-400 mb-2">Key Features:</h5>
          <ul className="space-y-1 mb-4">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                <ChevronRight className="w-3 h-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-4">
            <a href={project.github} className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">View Code →</a>
            <a href={project.live} className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">Live Demo →</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;