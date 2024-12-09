import React from 'react';
import { motion } from 'framer-motion';

const FleetHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4">Notre Flotte Éco-Responsable</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Une sélection de véhicules hybrides Toyota, alliant confort, fiabilité 
        et respect de l'environnement pour tous vos déplacements
      </p>
    </motion.div>
  );
};

export default FleetHeader;