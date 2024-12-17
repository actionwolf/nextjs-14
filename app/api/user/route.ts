import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  return Response.json({
    user: 'wolf?'
  });
};

export const POST = async (request: NextRequest) => {
  /** console.log(request.cookies.get('')); */

  const data = await request.json();

  return Response.json({
    ...data,
    user: 'wolf upadeted'
  });
};
