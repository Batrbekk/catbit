<template>
  <div class="change-block">
    <h3 class="change-block__title">
      {{ type === 'give' ? 'Отдаете' : 'Получаете' }}
    </h3>
    <div class="change-select">
      <OnClickOutside
        class="change-select_top"
        @trigger="
          () => {
            isOpen = false;
            currency && (search = currency?.title);
          }
        "
      >
        <svg
          class="search"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
        >
          <path
            d="M15.1635 14.4915L12.0395 11.3674C12.7916 10.3661 13.1976 9.14732 13.1963 7.895C13.1963 4.69621 10.5938 2.09375 7.395 2.09375C4.19621 2.09375 1.59375 4.69621 1.59375 7.895C1.59375 11.0938 4.19621 13.6963 7.395 13.6963C8.64732 13.6976 9.8661 13.2916 10.8674 12.5395L13.9915 15.6635C14.1496 15.8049 14.3559 15.8804 14.5679 15.8744C14.7799 15.8685 14.9816 15.7816 15.1316 15.6316C15.2816 15.4816 15.3685 15.2799 15.3744 15.0679C15.3804 14.8559 15.3049 14.6496 15.1635 14.4915ZM3.25125 7.895C3.25125 7.07544 3.49428 6.27429 3.9496 5.59286C4.40492 4.91142 5.05208 4.38031 5.80926 4.06667C6.56643 3.75304 7.3996 3.67098 8.20341 3.83087C9.00722 3.99076 9.74556 4.38541 10.3251 4.96493C10.9046 5.54444 11.2992 6.28279 11.4591 7.08659C11.619 7.8904 11.537 8.72357 11.2233 9.48074C10.9097 10.2379 10.3786 10.8851 9.69715 11.3404C9.01571 11.7957 8.21456 12.0388 7.395 12.0388C6.29641 12.0374 5.2432 11.6004 4.46638 10.8236C3.68956 10.0468 3.25257 8.99359 3.25125 7.895Z"
            fill="white"
          />
        </svg>
        <input
          v-model="search"
          type="text"
          class="change-select__search"
          placeholder="Введите название банка или валюту"
          @click="isOpen = true"
          @focusin="() => (search = '')"
        />
        <svg
          class="arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.0087 4.29283C13.8212 4.10536 13.5669 4.00004 13.3017 4.00004C13.0366 4.00004 12.7823 4.10536 12.5947 4.29283L7.64473 9.24283L2.69473 4.29283C2.50612 4.11067 2.25352 4.00988 1.99132 4.01216C1.72913 4.01443 1.47832 4.1196 1.29291 4.30501C1.1075 4.49042 1.00233 4.74123 1.00005 5.00343C0.997774 5.26563 1.09857 5.51823 1.28073 5.70683L6.93773 11.3638C7.12526 11.5513 7.37956 11.6566 7.64473 11.6566C7.90989 11.6566 8.1642 11.5513 8.35173 11.3638L14.0087 5.70683C14.1962 5.5193 14.3015 5.26499 14.3015 4.99983C14.3015 4.73466 14.1962 4.48036 14.0087 4.29283Z"
            fill="#8688AA"
          />
        </svg>
        <div
          class="change-list_wrapper"
          :style="{ display: isOpen ? 'block' : 'none' }"
        >
          <div class="change-list_tags">
            <span
              v-for="filter of initialFilters"
              :key="filter.title"
              :class="{ 'is-active': category === filter.value }"
              @click="category = filter.value"
              >{{ filter.title }}</span
            >
          </div>
          <ul class="change-list">
            <li
              v-for="cur of filteredCurrencies"
              :key="cur._id"
              @click="
                () => {
                  currenciesStore[
                    props.type === 'get' ? 'getCurrency' : 'giveCurrency'
                  ] = cur;
                  search = cur.title;
                  isOpen = false;
                }
              "
            >
              <img :src="baseUrl() + cur.image" alt="Bitcoin BTC" />
              <span>{{ cur.title }}</span>
            </li>
          </ul>
        </div>
      </OnClickOutside>
      <div class="change-select__text">Выберите валюту</div>
      <div class="change-select_bottom">
        <div class="change-select_bottom__title">
          Сумма, которую {{ props.type === 'get' ? 'получаете' : 'отдаете' }}
        </div>
        <div class="change-select_bottom--input">
          <input
            :id="ids[props.type][1]"
            :disabled="
              !(
                currency &&
                currenciesStore.reverseExchangeRate &&
                currenciesStore.directExchangeRate
              )
            "
            class="input-amount"
            type="number"
            :value="
              currenciesStore[props.type === 'get' ? 'getAmount' : 'giveAmount']
            "
            :placeholder="'Введите сумму'"
            inputmode="numeric"
            step="any"
            required
            @input="
              async (e) => {
                currenciesStore[
                  props.type === 'get' ? 'setGetAmount' : 'setGiveAmount'
                ](Number((e.target as HTMLInputElement).value));
                inputKey++;
                await nextTick();
                (e.target as HTMLInputElement).focus();
              }
            "
          />
          <div v-if="currency" class="change-select_bottom__coin">
            <img :src="baseUrl() + currency.image" :alt="currency.title" />
            <span>{{ currency.title }}</span>
          </div>
        </div>
        <div
          v-if="
            currency &&
            currenciesStore.reverseExchangeRate &&
            currenciesStore.directExchangeRate
          "
          class="change-list_tags change-list_tags--big"
        >
          <span
            v-if="calculatedLimits.trueMin"
            :class="{
              'is-active':
                calculatedLimits.trueMin ===
                currenciesStore[
                  props.type === 'get' ? 'getAmount' : 'giveAmount'
                ],
            }"
            @click="
              currenciesStore[
                props.type === 'get' ? 'setGetAmount' : 'setGiveAmount'
              ](calculatedLimits.trueMin)
            "
            >Мин {{ calculatedLimits.trueMin }}</span
          >
          <span
            v-if="!isNaN(Number(currency.maxGet))"
            :class="{
              'is-active':
                (props.type === 'get'
                  ? Number(currency.maxGet)
                  : currenciesStore.calculateMaxGiveAmount()) ===
                currenciesStore[
                  props.type === 'get' ? 'getAmount' : 'giveAmount'
                ],
            }"
            @click="
              currenciesStore[
                props.type === 'get' ? 'setGetAmount' : 'setGiveAmount'
              ](max || 0)
            "
            >Макс {{ max }}</span
          >

          <!-- <span>20000</span>
          <span>50000</span>
          <span>100000</span> -->
        </div>
      </div>
    </div>
    <span
      v-if="first"
      class="change__arrows"
      @click="currenciesStore.reverseCurrencyPair()"
    >
      <img src="/img/icons/switch-arrows.svg" alt="Switch" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
