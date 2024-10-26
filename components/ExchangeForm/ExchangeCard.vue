<script setup lang="ts">
import ExchangeCardSelect from '~~/components/ExchangeForm/ExchangeCardSelect.vue';
import { useAppStore } from '~~/stores/appStore';
import { useCurrenciesStore } from '~~/stores/currenciesStore';

const currenciesStore = useCurrenciesStore();
const appStore = useAppStore();

const props = defineProps<{ type: 'get' | 'give' }>();

const currency = computed(() => {
  return currenciesStore[props.type === 'get' ? 'getCurrency' : 'giveCurrency'];
});
const error = computed(() => {
  return currenciesStore[props.type === 'get' ? 'getError' : 'giveError'];
});

const inputKey = ref(1);
const inputRef = ref(null);

const no = (num, d = 5) => parseFloat(num.toFixed(d));

const calculatedLimits = computed(
  () => currenciesStore.calculatedLimits[props.type],
);

const classes = ref({
  give: ['b-widget b-widget--exchange _exchange-give'],
  get: ['b-widget b-widget--exchange _exchange-give'],
});

const ids = ref({
  give: ['currency_give', 'amount-give', 'currency-lbl-give'],
  get: ['currency_get', 'amount-get', 'currency-lbl-get'],
});
const strings = ref({
  give: ['Отдаете'],
  get: ['Получаете'],
});

const limitsString = computed(() => {
  if (!currency.value || !calculatedLimits.value.trueMin) {
    return 'Выберите валюты';
  }
  if (
    (props.type === 'get' && currenciesStore.getCurrency?.isCash) ||
    (props.type === 'give' && currenciesStore.giveCurrency?.isCash)
  ) {
    if (!currenciesStore.getForms.city) {
      return 'Выберите город для определения мин суммы';
    } else {
      return `От ${calculatedLimits.value.trueMin}`;
    }
  } else {
    return `От ${calculatedLimits.value.trueMin} до ${currency.value.maxGet} ${currency.value.key}`;
  }
});
</script>
<template>
  <div class="b-exchange__col b-exchange__card">
    <transition name="cardSlide" mode="out-in">
      <div v-if="appStore.isInit" :class="classes[props.type][0]">
        <div class="b-widget__header">
          <ExchangeCardSelect :type="props.type" />
        </div>
        <div class="b-widget__body">
          <div class="b-widget__head">
            <div class="b-widget__title">{{ strings[props.type][0] }}</div>
            <div class="b-widget__txt">{{ limitsString }}</div>
          </div>
          <div class="b-widget__input">
            <input
              :id="ids[props.type][1]"
              ref="inputRef"
              :key="inputKey"
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
                currenciesStore[
                  props.type === 'get' ? 'getAmount' : 'giveAmount'
                ]
              "
              inputmode="numeric"
              required
              step="any"
              @change="
                (e) => {
                  currenciesStore[
                    props.type === 'get' ? 'setGetAmount' : 'setGiveAmount'
                  ](e.target.value);
                  inputKey++;
                  inputRef.focus();
                }
              "
            />
            <span
              v-if="currency"
              :id="ids[props.type][2]"
              class="b-widget__input-lbl"
              >{{ currency.key }}</span
            >
          </div>
        </div>
        <transition name="slideDown" mode="out-in">
          <div v-if="error.hasError" class="text-message--error">
            {{ error.error.message }}
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.b-widget--exchange {
  position: relative;

  .text-message--error {
    position: absolute;
    bottom: 4px;
    font-size: 0.85em;
  }
}
</style>
