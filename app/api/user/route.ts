import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  return NextResponse.json({
    user: 'wolf?'
  });
};

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  return NextResponse.json({
    ...data,
    user: 'wolf upadeted'
  });
};
