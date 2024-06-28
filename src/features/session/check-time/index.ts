import { sessionStart } from "@/entities";
import dayjs from "dayjs";

export const checkSessionTime = () => {
  const time = dayjs(sessionStart.value.time);
  const currentTime = dayjs();
  return currentTime.isBefore(time);
};
