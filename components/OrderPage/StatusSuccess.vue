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
        <div class="b-section__title">Заявка оплачена</div>
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
            <p
              v-if="
                orderStore.get.currency.categories.includes('cash') ||
                orderStore.give.currency.categories.includes('cash')
              "
              class="b-section__order-status-txt"
            >
              Операция обмена с наличными средствами - для продолжения сделки
              просим связаться с нами в
              <a target="_blank" href="tg://resolve?domain=cat_bit">TELEGRAM</a>
            </p>
            <p v-else class="b-section__order-status-txt">
              Средства попадут на ваш счет в течение 30 минут. Нам будет
              приятно, <br class="hide-for-small-only" />
              если вы оставите отзыв о нашей работе. Если хотите вернуться
              <br class="hide-for-small-only" />
              на главную, нажмите на кота.
            </p>
            <div class="b-section__order-status-btn">
              <div class="btn-group text-center">
                <a
                  class="btn btn-gradient uppercase size-normal"
                  target="_blank"
                  href="https://www.bestchange.ru/"
                  >ОСТАВИТЬ ОТЗЫВ <br />НА BESTCHANGE</a
                >
                <NuxtLink
                  class="btn btn-gradient uppercase size-normal"
                  to="/feedback"
                >
                  ОСТАВИТЬ ОТЗЫВ <br />НА САЙТЕ
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
