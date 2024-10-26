export default defineNuxtRouteMiddleware((to, from) => {
  const currenciesStore = useCurrenciesStore();
  if (to.path === '/new' && currenciesStore.hasAnyErrors) {
    return abortNavigation();
  }
});
