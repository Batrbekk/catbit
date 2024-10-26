export default defineNuxtRouteMiddleware(() => {
  const modalStore = useModalStore();
  modalStore.closeAllModals();
});
