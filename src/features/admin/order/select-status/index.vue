<script setup lang="ts">
import { orderStatusConstants } from "@/entities/admin";
import { computed, ref } from "vue";

const props = defineProps<{
  status: string;
}>();
const emits = defineEmits({
  "update:status": (val: (typeof orderStatusConstants)[number]) => val,
});
const status = computed({
  get: () => orderStatusConstants.find((item) => item.status === props.status)!,
  set: (val: (typeof orderStatusConstants)[number]) =>
    emits("update:status", val),
});

const $select = ref();
</script>

<template>
  <v-select
    ref="$select"
    :items="orderStatusConstants"
    item-value="value"
    item-title="title"
    return-object
    v-model="status"
  >
    <template #selection="{ item }">
      <div :style="{ color: item.raw.color }">
        <b>{{ item.raw.title }}</b>
      </div>
    </template>
    <template #item="{ item }">
      <v-list-item
        :style="{ color: item.raw.color }"
        @click="$select.select(item)"
      >
        <b>{{ item.raw.title }}</b>
      </v-list-item>
    </template>
  </v-select>
</template>
@/entities
