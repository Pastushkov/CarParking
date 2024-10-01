import { MakeGenerics, Navigate, ReactLocation, Route } from '@tanstack/react-location';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Parkings } from './pages/Parkings/Parkings';
import { AuthenticationState } from './services/authService';

export type LocationGenerics = MakeGenerics<{
  RouteMeta: {
    name?: string;
  };
  Search: {
    code?: string;
  };
  LoaderData: {
    auth: AuthenticationState;
  };
  Params: {
    projectId: string;
    scenarioId: string;
  };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
  {
    id: 'redirect-to-login',
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'parkings',
    element: <Parkings />,
  },
];
