import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemPrice = (item: CartItemDTO) => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity

}