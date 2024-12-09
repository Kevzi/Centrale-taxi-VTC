import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { BookingFormData } from './types';

interface BookingFormFieldsProps {
  register: UseFormRegister<BookingFormData>;
}

const BookingFormFields = ({ register }: BookingFormFieldsProps) => {
  return (
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

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-200">Téléphone</label>
        <input
          {...register('phone', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 bg-white/10 text-white"
        />
      </div>
    </div>
  );
};

export default BookingFormFields;