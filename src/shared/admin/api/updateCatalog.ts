import { http } from "./http";

export const updateCatalog = (payload: any) => {
  return http.put(`/catalog`, payload);
};
