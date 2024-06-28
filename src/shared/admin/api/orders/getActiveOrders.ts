import { ResponsePagination } from "@/shared/types/pagination";
import { http } from "../http";
import { Order } from "./types/order";

export const getActiveOrders = () => {
  return http.get<ResponsePagination<Order>>("/orders/active");
};
