<script setup lang="ts">
const props = defineProps<{ grad?: boolean }>();
</script>
<template>
  <div class="running-line" :class="{ 'running-line_grad': grad }">
    <div class="running-line__inner">
      <div v-for="el in 2" :key="el" class="running-line__items">
        <template v-for="i in 8" :key="i">
          <a href="#" class="running-line__item">Catbit</a>
          <a href="#" class="running-line__item">crypto</a>
        </template>
      </div>
    </div>
  </div>
</template>
