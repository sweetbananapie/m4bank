<script setup lang="ts">
import { RouteRecordName } from "unplugin-vue-router/types";

const active: RouteRecordName = "/admin/orders/active/";
const archived: RouteRecordName = "/admin/orders/archived/";
</script>
<template>
  <v-tabs>
    <v-tab :to="active">Активные</v-tab>
    <v-tab :to="archived">Архив</v-tab>
  </v-tabs>
  <RouterView></RouterView>
</template>
