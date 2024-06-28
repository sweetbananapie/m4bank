<script setup lang="ts">
import { definePage } from "vue-router/auto";
import { OrderId } from "@/widgets";

definePage({
  name: "created-order",
  meta: {
    section: 1,
    depth: 3,
  },
});
</script>

<template>
  <OrderId />
</template>
