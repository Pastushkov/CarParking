import { Tariff } from '../types';
import { api } from './api';

export namespace TariffService {
  export const fetchTariffs = async () => {
    const { data } = await api.get('/tariff');
    return data.payload;
  };
  export const createTariff = async (body: Tariff) => {
    const { data } = await api.post('/tariff', body);
    return data.payload;
  };
  export const deleteTariff = async (id: string) => {
    const { data } = await api.delete(`/tariff/${id}`);
    return data.payload;
  };
  export const updateTariff = async (id: string, body: Omit<Tariff, '_id'>) => {
    const { data } = await api.patch(`/tariff/${id}`, body);
    return data.payload;
  };
}
