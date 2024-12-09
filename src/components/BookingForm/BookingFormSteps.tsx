import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import AddressInput from '../AddressInput';
import DatePicker from 'react-datepicker';
import PriceEstimate from '../PriceEstimate';
import { useMapLocation } from '../../hooks/useMapLocation';
import { calculatePrice } from '../../utils/priceCalculator';
import { fadeInUp } from '../../styles/animations';

const BookingFormSteps = ({ onBookingComplete }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [date, setDate] = useState(new Date());
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  
  const { calculateDistance } = useMapLocation();

  const updatePriceEstimate = async () => {
    if (pickupLocation && destinationLocation) {
      const result = await calculateDistance(pickupLocation, destinationLocation);
      if (result.distance > 0) {
        setDistance(result.distance);
        setDuration(result.duration);
        const calculatedPrice = calculatePrice(result.distance, result.duration);
        setPrice(calculatedPrice);
      }
    }
  };

  const onSubmit = (data) => {
    if (price >= 35) {
      onBookingComplete({
        ...data,
        pickup,
        destination,
        date,
        distance,
        duration
      }, price);
    }
  };

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white/5 backdrop-blur-lg p-6 rounded-xl"
    >
      {/* Champs du formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-200">Prénom</label>
          <input
            {...register('firstName', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white/10 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200">Nom</label>
          <input
            {...register('lastName', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white/10 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Téléphone</label>
        <input
          {...register('phone', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 bg-white/10 text-white"
        />
      </div>

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
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Date et heure
        </label>
        <DatePicker
          selected={date}
          onChange={setDate}
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
    </motion.form>
  );
};

export default BookingFormSteps;