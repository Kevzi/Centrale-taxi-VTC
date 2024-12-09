import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../styles/animations';

const HeroTitle = () => {
  return (
    <div className="text-center mb-12">
      <motion.h1 
        variants={fadeInUp}
        className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent"
      >
        Centrale Taxi VTC
      </motion.h1>
      <motion.p 
        variants={fadeInUp}
        className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
      >
        Votre partenaire de confiance pour tous vos déplacements
      </motion.p>
    </div>
  );
};

export default HeroTitle;