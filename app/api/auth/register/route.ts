import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { fullName, email, password } = await req.json();

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ message: 'E-mail уже используется' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: await hash(password, 10),
      verified: true,
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

  const res = NextResponse.json(user);
  res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 2_592_000 });
  return res;
}
