<script setup lang="ts">
import { getUnactiveOrders } from "@/shared/admin/api/orders/getUnactiveOrders";
import { Order } from "@/shared/admin/api/orders/types/order";
import { OrderList } from "@/widgets/admin";
import { onMounted, ref } from "vue";

const orders = ref<Order[]>([]);
const fetch = async () => {
  try {
    const response = await getUnactiveOrders();
    orders.value = response.data.results;
  } catch (e) {}
};

onMounted(fetch);
</script>

<template>
  <h1>Завершенные заказы</h1>
  <OrderList v-bind="{ orders }" @updateOrders="fetch"></OrderList>
</template>
