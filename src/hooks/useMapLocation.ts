import { useState } from 'react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface ErrorResponse {
  message: string;
  code?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const BASE_URL = 'https://nominatim.openstreetmap.org';

export const useMapLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleError = (error: unknown): ErrorResponse => {
    if (error instanceof Error) {
      return { message: error.message };
    }
    if (typeof error === 'string') {
      return { message: error };
    }
    return { message: 'Une erreur inattendue est survenue' };
  };

  const fetchWithRetry = async (
    url: string, 
    options: RequestInit, 
    retries = MAX_RETRIES
  ): Promise<Response> => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (retries > 0) {
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  const searchAddress = async (query: string): Promise<Location[]> => {
    if (query.length < 3) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchWithRetry(
        `${BASE_URL}/search?` + new URLSearchParams({
          format: 'json',
          q: `${query}, France`,
          countrycodes: 'fr',
          limit: '5',
          addressdetails: '1'
        }),
        {
          headers: {
            'Accept-Language': 'fr',
            'User-Agent': 'CentraleTaxiVTC/1.0'
          }
        }
      );
      
      const data: SearchResult[] = await response.json();
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Format de réponse invalide');
      }

      if (data.length === 0) {
        setError('Aucune adresse trouvée');
        return [];
      }

      return data.map((item) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
      }));
    } catch (error) {
      const errorResponse = handleError(error);
      setError(errorResponse.message);
      console.error('Error searching address:', errorResponse);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = async (origin: Location, destination: Location) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithRetry(
        `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`,
        {
          headers: {
            'User-Agent': 'CentraleTaxiVTC/1.0'
          }
        }
      );

      const data = await response.json();
      
      if (!data.routes?.[0]) {
        throw new Error('Impossible de calculer l\'itinéraire');
      }

      return {
        distance: data.routes[0].distance,
        duration: data.routes[0].duration
      };
    } catch (error) {
      const errorResponse = handleError(error);
      setError(errorResponse.message);
      console.error('Error calculating route:', errorResponse);
      return { distance: 0, duration: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchAddress,
    calculateDistance,
    isLoading,
    error
  };
};