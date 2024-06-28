import { sessionStart } from "@/entities";
import { checkTableExists } from "@/shared/api/checkTableExists";

export const checkSessionTable = async () => {
  const table = sessionStart.value.table;
  const result = await checkTableExists(table);
  return result.data.result;
};
