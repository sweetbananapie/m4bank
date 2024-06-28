<template>
  <v-layout>
    <v-main>
      <div class="scrollable-container">
        <RouterView></RouterView>
      </div>
    </v-main>

    <v-bottom-navigation color="black">
      <v-btn color="default" @click="router.push('/admin/orders/active')">
        <v-icon>mdi-list-status</v-icon>
        Заказы
      </v-btn>
      <v-btn color="default" @click="router.push('/admin/menu')">
        <v-icon>mdi-glass-cocktail</v-icon>
        Меню
      </v-btn>

      <v-btn color="default" @click="router.push('/admin/login')">
        <v-icon>mdi-account</v-icon>
        Авторизация
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script lang="ts" setup>
import { router } from "@/app/router/router";
// import { useLocalStorage } from "@vueuse/core";
</script>
<style>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 12px;
}
</style>
