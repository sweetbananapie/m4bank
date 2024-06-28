import { http } from '../http';

interface Category {
  _id: string;
  title: string;
  published: boolean;
  description: string;
}
export const getCategory = (category: string) => {
  return http.get<Category>(`categories/${category}`);
};
