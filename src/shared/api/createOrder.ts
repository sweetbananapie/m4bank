import { http } from "./http";

export type OrderCreateParams = {
  name: string;
  telephone: string;
  telegramId: any;
  items: Array<{
    product: any;
    quantity: number;
  }>;
  comment: string;
};
export type OrderCreateResponse = {
  orderId: string;
};

export const createOrder = (data: Partial<OrderCreateParams>) => {
  return http.post<OrderCreateResponse>(`/orders`, data);
};
