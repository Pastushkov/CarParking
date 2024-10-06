import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../routes';

export const useRouteParams = (): { id: string } => {
  const match = useMatch<LocationGenerics>();
  return match.params;
};
