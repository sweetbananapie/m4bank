import { http } from './http';

type UpdateUserParams = {
  username?: string;
  email?: string;
  fullname?: string;
} & Record<string, unknown>;

export const updateUser = (userId: string, userData: UpdateUserParams) => {
  return http.put(`/users/${userId}`, userData);
};
