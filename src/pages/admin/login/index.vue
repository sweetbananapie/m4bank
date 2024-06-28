<template>
  <div>
    <v-form :error="error" @submit.prevent="handleLogin">
      <v-text-field label="Логин" v-model="email" />
      <v-text-field label="Пароль" type="password" v-model="password" />
      <v-btn text="Войти" type="submit" />
    </v-form>
  </div>
</template>

<style>
.red {
  color: red;
  margin: 20px 0;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/shared/admin/api/login";
import { router } from "@/app/router/router";
import { authToken, authUser } from "@/entities/admin";

const email = ref("");
const password = ref("");

const error = ref("");

const handleLogin = async () => {
  try {
    const response = await login({
      identifier: email.value,
      password: password.value,
    });
    authToken.value = response.data.jwt;
    authUser.value = response.data.user;
    await router.replace({ name: "/admin/orders/active/" });
    error.value = "";
  } catch (e) {}
};
</script>
