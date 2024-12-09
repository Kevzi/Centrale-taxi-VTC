import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import AddressInput from './AddressInput';
import PriceEstimate from './PriceEstimate';
import PaymentModal from './PaymentModal';
import Map from './Map';
import { useMapLocation } from '../hooks/useMapLocation';
import { calculatePrice } from '../utils/priceCalculator';

interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const BookingForm = () => {
  const { register, handleSubmit, watch } = useForm<BookingFormData>();
  const [date, setDate] = useState(new Date());
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { t } = useTranslation();
  const { calculateDistance } = useMapLocation();

  const formData = watch();

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

  const handleLocationSelect = async (
    type: 'pickup' | 'destination',
    address: string,
    location: Location
  ) => {
    if (type === 'pickup') {
      setPickup(address);
      setPickupLocation(location);
      if (destinationLocation) {
        await updatePriceEstimate();
      }
    } else {
      setDestination(address);
      setDestinationLocation(location);
      if (pickupLocation) {
        await updatePriceEstimate();
      }
    }
  };

  const onSubmit = (data: BookingFormData) => {
    if (price >= 35) {
      setShowPaymentModal(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('booking.title')}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('booking.firstName')}
                  </label>
                  <input
                    {...register('firstName', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('booking.lastName')}
                  </label>
                  <input
                    {...register('lastName', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('booking.phone')}
                </label>
                <input
                  {...register('phone', { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-4">
                <AddressInput
                  label={t('booking.pickup')}
                  value={pickup}
                  onChange={setPickup}
                  onSelect={(address, location) => handleLocationSelect('pickup', address, location)}
                />

                <AddressInput
                  label={t('booking.destination')}
                  value={destination}
                  onChange={setDestination}
                  onSelect={(address, location) => handleLocationSelect('destination', address, location)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <DatePicker
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
                disabled={price < 35}
              >
                {t('booking.submit')}
              </motion.button>
            </form>
          </div>

          <div className="h-[600px]">
            <Map 
              pickup={pickupLocation} 
              destination={destinationLocation}
            />
          </div>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={price}
        bookingData={{
          ...formData,
          pickup,
          destination,
          date,
          distance,
          duration
        }}
      />
    </>
  );
};

export default BookingForm;