<template>
  <v-layout>
    <v-main>
      <!-- <RouterView >
        </RouterView> -->
      <div class="over-transition">
        <router-view v-slot="{ Component, route }">
          <transition-group :name="transitionName">
            <div :key="route.path" class="in-transition">
              <component
                :key="route.path"
                :is="Component"
                v-bind="{ order, catalog, totalPrice, uiOrder }"
              />
            </div>
          </transition-group>
        </router-view>
      </div>
    </v-main>

    <v-bottom-navigation color="default">
      <v-btn
        @click="
          router.push({
            name: 'catalog',
          })
        "
        color="default"
      >
        <v-icon>mdi-glass-cocktail</v-icon>
        Меню
      </v-btn>

      <v-btn @click="router.push({ name: 'orders' })" color="default">
        <v-icon>mdi-list-status</v-icon>
        Заказы
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import { router, isManual } from "@/app/router/router";
import { useGlobalOrder } from "@/entities";
import { useServerEvents } from "@/shared";
import { Catalog, getCatalog } from "@/shared/api/getCatalog";
import { isIOS } from "@vueuse/core";
import { watch } from "vue";
import { computed, onMounted } from "vue";
import { ref } from "vue";

// const editUser = useRoute('/users/[userId]/edit')
const order = useGlobalOrder();

const catalog = ref<Catalog>([]);

const products = computed(() => {
  return catalog.value.map((item) => item.products).flat();
});

const uiOrder = computed(() =>
  order.list.value.map((item) => {
    const product = products.value.find(
      (product) => product.id === item.productId
    );
    return { ...item, product };
  })
);

const removeDisabledOrderItems = () => {
  uiOrder.value.forEach((item) => {
    if (item.product?.noPrice || item.product?.disabled)
      order.remove(item.productId);
  });
};

const totalPrice = computed(() =>
  uiOrder.value.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  )
);

/**
 * Помимо fetch еще и удаляет из заказа элементы, которые возможно закончились
 */
const init = async () => {
  try {
    const response = await getCatalog();
    catalog.value = response.data;
    removeDisabledOrderItems();
  } catch (e) {}
};

const { onMenuUpdate } = useServerEvents();
onMenuUpdate(async () => {
  alert("Меню бара было обновлено");
  await init();
});

onMounted(init);
onMounted(() => {
  if (router.currentRoute.value.name === "/")
    return router.push({
      name: "catalog",
    });
});

const transitionName = ref("scale-fade");

const getTransitionName = (to: any, from: any) => {
  if (to.meta.section !== from.meta.section) return "scale-fade";

  const toDepth = (to.meta.depth as number) || 1,
    fromDepth = (from.meta.depth as number) || 1;

  return toDepth === fromDepth
    ? "scale-fade"
    : toDepth > fromDepth
    ? "slide-forward"
    : "slide-backword";
};

watch(
  () => router.currentRoute.value,
  isIOS
    ? async (to, from) => {
        transitionName.value = isManual.value
          ? getTransitionName(to, from)
          : "none";
      }
    : async (to, from) => {
        transitionName.value = getTransitionName(to, from);
      }
);
</script>
