'use client';

import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface IInputProps {
  name?: string;
  errors?: string[];
  [x: string]: any;
}

export default forwardRef(
  (
    {
      name,
      errors = [],
      ...rest
    }: IInputProps & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <div className='flex flex-col gap-2'>
        <input
          className='bg-transparent rounded-md w-full h-10 px-3 focus:outline-none ring-1 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
          name={name}
          {...rest}
        />

        {errors.map((error: string, index: number) => {
          return (
            <span
              key={`${name}-error-${index}`}
              className='text-xs text-red-500'
            >
              {error}
            </span>
          );
        })}
      </div>
    );
  }
);
