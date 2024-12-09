import { useState, useCallback, useRef, useEffect } from 'react';
import { Location } from '../types/search';
import { searchAddress } from '../services/addressSearch';

const DEBOUNCE_DELAY = 500; // Increased to 500ms for better performance

export const useAddressSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Location[]>([]);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const activeRequest = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (activeRequest.current) {
      activeRequest.current.abort();
      activeRequest.current = null;
    }
    setResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const search = useCallback(async (query: string) => {
    cleanup();

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) {
      return;
    }

    setIsLoading(true);
    setError(null);

    searchTimeout.current = setTimeout(async () => {
      try {
        const searchResults = await searchAddress(trimmedQuery);
        if (searchResults.length === 0) {
          setError('Aucune adresse trouvée');
        } else {
          setResults(searchResults);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur de recherche';
        setError(message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, [cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isLoading,
    error,
    results,
    search,
    cleanup
  };
};