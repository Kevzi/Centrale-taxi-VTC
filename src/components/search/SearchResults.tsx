import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertCircle } from 'lucide-react';
import { Location } from '../../types/search';

interface SearchResultsProps {
  isVisible: boolean;
  results: Location[];
  error: string | null;
  onSelect: (address: string, location: Location) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isVisible,
  results,
  error,
  onSelect,
}) => {
  if (!isVisible || (!results.length && !error)) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-50 w-full mt-2 bg-white/10 backdrop-blur-lg rounded-md shadow-lg border border-gray-700 overflow-hidden"
      >
        {error ? (
          <div className="p-4 text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto">
            {results.map((result, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full flex items-start space-x-3 p-4 text-left hover:bg-white/5 transition-colors group"
                onClick={() => onSelect(result.address, result)}
              >
                <MapPin className="w-5 h-5 mt-1 text-gray-400 group-hover:text-blue-400 flex-shrink-0" />
                <span className="text-white group-hover:text-blue-400 transition-colors">
                  {result.address}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;