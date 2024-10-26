<script setup lang="ts">
import animationData from '~/assets/lottie/inyancatloader.json';
const props = defineProps(['show']);
const onTimeout = ref(null);
const offTimeout = ref(null);
const delay = ref(100);
const show = ref(false);

watch(
  () => props.show,
  (val) => {
    if (!val) {
      if (onTimeout.value) clearTimeout(onTimeout.value);
      offTimeout.value = setTimeout(() => {
        return (show.value = val);
      }, delay.value);
    }
    if (offTimeout.value) clearTimeout(offTimeout.value);
    onTimeout.value = setTimeout(() => {
      return (show.value = val);
    }, delay.value);
  },
);
</script>
<template>
  <div class="wrapper">
    <transition name="fade">
      <div v-show="show" class="loading-indicator">
        <div>
          <!-- <div class="lds-dual-ring"></div> -->
          <client-only>
            <lottie-animation
              ref="anim"
              :animation-data="animationData"
              :loop="true"
              :speed="2"
            />
          </client-only>
        </div>
      </div>
    </transition>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
