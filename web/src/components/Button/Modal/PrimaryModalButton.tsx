import React from 'react';
import loader from '../../../assets/icons/loader.svg';
import { cn } from '../../../services/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  danger?: boolean;
  loading?: boolean;
}

export function PrimaryModalButton({ children, icon, loading, className, danger = false, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-lightblue-110 text-base font-semibold text-white duration-100 hover:bg-lightblue-120 active:bg-lightblue-120',
        {
          'bg-red-110 duration-150 focus-within:shadow-focus hover:bg-red-120 focus:shadow-red-25 focus:outline-none active:bg-red-130':
            danger,
          'bg-red-40 text-white hover:bg-red-40': danger && (disabled || loading),
        },
        className,
      )}
    >
      {!icon && (
        <img
          className={cn('h-0 w-0 animate-spin-slow duration-150', {
            'h-5 w-5': loading,
          })}
          draggable={false}
          alt=""
          src={loader}
        />
      )}
      {icon && <div style={{ WebkitMask: `url(${icon})`, WebkitMaskSize: 'cover' }} className="h-5 w-5 bg-white" />}
      {children}
    </button>
  );
}
