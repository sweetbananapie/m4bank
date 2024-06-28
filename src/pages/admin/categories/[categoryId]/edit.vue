<template>
  <template v-if="category">
    <FormKit type="form" @submit.prevent="handleUpdateCategory">
      <FormKit type="text" v-model="categoryData.categoryname"></FormKit>
      <FormKit type="text" v-model="categoryData.email"></FormKit>
      <FormKit type="text" v-model="categoryData.fullname"></FormKit>
      <FormKit type="submit">Сохранить</FormKit>
    </FormKit>
  </template>
</template>

<script setup lang="ts">
import { getCategory } from "@/shared/admin/api/categories/getCategory";
import { updateCategory } from "@/shared/admin/api/categories/updateCategory";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const categoryId: string = route.params.categoryId as string;
const category = ref();
const categoryData = ref();

const resetFormData = () => {
  categoryData.value = category.value;
};

onMounted(async () => {
  try {
    const [categoryResponse] = await Promise.all([getCategory(categoryId)]);
    category.value = categoryResponse.data;
    resetFormData;
  } catch (e) {}
});

const handleUpdateCategory = async () => {
  await updateCategory(categoryId, categoryData.value);
};
</script>
