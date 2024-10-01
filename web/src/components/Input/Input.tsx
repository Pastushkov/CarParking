import clsx from 'clsx';
import React, { ForwardedRef } from 'react';
import './input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderIcon?: string;
}

export const Input = React.forwardRef(
  ({ placeholderIcon, className, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => (
    <div className="relative">
      <input
        ref={ref}
        {...props}
        className={clsx(
          'peer h-9 rounded-lg border border-neutral-25 px-3.5 py-1.5 placeholder-neutral-50 shadow-sm duration-150 focus-within:shadow-focus focus-within:shadow-lightblue-10 hover:border-lightblue-100 focus:border-lightblue-100 focus:outline-none placeholder:focus:pl-0 placeholder:focus:transition-[padding] placeholder:focus:ease-out',
          {
            'placeholder:pl-7': !!placeholderIcon,
          },
          className,
        )}
      />
      {placeholderIcon && (
        <img
          src={placeholderIcon}
          height={20}
          width={20}
          alt=""
          className="pointer-events-none absolute inset-y-2 left-3.5 hidden peer-placeholder-shown:inline-block peer-focus:hidden"
        />
      )}
    </div>
  ),
);
