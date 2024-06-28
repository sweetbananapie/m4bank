<script lang="ts" setup>
import { router } from "@/app/router/router";
import { isSessionChecked } from "@/entities";
import { initSession, checkSessionTime, checkSessionTable } from "@/features/";
import { onMounted } from "vue";

onMounted(async () => {
  const { table, time } = router.currentRoute.value.params as {
    table: string;
    time: string;
  };
  initSession({ table, time, type: "telegram" });
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
