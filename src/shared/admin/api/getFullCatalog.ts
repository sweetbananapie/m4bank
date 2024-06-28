import { http } from "./http";

export interface CatalogCategory {
  id: number;
  title: string;
  products: CatalogProduct[];
  published: boolean;
}

export interface CatalogProduct {
  order: any;
  id: number;
  title: string;
  price: number;
  isRecomended: boolean;
  published: boolean;
  disabled: boolean;
  noPrice: string;
}
export type Catalog = CatalogCategory[];

export const getFullCatalog = () => {
  return http.get<Catalog>("/catalog/full");
};
