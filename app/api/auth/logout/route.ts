import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', '', {
    path: '/',
    expires: new Date(0),
  });
  res.cookies.set('cartToken', '', {
    path: '/',
    expires: new Date(0),
  });
  return res;
}
