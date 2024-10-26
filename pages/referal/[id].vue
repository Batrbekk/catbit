<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
const route = useRoute();

const getRefererId = () => {
  return route.params && route.params.id ? route.params.id : null;
};

const referer = useLocalStorage('referer', getRefererId());

referer.value = getRefererId();

setTimeout(async () => {
  await navigateTo({
    path: '/',
    query: Object.fromEntries(
      Object.entries(route.query).filter(
        (q) => q[0] === 'cur_from' || q[0] === 'cur_to' || q[0] === 'city',
      ),
    ),
  });
}, 1);
</script>

<template>
  <div></div>
</template>
