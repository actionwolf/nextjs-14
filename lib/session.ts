import { cookies } from 'next/headers';
import { getIronSession, IronSession } from 'iron-session';

export interface ISession {
  id?: number;
}

export const getSession = (): Promise<IronSession<ISession>> =>
  getIronSession(cookies(), {
    cookieName: '_cps',
    password: process.env.SESSION_SECRET!
  });

export const updateSession = async (id: number) => {
  const session = await getSession();

  session.id = id;

  await session.save();
};

export const deleteSession = async () => {
  const session = await getSession();

  session.destroy();
};
