import { http } from '../http';

interface Category {
  _id: string;
  title: string;
  published: boolean;
  description: string;
}

export const getCategories = () => {
  return http.get<Category[]>('categories');
};
