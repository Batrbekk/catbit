<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Проверка ${route.params.id}`,
});

const { pending, data, refresh } = useLazyAsyncData(
  'confirmorder',
  () => {
    return new Promise((resolve, reject) => resolve(true));
  },
  { server: false },
);
watch(pending, (newPending) => {
  if (!newPending) return navigateTo({ path: `/order/${route.params.id}` });
});
</script>
<template>
  <div v-if="pending" class="s-main__content fullWidth">Подождите...</div>
  <div v-else class="s-main__content fullWidth">Перенаправляю...</div>
</template>
<style lang="scss" scoped></style>
