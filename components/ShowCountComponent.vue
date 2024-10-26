<script setup lang="ts">
import { useUserStore } from '~~/stores/userStore';
const userStore = useUserStore();
</script>
<template>
  <div>
    <h2>Count: {{ userStore.count }}</h2>
  </div>
</template>
