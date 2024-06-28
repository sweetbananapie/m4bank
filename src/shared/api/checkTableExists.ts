import { http } from "./http";

export const checkTableExists = (table: string) => {
  return http.get<{ result: boolean }>(`/tables/existed/${table}`);
};
