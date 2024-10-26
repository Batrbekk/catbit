<script setup lang="ts">
import ExchangeCard from '~~/components/ExchangeForm/ExchangeCard.vue';
import ExchangeUserInputForms from '~~/components/ExchangeForm/ExchangeUserInputForms.vue';
import { useCurrenciesStore } from '~~/stores/currenciesStore';

const CurrenciesStore = useCurrenciesStore();
const isInProd = process.env.NODE_ENV === 'production';

const submitHandler = async () => {
  if (
    CurrenciesStore.hasAnyErrors ||
    (isInProd && !CurrenciesStore.captchaSolved)
  )
    return;
  await navigateTo({ path: '/new' });
};
</script>
<template>
  <section class="s-exchange b-section">
    <div class="b-section__content">
      <div class="b-exchange ml-auto mr-auto">
        <form
          class="b-exchange__form app-form-exchange"
          @submit.prevent="submitHandler"
        >
          <div class="b-exchange__row row-field row-field--flex align-center">
            <ExchangeCard type="give" />
            <ExchangeCard type="get" />
          </div>
          <ExchangeUserInputForms />
        </form>
      </div>
    </div>
  </section>
</template>
