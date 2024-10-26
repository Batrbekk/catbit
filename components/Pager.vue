<script setup lang="ts">
const props = defineProps(['store']);
</script>
<template>
  <section class="s-feedback-form b-section pt-0">
    <div class="b-section__content">
      <button
        v-for="(p, index) in Array(props.store.totalPages || 0).keys()"
        :key="index"
        :class="{ active: p + 1 === props.store.page }"
        @click="props.store.goToPage(p + 1)"
      >
        {{ p + 1 }}
      </button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.active {
  color: var(--color-primary);
}
</style>
