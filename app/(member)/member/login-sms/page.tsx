'use client';

import { useFormState } from 'react-dom';

import { IActionState, loginSMS } from './actions';

import { Input, Button } from '@/components/forms';

const initialState: IActionState = {
  isToken: false,
  errors: undefined
};

export default function LoginSMS() {
  const [state, dispatch] = useFormState(loginSMS, initialState);

  return (
    <div className='flex flex-col gap-4 w-full items-center justify-start'>
      <div className='text-center'>
        <h1 className='py-6 italic text-6xl font-extrabold'>Login (@SMS)</h1>
      </div>

      <form className='flex flex-col gap-4 w-full' action={dispatch}>
        {!state.isToken ? (
          <Input
            key={'phone'}
            name={'phone'}
            type={'number'}
            placeholder={'Insert phone number.'}
            required
            errors={state?.errors}
          />
        ) : (
          <Input
            key={'token'}
            name={'token'}
            type={'number'}
            placeholder={'Insert verify code.'}
            min={100000}
            max={999999}
            errors={state?.errors}
          />
        )}

        <Button>
          {!state.isToken ? 'Send Verification SMS' : 'Verify Code'}
        </Button>
      </form>
    </div>
  );
}
