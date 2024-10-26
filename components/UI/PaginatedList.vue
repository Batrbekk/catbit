<script setup lang="ts">
const props = defineProps({
  data: { type: Array, default: () => [] },
  itemsPerPage: { type: Number, default: 5 },
  noItemsText: { type: String, default: 'Пока здесь пусто' },
});
// const itemsPerPage = ref(5);
const currentPage = ref(1);
const changePageHandler = () => {};
const pageData = computed(() => {
  return props.data.slice(
    props.itemsPerPage * (currentPage.value - 1),
    props.itemsPerPage * (currentPage.value - 1) + props.itemsPerPage,
  );
});
</script>
<template>
  <div v-bind="$attrs" v-if="props.data && props.data.length">
    <slot v-for="(item, index) in pageData" :item="item" :key="index"></slot>
  </div>
  <div v-bind="$attrs" v-else>{{ props.noItemsText }}</div>
  <VueAwesomePaginate
    v-if="
      props.data && props.data.length && props.itemsPerPage < props.data.length
    "
    :total-items="props.data.length || 0"
    :items-per-page="props.itemsPerPage"
    :max-pages-shown="3"
    v-model="currentPage"
    :on-click="changePageHandler"
  />
</template>
<style lang="scss" scoped>
:deep(button.paginate-buttons) {
  padding: 2px 4px;
}
</style>
