export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.prodApiUrl;

  const api = $fetch.create({
    baseURL,
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
