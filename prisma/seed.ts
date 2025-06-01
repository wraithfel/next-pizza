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
      description: null,
      ingredients: {
        connect: ingredients.slice(0, 9),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11ee7d610d2925109ab2e1c92cc5383c.avif',
      categoryId: 1,
      description: null,
      ingredients: {
        connect: ingredients.slice(3, 9),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif',
      categoryId: 1,
      description: null,
      ingredients: {
        connect: ingredients.slice(1, 8),
      },
    },
  });

    const pizza4 = await prisma.product.create({
    data: {
      name: 'Креветки со сладким чили',
      imageUrl:
        'https://media.dodostatic.net/image/r:1875x1875/0194d4fd39bb7352bfa5de2219e88b9b.avif',
      categoryId: 1,
      description: null,
      ingredients: {
        connect: ingredients.slice(1, 8),
      },
    },
  });

    const pizza5 = await prisma.product.create({
    data: {
      name: 'Карбонара',
      imageUrl:
        'https://media.dodostatic.net/image/r:1875x1875/019591b13a1a724b90092c16d9b1c05a.avif',
      categoryId: 1,
      description: null,
      ingredients: {
        connect: ingredients.slice(1, 8),
      },
    },
  });

    const pizza6 = await prisma.product.create({
    data: {
      name: 'Сырный цыпленок',
      imageUrl:
        'https://media.dodostatic.net/image/r:1875x1875/11ee7d610e8bbb248f31270be742b4bd.avif',
      categoryId: 1,
      description: null,
      ingredients: {
        connect: ingredients.slice(1, 8),
      },
    },
  });


  const allProducts = await prisma.product.findMany({
        select: { id: true, categoryId: true },
  });

  const baseProducts = allProducts.filter(p => p.categoryId !== 1);


   await prisma.productItem.createMany({
  data: baseProducts.map(({ id, categoryId }) => {
    
    let minPrice = 100;
    let maxPrice = 500;

    if (categoryId === 2) {

      minPrice = 150;
      maxPrice = 300;
    } else if (categoryId === 3) {

      minPrice = 100;
      maxPrice = 250;
    } else if (categoryId === 4) {

      minPrice = 120;
      maxPrice = 280;
    } else if (categoryId === 5) {

      minPrice =  80;
      maxPrice = 200;
    }

    const randomPrice =
      Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;

    return {
      productId: id,
      price: randomPrice,
    };
  }),
});


  await prisma.productItem.createMany({
  data: [

    { productId: pizza1.id, size: 20, price: 499, pizzaType: 1 },
    { productId: pizza1.id, size: 20, price: 499, pizzaType: 2 },
    { productId: pizza1.id, size: 30, price: 699, pizzaType: 1 },
    { productId: pizza1.id, size: 30, price: 699, pizzaType: 2 },
    { productId: pizza1.id, size: 40, price: 899, pizzaType: 1 },
    { productId: pizza1.id, size: 40, price: 899, pizzaType: 2 },

    { productId: pizza2.id, size: 20, price: 450, pizzaType: 1 },
    { productId: pizza2.id, size: 20, price: 450, pizzaType: 2 },
    { productId: pizza2.id, size: 30, price: 650, pizzaType: 1 },
    { productId: pizza2.id, size: 30, price: 650, pizzaType: 2 },
    { productId: pizza2.id, size: 40, price: 850, pizzaType: 1 },
    { productId: pizza2.id, size: 40, price: 850, pizzaType: 2 },

    { productId: pizza3.id, size: 20, price: 520, pizzaType: 1 },
    { productId: pizza3.id, size: 20, price: 520, pizzaType: 2 },
    { productId: pizza3.id, size: 30, price: 720, pizzaType: 1 },
    { productId: pizza3.id, size: 30, price: 720, pizzaType: 2 },
    { productId: pizza3.id, size: 40, price: 920, pizzaType: 1 },
    { productId: pizza3.id, size: 40, price: 920, pizzaType: 2 },

    { productId: pizza4.id, size: 20, price: 480, pizzaType: 1 },
    { productId: pizza4.id, size: 20, price: 480, pizzaType: 2 },
    { productId: pizza4.id, size: 30, price: 680, pizzaType: 1 },
    { productId: pizza4.id, size: 30, price: 680, pizzaType: 2 },
    { productId: pizza4.id, size: 40, price: 880, pizzaType: 1 },
    { productId: pizza4.id, size: 40, price: 880, pizzaType: 2 },

    { productId: pizza5.id, size: 20, price: 530, pizzaType: 1 },
    { productId: pizza5.id, size: 20, price: 530, pizzaType: 2 },
    { productId: pizza5.id, size: 30, price: 730, pizzaType: 1 },
    { productId: pizza5.id, size: 30, price: 730, pizzaType: 2 },
    { productId: pizza5.id, size: 40, price: 930, pizzaType: 1 },
    { productId: pizza5.id, size: 40, price: 930, pizzaType: 2 },

    { productId: pizza6.id, size: 20, price: 500, pizzaType: 1 },
    { productId: pizza6.id, size: 20, price: 500, pizzaType: 2 },
    { productId: pizza6.id, size: 30, price: 700, pizzaType: 1 },
    { productId: pizza6.id, size: 30, price: 700, pizzaType: 2 },
    { productId: pizza6.id, size: 40, price: 900, pizzaType: 1 },
    { productId: pizza6.id, size: 40, price: 900, pizzaType: 2 },
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