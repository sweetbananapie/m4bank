<!-- Button.vue -->
<template>
    <button>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
</script>

<style scoped>
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
}
</style>