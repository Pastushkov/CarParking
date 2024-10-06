import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Boundary } from '../components/Boundary/Boundary';

interface AdminCtx {
  setBoundary: (message: string | undefined, type?: 'error' | 'success') => void;
}

interface Props {
  children: React.ReactNode;
}

const AdminContex = createContext<AdminCtx | null>(null);

export const AdminProvider = ({ children }: Props) => {
  const [boundary, setBoundary] = useState<{ message: string | undefined; type?: 'error' | 'success' }>({
    message: undefined,
  });
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (boundary.message) {
      timeoutId.current = setTimeout(() => setBoundary({ message: undefined }), 5000);
    }
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [boundary.message]);

  return (
    <AdminContex.Provider
      value={{
        setBoundary: (message, type) => {
          setBoundary({
            message,
            type,
          });
        },
      }}
    >
      {boundary?.message && (
        <Boundary close={() => setBoundary({ message: undefined })} message={boundary.message} type={boundary.type} />
      )}
      {children}
    </AdminContex.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContex);
  if (!context) {
    throw new Error('error related to context');
  }
  return context;
};
