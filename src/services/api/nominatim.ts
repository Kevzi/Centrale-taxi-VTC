const BASE_URL = 'https://nominatim.openstreetmap.org';
const TIMEOUT = 10000; // 10 seconds

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export const searchNominatim = async (query: string): Promise<NominatimResponse[]> => {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set('q', `${query}, France`);
  url.searchParams.set('format', 'json');
  url.searchParams.set('countrycodes', 'fr');
  url.searchParams.set('limit', '5');
  url.searchParams.set('addressdetails', '1');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'fr',
        'User-Agent': 'VTC-Booking/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
};