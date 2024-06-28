<script setup lang="ts">
import { Order } from "@/shared/admin/api/orders/types/order";
import { updateOrder } from "@/shared/admin/api/orders/updateOrder";
import { orderStatusConstants, OrderItem } from "@/entities/admin";
import { OrderSelectStatus, OrderContactUser } from "@/features/admin";
import { useServerEvents } from "@/shared/admin";

const { emitOrderUpdate } = useServerEvents();

/* const props =  */ defineProps<{
  orders: Order[];
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
  emitOrderUpdate(orderId);
};
const updateIsPayed = async (orderId: string, isPayed: boolean) => {
  await updateOrder(orderId, { isPayed });
  emits("updateOrders");
  emitOrderUpdate(orderId);
};
</script>

<template>
  <v-row class="orderItem">
    <template v-for="order in orders">
      <v-col cols="12">
        <OrderItem v-bind="{ order }">
          <template #left>
            <div v-if="order.comment" style="margin: 16px 0">
              <b>Комментарий:</b> {{ order.comment }}
            </div>

            <v-switch
              size="small"
              style="height: 43px; margin-left: -10px"
              v-model="order.isPayed"
              @update:model-value="
                updateIsPayed(order.orderId, !!order.isPayed)
              "
              label="Оплачен"
              color="success"
            />
          </template>
          <template #right>
            <OrderSelectStatus
              :status="order.status"
              @update:status="updateStatus(order.orderId, $event)"
            />
          </template>
          <template #bottom>
            <div class="d-flex justify-space-between">
              <div v-if="order.cooker?.id">
                Готовит: {{ order.cooker?.username }}
              </div>
              <div></div>
              <div>
                <OrderContactUser v-bind="{ order }" />
              </div>
            </div>
          </template>
        </OrderItem>
      </v-col>
    </template>
  </v-row>
</template>
