import { api } from './api';

export namespace ParkingService {
  export const fetchParkings = async () => {
    const { data } = await api.get('/parking');
    return data.payload;
  };
}
