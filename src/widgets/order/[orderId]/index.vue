<script setup lang="ts">
import {
  isTelegramSubscriber,
  orderStatusConstants,
  telegramSubscriber,
  telegramMiniAppId,
} from "@/entities";
import { useServerEvents } from "@/shared";
import { getOrder, OrderDto } from "@/shared/api/getOrder";
import { updateOrder } from "@/shared/api/updateOrder";
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TelegramSubscribe } from "@/features";

const route = useRoute();

const order = ref<OrderDto>();
const orderId = route.params.orderId as string;

const options = { mask: "+7 (###) ###-##-##" };

const fetch = async () => {
  const { data } = await getOrder(orderId);
  order.value = data;
};
onMounted(fetch);

const storedContacts = useLocalStorage("storedContacts", {
  name: "",
  telephone: "",
});

const updateContactData = async () => {
  try {
    const payload = {
      name: storedContacts.value.name,
      telephone: storedContacts.value.telephone,
    };
    await updateOrder(orderId, payload);
    emitOrderUpdate(orderId);
    await fetch();
  } catch (e) {
    console.log(e);
  }
};

const currentStatus = computed(() => {
  return orderStatusConstants.find(
    (item) => item.status === order.value?.status
  );
});

const { onOrderUpdate, emitOrderUpdate, onAttachTelegram } = useServerEvents();
onOrderUpdate(({ orderId: updatedOrderId }) => {
  if (updatedOrderId !== orderId) return;
  fetch();
});

const getTotalPrice = computed(() => {
  return order.value?.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
});

const telegramBotLink = computed(() => {
  const url = import.meta.env.VITE_TELEGRAM_BOT_URL;
  return `${url}?start=order${orderId}`;
});

const telegramDialog = ref(true);

onAttachTelegram(orderId, (data) => {
  telegramSubscriber.value = data;
});
</script>

<template>
  <div class="scrollable-container">
    <template v-if="order">
      <h1 style="margin-bottom: 40px; display: flex; align-items: center">
        {{ currentStatus?.client.title }}
        <span style="margin-left: auto">#{{ order.id % 100 }}</span>
      </h1>
      <h3 style="margin-bottom: 20px">
        {{ currentStatus?.client.description }}
      </h3>

      <div style="margin-bottom: 20px">
        <div><b>Вы заказали:</b></div>
        <template v-for="product in order.items">
          <div>{{ product.product?.title }} x{{ product.quantity }}</div>
        </template>
        <div v-if="order.comment" style="margin-top: 20px">
          <b>Комментарий:</b> <br />
          {{ order.comment }}
        </div>
        <h3 if="getTotalPrice" style="text-align: right; margin-top: 20px">
          Итого: {{ getTotalPrice }}₸
        </h3>
      </div>

      <!-- TODO: возможно тут надо ёбнуть скриншот о том как выглядят сообщения -->
      <template
        v-if="!['finished', 'cancelled', 'ready'].includes(order.status)"
      >
        <hr style="margin: 20px 0 20px" />

        <template v-if="!isTelegramSubscriber && !telegramMiniAppId">
          <v-dialog v-model="telegramDialog">
            <v-card>
              <template #title>Последний шаг</template>
              <template #text>
                <TelegramSubscribe v-bind="{ telegramBotLink }" />
              </template>
            </v-card>
          </v-dialog>

          <div v-if="!telegramDialog">
            <div><b>Последний шаг</b></div>
            <TelegramSubscribe v-bind="{ telegramBotLink }" />
          </div>
        </template>

        <div v-else class="d-flex" style="gap: 12px">
          <v-icon>mdi mdi-check</v-icon>
          <div>Вы получите сообщение в Telegram, когда заказ будет готов</div>
        </div>
      </template>

      <!-- v-if="!order.telegramUser" -->
      <template v-if="false">
        <div>
          <div
            v-if="!order?.telephone || !order?.name"
            style="margin-bottom: 20px"
          >
            Укажите Ваши контакты, чтобы мы могли оповестить вас о готовности
            заказа
          </div>
          <div>
            <v-text-field
              density="comfortable"
              variant="outlined"
              label="Имя"
              v-model="storedContacts.name"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              density="comfortable"
              variant="outlined"
              v-maska:[options]
              label="Телефон"
              v-model="storedContacts.telephone"
            ></v-text-field>
          </div>
          <div>
            <v-btn
              v-if="!order?.telephone || !order?.name"
              @click.prevent="updateContactData"
            >
              Указать контакты
            </v-btn>

            <v-btn
              v-if="
                (order?.telephone || order?.name) &&
                (order?.telephone !== storedContacts.telephone ||
                  order?.name !== storedContacts.name)
              "
              @click.prevent="updateContactData"
            >
              Обновить контакты
            </v-btn>
          </div>
        </div>
      </template>

      <!-- <div v-if="order.status === 'created'">
      <div>Мы еще не приступили, поэтому Вы еще можете отменить заказ</div>
      <v-btn>Отменить заказ</v-btn>
    </div> -->
    </template>
  </div>
</template>
