import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BookingFormData, Location } from './types';
import BookingFormFields from './BookingFormFields';
import AddressInput from '../AddressInput';
import DatePicker from 'react-datepicker';
import PriceEstimate from '../PriceEstimate';
import PaymentModal from '../PaymentModal';
import Map from '../Map';
import { useMapLocation } from '../../hooks/useMapLocation';
import { calculatePrice } from '../../utils/priceCalculator';
import { fadeInUp } from '../../styles/animations';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const { register, handleSubmit } = useForm<BookingFormData>();
  const [date, setDate] = useState(new Date());
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { calculateDistance } = useMapLocation();

  const updatePriceEstimate = async () => {
    if (pickupLocation && destinationLocation) {
      const result = await calculateDistance(pickupLocation, destinationLocation);
      if (result.distance > 0) {
        setDistance(result.distance);
        setDuration(result.duration);
        setPrice(calculatePrice(result.distance, result.duration));
      }
    }
  };

  const onSubmit = (data: BookingFormData) => {
    if (price >= 35) {
      setShowPaymentModal(true);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Réserver votre trajet</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/5 backdrop-blur-lg p-6 rounded-xl">
          <BookingFormFields register={register} />
          
          <div className="space-y-4">
            <AddressInput
              label="Adresse de départ"
              value={pickup}
              onChange={setPickup}
              onSelect={(address, location) => {
                setPickupLocation(location);
                updatePriceEstimate();
              }}
            />

            <AddressInput
              label="Adresse d'arrivée"
              value={destination}
              onChange={setDestination}
              onSelect={(address, location) => {
                setDestinationLocation(location);
                updatePriceEstimate();
              }}
            />
          </div>

          <div>
            <DatePicker
              selected={date}
              onChange={(date: Date) => setDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full rounded-md border-gray-300 bg-white/10 text-white"
            />
          </div>

          {distance > 0 && (
            <PriceEstimate 
              price={price} 
              distance={distance} 
              duration={duration}
            />
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 px-6 rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all"
            disabled={price < 35}
          >
            Réserver maintenant
          </motion.button>
        </form>

        <div className="h-[600px]">
          <Map 
            pickup={pickupLocation} 
            destination={destinationLocation}
          />
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={price}
        bookingData={{
          firstName: '',
          lastName: '',
          phone: '',
          pickup,
          destination,
          date,
          distance,
          duration
        }}
      />
    </motion.div>
  );
};

export default BookingForm;