<script setup lang="ts">
defineProps<{
  telegramBotLink: string;
}>();
</script>
<template>
  Нажмите кнопку ниже и в открывшемся чате Telegram нажмите "Запустить"
  <br />
  <br />
  <div class="d-flex justify-center" style="gap: 12px">
    <v-btn
      color="telegram"
      :href="telegramBotLink"
      target="_blank"
      block
      style="border-radius: 40px; height: 40px"
    >
      <v-icon
        style="transform: rotate(-45deg) translateY(-4px) translateX(-3px)"
        >mdi mdi-send</v-icon
      >
      <div style="text-transform: none; letter-spacing: -2%; padding: 8px 0">
        Подключить уведомления
      </div>
    </v-btn>

    <!-- <v-btn color="black">Нет телеграма</v-btn> -->
  </div>
</template>
