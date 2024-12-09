export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  pickup: string;
  destination: string;
  date: Date;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}