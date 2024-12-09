import { useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Hook personnalisé pour gérer le défilement et les animations
export const useScrollProgress = () => {
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest >= 0.99) {
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
    });
  }, [scrollYProgress]);

  const opacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 0.1], [0.8, 1]);
  
  return {
    progress: smoothProgress,
    opacity,
    scale,
    isComplete
  };
};

export default useScrollProgress;