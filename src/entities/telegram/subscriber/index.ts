import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export const telegramSubscriber = useLocalStorage("telegramSubscriber", {
  userId: 0,
  chatId: 0,
});

export const isTelegramSubscriber = computed(() => {
  return !!(telegramSubscriber.value.userId && telegramSubscriber.value.chatId);
});
