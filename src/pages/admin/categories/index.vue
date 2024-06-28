<!-- LoginPage.vue -->
<template>
  <h1>Категории</h1>
  <template v-for="category in categories">
    <RouterLink
      :to="{
        name: '/admin/categories/[categoryId]/edit',
        params: { categoryId: category._id },
      }"
    >
      <pre>a {{ category }}</pre>
    </RouterLink>
  </template>
</template>

<script setup lang="ts">
import { getCategories } from "@/shared/admin/api/categories/getCategories";
import { onMounted, ref } from "vue";

// const editUser = useRoute('/users/[userId]/edit')

const categories = ref();

onMounted(async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (e) {}
});
</script>
