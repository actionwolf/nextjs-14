'use client';

import { useFormState } from 'react-dom';
import { createLogin } from './actions';
import Link from 'next/link';

import { RocketLaunchIcon } from '@heroicons/react/24/solid';

import Input from '@/components/forms/input';
import Button from '@/components/forms/button';

export default function Login() {
  const [state, dispatch] = useFormState(createLogin, null);

  return (
    <div className='flex flex-col gap-4 w-full items-center justify-center'>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-9xl font-extrabold'>Login</h1>

        <h2 className='text-2xl'>Fill in the form below to login!!</h2>
      </div>

      <form className='flex flex-col gap-4 w-full' action={dispatch}>
        <Input
          name={'email'}
          type={'email'}
          placeholder={'Insert Email'}
          errors={state?.errors || []}
        />

        <Input
          name={'password'}
          type={'password'}
          placeholder={'Insert Password'}
          errors={state?.errors || []}
        />

        <Button type='submit'>
          <span>
            <RocketLaunchIcon className='w-6 h-6' />
          </span>

          <span>Login Account</span>
        </Button>
      </form>
    </div>
  );
}
