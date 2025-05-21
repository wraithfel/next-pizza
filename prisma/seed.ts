import { prisma } from "../prisma/prisma-client";
import { hashSync } from 'bcrypt'
import { categories, ingredients, products } from "./constants";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: true,
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: true,
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11ee7d612fc7b7fca5be822752bee1e5.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11ee7d610d2925109ab2e1c92cc5383c.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const allProducts = await prisma.product.findMany({
        select: { id: true, categoryId: true },
  });

  const baseProducts = allProducts.filter(p => 
        p.id !== pizza1.id && p.id !== pizza2.id && p.id !== pizza3.id
  );

   await prisma.productItem.createMany({
        data: baseProducts.map(({ id, categoryId }) => ({
        productId: id,
        // завтрак — 200, закуски — 150, коктейли — 180, напитки — 120
        price:
            categoryId === 2 ? 200 :
            categoryId === 3 ? 150 :
            categoryId === 4 ? 180 :
            categoryId === 5 ? 120 :
            100,
        })),
    });


  await prisma.productItem.createMany({
    data: [
        // Пепперони фреш (pizza1)
        { productId: pizza1.id, size: 26, price: 499, pizzaType: 1 },
        { productId: pizza1.id, size: 26, price: 499, pizzaType: 2 },
        { productId: pizza1.id, size: 30, price: 699, pizzaType: 1 },
        { productId: pizza1.id, size: 30, price: 699, pizzaType: 2 },
        { productId: pizza1.id, size: 35, price: 899, pizzaType: 1 },
        { productId: pizza1.id, size: 35, price: 899, pizzaType: 2 },

        // Сырная (pizza2)
        { productId: pizza2.id, size: 26, price: 450, pizzaType: 1 },
        { productId: pizza2.id, size: 26, price: 450, pizzaType: 2 },
        { productId: pizza2.id, size: 30, price: 650, pizzaType: 1 },
        { productId: pizza2.id, size: 30, price: 650, pizzaType: 2 },
        { productId: pizza2.id, size: 35, price: 850, pizzaType: 1 },
        { productId: pizza2.id, size: 35, price: 850, pizzaType: 2 },

        // Чоризо фреш (pizza3)
        { productId: pizza3.id, size: 26, price: 520, pizzaType: 1 },
        { productId: pizza3.id, size: 26, price: 520, pizzaType: 2 },
        { productId: pizza3.id, size: 30, price: 720, pizzaType: 1 },
        { productId: pizza3.id, size: 30, price: 720, pizzaType: 2 },
        { productId: pizza3.id, size: 35, price: 920, pizzaType: 1 },
        { productId: pizza3.id, size: 35, price: 920, pizzaType: 2 },
    ],
  });

  await prisma.cart.createMany({
    data: [
        {
            userId: 1,
            totalAmount: 0,
            token: '11111',
        },
        {
            userId: 2,
            totalAmount: 0,
            token: '22222',
        }
    ]
  });

  await prisma.cartItem.create({
    data:
        {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}]
            }
        }
  })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
        await down();
        await up();
    } catch(e) {
        console.log(e);
    }
    
}

main().then(async () => {
    await prisma.$disconnect();
})
.catch( async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
})