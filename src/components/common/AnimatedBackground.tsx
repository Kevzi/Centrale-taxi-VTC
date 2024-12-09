import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Cercles animés avec effet de flou */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[100px]"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-gradient-to-l from-indigo-500/20 to-blue-500/20 blur-[120px]"
      />
      
      {/* Effet de lumière dynamique */}
      <motion.div
        animate={{
          y: [0, 50, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-400/20 to-orange-500/20 rotate-45 blur-[80px]"
      />
    </div>
  );
};

export default AnimatedBackground;