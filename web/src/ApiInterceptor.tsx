import { useLocation, useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import { isAuthenticated } from './services/authService';

export const ApiInterceptor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    if (!isAuthenticated()) {
      navigate({ to: '/login', replace: true });
      return;
    }
    if (isAuthenticated()) {
      if (location.current.pathname === '/login') {
        navigate({ to: '/panel/parkings', replace: true });
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <></>;
};
