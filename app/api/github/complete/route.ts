import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

import db from '@/lib/db';
import { updateSession } from '@/lib/session';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    notFound();
  } else {
    const response_access_token = await fetch(
      `https://github.com/login/oauth/access_token?${new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code
      }).toString()}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const { error, access_token }: any = await response_access_token.json();

    if (!!error) {
      return new Response(null, { status: 400 });
    }

    const response_profile = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cache: 'no-cache'
    });

    const { id, email, avatar_url, login } = await response_profile.json();

    const user = await db.user.findUnique({
      where: {
        github_id: `${id}`
      },
      select: {
        id: true
      }
    });

    if (!!user) {
      await updateSession(user.id);

      return redirect('/member/profile');
    } else {
      const user = await db.user.create({
        data: {
          user_name: login,
          email,
          github_id: `${id}`,
          avatar: avatar_url
        },
        select: {
          id: true
        }
      });

      await updateSession(user.id);

      return redirect('/member/profile');
    }
  }
};
