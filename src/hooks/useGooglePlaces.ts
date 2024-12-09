import { useEffect, useRef, useState } from 'react';

interface Place {
  address: string;
  placeId: string;
}

export const useGooglePlaces = () => {
  const [predictions, setPredictions] = useState<Place[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const distanceMatrixService = useRef<google.maps.DistanceMatrixService | null>(null);

  useEffect(() => {
    if (window.google && !autocompleteService.current) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      distanceMatrixService.current = new google.maps.DistanceMatrixService();
    }
  }, []);

  const getAddressPredictions = async (input: string) => {
    if (!input || !autocompleteService.current) return;

    try {
      const response = await autocompleteService.current.getPlacePredictions({
        input,
        componentRestrictions: { country: 'FR' }, // Restrict to France
        types: ['address']
      });

      setPredictions(
        response.predictions.map(prediction => ({
          address: prediction.description,
          placeId: prediction.place_id
        }))
      );
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
  };

  const calculateDistance = async (origin: string, destination: string): Promise<number> => {
    if (!distanceMatrixService.current) return 0;

    try {
      const response = await distanceMatrixService.current.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      });

      const distance = response.rows[0].elements[0].distance.value;
      return distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 0;
    }
  };

  return {
    predictions,
    getAddressPredictions,
    calculateDistance
  };
};