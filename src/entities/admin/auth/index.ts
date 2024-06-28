import { useLocalStorage } from "@vueuse/core";

export const authUser = useLocalStorage<{
  id?: number;
  username?: string;
}>("user", {});

export const authToken = useLocalStorage<string | null>("token", null);
