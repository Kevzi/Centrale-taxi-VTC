import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookingFormSteps from './BookingFormSteps';
import BookingMap from './BookingMap';
import PaymentModal from '../PaymentModal';
import { fadeInUp } from '../../styles/animations';

const BookingForm = () => {
  const [showMap, setShowMap] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [price, setPrice] = useState(0);

  const handleBookingComplete = (data, calculatedPrice) => {
    setBookingData(data);
    setPrice(calculatedPrice);
    setShowMap(false);
    setShowPaymentModal(true);
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setShowMap(true);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Réserver votre trajet</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingFormSteps onBookingComplete={handleBookingComplete} />
        
        {showMap && (
          <div className="lg:block">
            <BookingMap />
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentModalClose}
        amount={price}
        bookingData={bookingData}
      />
    </motion.div>
  );
};

export default BookingForm;