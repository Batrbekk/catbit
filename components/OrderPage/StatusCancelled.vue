<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useOrderStore } from '~~/stores/orderStore';

const orderId = useStorage('orderId');
const orderStore = useOrderStore();
orderId.value = null;
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Отмена заявки</div>
        <div class="b-section__subtitle">ID заявки: {{ orderStore.id }}</div>
      </div>
      <div class="b-section__content w80 ml-auto mr-auto">
        <div class="b-section__order">
          <div class="b-section__order-status text-center">
            <div class="b-section__order-status-img">
              <img
                width="280"
                class="img-fluid"
                src="/img/icons/logo.png"
                alt="CATBIT"
              />
            </div>
            <p class="b-section__order-status-txt">
              Ваша заявка отменена. Чтобы вернуться к обмену, нажмите на кота.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
