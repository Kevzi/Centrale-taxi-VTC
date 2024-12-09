import React, { useCallback } from 'react';
import { MapPin } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  label: string;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  label,
  isLoading
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="relative flex items-center space-x-2">
      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={label}
        className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        autoComplete="off"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchInput);