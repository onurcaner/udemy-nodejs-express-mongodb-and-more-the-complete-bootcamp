export interface Location {
  description: string;
  type: string;
  coordinates: [number, number];
  address?: string;
  day?: number;
}

export interface Tour {
  startLocation: Location;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  guides: string[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
}
