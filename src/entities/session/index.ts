import { useLocalStorage, useSessionStorage } from "@vueuse/core";

export const sessionStart = useLocalStorage("sessionStart", {
  time: "" as string | number,
  table: "",
  type: "",
});

export const isSessionChecked = useSessionStorage<boolean | null>(
  "sessionChecked",
  false
);
