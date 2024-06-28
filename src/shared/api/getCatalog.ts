import { http } from "./http";

export interface CatalogCategory {
  id: number;
  title: string;
  products: CatalogProduct[];
}

export interface CatalogProduct {
  order: any;
  id: number;
  title: string;
  price: number;
  noPrice: string;
  disabled: boolean;
}
export type Catalog = CatalogCategory[];

export const getCatalog = () => {
  return http.get<Catalog>("/catalog");
};
