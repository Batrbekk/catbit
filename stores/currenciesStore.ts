import type { City, Currency, CrossRate, Form } from './types/currencies.type';
export const useCurrenciesStore = defineStore('currenciesStore', () => {
  const currency = ref<Currency[]>([]);
  const crossRates = ref<CrossRate[]>([]);
  const disabledCrossRates = ref<CrossRate[]>([]);
  const isBusy = ref(false);
  const captchaSolved = ref(false);
  const amlAgree = ref(false);
  const deliveryTypes = [
    // { key: "treasure", name: "Клад" },
    { key: 'courier', name: 'Доставка курьером' },
  ];
  const cities = ref<City[]>([]);
  const ua = ref<string | null>(null);
  const isGiveAmount = ref(false);
  const getCurrency = ref<Currency | null>(null);
  const giveCurrency = ref<Currency | null>(null);

  const getAmount = ref(0);
  const giveAmount = ref(0);
  const getForms = ref<{
    email: string;
    telegram: string;
    city: City | undefined;
    deliveryType:
      | {
          key: string;
          name: string;
        }
      | undefined;
  }>({
    email: '',
    telegram: '',
    city: undefined,
    deliveryType: undefined,
  });

  const giveForms = ref<{ [key: string]: string }>({});

  const currencyToGet = computed(() => {
    return currency.value.filter(
      (v) =>
        v.isGet &&
        v.depositable &&
        (giveCurrency.value
          ? !disabledCrossRates.value.find((cr) => {
              return (
                cr.from.bestchangeKey === giveCurrency.value?.bestchangeKey &&
                cr.to.bestchangeKey === v.bestchangeKey &&
                cr.city === undefined
              );
            })
          : true),
    );
  });
  const currencyToGive = computed(() => {
    return currency.value.filter(
      (v) =>
        v.isGive &&
        v.withdrawable &&
        (getCurrency.value
          ? !disabledCrossRates.value.find((cr) => {
              return (
                cr.from.bestchangeKey === v.bestchangeKey &&
                cr.to.bestchangeKey === getCurrency.value?.bestchangeKey &&
                cr.city === undefined
              );
            })
          : true),
    );
  });
  const filteredCities = computed(() => {
    return cities.value.filter((c) =>
      giveCurrency.value && getCurrency.value
        ? !disabledCrossRates.value.find((cr) => {
            return (
              cr.from.bestchangeKey === giveCurrency.value?.bestchangeKey &&
              cr.to.bestchangeKey === getCurrency.value?.bestchangeKey &&
              cr.city !== undefined &&
              cr.city?._id === c._id
            );
          })
        : true,
    );
  });

  const getFixFactor = (currency: Currency) => {
    // return ["RUB", "USDT"].includes(currency.value?.key) ? 2 : 5;
    return currency.precision !== undefined && currency.precision !== null
      ? currency.precision
      : 5;
  };

  const toFixedVal = (currency: Currency, val: number) => {
    const precision = getFixFactor(currency);
    if (precision >= 0) return val.toFixed(precision);
    return (
      Math.ceil(val / Math.pow(10, -1 * precision)) *
      Math.pow(10, -1 * precision)
    );
  };

  const toFixedRate = (currency: Currency, val: number) => {
    const precision = getFixFactor(currency);
    return val.toFixed(precision >= 0 ? precision : 0);
  };

  const directBaseExchangeRate = computed(() => {
    if (
      !giveCurrency.value ||
      !getCurrency.value ||
      (giveCurrency.value.isCash &&
        getCurrency.value.isCash &&
        (!getForms.value.city || !getForms.value.deliveryType)) ||
      (getCurrency.value.isCash &&
        (!getForms.value.city || !getForms.value.deliveryType)) ||
      (giveCurrency.value.isCash && !getForms.value.city)
    )
      return null;
    const baseRate =
      (getCurrency.value.percentGet * getCurrency.value.course) /
      (giveCurrency.value.percentGive * giveCurrency.value.course);
    return baseRate;
  });
  const reverseBaseExchangeRate = computed(() => {
    return directBaseExchangeRate.value && 1 / directBaseExchangeRate.value;
  });

  const directExchangeRate = computed(() => {
    if (
      !giveCurrency.value ||
      !getCurrency.value ||
      (giveCurrency.value.isCash &&
        getCurrency.value.isCash &&
        (!getForms.value.city || !getForms.value.deliveryType)) ||
      (getCurrency.value.isCash &&
        (!getForms.value.city || !getForms.value.deliveryType)) ||
      (giveCurrency.value.isCash && !getForms.value.city)
    )
      return null;
    const crossRate = crossRates.value.find((cr) => {
      return (
        cr.from.bestchangeKey === giveCurrency.value?.bestchangeKey &&
        cr.to.bestchangeKey === getCurrency.value?.bestchangeKey &&
        (!cr.city ||
          (getForms.value.city !== undefined &&
            cr.city._id === getForms.value.city._id))
      );
    });
    if (crossRate && crossRate.out) return 1 / crossRate.out;

    const baseRate =
      (getCurrency.value.percentGet * getCurrency.value.course) /
      (giveCurrency.value.percentGive * giveCurrency.value.course);

    if (
      getCurrency.value.isCash &&
      getForms.value.city &&
      getForms.value.deliveryType
    )
      return (
        baseRate *
        getForms.value.city[
          `${getForms.value.deliveryType.key}CommissionPercent`
        ]
      );
    if (giveCurrency.value.isCash && getForms.value.city)
      return baseRate * getForms.value.city.courierCommissionPercent;
    return baseRate;
  });
  const reverseExchangeRate = computed(() => {
    return directExchangeRate.value && 1 / directExchangeRate.value;
  });

  const findCurrencyOrNull = (items: Currency[], currency: Currency | null) => {
    if (!currency) return null;
    return items.find((item) => item._id === currency._id) || null;
  };

  async function getCurrencyCities() {
    isBusy.value = true;
    const { data, error } = await useAPI<ApiResponse<City[]>>(
      '/api/public/valute-city',
    );
    isBusy.value = false;
    if (error.value) throw new Error(error.value.data);

    cities.value = data.value?.result as City[];
    return cities.value;
  }

  async function getCurrencies() {
    isBusy.value = true;
    const { data, error } = await useAPI<ApiResponse<Currency[]>>(
      '/api/public/valutes',
    );
    const { data: ratesData, error: ratesError } = await useAPI<
      ApiResponse<CrossRate[]>
    >('/api/public/cross-rates');
    isBusy.value = false;
    if (error.value) throw new Error(error.value.data);
    if (ratesError.value) throw new Error(ratesError.value.data);

    currency.value = data.value?.result as Currency[];

    crossRates.value = (ratesData.value?.result as CrossRate[]).filter((cr) => {
      return cr.isDisabled === false;
    });
    disabledCrossRates.value = (ratesData.value?.result as CrossRate[]).filter(
      (cr) => {
        return cr.isDisabled === true;
      },
    );
    getCurrency.value = getCurrency.value
      ? currencyToGet.value.find((v) => v._id === getCurrency.value?._id) ||
        null
      : null;
    giveCurrency.value = giveCurrency.value
      ? currencyToGive.value.find((v) => v._id === giveCurrency.value?._id) ||
        null
      : null;

    return data.value;
  }
  function reverseCurrencyPair() {
    if (
      findCurrencyOrNull(currencyToGet.value, giveCurrency.value) &&
      findCurrencyOrNull(currencyToGive.value, getCurrency.value)
    ) {
      const tempGetCurrency = getCurrency.value;
      getCurrency.value = giveCurrency.value;
      giveCurrency.value = tempGetCurrency;

      const tempGetAmount = getAmount.value;
      getAmount.value = giveAmount.value;
      giveAmount.value = tempGetAmount;
      return true;
    }
    return false;
  }

  const calculateGiveAmount = () => {
    if (!giveCurrency.value) return;
    return (
      parseFloat(
        toFixedVal(
          giveCurrency.value,
          getAmount.value / (reverseExchangeRate.value || 1),
        ).toString(),
      ) || 0
    );
  };

  const calculateGetAmount = () => {
    if (!getCurrency.value) return;
    return (
      parseFloat(
        toFixedVal(
          getCurrency.value,
          giveAmount.value / (directExchangeRate.value || 1),
        ).toString(),
      ) || 0
    );
  };
  function calculateMaxGiveAmount() {
    if (
      !giveCurrency.value ||
      !getCurrency.value ||
      !directExchangeRate.value
    ) {
      return null;
    }

    // Максимальная сумма, которую можно получить
    const maxGetAmount = Number(getCurrency.value.maxGet) || 0;

    // Рассчитываем эквивалент в giveCurrency
    const maxGiveAmountCalculated = maxGetAmount * directExchangeRate.value;

    // Ограничиваем по maxGiveOnce, если оно указано

    const finalMaxGiveAmount = giveCurrency.value?.maxGiveAtOnce
      ? Math.min(
          maxGiveAmountCalculated,
          Number(giveCurrency.value.maxGiveAtOnce),
        )
      : maxGiveAmountCalculated;

    // Округляем с учетом точности валюты
    return parseFloat(
      toFixedVal(giveCurrency.value, finalMaxGiveAmount).toString(),
    );
  }

  function setGiveAmount(val: number) {
    if (!giveCurrency.value) return;
    isGiveAmount.value = true;
    const fixedValue = toFixedVal(giveCurrency.value, +val);
    giveAmount.value = parseFloat(fixedValue.toString());
    getAmount.value = calculateGetAmount() || 0;
  }

  function setGetAmount(val: number) {
    if (!getCurrency.value) return;
    isGiveAmount.value = false;
    const fixedValue = toFixedVal(getCurrency.value, +val);
    getAmount.value = parseFloat(fixedValue.toString());
    giveAmount.value = calculateGiveAmount() || 0;
  }

  function resetGiveAmount(val: number) {
    if (!giveCurrency.value) return;
    const fixedValue = toFixedVal(giveCurrency.value, +val);
    giveAmount.value = parseFloat(fixedValue.toString());
    getAmount.value = calculateGetAmount() || 0;
  }

  function resetGetAmount(val: number) {
    if (!getCurrency.value) return;
    const fixedValue = toFixedVal(getCurrency.value, +val);
    getAmount.value = parseFloat(fixedValue.toString());
    giveAmount.value = calculateGiveAmount() || 0;
  }

  function handleDeliveryTypeOrCity() {
    if (isGiveAmount.value) {
      resetGiveAmount(giveAmount.value);
      // getAmount.value = getDeliveryCommission(getAmount.value);
    } else {
      resetGetAmount(getAmount.value);
      // giveAmount.value = giveDeliveryCommission(giveAmount.value);
    }
  }

  watch(giveCurrency, (value) => {
    // console.log("give", value);
    if (getAmount.value) getAmount.value = calculateGetAmount() || 0;
    // giveAmount.value = calculateGiveAmount();
    if (
      getCurrency.value &&
      giveCurrency.value?._id === getCurrency.value._id
    ) {
      getCurrency.value =
        currency.value
          .filter((v) => v._id !== giveCurrency.value?._id)
          .find(
            (v) =>
              v.isGet &&
              !disabledCrossRates.value.find((cr) => {
                return (
                  cr.from.bestchangeKey === giveCurrency.value?.bestchangeKey &&
                  cr.to.bestchangeKey === v.bestchangeKey
                );
              }),
          ) || null;
    }
  });
  watch(getCurrency, (value) => {
    getAmount.value = calculateGetAmount() || 0;

    if (
      giveCurrency.value &&
      giveCurrency.value._id === getCurrency.value?._id
    ) {
      giveCurrency.value =
        currency.value
          .filter((v) => v._id !== getCurrency.value?._id)
          .find(
            (v) =>
              v.isGive &&
              !disabledCrossRates.value.find((cr) => {
                return (
                  cr.from.bestchangeKey === v.bestchangeKey &&
                  cr.to.bestchangeKey === getCurrency.value?.bestchangeKey
                );
              }),
          ) || null;
    }
  });

  const warnString = computed(() => {
    const msg = `${
      giveCurrency.value && giveCurrency.value.giveWarn
        ? giveCurrency.value.giveWarn + ' '
        : ''
    } ${
      getCurrency.value && getCurrency.value.getWarn
        ? getCurrency.value.getWarn + ' '
        : ''
    }`;
    return msg;
  });

  const rateString = computed(() => {
    if (!giveCurrency.value || !getCurrency.value) return;
    if (!reverseExchangeRate.value || !directExchangeRate.value) {
      if (giveCurrency.value && giveCurrency.value.isCash)
        return `Для расчета курса нужно выбрать валюты и город.`;
      if (getCurrency.value && getCurrency.value.isCash)
        return `Для расчета курса нужно выбрать валюты, город и доставку.`;
      return `Для расчета курса нужно выбрать валюты.`;
    }
    if (reverseExchangeRate.value > directExchangeRate.value)
      return `1 ${giveCurrency.value.key} =
        ${toFixedRate(getCurrency.value, reverseExchangeRate.value)} ${
          getCurrency.value.key
        }`;
    return `1 ${getCurrency.value.key} =
        ${toFixedRate(giveCurrency.value, directExchangeRate.value)} ${
          giveCurrency.value.key
        }`;
  });

  const errorHandlers = [
    {
      handler: (value: string, form: Form) => !value && form.required,
      error: (value: string, form: Form) => ({
        type: 'fieldEmpty',
        message: 'Не заполнено поле',
      }),
    },
    {
      handler: (value: string, form: Form) =>
        value && form.length && value.length !== form.length,
      error: (value: string, form: Form) => ({
        type: 'lengthNotEqual',
        message: `Количество символов должно быть равно ${form.length}`,
      }),
    },
    {
      handler: (value: string, form: Form) =>
        value && form.minLength && value.length < form.minLength,
      error: (value: string, form: Form) => ({
        type: 'lengthLessThanMin',
        message: `Количество символов не должно быть меньше ${form.minLength}`,
      }),
    },
    {
      handler: (value: string, form: Form) =>
        value && form.maxLength && value.length > form.maxLength,
      error: (value: string, form: Form) => ({
        type: 'lengthMoreThanMax',
        message: `Количество символов не должно быть больше ${form.maxLength}`,
      }),
    },
    {
      handler: (value: string, form: Form) =>
        value &&
        form.regexp &&
        form.regexp.value &&
        !new RegExp(`^${form.regexp.value}$`, form.regexp.flags).test(value),
      error: (value: string, form: Form) => ({
        type: 'notMatchRegex',
        message: `Введенные данные не соответствуют шаблону`,
      }),
    },
  ];

  interface FormError {
    hasError: boolean;
    errors: { type: string; message: string }[];
  }

  type FormErrorsMap = { [key: string]: FormError };

  const giveFormsError = computed<FormErrorsMap>(() => {
    if (!giveCurrency.value) return {};

    return giveCurrency.value.forms
      .filter((f: { type: number }) => f.type === 0)
      .reduce<FormErrorsMap>((prev, curr) => {
        const errors = errorHandlers
          .map((h) => ({
            isError: h.handler(giveForms.value[curr._id], curr),
            error: h.error(giveForms.value[curr._id], curr),
          }))
          .filter((h) => h.isError)
          .map((h) => h.error);

        return {
          ...prev,
          [curr._id]: {
            hasError: !!errors.length,
            errors,
          },
        };
      }, {});
  });

  const getFormsError = computed<FormErrorsMap>(() => {
    if (!getCurrency.value) return {};
    return getCurrency.value.forms
      .filter((f: { type: number }) => f.type === 1)
      .reduce((prev, curr) => {
        const form = getForms.value[curr._id as keyof typeof getForms.value];
        const errors = errorHandlers
          .map((h) => ({
            isError: typeof form === 'string' ? h.handler(form, curr) : false,
            error: typeof form === 'string' ? h.error(form, curr) : undefined,
          }))
          .filter((h) => h.isError)
          .map((h) => h.error);

        return {
          ...prev,
          [curr._id]: {
            hasError: !!errors.length,
            errors,
          },
        };
      }, {});
  });

  const calculatedLimits = computed(() => {
    if (!getCurrency.value || !giveCurrency.value) {
      return {
        get: {
          selfMin: undefined,
          calculatedMin: undefined,
          trueMin: undefined,
        },
        give: {
          selfMin: undefined,
          calculatedMin: undefined,
          trueMin: undefined,
        },
      };
    }

    const getSelfMin =
      getCurrency.value.isCash && getForms.value.city
        ? getForms.value.city?.minWithdrawalAmount / getCurrency.value.course
        : getCurrency.value.minGive;

    const getCalculatedMin =
      (reverseExchangeRate.value || 1) *
      (giveCurrency.value.isCash && getForms.value.city
        ? getForms.value.city?.minWithdrawalAmount / giveCurrency.value.course
        : giveCurrency.value.minGive);

    const giveSelfMin =
      giveCurrency.value.isCash && getForms.value.city
        ? getForms.value.city?.minWithdrawalAmount / giveCurrency.value.course
        : giveCurrency.value.minGive;

    const giveCalculatedMin =
      (directExchangeRate.value || 1) *
      (getCurrency.value.isCash && getForms.value.city
        ? getForms.value.city?.minWithdrawalAmount / getCurrency.value.course
        : getCurrency.value.minGive);

    const getTrueMin = parseFloat(
      toFixedVal(
        getCurrency.value,
        Math.max(getSelfMin, getCalculatedMin),
      ).toString(),
    );

    const giveTrueMin = parseFloat(
      toFixedVal(
        giveCurrency.value,
        Math.max(giveSelfMin, giveCalculatedMin),
      ).toString(),
    );

    return {
      get: {
        selfMin: getSelfMin,
        calculatedMin: getCalculatedMin,
        trueMin: getTrueMin,
      },
      give: {
        selfMin: giveSelfMin,
        calculatedMin: giveCalculatedMin,
        trueMin: giveTrueMin,
      },
    };
  });

  const giveError = computed(() => {
    if (!giveCurrency.value)
      return {
        hasError: true,
        error: {
          type: 'giveIsEmpty',
          message: 'Не выбрана валюта',
        },
      };
    if (!calculatedLimits.value.give.trueMin)
      return {
        hasError: true,
        error: {
          type: 'limitsNotSet',
          message: 'Заполните остальные необходимые поля',
        },
      };
    if (+giveAmount.value < calculatedLimits.value.give.trueMin)
      return {
        hasError: true,
        error: {
          type: 'lessThanMin',
          message: 'Введенное значение меньше допустимого',
        },
      };
    if (+giveAmount.value > +giveCurrency.value.maxGet)
      return {
        hasError: true,
        error: {
          type: 'moreThanMax',
          message: 'Введенное значение больше допустимого',
        },
      };
    if (
      giveCurrency.value &&
      giveCurrency.value.maxGiveAtOnce &&
      +giveAmount.value > +giveCurrency.value.maxGiveAtOnce
    )
      return {
        hasError: true,
        error: {
          type: 'moreThanMaxGiveAtOnce',
          message: `Больше единоразовой суммы ${giveCurrency.value.maxGiveAtOnce} ${giveCurrency.value.key}.`,
        },
      };
    return {
      hasError: false,
    };
  });

  const getError = computed(() => {
    if (!getCurrency.value) {
      return {
        hasError: true,
        error: {
          type: 'getIsEmpty',
          message: 'Не выбрана валюта',
        },
      };
    }
    if (!calculatedLimits.value.get.trueMin)
      return {
        hasError: true,
        error: {
          type: 'limitsNotSet',
          message: 'Заполните остальные необходимые поля',
        },
      };

    const minGive = calculatedLimits.value.get.trueMin;
    const maxGet = getCurrency.value.maxGet;

    if (+getAmount.value < +minGive) {
      return {
        hasError: true,
        error: {
          type: 'lessThanMin',
          message: 'Введенное значение меньше допустимого',
        },
      };
    }

    if (+getAmount.value > +maxGet) {
      return {
        hasError: true,
        error: {
          type: 'moreThanMax',
          message: 'Введенное значение больше допустимого',
        },
      };
    }
    // }

    return {
      hasError: false,
    };
  });

  const hasAnyErrors = computed(() => {
    return (
      giveError.value.hasError ||
      getError.value.hasError ||
      !!Object.entries(giveFormsError.value).some((curr) => {
        const [, value] = curr;
        return (
          typeof value === 'object' &&
          value !== null &&
          'hasError' in value &&
          (value as { hasError: boolean }).hasError
        );
      }) ||
      !!Object.entries(getFormsError.value).some((curr) => {
        const [, value] = curr;
        return (
          typeof value === 'object' &&
          value !== null &&
          'hasError' in value &&
          (value as { hasError: boolean }).hasError
        );
      })
    );
  });

  const dataToSend = computed(() => {
    return {
      status: 0,
      referal: null,
      isCrypto: false,
      ip: '192.168.1.1',
      ua: ua.value,
      give: giveCurrency.value
        ? {
            currency_id: giveCurrency.value._id,
            isCash: giveCurrency.value.isCash,
            forms: {
              count: giveAmount.value,
              ...Object.entries(giveFormsError.value).reduce((prev, curr) => {
                const key = giveCurrency.value?.forms.find(
                  (f) => f._id === curr[0],
                )?.key;

                // Проверяем, что key существует и имеет тип string, number или symbol
                if (key) {
                  return {
                    ...prev,
                    [key]: giveForms.value[curr[0]] || '',
                  };
                } else {
                  return prev;
                }
              }, {}),
            },
          }
        : null,
      get: getCurrency.value
        ? {
            currency_id: getCurrency.value._id,
            isCash: getCurrency.value.isCash,
            forms: {
              result: getAmount.value,
              email: getForms.value.email || '',
              ...(giveCurrency.value?.isCash || getCurrency.value.isCash
                ? {
                    telegram: getForms.value.telegram || '',
                    city:
                      (getForms.value.city && getForms.value.city.name) || null,
                    deliveryType: giveCurrency.value?.isCash
                      ? 'courier'
                      : (getForms.value.deliveryType &&
                          getForms.value.deliveryType.name) ||
                        null,
                  }
                : {}),
              ...Object.entries(getFormsError.value).reduce((prev, curr) => {
                const key = getCurrency.value?.forms.find(
                  (f) => f._id === curr[0],
                )?.key;
                if (key) {
                  const form =
                    getForms.value[curr[0] as keyof typeof getForms.value];
                  return {
                    ...prev,
                    [key]: form || '',
                  };
                } else {
                  return prev;
                }
              }, {}),
            },
          }
        : null,
    };
  });

  const isGiveNotCrypto = computed(() => {
    return (
      giveCurrency.value &&
      giveCurrency.value.forms &&
      giveCurrency.value.forms.some(
        (form) =>
          form.key === 'nomer_karti' ||
          form.key === 'nomer_karti_s_kotoroi_otpravlyaete',
      )
    );
  });

  return {
    currency,
    crossRates,
    getCurrencies,
    getCurrencyCities,
    handleDeliveryTypeOrCity,
    giveCurrency,
    getCurrency,
    currencyToGet,
    currencyToGive,
    directExchangeRate,
    reverseExchangeRate,
    directBaseExchangeRate,
    reverseBaseExchangeRate,
    reverseCurrencyPair,
    getAmount,
    giveAmount,
    setGiveAmount,
    setGetAmount,
    deliveryTypes,
    giveError,
    getError,
    getForms,
    cities,
    filteredCities,
    giveForms,
    giveFormsError,
    getFormsError,
    hasAnyErrors,
    isGiveNotCrypto,
    dataToSend,
    captchaSolved,
    amlAgree,
    rateString,
    warnString,
    getFixFactor,
    // getFixFactorByCurrency,
    ua,
    calculatedLimits,
    calculateMaxGiveAmount,
  };
});
