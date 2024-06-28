<template>
  <FormKit type="form" @submit="handleCreateCategory()">
    <FormKit
      type="text"
      label="Категория"
      v-model="categoryData.title"
      autoFocus
    ></FormKit>
    <FormKit
      type="text"
      label="Порядок в списке"
      v-model.number="categoryData.order"
    ></FormKit>
    <FormKit
      type="checkbox"
      label="Видно всем"
      v-model="categoryData.published"
    ></FormKit>
  </FormKit>
</template>

<script setup lang="ts">
import { createCategory } from "@/shared/admin/api/categories/createCategory";
import { ref } from "vue";

const categoryData = ref({
  title: "123",
  description: "",
  published: true,
  order: "0",
});

const handleCreateCategory = async () => {
  return await createCategory({
    ...categoryData.value,
    order: +categoryData.value.order,
  });
};
</script>
