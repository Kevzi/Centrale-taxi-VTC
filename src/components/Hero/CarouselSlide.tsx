import React from 'react';
import { motion } from 'framer-motion';
import { CarouselSlideProps } from './types';

const CarouselSlide: React.FC<CarouselSlideProps> = ({ 
  image, 
  index, 
  title, 
  description 
}) => {
  return (
    <>
      <img
        src={image}
        alt={`VTC Premium ${index + 1}`}
        className="w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-white"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-gray-200"
        >
          {description}
        </motion.p>
      </div>
    </>
  );
};

export default CarouselSlide;