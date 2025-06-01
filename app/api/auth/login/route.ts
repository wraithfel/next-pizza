import { prisma } from '@/prisma/prisma-client';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ message: 'Неверные данные' }, { status: 401 });
  }

  const existingCartToken = req.cookies.get('cartToken')?.value;
  let cart;

  if (existingCartToken) {

    const anonCart = await prisma.cart.findFirst({
      where: { token: existingCartToken },
    });

    if (anonCart && !anonCart.userId) {
      cart = await prisma.cart.update({
        where: { id: anonCart.id },
        data: { userId: user.id },
      });
    }
  }

  if (!cart) {
    const userCart = await prisma.cart.findFirst({
      where: { userId: user.id },
    });

    if (userCart) {
      cart = userCart;
    } else {
      const newToken = randomUUID();
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
          token: newToken,
        },
      });
    }
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

  const res = NextResponse.json(user);
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 2_592_000, 
  });

  res.cookies.set('cartToken', cart.token, {
    httpOnly: true,
    path: '/',
    maxAge: 2_592_000,
  });

  return res;
}
