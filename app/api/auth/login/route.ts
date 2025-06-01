import { prisma } from '@/prisma/prisma-client';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ message: 'Неверные данные' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

  const res = NextResponse.json(user);
  res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 2_592_000 });
  return res;
}
