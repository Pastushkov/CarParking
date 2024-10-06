import { Outlet, useLocation, useNavigate } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import logoutIcon from '../../assets/logout.svg';
import { clearUserData } from '../../services/authService';
import { cn } from '../../services/cn';

const tabs = [
  { name: 'Parkings', path: 'parkings' },
  { name: 'Tariffs', path: 'tariffs' },
  // { name: 'Admins', path: 'admins' },
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const location = useLocation();

  useEffect(() => {
    tabs.forEach(({ name, path }) => {
      if (location.current.pathname === `/panel/${path}`) {
        setSelectedTab(name);
      }
    });
  }, [location.current.pathname]);

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex justify-between px-6">
        <div className="scrollbar flex min-h-12 items-center justify-between gap-2 overflow-x-auto border-b border-darkblue-15">
          {tabs.map(({ name, path }) => (
            <div
              key={name}
              className={cn(
                'relative h-full cursor-pointer whitespace-nowrap p-3 text-sm font-semibold text-neutral-70 hover:bg-lightblue-20 hover:text-lightblue-100',
                { 'bg-lightblue-20 text-lightblue-100': selectedTab === name },
              )}
              onClick={() => {
                setSelectedTab(name);
                navigate({ to: path });
              }}
            >
              {name}
            </div>
          ))}
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 hover:underline"
          onClick={() => {
            clearUserData();
            navigate({ to: '/login', replace: true });
          }}
        >
          <div>Logout</div>
          <img src={logoutIcon} alt="logout" className="h-5 w-5" />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
