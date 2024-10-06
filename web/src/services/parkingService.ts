import { Parking } from '../types';
import { api } from './api';

export namespace ParkingService {
  export const fetchParkings = async () => {
    const { data } = await api.get('/parking');
    return data.payload;
  };
  export const createParking = async (body: Omit<Parking, '_id'>) => {
    const { data } = await api.post('/parking', body);
    return data.payload;
  };
  export const deleteParking = async (id: string) => {
    const { data } = await api.delete(`/parking/${id}`);
    return data.payload;
  };
  export const updateParking = async (id: string, body: Omit<Parking, '_id'>) => {
    const { data } = await api.patch(`/parking/${id}`, body);
    return data.payload;
  };
  export const fetchParkingById = async (id: string): Promise<Parking> => {
    const { data } = await api.get(`/parking/${id}`);
    return data.payload;
  };
}
