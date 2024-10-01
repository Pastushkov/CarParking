import { Outlet, Router } from '@tanstack/react-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiInterceptor } from './ApiInterceptor';
import { location, routes } from './routes';

export const queryClient = new QueryClient();

export const tabs = [
  { name: 'Parkings', path: 'parkings' },
  { name: 'Tariffs', path: 'tariffs' },
  { name: 'Admins', path: 'admins' },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-darkblue-5 font-body text-base text-neutral-100 antialiased">
        <Router location={location} routes={routes}>
          <Outlet />
          <ApiInterceptor />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
