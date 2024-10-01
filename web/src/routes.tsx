import { MakeGenerics, Navigate, ReactLocation, Route } from '@tanstack/react-location';
import { AdminLayout } from './components/Layout/AdminLayout';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Parkings } from './pages/Parkings/Parkings';
import { Tariffs } from './pages/Tariffs/Tariffs';
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
    path: '/panel',
    element: <AdminLayout />,
    children: [
      {
        path: '/parkings',
        element: <Parkings />,
      },
      {
        path: '/tariffs',
        element: <Tariffs />,
      },
    ],
  },
];
