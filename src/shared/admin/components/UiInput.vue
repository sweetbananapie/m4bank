<!-- Input.vue -->
<template>
    <input :type="type" v-model="computedValue" :placeholder="placeholder" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['update:modelValue']);

const computedValue = computed({
    get: () => props.modelValue,
    set: (newValue) => emits('update:modelValue', newValue)
});
</script>

<style scoped>
input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>