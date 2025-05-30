import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemPrice } from "./calc-cart-item-price";

export type CartStateItem = {
    productItemId: number;
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export const getCartDetails = (data: CartDTO) => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemPrice(item),
        productItemId: item.productItemId,
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ing) => ({
            name: ing.name,
            price: ing.price
        })),
    }))

    return {
        items,
        totalAmount: data.totalAmount
    }
}