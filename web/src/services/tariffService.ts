import { api } from './api';

export namespace TariffService {
  export const fetchTariffs = async () => {
    const { data } = await api.get('/tariff');
    return data.payload;
  };
}
