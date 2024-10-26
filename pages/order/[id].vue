<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useOrderStore } from '~~/stores/orderStore';
import StatusPay from '~~/components/OrderPage/StatusPay.vue';
import StatusCheck from '~~/components/OrderPage/StatusCheck.vue';
import StatusUploadCard from '~~/components/OrderPage/StatusUploadCard.vue';
import StatusCardCheck from '~~/components/OrderPage/StatusCardCheck.vue';
import StatusSuccess from '~~/components/OrderPage/StatusSuccess.vue';
import StatusDeclined from '~~/components/OrderPage/StatusDeclined.vue';
import StatusCancelled from '~~/components/OrderPage/StatusCancelled.vue';
import StatusUnknown from '~~/components/OrderPage/StatusUnknown.vue';
import StatusLoading from '~~/components/OrderPage/StatusLoading.vue';

const route = useRoute();

useHead({
  title: `Заявка ${route.params.id}`,
});

const orderStore = useOrderStore();

const currentComponent = computed(() => {
  if (pending.value) return StatusLoading;
  const statusComponents = {
    0: StatusPay,
    1: StatusCheck,
    2: StatusSuccess,
    3: StatusDeclined,
    4: StatusCancelled,
    5: StatusUploadCard,
    6: StatusCardCheck,
  };
  return statusComponents[orderStore.status]
    ? statusComponents[orderStore.status]
    : StatusUnknown;
});

onMounted(async () => {
  await refresh();
});
// try {
const { pending, data, refresh } = useLazyAsyncData(
  'getOrder',
  () => {
    orderStore.id = route.params.id;
    return orderStore.getOrder();
  },
  { server: false },
);

const { pause, resume, isActive } = useIntervalFn(() => {
  if (orderStore.status !== null && [0, 1, 6].includes(+orderStore.status))
    orderStore.getOrder();
}, 30 * 1000);
</script>
<template>
  <div class="s-main__content fullWidth">
    <transition name="status" mode="out-in">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>
<style lang="scss" scoped></style>
