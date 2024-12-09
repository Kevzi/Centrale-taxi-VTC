import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, Clock, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const benefits = [
  {
    icon: Car,
    title: 'benefits.premiumFleet.title',
    description: 'benefits.premiumFleet.description',
  },
  {
    icon: Shield,
    title: 'benefits.safe.title',
    description: 'benefits.safe.description',
  },
  {
    icon: Clock,
    title: 'benefits.service247.title',
    description: 'benefits.service247.description',
  },
  {
    icon: CreditCard,
    title: 'benefits.payment.title',
    description: 'benefits.payment.description',
  },
];

const HeroBenefits = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition-colors"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
          >
            <benefit.icon className="w-12 h-12 mb-4 text-blue-400" />
          </motion.div>
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3 }}
          >
            {t(benefit.title)}
          </motion.h3>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.4 }}
          >
            {t(benefit.description)}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroBenefits;