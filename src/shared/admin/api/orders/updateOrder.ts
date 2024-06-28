import { http } from "../http";

type OrderUpdateParams = {
  status?: string;
  published?: boolean;
} & Record<string, unknown>;

export const updateOrder = (orderId: string, data: OrderUpdateParams) => {
  return http.patch(`/orders/${orderId}`, data);
};
