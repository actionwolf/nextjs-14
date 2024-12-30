import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';

export const middleware = async (request: NextRequest) => {
  const session = await getSession();

  if (request.nextUrl.pathname === '/member/profile' && !session.id) {
    /**
    console.log('cookies', request.cookies.getAll());
    console.log('nextUrl', request.nextUrl);
    */

    return NextResponse.redirect(new URL('/member/login', request.url));
  }
};

export const config = {
  matcher: ['/movies', '/movies/:path*', '/member/profile']
};
