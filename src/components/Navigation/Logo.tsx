import React from 'react';
import { Car } from 'lucide-react'; // On utilise Car au lieu de Taxi qui n'est pas disponible
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2"
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Car className="w-8 h-8 text-yellow-400" />
      </motion.div>
      <div className="flex flex-col">
        <motion.span 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-xl font-bold text-white"
        >
          Centrale Taxi VTC
        </motion.span>
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-400"
        >
          Transport professionnel 24/7
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Logo;