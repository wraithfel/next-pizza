import { prisma } from '@/prisma/prisma-client';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json(null);

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const user   = await prisma.user.findUnique({ where: { id }, select: { id:true, fullName:true,email:true } });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(null);
  }
}
