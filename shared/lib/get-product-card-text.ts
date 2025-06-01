import { Product, Ingredient, ProductItem } from '@prisma/client';

export const getProductCardText = (
  product: Product & {
    ingredients: Pick<Ingredient, 'name'>[];
    items: Pick<ProductItem, 'pizzaType'>[];
  },
) => {
  const isPizza = Boolean(product.items[0]?.pizzaType);

  if (isPizza) {
    const line = product.ingredients.map(i => i.name).join(', ');
    return line.length > 80 ? line.slice(0, 77) + '…' : line;
  }

  return product.description ?? '';
};
