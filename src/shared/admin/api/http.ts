import { authToken } from "@/entities/admin";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = authToken.value;
  if (token && config.useAuth !== false) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
