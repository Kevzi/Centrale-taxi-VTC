import React from 'react';
import { motion } from 'framer-motion';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number, direction: number) => void;
}

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ 
  total, 
  current, 
  onChange 
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={`indicator-${index}`}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
            index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
          }`}
          onClick={() => onChange(index, index > current ? 1 : -1)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  );
};