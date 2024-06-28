<script setup lang="ts">
import { OrderDto } from "@/shared/api/getOrder";

import { updateOrder } from "@/shared/api/updateOrder";
import { orderStatusConstants } from "@/entities/";
import { OrderSelectStatus } from "@/features";
import debounce from "lodash.debounce";

/* const props =  */ defineProps<{
  orders: OrderDto[];
}>();

const emits = defineEmits({
  updateOrders: () => {},
});

const updateStatus = async (
  orderId: string,
  orderStatus: (typeof orderStatusConstants)[number]
) => {
  const { published, status } = orderStatus;
  await updateOrder(orderId, { status, published });
  emits("updateOrders");
};

const debounceUpdateOrder = debounce(updateStatus, 0);
</script>

<template>
  <v-row class="orderItem">
    <template v-for="order in orders">
      <v-col cols="12" md="6" xl="3">
        <OrderItem v-bind="{ order }">
          <template #right>
            <OrderSelectStatus
              :status="order.status"
              @update:status="debounceUpdateOrder(order.orderId, $event)"
            />
          </template>
        </OrderItem>
      </v-col>
    </template>
  </v-row>
</template>
@/shared/api/updateOrder
