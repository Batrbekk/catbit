export default defineNuxtRouteMiddleware((to, from) => {
  const orderStore = useOrderStore();
  if (from.name === 'order-id' && to.name !== 'order-id') {
    orderStore.resetOrder();
  }
});
