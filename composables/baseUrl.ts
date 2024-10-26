export default function () {
  const baseUrl = useRuntimeConfig().public.prodApiUrl;
  return baseUrl + '/';
}
