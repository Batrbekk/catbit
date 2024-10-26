<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { useUserStore } from '~~/stores/userStore';
import { useCurrenciesStore } from '~~/stores/currenciesStore';
const { $useToast } = useNuxtApp();
const toast = $useToast();
const userStore = useUserStore();
const currenciesStore = useCurrenciesStore();

const captchaSolved = ref(false);
const isInProd = process.env.NODE_ENV === 'production';

const selectedCurrency = ref(currenciesStore.currencyToGet[0]);
const count = ref(0);
const currencyForms = computed(() => {
  return selectedCurrency.value.forms.filter((form) => form.type === 1);
});
const formsValues = ref({});
watchEffect(() => {
  formsValues.value = Object.fromEntries(
    currencyForms.value.map((form) => [form.key, '']),
  );
});
const amountRub = computed(() => {
  return count.value * selectedCurrency.value.course;
});

const resetForm = () => {
  selectedCurrency.value = currenciesStore.currencyToGet[0];
  count.value = 0;
  formsValues.value = {};
};

const isDataValid = computed(() => {
  return (
    amountRub.value >= 1000 &&
    userStore.profileData.balance >= amountRub.value &&
    currencyForms.value.reduce((prev, curr) => {
      return prev && (curr.required ? !!formsValues.value[curr.key] : true);
    }, true)
  );
});

const sendOutputFormData = async () => {
  if (!isDataValid.value) return toast.error('Форма заполнена некорректно!');
  if (isInProd && !captchaSolved.value)
    return toast.error('Пожалуйста, подтвердите, что вы человек');
  try {
    const data = {
      currencyId: selectedCurrency.value._id,
      forms: [
        {
          key: 'count',
          value: count.value,
          title: 'Количество',
        },
        ...currencyForms.value.map((form) => {
          return {
            ...form,
            value: formsValues.value[form.key],
          };
        }),
      ],
    };
    await userStore.sendOutputFormData(data);
    toast.success('Заявка успешно создана!');
    resetForm();
  } catch (error) {}
};
</script>
<template>
  <div>
    <div class="b-profile__row flex align-middle">
      <span class="b-profile__subtitle mb-0">Выберите валюту:</span>
      <div class="b-profile__select">
        <div class="select-wrp">
          <select
            id="currency"
            v-model="selectedCurrency"
            class="select--currency _hidden-search"
          >
            <option
              v-for="(currency, index) in currenciesStore.currencyToGet"
              :key="index"
              :value="currency"
            >
              {{ currency.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="b-profile__row flex align-middle">
      <span class="b-profile__subtitle mb-0">Количество:</span>
      <div class="b-profile__select">
        <input v-model="count" type="text" />
      </div>
    </div>
    <div
      v-for="form in currencyForms"
      :key="form.key"
      class="b-profile__row flex align-middle"
    >
      <span class="b-profile__subtitle mb-0"
        ><span v-if="form.required" class="required">*</span
        >{{ form.title }}:</span
      >
      <div class="b-profile__select">
        <input
          v-model="formsValues[form.key]"
          :required="form.required"
          type="text"
        />
      </div>
    </div>
    <div class="b-profile__row flex align-middle">
      Стоимость: {{ amountRub.toFixed(2) }} руб.
    </div>
    <div class="b-profile__row flex align-middle">
      Минимальная сумма для вывода: 1000 руб.
    </div>
    <client-only>
      <div class="b-profile__row flex align-middle">
        <vue-hcaptcha
          sitekey="81e72088-11e1-438f-9084-0eff53348b80"
          @verify="captchaSolved = true"
          @error="captchaSolved = false"
          @expired="captchaSolved = false"
          @challenge-expired="captchaSolved = false"
        ></vue-hcaptcha>
      </div>
    </client-only>
    <div class="b-profile__row flex align-middle">
      <button
        :disabled="!isDataValid || (isInProd && !captchaSolved)"
        @click.prevent="sendOutputFormData"
      >
        Создать заявку
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.required {
  color: var(--input-border-color);
}
</style>
