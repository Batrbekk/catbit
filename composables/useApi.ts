import type { UseFetchOptions } from 'nuxt/app';
type useAPIParams<T> = {
  options?: UseFetchOptions<T>;
  auth?: boolean;
};

export function useAPI<T>(
  url: string | (() => string),
  { options, auth }: useAPIParams<T> | undefined = {},
) {
  if (!options) {
    options = {};
  }
  options.credentials = 'include';
  const key = url + ((options?.query && JSON.stringify(options?.query)) || '');

  if (auth) {
    const token = useCookie('Auth').value;
    if (!token) {
      // navigateTo('/login');
    } else {
      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return useFetch(url, {
    key,
    ...options,
    $fetch: useNuxtApp().$api,
  });
}
