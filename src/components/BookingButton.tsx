import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BookingButton = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToBooking}
      className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center space-x-2 mx-auto hover:bg-blue-700 transition-colors"
    >
      <span>Book Your Ride</span>
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
};

export default BookingButton;