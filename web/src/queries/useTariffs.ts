import { useQuery } from '@tanstack/react-query';
import { TariffService } from '../services/tariffService';
import { Tariff } from '../types';

export function useTariffs() {
  const queryResult = useQuery<Tariff[]>({
    refetchOnWindowFocus: false,
    initialData: [],
    queryKey: ['tariffs'],
    queryFn: () => TariffService.fetchTariffs(),
  });

  return { ...queryResult };
}
