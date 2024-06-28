import { http } from './http';

interface User {
    userId: string;
    username: string;
    permissions: string[];
}

export const getUsers = () => {
    return http.get<User[]>('iam/users');
}