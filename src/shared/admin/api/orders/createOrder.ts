import { http } from '../http';

type OrderCreateParams = {
  title: string;
  published: boolean;
  order?: number;
  description?: string;
} & Record<string, unknown>;

export const createOrder = (data: OrderCreateParams) => {
  return http.post(`/orders`, data);
};
