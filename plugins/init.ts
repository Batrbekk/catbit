import { useUserStore } from '~~/stores/userStore';
import { useCurrenciesStore } from '~~/stores/currenciesStore';
import { useAppStore } from '~~/stores/appStore';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', async (vueApp) => {
    const router = useRouter();
    const userStore = useUserStore();
    const currenciesStore = useCurrenciesStore();
    const appStore = useAppStore();
    await userStore.init();
    await currenciesStore.getCurrencies();
    await currenciesStore.getCurrencyCities();

    const interval = setInterval(async () => {
      await currenciesStore.getCurrencies();
      await currenciesStore.getCurrencyCities();
    }, 1000 * 20);
    const findGive =
      router.currentRoute.value.query &&
      router.currentRoute.value.query.cur_from &&
      currenciesStore.currencyToGive.find(
        (v) =>
          v.bestchangeKey === router.currentRoute.value.query.cur_from ||
          `${v.bestchangeKey}20` === router.currentRoute.value.query.cur_from,
      );

    const findGet =
      router.currentRoute.value.query &&
      router.currentRoute.value.query.cur_to &&
      currenciesStore.currencyToGet.find(
        (v) =>
          v.bestchangeKey === router.currentRoute.value.query.cur_to ||
          `${v.bestchangeKey}20` === router.currentRoute.value.query.cur_to,
      );

    currenciesStore.getCurrency = findGet || currenciesStore.getCurrency;
    currenciesStore.giveCurrency = findGive || currenciesStore.giveCurrency;

    const ua = import.meta.server
      ? useRequestHeaders(['user-agent'])['user-agent']
      : navigator.userAgent;

    currenciesStore.ua = ua || null;

    appStore.setInitComplete();
  });
});
