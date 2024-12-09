import React from 'react';
import { motion } from 'framer-motion';
import { Route, Clock, Euro } from 'lucide-react';

interface PriceEstimateProps {
  price: number;
  distance: number;
  duration: number;
}

const PriceEstimate: React.FC<PriceEstimateProps> = ({ price, distance, duration }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
    }
    return `${minutes} minutes`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Détails du trajet</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Route className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-gray-600">Distance</p>
            <p className="text-lg font-semibold">
              {(distance / 1000).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-gray-600">Durée estimée</p>
            <p className="text-lg font-semibold">
              {formatDuration(duration)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Euro className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-gray-600">Prix total</p>
            <p className="text-2xl font-bold text-green-600">
              {price}€
            </p>
            {price === 35 && (
              <p className="text-sm text-gray-500">
                Tarif minimum appliqué
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceEstimate;