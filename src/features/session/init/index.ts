import { sessionStart } from "@/entities";

export const initSession = ({
  time,
  table,
  type,
}: {
  time: string | number;
  table: string;
  type: "web" | "telegram";
}) => {
  sessionStart.value = { time, table, type };
};
