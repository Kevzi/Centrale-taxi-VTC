import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Animation périodique
    const animate = async () => {
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 1 }
      });
      setTimeout(animate, 5000); // Répéter toutes les 5 secondes
    };
    animate();
  }, [controls]);

  return (
    <>
      <motion.button
        animate={controls}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-24 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-28 right-8 z-50 bg-white rounded-lg shadow-xl p-6 w-80"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chat en direct</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">
              Notre équipe est disponible 24/7 pour répondre à vos questions.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Votre message..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Envoyer
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatButton;