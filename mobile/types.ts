export interface ParkingSpots {
  _id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
}

export interface Client {
  id: string;
  balance: number;
  name: string;
  phone: string;
}

export interface Car {
  _id?: string;
  plate: string;
  name: string;
}
