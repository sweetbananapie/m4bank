import { http } from "./http";

export interface OrderDto {
  id: number;
  telegramUser: string;
  name: string;
  comment: string;
  telephone: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  items: OrderDtoItem[];
  messages: OrderDtoMessage[];
}

export interface OrderDtoItem {
  id: number;
  quantity: number;
  product: OrderDtoProduct;
}

export interface OrderDtoProduct {
  id: number;
  title: string;
  price: number;
}

export interface OrderDtoMessage {
  id: number;
  text: string;
  notify: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getOrder = (orderId: string) => {
  return http.get<OrderDto>(`/orders/specific/${orderId}`);
};
