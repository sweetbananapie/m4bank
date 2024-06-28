import { http } from '../http';

interface Order {
  _id: string;
  title: string;
  published: boolean;
  description: string;
}
export const getOrder = (orderId: string) => {
  return http.get<Order>(`orders/${orderId}`);
};
