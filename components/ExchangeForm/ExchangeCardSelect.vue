<script setup lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { useCurrenciesStore } from '~~/stores/currenciesStore';

const props = defineProps(['type']);
const currenciesStore = useCurrenciesStore();

const filteredCurrencies = computed(() => {
  return currenciesStore[
    props.type === 'get' ? 'currencyToGet' : 'currencyToGive'
  ];
});
</script>
<template>
  <div class="b-widget__select">
    <vSelect
      v-model="
        currenciesStore[props.type === 'get' ? 'getCurrency' : 'giveCurrency']
      "
      :options="filteredCurrencies"
      label="title"
      :clearable="false"
      :placeholder="'Выберите валюту'"
    >
      <template #option="option">
        <div class="option">
          <img :src="option.image" alt="" /> {{ option.title }}
        </div>
      </template>
      <template #selected-option="option">
        <div class="selected_option">
          <img :src="option.image" alt="" /> {{ option.title }}
        </div>
      </template>
      <template #no-options="{ search }"> Ничего не найдено </template>
    </vSelect>
  </div>
</template>
<style lang="scss" scoped>
.option {
  font-size: 2rem;

  img {
    height: 3rem;
  }
}

.selected_option {
  font-size: 3rem;

  img {
    height: 3rem;
  }
}

:deep() {
  .vs__search {
    &:hover {
      border-color: transparent;
    }
  }
}
</style>
