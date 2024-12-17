'use client';

import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import Link from 'next/link';

import {
  RocketLaunchIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/solid';

import Input from '@/components/forms/input';
import Button from '@/components/forms/button';

export default function Join() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-4 w-full items-center justify-center'>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-9xl font-extrabold'>Join</h1>

        <h2 className='text-2xl'>Fill in the form below to join!!</h2>
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

          <span> Create Account</span>
        </Button>
      </form>

      <div className='w-full'>
        <Link className='primary-button' href='/member/login'>
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6' />
          </span>

          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
