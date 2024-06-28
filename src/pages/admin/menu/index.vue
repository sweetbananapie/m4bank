<style>
.v-text-field .v-field__input {
  padding-inline: 5px 0 !important;
}
</style>

<template>
  <h1 style="padding: 20px 0 20px">
    <div class="d-flex align-center justify-space-between">
      <div>Меню</div>
      <div>
        <v-btn @click="handleSave()"> Сохранить</v-btn>
      </div>
    </div>
  </h1>
  <VueDraggableNext
    tag="transition-group"
    :options="{ animation: 200 }"
    handle=".handle"
    :list="uiCatalog"
    item-key="key"
  >
    <template v-for="(item, index) in uiCatalog" :key="item.key">
      <template v-if="item.type === 'category'">
        <div
          class="d-flex align-center px-2"
          style="
            height: 60px;
            border-radius: 8px;
            background: rgb(var(--v-theme-primary));
          "
        >
          <v-btn
            color="transparent"
            class="handle"
            variant="flat"
            density="compact"
            icon="mdi-menu"
          ></v-btn>
          <v-combobox
            :items="hiddenUiCategories"
            variant="plain"
            label="Категория"
            rows="1"
            v-model="item.title"
            hide-details
          />
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="flat"
                density="compact"
                icon="mdi-dots-vertical"
              />
            </template>
            <v-list>
              <v-list-item @click="addCategoryBelow(index)">
                <v-list-item-title>Создать категорию ниже</v-list-item-title>
              </v-list-item>
              <v-list-item @click="addProductBelow(index)">
                <v-list-item-title>Создать товар ниже</v-list-item-title>
              </v-list-item>
              <v-list-item @click="removeItem(index)">
                <v-list-item-title style="color: red">
                  Убрать из меню
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template v-else>
        <div
          class="d-flex align-center px-2 my-2"
          style="border-radius: 8px"
          :style="item.disabled && { background: '#ffe1e1' }"
        >
          <v-btn
            color="transparent"
            class="handle"
            variant="flat"
            density="compact"
            icon="mdi-menu"
          />
          <div style="flex-grow: 1">
            <v-combobox
              variant="plain"
              :items="hiddenUiProducts"
              label="Товар"
              rows="1"
              v-model="item.title"
              hide-details
              @paste="
                $event.target?.blur();
                handlePaste(index, $event.clipboardData.getData('text'));
              "
            />
          </div>
          <v-text-field
            label="Цена"
            variant="plain"
            style="flex: 0 0 55px"
            v-model="item.$price"
            hide-details
          />
          <!-- <label>
              <v-switch
                class="pa-0 ma-0"
                color="success"
                v-model="item.published"
                hide-details
              />
              <div style="font-size: 12px; margin-top: -8px; font-weight: normal">
                Виден
              </div>
            </label> -->

          <!-- <v-btn variant="flat" density="compact" icon="mdi-close"></v-btn> -->
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="flat"
                density="compact"
                icon="mdi-dots-vertical"
              />
            </template>
            <v-list>
              <v-list-item @click="item.disabled = !item.disabled">
                <v-list-item-title>
                  Указать "{{ item.disabled ? "В наличии" : "Кончился" }}"
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="addCategoryBelow(index)">
                <v-list-item-title> Создать категорию ниже </v-list-item-title>
              </v-list-item>
              <v-list-item @click="addProductBelow(index)">
                <v-list-item-title>Создать товар ниже</v-list-item-title>
              </v-list-item>
              <v-list-item @click="removeItem(index)">
                <v-list-item-title style="color: red">
                  Убрать из меню
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </template>
  </VueDraggableNext>
</template>

<script setup lang="ts">
import { Catalog, getFullCatalog } from "@/shared/admin/api/getFullCatalog";
import { updateCatalog } from "@/shared/admin/api/updateCatalog";
import { VueDraggableNext } from "vue-draggable-next";
import { onMounted } from "vue";
import { ref } from "vue";
import { computed } from "vue";
import { nextTick } from "vue";
import { useServerEvents } from "@/shared/admin";

const { emitMenuUpdate, onMenuUpdate } = useServerEvents();

const catalog = ref<Catalog>([]);

type UiCatalogItem =
  | {
      key: number;
      type: "category";
      title: string;
    }
  | {
      key: number;
      type: "product";
      title: string;
      $price: string | number;
      disabled: boolean;
    };

