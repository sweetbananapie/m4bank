<script setup lang="ts">
import { Order } from "@/shared/admin/api/orders/types/order";
import { computed } from "vue";

const props = defineProps<{
  order: Order;
}>();

const getTotalPrice = computed(() => {
  return props.order.items.reduce((acc, item) => {
    return acc + item.quantity * item.product?.price;
  }, 0);
});
</script>

<template>
  <v-card>
    <template #text>
      <v-row>
        <v-col class="orderText">
          <div class="orderId">Заказ #{{ order.id % 100 }}</div>
          <div class="items">
            <template v-for="item in order.items">
              <div>
                {{ item.product?.title }} <b>x{{ item.quantity }}</b>
              </div>
            </template>
          </div>
          <div class="totalPrice">Итого: {{ getTotalPrice }}₸</div>
          <slot name="left"></slot>
        </v-col>
        <v-col>
          <slot name="right"></slot>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="orderText">
          <slot name="bottom"></slot>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<style scoped>
.orderText * {
  font-size: 16px;
}
</style>
