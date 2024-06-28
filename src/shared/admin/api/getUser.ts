import { http } from './http';

type getUserResponce = {
    userId: string;
    username: string;
    password: string;
    permissions: string[];
} & Record<string, unknown>

export const getUser = (userId: string) => {
    return http.get<getUserResponce>(`iam/user/${userId}`);
}