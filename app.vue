<script setup lang="ts">
import { useAppStore } from '~~/stores/appStore';
const appStore = useAppStore();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - CatBit.io` : 'CatBit.io';
  },
  meta: [
    {
      name: 'description',
      content:
        'CatBit.io - Покупайте, продавайте и обменивайте криптоактивы максимально просто',
    },
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style lang="scss"></style>
