import { http } from "./http";

interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
interface LoginParams {
  identifier: string;
  password: string;
}

export const login = (params: LoginParams) => {
  return http.post<LoginResponse>("/auth/local", params, { useAuth: false });
};
