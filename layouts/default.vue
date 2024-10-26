<script setup lang="ts"></script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <TheHeader />
    <main class="layout-content">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
