import clsx from 'clsx';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blue?: boolean;
  icon?: string;
  active?: boolean;
}

export function SecondaryModalButton({ children, blue = false, icon, active, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'flex h-11 w-full items-center justify-center gap-2 rounded-lg text-base font-semibold duration-150 focus-within:shadow-focus focus:shadow-neutral-25 focus:outline-none',
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