const initialFilters = [
  { title: 'Все', value: '' },
  { title: 'Криптовалюта', value: 'crypto' },
  { title: 'Банки', value: 'bank' },
  { title: 'Наличные', value: 'cash' },
];
const category = ref('');
const search = ref('');
const max = computed(() => {
  if (!currency.value) return 0;
  return props.type === 'get'
    ? Number(currency.value.maxGet)
    : currenciesStore.calculateMaxGiveAmount();
});
const props = defineProps<{ type: 'give' | 'get'; first?: boolean }>();
const currenciesStore = useCurrenciesStore();
const isOpen = ref(false);
const filteredCurrencies = computed(() => {
  let currencies =
    currenciesStore[props.type === 'get' ? 'currencyToGet' : 'currencyToGive'];

  if (currency.value) {
    currencies = currencies.filter((el) => el._id !== currency.value?._id);
  }

  if (counterCurrency.value) {
    currencies = currencies.filter(
      (el) => el._id !== counterCurrency.value?._id,
    );
  }

  if (category.value)
    currencies = currencies.filter((el) =>
      el.categories.includes(category.value),
    );
  if (search.value)
    currencies = currencies.filter((el) =>
      el.title.toLowerCase().includes(search.value.toLowerCase()),
    );
  return currencies;
});
const inputKey = ref(1);
const ids = ref({
  give: ['currency_give', 'amount-give', 'currency-lbl-give'],
  get: ['currency_get', 'amount-get', 'currency-lbl-get'],
});
const currency = computed(() => {
  return currenciesStore[props.type === 'get' ? 'getCurrency' : 'giveCurrency'];
});
const counterCurrency = computed(() => {
  return currenciesStore[
    props.type === 'give' ? 'getCurrency' : 'giveCurrency'
  ];
});

const calculatedLimits = computed(
  () => currenciesStore.calculatedLimits[props.type],
);
watch(currency, () => {
  if (currency.value) search.value = currency.value?.title;
});
</script>

<style scoped></style>
