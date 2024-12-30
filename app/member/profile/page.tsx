import { notFound, redirect } from 'next/navigation';

import { ISession, getSession, deleteSession } from '@/lib/session';
import db from '@/lib/db';

import { Button } from '@/components/forms';

const getUser = async () => {
  const { id }: ISession = await getSession();

  switch (!!id) {
    case true:
      const user = await db.user.findUnique({
        where: {
          id
        }
      });

      switch (!!user) {
        case true:
          return user;

        default:
          notFound();
      }

    default:
      notFound();
  }
};

const logout = async () => {
  'use server';

  deleteSession();

  redirect('/');
};

export default async function Profile() {
  const user = await getUser();

  return (
    <div className='flex flex-col gap-4 w-full'>
      <h1 className='text-2xl'>Profile</h1>

      <p className='break-words break-all'>{JSON.stringify(user)}</p>

      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
}
