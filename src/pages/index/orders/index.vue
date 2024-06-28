<script setup lang="ts">
import { router } from "@/app/router/router";
import { OrderStatus, getOrderStatus } from "@/entities";
import { useServerEvents } from "@/shared";
import { OrderDto, getMyOrders } from "@/shared/api/getMyOrders";
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { definePage } from "vue-router/auto";

definePage({
  name: "orders",
  meta: {
    section: 2,
    depth: 1,
  },
});

const orderIds = useLocalStorage<string[]>("Orders", []);
const orders = ref<OrderDto[]>([]);

const isLoading = ref(false);
const fetch = async () => {
  isLoading.value = true;
  try {
    const { data } = await getMyOrders(orderIds.value);
    orders.value = data;
  } finally {
    isLoading.value = false;
  }
};

const updatedOrderIds = ref(new Set<string>());
const { onOrderUpdate } = useServerEvents();
onOrderUpdate(({ orderId }) => {
  if (!orderId || !orderIds.value.includes(orderId)) return;
  updatedOrderIds.value.add(orderId);
  fetch();
});

const uiOrders = computed(() => {
  return orders.value.map((item) => ({
    ...item,
    status: getOrderStatus(item.status as OrderStatus),
  }));
});
onMounted(fetch);
</script>

<template>
  <div class="scrollable-container">
    <div class="centered-content__wrapper">
      <h1 style="padding-bottom: 40px">История заказов</h1>
      <template v-if="isLoading">
        <div class="centered-content">
          <div>Идёт загрузка...</div>
        </div>
      </template>
      <template v-else-if="uiOrders.length">
        <template v-for="order in uiOrders" :key="order.id">
          <div
            class="animation-appear cursor-pointer"
            style="margin-bottom: 10px"
            @click.prevent="
              router.push({
                name: 'orderId',
                params: { orderId: order.orderId },
              })
            "
          >
            <div
              class="order"
              :style="
                updatedOrderIds.has(order.orderId) && { background: 'red' }
              "
            >
              <div>
                <div :style="{ color: order.status?.color || '#000' }">
                  {{ order.status?.title }}
                </div>
                <h3>Заказ #{{ order.id % 100 }}</h3>
                <template v-for="product in order.items">
                  <div>
                    {{ product.product?.title }} x{{ product.quantity }}
                  </div>
                </template>
              </div>
              <!-- <div>Итого</div> -->
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="centered-content">
          <div>Заказов пока нет</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
.order {
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 20px;
}
.number {
  font-size: 16px;
}
.position {
  font-size: 16px;
}
.status {
  font-size: 16px;
}
</style>
