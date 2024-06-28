import { CatalogProduct } from "@/shared/api/getCatalog";
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export type OrderItem = { productId: CatalogProduct["id"]; quantity: number };

const list = useLocalStorage<OrderItem[]>("OrderItem", []);

export type Order = ReturnType<typeof useGlobalOrder>;

export const useGlobalOrder = () => {
  const find = (productId: CatalogProduct["id"]) =>
    list.value.find((val) => val.productId === productId);

  const add = (productId: CatalogProduct["id"]) => {
    const orderItem = find(productId);
    if (orderItem) {
      orderItem.quantity++;
    } else {
      list.value.push({ productId, quantity: 1 });
    }
  };
  const remove = (productId: CatalogProduct["id"]) => {
    const orderItem = find(productId);
    if (!orderItem) return;
    orderItem.quantity--;
    if (orderItem.quantity < 1)
      list.value.splice(list.value.indexOf(orderItem), 1);
  };
  const reset = () => {
    list.value = [];
  };

  const hasItems = computed(() => !!list.value.length);

  return {
    list,
    find,
    add,
    remove,
    reset,
    hasItems,
  };
};
