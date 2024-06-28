<script setup lang="ts">
import { Order } from "@/shared/admin/api/orders/types/order";
import { computed } from "vue";

const props = defineProps<{
  order: Order;
}>();

const name = computed(() => {
  const o = props.order;
  return (
    o.name ||
    o.telegramUser?.first_name ||
    o.telegramUser?.username ||
    "Безымянный"
  );
});
</script>

<template>
  <v-btn
    density="compact"
    color="blue"
    variant="flat"
    v-if="order.telegramUser?.username"
    target="_blank"
    :href="`https://t.me/${order.telegramUser?.username}`"
  >
    {{ name }}
    <template #prepend>
      <v-icon>mdi-send</v-icon>
    </template>
  </v-btn>
  <v-btn
    density="compact"
    color="blue"
    variant="flat"
    v-else-if="order.telegramUser?.telephone"
    target="_blank"
    :href="`https://t.me/${order.telegramUser?.telephone}`"
  >
    {{ name }}
  </v-btn>
  <v-btn
    density="compact"
    color="orange"
    variant="flat"
    v-else-if="order.telephone"
    :href="`tel:${order.telegramUser?.telephone}`"
  >
    {{ name }}
  </v-btn>
  <v-btn v-else density="compact" color="black" variant="flat"
    >нет контакта</v-btn
  >
</template>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
