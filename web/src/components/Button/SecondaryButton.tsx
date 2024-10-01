import React from 'react';
import { cn } from '../../services/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blue?: boolean;
  icon?: string;
  active?: boolean;
}

export function SecondaryButton({ children, blue = false, icon, active, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'flex h-9 items-center gap-2 truncate rounded-lg px-3.5 py-2 text-sm font-semibold duration-150 focus-within:shadow-focus focus:shadow-lightblue-10 focus:outline-none',
        {
          'bg-lightblue-10 text-lightblue-120 hover:bg-lightblue-20 disabled:bg-lightblue-5 disabled:text-darkblue-25':
            blue,
        },
        {
          'border border-neutral-25 bg-white hover:bg-neutral-6 active:bg-neutral-12': !blue && !active,
        },
        {
          'border border-neutral-25 bg-neutral-12': !blue && active,
        },
        className,
      )}
    >
      {icon && <img draggable={false} width={20} height={20} src={icon} alt="" />}
      {children}
    </button>
  );
}
