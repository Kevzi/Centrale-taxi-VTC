import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const controls = useAnimation();
  const textControls = useAnimation();
  const phoneNumber = '+33637990807';

  useEffect(() => {
    const animate = async () => {
      // Animate button
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 1 },
      });

      // Show and hide text
      await textControls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await textControls.start({
        opacity: 0,
        x: 20,
        transition: { duration: 0.3 },
      });

      setTimeout(animate, 5000);
    };
    animate();
  }, [controls, textControls]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={textControls}
        className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg mr-4 whitespace-nowrap"
      >
        Je suis disponible 24/7
      </motion.div>

      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
