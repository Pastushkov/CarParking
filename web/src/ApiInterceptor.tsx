import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import { isAuthenticated } from './services/authService';

export const ApiInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: '/parking', replace: true });
    }
  }, []);

  return <></>;
};
