import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get('token')?.value;
  if (!authToken)
    return NextResponse.json({ message: 'Неавторизован' }, { status: 401 });

  const { id: userId } = jwt.verify(
    authToken,
    process.env.JWT_SECRET!,
  ) as { id: number };

  const { fullName, phone, address, comment } = await req.json();

  const cartToken = req.cookies.get('cartToken')?.value;
  const cart = await prisma.cart.findFirst({
    where: { token: cartToken ?? '' },
    include: {
      items: {
        include: {
          productItem: { include: { product: true } },
          ingredients: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0)
    return NextResponse.json({ message: 'Корзина пуста' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const order = await prisma.order.create({
    data: {
      token:       randomUUID(),
      userId,
      totalAmount: cart.totalAmount,
      status:      'PENDING',
      items: cart.items.map(i => ({
        id:            i.id,
        quantity:      i.quantity,
        productItemId: i.productItemId,
        productName:   i.productItem.product.name,
        price:         i.productItem.price,
        ingredients:   i.ingredients.map(ing => ({
          id: ing.id, name: ing.name, price: ing.price,
        })),
      })),
      fullName,
      email:   user?.email ?? '',
      phone,
      address,
      comment,
    },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.update({
    where: { id: cart.id },
    data:  { totalAmount: 0 },
  });

  return NextResponse.json(order);
}
