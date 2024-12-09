import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { luxuryCarImages } from '../../constants/carImages';
import { carouselSlides } from './data';
import { slideVariants, swipeConfidenceThreshold, swipePower } from './animations';
import { SwipeDirection } from './types';
import CarouselSlide from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';

const HeroImage = () => {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageIndex = Math.abs(page % luxuryCarImages.hero.length);

  const paginate = React.useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page, paginate]);

  const handleDragEnd = (_: Event, { offset, velocity }: SwipeDirection) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-2xl mx-auto max-w-4xl"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0"
        >
          <CarouselSlide
            image={luxuryCarImages.hero[imageIndex]}
            index={imageIndex}
            title={carouselSlides[imageIndex].title}
            description={carouselSlides[imageIndex].description}
          />
        </motion.div>
      </AnimatePresence>

      <CarouselControls
        onPrevious={() => paginate(-1)}
        onNext={() => paginate(1)}
      />

      <CarouselIndicators
        total={luxuryCarImages.hero.length}
        current={imageIndex}
        onChange={(index, direction) => setPage([index, direction])}
      />
    </motion.div>
  );
};

export default HeroImage;