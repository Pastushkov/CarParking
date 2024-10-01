import React from 'react';
import loader from '../../assets/loader.svg';
import { cn } from '../../services/cn';

interface Props extends React.ComponentProps<'button'> {
  icon?: string;
  loading?: boolean;
}

export function PrimaryButton({ children, icon, loading, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'group flex h-9 select-none items-center gap-2 truncate rounded-lg bg-lightblue-100 px-3.5 py-2 text-sm font-semibold text-white duration-150 focus-within:shadow-focus hover:bg-lightblue-110 focus:shadow-lightblue-10 focus:outline-none active:bg-lightblue-120 disabled:pointer-events-none disabled:bg-lightblue-40 disabled:text-white',
        {
          'gap-2 bg-lightblue-40 text-white': loading,
        },
        className,
      )}
    >
      {!icon && (
        <img
          className={cn('invisible h-5 w-0 animate-spin-slow duration-150', {
            'visible w-5': loading,
          })}
          draggable={false}
          alt=""
          src={loader}
        />
      )}
      {icon && (
        <div
          style={{
            WebkitMaskImage: `url(${loading ? loader : icon})`,
            WebkitMaskSize: 'cover',
          }}
          className={cn('h-5 w-5 bg-white', {
            'animate-spin-slow': loading,
          })}
        ></div>
      )}
      {children}
    </button>
  );
}
