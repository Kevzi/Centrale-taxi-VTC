import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../styles/animations';

const Footer = () => {
  return (
    <motion.footer
      variants={staggerChildren}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      id="contact"
      className="relative z-10 bg-black/50 backdrop-blur-lg text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold mb-4">À propos de nous</h3>
            <p className="text-gray-400">
              Service de transport VTC premium offrant des solutions de mobilité professionnelles.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: contact@centrale-taxi-vtc.fr</p>
            <p className="text-gray-400">Téléphone: +33 6 12 34 56 78</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          variants={fadeInUp}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Centrale Taxi VTC. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;