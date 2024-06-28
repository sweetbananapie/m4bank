import { http } from '../http';

type CategoryUpdateParams = {
  title: string;
  published: boolean;
  description: string;
} & Record<string, unknown>;

export const updateCategory = (
  categoryId: string,
  data: CategoryUpdateParams,
) => {
  return http.put(`/categories/${categoryId}`, data);
};
