import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

const findCartByToken = (token: string) =>
  prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          productItem: { include: { product: true } },
          ingredients: true,
        },
      },
    },
  });

const recalcTotal = async (cartId: number) => {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
    include: { productItem: true, ingredients: true },
  });
  const total = items.reduce(
    (sum, i) =>
      sum +
      (i.productItem.price +
        i.ingredients.reduce((a, b) => a + b.price, 0)) *
        i.quantity,
    0
  );
  await prisma.cart.update({
    where: { id: cartId },
    data: { totalAmount: total },
  });
};

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            productItem: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  let token = req.cookies.get("cartToken")?.value;
  const needSetCookie = !token;
  if (!token) token = crypto.randomUUID();

  const cart =
    (await prisma.cart.findFirst({ where: { token } })) ??
    (await prisma.cart.create({ data: { token } }));

  const { productItemId, quantity, ingredientIds = [] } = await req.json();

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productItemId,
      quantity,
      ingredients: {
        connect: ingredientIds.map((id: number) => ({ id })),
      },
    },
  });

  await recalcTotal(cart.id);

  const response = NextResponse.json(await findCartByToken(token));
  if (needSetCookie) {
    response.cookies.set("cartToken", token, {
      httpOnly: true,
      path: "/",
    });
  }
  return response;
}

export async function PATCH(req: NextRequest) {
  const itemId = Number(req.nextUrl.searchParams.get("itemId"));
  const quantity = Number(req.nextUrl.searchParams.get("quantity"));
  const updated = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
  await recalcTotal(updated.cartId);
  const token = req.cookies.get("cartToken")!.value;
  return NextResponse.json(await findCartByToken(token));
}

export async function DELETE(req: NextRequest) {
  const itemId = Number(req.nextUrl.searchParams.get("itemId"));
  const deleted = await prisma.cartItem.delete({ where: { id: itemId } });
  await recalcTotal(deleted.cartId);
  const token = req.cookies.get("cartToken")!.value;
  return NextResponse.json(await findCartByToken(token));
}
