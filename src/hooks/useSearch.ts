import { useState, useCallback, useRef } from 'react';
import { Location } from '../types/search';
import { searchAddress } from '../services/searchService';

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Location[]>([]);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const currentQuery = useRef<string>('');

  const search = useCallback(async (query: string) => {
    // Clear previous timeout if it exists
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Reset states for new search
    const trimmedQuery = query.trim();
    currentQuery.current = trimmedQuery;

    if (trimmedQuery.length < 3) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Debounce the search
    searchTimeout.current = setTimeout(async () => {
      try {
        // Only proceed if this is still the current query
        if (currentQuery.current === trimmedQuery) {
          const searchResults = await searchAddress(trimmedQuery);
          
          if (currentQuery.current === trimmedQuery) {
            setResults(searchResults);
            if (searchResults.length === 0) {
              setError('Aucune adresse trouvée');
            }
          }
        }
      } catch (err) {
        if (currentQuery.current === trimmedQuery) {
          const errorMessage = err instanceof Error ? err.message : 'Erreur de recherche';
          setError(errorMessage);
          setResults([]);
        }
      } finally {
        if (currentQuery.current === trimmedQuery) {
          setIsLoading(false);
        }
      }
    }, 300);
  }, []);

  return {
    isLoading,
    error,
    results,
    search
  };
};