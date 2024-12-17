'use client';

import { useFormStatus } from 'react-dom';

interface IButtonProps {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  children: any;
}

export default function Button({
  type = 'submit',
  disabled = false,
  children
}: IButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className='primary-button'
      type={type}
      disabled={disabled || pending}
    >
      {children}
    </button>
  );
}
