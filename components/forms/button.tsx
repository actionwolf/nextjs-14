'use client';

import { forwardRef, ForwardedRef, ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

interface IButtonProps {
  children: any;
  [x: string]: any;
}

export default forwardRef(
  (
    {
      children,
      ...rest
    }: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { pending } = useFormStatus();

    return (
      <button
        className='primary-button'
        disabled={rest.disabled || pending}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
