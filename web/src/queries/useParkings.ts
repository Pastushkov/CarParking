import { useQuery } from '@tanstack/react-query';
import { ParkingService } from '../services/parkingService';
import { Parking } from '../types';

export function useParkings() {
  const queryResult = useQuery<Parking[]>({
    refetchOnWindowFocus: false,
    initialData: [],
    queryKey: ['parkings'],
    queryFn: () => ParkingService.fetchParkings(),
  });

  return { ...queryResult };
}
