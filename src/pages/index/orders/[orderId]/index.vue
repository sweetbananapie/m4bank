<script setup lang="ts">
import { OrderId } from "@/widgets";
import { definePage } from "vue-router/auto";

definePage({
  name: "orderId",
  meta: {
    section: 2,
    depth: 2,
  },
});
</script>

<template>
  <OrderId />
</template>
