import { useLocalStorage } from '@vueuse/core';

export const useOrderStore = defineStore('orderStore', () => {
  const isBusy = ref(false);
  const date = ref(null);
  const get = ref(null);
  const give = ref(null);
  const resultMessage = ref(null);
  const status = ref(null);
  const id = ref(null);
  const url = ref(null);
  const paymentId = ref(null);
  const vanilaDepositStatus = ref(null);
  const wbWithdrawStatus = ref(null);
  const wbDepositStatus = ref(null);
  const sbercoreDepositResult = ref(null);

  const statusText = computed(() => {
    const statuses = {
      0: 'в ожидании',
      1: 'идет проверка',
      2: 'заявка выполнена',
      3: 'заявка отклонена',
      4: 'заявка отменена пользователем',
      5: 'ожидание загрузки проверки карты',
      6: 'проверка карты',
    };
    if (status.value === null) return 'N/A';
    return statuses[status.value] ? statuses[status.value] : 'N/A';
  });

  function resetOrder() {
    isBusy.value = false;
    date.value = null;
    get.value = null;
    give.value = null;
    resultMessage.value = null;
    status.value = null;
    id.value = null;
    url.value = null;
    paymentId.value = null;
    vanilaDepositStatus.value = null;
    wbWithdrawStatus.value = null;
    sbercoreDepositResult.value = null;
  }

  async function createOrder(body) {
    isBusy.value = true;
    const { data: ipResponse } = await useFetch<{
      ip_address: { data };
      data;
    }>(
      'https://ipgeolocation.abstractapi.com/v1/?api_key=efefcecee872491f9450e34598b47828',
    );
    const ip = (ipResponse.value && ipResponse.value.ip_address) || null;

    const referer = useLocalStorage('referer', null);

    const oldReferer = useCookie('referal');

    let orderStatus = 0;
    if (body.give.isCash) {
      orderStatus = 1;
    }
    if (
      (body.give.forms.nomer_karti ||
        body.give.forms.nomer_karti_s_kotoroi_otpravlyaete) &&
      !body.give.forms.nomer_koshelka_s_kotorogo_otpravlyaete
    ) {
      orderStatus = 5;
    }

    const { data, error } = await useAPI(
      '/api/public/transactions/create-transaction',
      {
        options: {
          method: 'POST',
          body: {
            ...body,
            ip,
            status: orderStatus,
            referal: oldReferer.value || referer.value || null,
          },
        },
        auth: true,
      },
    );
    isBusy.value = false;
    if (error.value) {
      throw new Error(error.value.data);
    }
    return data.value;
  }

  async function getOrder() {
    if (!id.value) throw new Error('Не задан ID заявки');
    isBusy.value = true;

    const { data, error } = await useAPI(
      `/api/public/transactions/get-transaction/${id.value}`,
      { auth: true },
    );
    isBusy.value = false;
    if (error.value) throw new Error(error.value.data);

    date.value = data.value.date;
    get.value = data.value.get;
    give.value = data.value.give;
    resultMessage.value = data.value.resultMessage;
    status.value = data.value.status;
    id.value = data.value._id;
    url.value = data.value.url || null;
    paymentId.value = data.value.paymentId || null;
    vanilaDepositStatus.value = data.value.vanilaDepositStatus || null;
    wbWithdrawStatus.value = data.value.wbWithdrawStatus || null;
    wbDepositStatus.value = data.value.wbDepositStatus || null;
    sbercoreDepositResult.value = data.value.sbercoreDepositResult || null;

    return data.value;
  }

  async function updateOrder(body) {
    if (!id.value) throw new Error('Не задан ID заявки');
    isBusy.value = true;
    const { data, error } = await useAPI(
      `/api/public/transactions/${id.value}`,
      {
        options: {
          method: 'POST',
          body,
        },
        auth: true,
      },
    );

    isBusy.value = false;
    if (error.value) {
      throw new Error(error.value.data);
    }
    await getOrder();
    return data.value;
  }

  return {
    isBusy,
    date,
    get,
    give,
    resultMessage,
    status,
    id,
    url,
    paymentId,
    vanilaDepositStatus,
    wbWithdrawStatus,
    wbDepositStatus,
    sbercoreDepositResult,
    createOrder,
    getOrder,
    updateOrder,
    resetOrder,
    statusText,
  };
});
