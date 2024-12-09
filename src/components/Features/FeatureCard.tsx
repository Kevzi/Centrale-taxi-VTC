import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
}

const FeatureCard = ({ icon: Icon, title, description, imageUrl }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-80 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-6 flex flex-col justify-end">
        <Icon className="w-8 h-8 mb-4 text-blue-400" />
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;