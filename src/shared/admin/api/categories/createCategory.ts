import { http } from '../http';

type CategoryCreateParams = {
  title: string;
  published: boolean;
  order?: number;
  description?: string;
} & Record<string, unknown>;

export const createCategory = (data: CategoryCreateParams) => {
  return http.post(`/categories`, data);
};
