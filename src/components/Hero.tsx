import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, Clock, CreditCard } from 'lucide-react';
import BookingButton from './BookingButton';

const Hero = () => {
  const benefits = [
    { icon: Car, text: 'Premium Vehicles' },
    { icon: Shield, text: 'Safe & Secure' },
    { icon: Clock, text: '24/7 Service' },
    { icon: CreditCard, text: 'Easy Payment' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6">Premium VTC Service</h1>
          <p className="text-xl text-gray-300 mb-8">Experience luxury and comfort in every ride</p>
          <BookingButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg"
            >
              <benefit.icon className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold">{benefit.text}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;