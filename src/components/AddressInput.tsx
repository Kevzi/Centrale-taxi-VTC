import React, { useState, useEffect, useCallback } from 'react';
import { useAddressSearch } from '../hooks/useAddressSearch';
import SearchInput from './search/SearchInput';
import SearchResults from './search/SearchResults';
import { Location } from '../types/search';

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: string, location: Location) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({
  label,
  value,
  onChange,
  onSelect,
}) => {
  const [showResults, setShowResults] = useState(false);
  const { isLoading, error, results, search, cleanup } = useAddressSearch();

  const handleSearch = useCallback((query: string) => {
    onChange(query);
    search(query);
  }, [onChange, search]);

  const handleSelect = useCallback((address: string, location: Location) => {
    onSelect(address, location);
    setShowResults(false);
    cleanup();
  }, [onSelect, cleanup]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.address-input-container')) {
        setShowResults(false);
        cleanup();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      cleanup();
    };
  }, [cleanup]);

  return (
    <div className="relative address-input-container">
      <SearchInput
        value={value}
        onChange={handleSearch}
        onFocus={() => setShowResults(true)}
        label={label}
        isLoading={isLoading}
      />
      
      <SearchResults
        isVisible={showResults}
        results={results}
        error={error}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default AddressInput;