const uiCatalog = ref<UiCatalogItem[]>([]);

const allProducts = computed(() => {
  // все включая скрытые
  return catalog.value
    .map((item) => item.products.map((item) => item.title))
    .flat();
});
const allUiVisibleProducts = computed(() => {
  return uiCatalog.value
    .filter((item) => item.type === "product")
    .map((item) => item.title);
});

const hiddenUiProducts = computed(() => {
  return allProducts.value.filter((item) => {
    return !allUiVisibleProducts.value.includes(item);
  });
});

const allCategories = computed(() => {
  // все включая скрытые
  return catalog.value.map((item) => item.title);
});
const allUiVisibleCategories = computed(() => {
  return uiCatalog.value
    .filter((item) => item.type === "category")
    .map((item) => item.title);
});

const hiddenUiCategories = computed(() => {
  return allCategories.value.filter((item) => {
    return !allUiVisibleCategories.value.includes(item);
  });
});

const fetch = async () => {
  try {
    uiCatalog.value = [];
    const response = await getFullCatalog();
    catalog.value = response.data;

    let index = 0;
    uiCatalog.value = catalog.value
      .map((cat) => {
        index++;
        const category = {
          key: Math.random(),
          type: "category" as const,
          title: cat.title,
          published: cat.published,
          order: index,
        };

        const products = cat.products.map((prod) => {
          index++;
          return {
            key: Math.random(),
            type: "product" as const,
            title: prod.title,
            published: prod.published,
            $price: prod.price || prod.noPrice,
            disabled: prod.disabled,
            order: index,
          };
        });

        const filtered = [category, ...products].filter(
          (item) => item.published
        );
        return filtered;
      })
      .flat();

    uiCatalog.value.length ||
      uiCatalog.value.push({
        type: "category",
        key: Math.random(),
        title: "Название категории",
      });
  } catch (e) {}
};

const addCategoryBelow = (index: number) => {
  return uiCatalog.value.splice(1 + index, 0, {
    type: "category",
    key: Math.random(),
    title: "Напишите название",
  });
};
const addProductBelow = (index: number) => {
  return uiCatalog.value.splice(1 + index, 0, {
    type: "product",
    key: Math.random(),
    title: "Напишите название",
    $price: 0,
    disabled: false,
  });
};
const removeItem = (index: number) => {
  return uiCatalog.value.splice(index, 1);
};

const handlePaste = async (index: number, text: string) => {
  await nextTick();
  const strings = text.split("\r\n");
  if (strings.length % 2) return;

  const combined: { title: string; $price: string }[] = [];
  for (let i = 0; i < strings.length; i += 2) {
    const row = { title: strings[i], $price: strings[i + 1] };
    combined.push(row);
  }

  // первый пэйст в существующий элемент
  const spliced = combined.splice(0, 1)[0];
  Object.assign(uiCatalog.value[index], spliced);
  // остальные в новые создаваемые налету
  combined.forEach((item) => {
    addProductBelow(index++); // специально не ++index
    Object.assign(uiCatalog.value[index], item);
  });
};

// function customParseNumber(input: string | number) {
//   const match = `${input}`.match(/^\d+/); // Находит числовые символы в начале строки
//   return match ? Number(match[0]) : NaN; // Преобразует найденную числовую часть в число
// }

const handleSave = async () => {
  const payload = uiCatalog.value.map(({ key, ...item }, order) => {
    item.title = item.title.trim();
    if (item.type === "category") return { ...item, order };
    else if (item.type === "product") {
      const { $price, ...entry } = item;
      return {
        ...entry,
        price: isNaN(Number($price)) ? 0 : Number($price),
        noPrice: isNaN(Number($price)) ? ($price as string) : "",
        order,
      };
    }
  });
  try {
    await updateCatalog(payload);
    emitMenuUpdate();
  } catch (e) {
    alert(
      "Произошла ошибка при сохранении. Возможно, есть повторяющиеся названия товаров"
    );
  }
  await fetch();
};

onMenuUpdate(() => {
  alert(
    `Меню только что было обновлено другим юзером. 
    Либо обновите страницу,чтобы получить изменения другого пользователя, 
    либо нажмите сохранить, чтобы отменить изменения другого пользователя.`
  );
});
onMounted(fetch);
</script>
