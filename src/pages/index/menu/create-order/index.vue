<script setup lang="ts">
import { router } from "@/app/router/router";
import {
  Order,
  telegramSubscriber,
  isTelegramSubscriber,
  telegramMiniAppId,
} from "@/entities";
import { createOrder } from "@/shared/api/createOrder";
import { useServerEvents } from "@/shared";
import { Catalog, CatalogProduct } from "@/shared/api/getCatalog";
import { useLocalStorage } from "@vueuse/core";
import { ComputedRef, ref } from "vue";
import { onMounted } from "vue";
import { definePage } from "vue-router/auto";

definePage({
  name: "create-order",
  meta: {
    section: 1,
    depth: 2,
  },
});

const props = defineProps<{
  order: Order;
  catalog: Catalog;
  totalPrice: ComputedRef<number>;
  uiOrder: {
    product: CatalogProduct;
    productId: CatalogProduct["id"];
    quantity: number;
  }[];
}>();

const handleOrderLengthChange = async () => {
  if (!props.order.list.value.length) {
    await router.replace({ name: "catalog" });
  }
};

const orderIds = useLocalStorage<string[]>("Orders", []);

const { emitOrderCreate } = useServerEvents();

const storedContacts = useLocalStorage("storedContacts", {
  name: "",
  telephone: "",
});

const handleCreateOrder = async () => {
  try {
    const payload = {
      // telegramId: telegramMiniAppId.value,
      items: props.order.list.value.map((item) => {
        return {
          product: item.productId,
          quantity: item.quantity,
        };
      }),
      ...(!telegramMiniAppId.value
        ? {
            name: storedContacts.value.name,
            telephone: storedContacts.value.telephone,
          }
        : {}),
      // если заказ делается из Web
      ...(isTelegramSubscriber.value
        ? { telegramSubscriber: telegramSubscriber.value }
        : {}),
      comment: comment.value,
    };
    const { data } = await createOrder(payload);
    orderIds.value = [data.orderId, ...orderIds.value.slice(0, 39)];
    emitOrderCreate(data.orderId);
    props.order.reset();
    await router.push({
      name: "created-order",
      params: { orderId: data.orderId },
    });
  } catch (e) {
    alert("Произошла ошибка при создании заказа: " + JSON.stringify(e));
  }
};

const comment = ref("");

onMounted(handleOrderLengthChange);
</script>

<template>
  <div class="scrollable-container scrollable-container--active">
    <h1
      style="display: flex; align-items: center"
      @click="
        router.replace({
          name: 'catalog',
          state: { datetime: Date.now() },
        })
      "
    >
      <v-icon
        icon="mdi-chevron-left"
        density="compact"
        size="small"
        style="margin: 0 6px 0 -12px"
      />
      Подверждение заказа
    </h1>
    <p style="margin-bottom: 40px">
      Убедитесь, что всё верно и&nbsp;нажмите <b>Подтвердить заказ</b>
    </p>
    <div v-if="uiOrder.length && catalog.length">
      <transition-group name="shrink">
        <v-row
          v-initial-height="item.product?.id"
          v-for="item in uiOrder"
          :key="item.productId"
          class="animation-shrink animation-appear py-0"
        >
          <v-col>
            <div>
              {{ item.product?.title }}
            </div>
            <div>
              <b>{{ item.product?.price }}₸</b>
            </div>
          </v-col>
          <v-col class="price-wrapper">
            <v-btn
              density="compact"
              class="counter-button"
              color="default"
              variant="flat"
              size="large"
              icon="mdi-minus"
              @click="
                order.remove(item.productId);
                handleOrderLengthChange();
              "
            ></v-btn>
            <b class="counter-number">{{ item.quantity }}</b>
            <v-btn
              density="compact"
              class="counter-button"
              color="default"
              variant="flat"
              size="large"
              icon="mdi-plus"
              @click="order.add(item.productId)"
            ></v-btn>
          </v-col>
        </v-row>
      </transition-group>
      <h3 style="text-align: right; margin-top: 20px; margin-bottom: 20px">
        Итого {{ totalPrice }}₸
      </h3>

      <v-textarea
        v-model="comment"
        label="Комментарий (не обязательно)"
        variant="outlined"
        rows="2"
        auto-grow
      ></v-textarea>
    </div>
  </div>
  <div class="fixed-on-page-bottom">
    <v-btn
      style="height: 56px; text-transform: none"
      color="primary"
      block
      @click="handleCreateOrder()"
    >
      Подтвердить заказ
    </v-btn>
  </div>
</template>

<style scoped></style>
