export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (to.path === '/profile' && !userStore.isAuthorized) {
    return abortNavigation();
  }
});
