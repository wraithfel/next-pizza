import { axiosInstance } from "./instance";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/cart')).data;
};

export const addCartItem = async (payload: {
  productItemId: number;
  quantity: number;
  ingredientIds?: number[];
}): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>('/cart', payload)).data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDTO> => {
  return (
    await axiosInstance.patch<CartDTO>('/cart', null, {
      params: { itemId, quantity },
    })
  ).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  return (
    await axiosInstance.delete<CartDTO>('/cart', { params: { itemId } })
  ).data;
};

