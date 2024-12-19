'use client';

import { useFormState } from 'react-dom';
import { login } from './actions';

import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Input, Button } from '@/components/forms';
import Link from 'next/link';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className='flex flex-col gap-4 w-full items-center justify-center'>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='py-5 italic text-6xl font-extrabold'>Login</h1>
      </div>

      <form className='flex flex-col gap-4 w-full' action={dispatch}>
        <Input
          name={'email'}
          type={'email'}
          placeholder={'Insert Email'}
          errors={state?.errors?.email}
        />

        <Input
          name={'password'}
          type={'password'}
          placeholder={'Insert Password'}
          errors={state?.errors?.password}
        />

        <Button>Login</Button>
      </form>

      <div className='w-full h-[1px] bg-neutral-400' />

      <div className='w-full'>
        <Link className='primary-button' href='/member/join'>
          <span>
            <RocketLaunchIcon className='w-6 h-6' />
          </span>

          <span>Create Account</span>
        </Link>
      </div>
    </div>
  );
}
