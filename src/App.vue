<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
<script lang="ts" setup>
import qs from "qs";
import { init } from "@tma.js/sdk";
import { onMounted } from "vue";
import { telegramMiniAppId } from "./entities";

onMounted(async () => {
  const app = await init({ complete: true });
  telegramMiniAppId.value = JSON.parse(
    (qs as any).parse(app.initDataRaw)?.user || null
  )?.id;
});
</script>
