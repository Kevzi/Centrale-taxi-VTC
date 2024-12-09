import React from 'react';
import { motion } from 'framer-motion';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 pointer-events-none">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrevious}
        className="p-3 bg-black/30 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-black/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="p-3 bg-black/30 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-black/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </motion.button>
    </div>
  );
};