import React from 'react';
import { motion } from 'framer-motion';
import Map from '../Map';
import { fadeInUp } from '../../styles/animations';

const BookingMap = () => {
  return (
    <motion.div
      variants={fadeInUp}
      className="h-[600px] rounded-xl overflow-hidden shadow-xl"
    >
      <Map />
    </motion.div>
  );
};

export default BookingMap;