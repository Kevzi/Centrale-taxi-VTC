import { Location } from '../types/search';
import { searchNominatim } from './api/nominatim';
import { addressCache } from './cache/addressCache';

export const searchAddress = async (query: string): Promise<Location[]> => {
  if (!query || query.length < 3) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cachedResults = addressCache.get(normalizedQuery);
  if (cachedResults) {
    return cachedResults;
  }

  try {
    const data = await searchNominatim(normalizedQuery);
    
    const results = data.map(item => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      address: item.display_name
    }));

    // Cache the results
    addressCache.set(normalizedQuery, results);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La recherche a pris trop de temps, veuillez réessayer');
      }
      throw new Error('Erreur lors de la recherche d\'adresse');
    }
    throw error;
  }
};