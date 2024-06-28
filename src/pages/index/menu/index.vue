<script setup lang="ts">
import { router } from "@/app/router/router";
import { Order } from "@/entities";
import { Catalog } from "@/shared/api/getCatalog";
import { ComputedRef } from "vue";
import { definePage } from "vue-router/auto";

definePage({
  name: "catalog",
  meta: {
    section: 1,
    depth: 1,
  },
});

defineProps<{
  order: Order;
  catalog: Catalog;
  totalPrice: ComputedRef<number>;
}>();
</script>

<template>
  <div
    :class="[
      'scrollable-container',
      { 'scrollable-container--active': order.hasItems.value },
    ]"
  >
    <h1>Меню</h1>
    <p style="margin-bottom: 40px">
      Нажмите на <b>+</b> рядом с интересующими напитками и&nbsp;затем нажмите
      на&nbsp;<b>Заказать</b>
    </p>

    <template v-for="category in catalog">
      <h2 style="margin: 40px 0 20px">{{ category.title }}</h2>
      <template v-for="product in category.products">
        <v-row class="animation-appear py-0 mb-4">
          <v-col class="py-0 d-flex align-center">
            <div>
              {{ product.title }}<br />
              <b v-if="product.price">{{ product.price }}₸</b>
            </div>
          </v-col>
          <v-col class="price-wrapper py-0">
            <!-- Если вместо цены написано "Уточняйте на БАРЕ" или что-то подобное -->
            <template v-if="product.noPrice">
              <b>{{ product.noPrice }}</b>
            </template>
            <template v-if="product.disabled">
              <b>Закончилось :(</b>
            </template>
            <!-- Если товар не закончился, то сделать счетчик -->
            <template v-if="!product.noPrice && !product.disabled">
              <div class="counter-wrapper">
                <!-- <template v-if="order.find(product.id)"> -->
                <transition name="slide-right">
                  <div v-if="order.find(product.id)" class="d-flex">
                    <v-btn
                      class="counter-button"
                      color="default"
                      variant="flat"
                      density="compact"
                      size="large"
                      icon="mdi-minus"
                      @click="order.remove(product.id)"
                    />
                    <b class="counter-number">{{
                      order.find(product.id)?.quantity
                    }}</b>
                  </div>
                </transition>
                <!-- </template> -->
                <v-btn
                  color="default"
                  class="counter-button"
                  variant="flat"
                  density="compact"
                  size="large"
                  icon="mdi-plus"
                  @click="order.add(product.id)"
                />
              </div>
            </template>
          </v-col>
        </v-row>
      </template>
    </template>
  </div>

  <div class="fixed-on-page-bottom">
    <transition name="scale-fade">
      <v-btn
        v-if="order.hasItems.value"
        block
        color="primary"
        style="height: var(--v-layout-bottom)"
        @click="router.push({ name: 'create-order' })"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            gap: 6px;
          "
        >
          <div style="text-transform: none">Заказать {{ totalPrice }}₸</div>
        </div>
      </v-btn>
    </transition>
  </div>
</template>
<style scoped></style>
