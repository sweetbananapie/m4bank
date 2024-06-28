<script setup lang="ts">
import { getActiveOrders } from "@/shared/admin/api/orders/getActiveOrders";
import { Order } from "@/shared/admin/api/orders/types/order";
import { OrderList } from "@/widgets/admin";
import { onMounted, ref } from "vue";
import { useServerEvents } from "@/shared/admin";

const updatedOrderIds = ref<Set<string>>(new Set<string>());

const counter = ref(0);

const orders = ref<Order[]>([]);
const fetch = async () => {
  try {
    const response = await getActiveOrders();
    orders.value = response.data.results;
    counter.value = response.data.pagination.total;
  } catch (e) {}
};
onMounted(fetch);
const { onOrderCreate, onOrderUpdate } = useServerEvents();
onOrderCreate(({ orderId }) => {
  console.log("onOrderCreate");
  updatedOrderIds.value.add(orderId);
  fetch();
});
onOrderUpdate(({ orderId }) => {
  if (!orderId || !orders.value.some((item) => item.orderId === orderId))
    return;
  updatedOrderIds.value.add(orderId);
  fetch();
});
</script>

<template>
  <h1>
    Активные заказы
    <span v-if="counter">({{ counter }})</span>
  </h1>
  <OrderList
    v-bind="{ orders, updatedOrderIds }"
    @updateOrders="fetch"
  ></OrderList>
</template>
