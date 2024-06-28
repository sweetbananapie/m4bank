import { http } from "./http";

export const getSessionDuration = () => {
  return http.get<{ results: string }>("/config/session_duration");
};
