import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from './HeroTitle';
import HeroImage from './HeroImage';
import HeroBenefits from './HeroBenefits';
import BookingButton from '../BookingButton';
import { staggerChildren } from '../../styles/animations';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <HeroTitle />
          <motion.div variants={staggerChildren}>
            <BookingButton />
          </motion.div>
        </motion.div>

        <HeroImage />
        <HeroBenefits />
      </div>
    </div>
  );
};

export default Hero;