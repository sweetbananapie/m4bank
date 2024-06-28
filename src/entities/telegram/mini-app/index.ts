import { useLocalStorage } from "@vueuse/core";

export const telegramMiniAppId = useLocalStorage<number>("telegramId", 0);
