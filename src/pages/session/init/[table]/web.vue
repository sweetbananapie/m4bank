<script lang="ts" setup>
import { router } from "@/app/router/router";
import { isSessionChecked } from "@/entities";
import { checkSessionTable, checkSessionTime, initSession } from "@/features";
import { onMounted } from "vue";

onMounted(async () => {
  const { table } = router.currentRoute.value.params as { table: string };
  const time = Date.now();
  initSession({ table, time, type: "web" });
  if (checkSessionTime())
    return router.replace({
      name: "/session/expired/",
    });

  const isTableFound = await checkSessionTable();
  if (!isTableFound)
    return router.replace({
      name: "/session/table-not-found/",
    });

  isSessionChecked.value = true;
  return router.replace({
    name: "catalog",
  });
});
</script>

<template></template>
