import { redirect } from 'next/navigation';

export const GET = async () => {
  const url: string = `https://github.com/login/oauth/authorize?${new URLSearchParams(
    {
      client_id: process.env.GITHUB_CLIENT_ID!,
      scope: 'read:user,user:email',
      allow_signup: 'false'
    }
  ).toString()}`;

  return redirect(url);
};
