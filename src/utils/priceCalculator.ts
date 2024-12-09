const PRICE_PER_KM = 2.25;
const PRICE_PER_MINUTE = 0.35;
const MINIMUM_FARE = 35;

export const calculatePrice = (distanceInMeters: number, durationInSeconds: number): number => {
  const distanceInKm = distanceInMeters / 1000;
  const durationInMinutes = Math.ceil(durationInSeconds / 60);

  const distancePrice = distanceInKm * PRICE_PER_KM;
  const timePrice = durationInMinutes * PRICE_PER_MINUTE;
  
  const totalPrice = Math.ceil(distancePrice + timePrice);
  
  return Math.max(totalPrice, MINIMUM_FARE);
};