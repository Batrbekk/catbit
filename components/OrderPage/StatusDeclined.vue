<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useOrderStore } from '~~/stores/orderStore';

const orderStore = useOrderStore();
const orderId = useStorage('orderId');
orderId.value = null;
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Заявка отклонена</div>
        <div class="b-section__subtitle">ID заявки: {{ orderStore.id }}</div>
      </div>
      <div class="b-section__content w80 ml-auto mr-auto">
        <div class="b-section__order">
          <div class="b-section__order-status text-center">
            <div class="b-section__order-status-img">
              <img
                width="280"
                class="img-fluid"
                src="~/assets/img/common/logo.png"
                alt="CATBIT"
              />
            </div>
            <div v-if="orderStore.wbWithdrawStatus">
              <p class="b-section__order-status-txt">
                При обработке вашей заявки произошли ошибки.
              </p>
              <p class="b-section__order-status-txt">
                Пожалуйста, обратитесь к оператору. ID заявки
                {{ orderStore.id }}
              </p>
            </div>
            <div v-else>
              <p class="b-section__order-status-txt">
                Ваша заявка была отклонена оператором.
              </p>
              <p
                v-if="orderStore.resultMessage"
                class="b-section__order-status-txt"
              >
                Причина: {{ orderStore.resultMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
