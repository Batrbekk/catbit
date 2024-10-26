<script setup lang="ts">
import { useOrderStore } from "~~/stores/orderStore";
const orderStore = useOrderStore();
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Проверка заявки</div>
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
              v-if="orderStore.wbWithdrawStatus"
              class="b-section__order-status-txt"
            >
              Наш робот-кот уже направил вам средства. Это может занять
              <br class="hide-for-small-only" />
              некоторое время. Страница обновится автоматически,
              <br class="hide-for-small-only" />
              просто оставайтесь здесь.
            </p>
            <p v-else class="b-section__order-status-txt">
              Наш менеджер проверяет заявку. Это может занять
              <br class="hide-for-small-only" />
              некоторое время. Страница обновится автоматически,
              <br class="hide-for-small-only" />
              когда заявка будет принята.

              <p
                v-if="orderStore.give.currency.categories.includes('cash') || orderStore.get.currency.categories.includes('cash')"
                class="text-medium"
              >
                <br class="hide-for-small-only" />
                Операция обмена с наличными средствами - для продолжения сделки просим связаться с нами в <a target="_blank" href="tg://resolve?domain=cat_bit">TELEGRAM</a>.
              </p>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
