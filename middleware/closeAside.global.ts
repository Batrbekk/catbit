export default defineNuxtRouteMiddleware(() => {
  const appStore = useAppStore();
  appStore.isAsideOpen = false;
});
