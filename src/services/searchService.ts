import { Location } from '../types/search';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REQUEST_TIMEOUT = 8000;

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

interface CacheEntry {
  data: Location[];
  timestamp: number;
}

const searchCache = new Map<string, CacheEntry>();

const fetchWithTimeout = async (url: string): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'fr',
        'User-Agent': 'VTC-Booking-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const searchAddress = async (query: string): Promise<Location[]> => {
  const normalizedQuery = query.trim();
  
  if (normalizedQuery.length < 3) {
    return [];
  }

  // Check cache
  const cached = searchCache.get(normalizedQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = new URL(NOMINATIM_URL);
    url.searchParams.append('q', `${normalizedQuery}, France`);
    url.searchParams.append('format', 'json');
    url.searchParams.append('countrycodes', 'fr');
    url.searchParams.append('limit', '5');
    url.searchParams.append('addressdetails', '1');

    const response = await fetchWithTimeout(url.toString());
    const data: NominatimResponse[] = await response.json();

    const results = data.map(item => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      address: item.display_name
    }));

    // Cache results
    searchCache.set(normalizedQuery, {
      data: results,
      timestamp: Date.now()
    });

    return results;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La recherche a pris trop de temps');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Problème de connexion au service');
      }
    }
    throw new Error('Erreur lors de la recherche d\'adresse');
  }
};