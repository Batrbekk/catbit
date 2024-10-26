<script setup lang="ts">
import { useOrderStore } from '~~/stores/orderStore';
const orderStore = useOrderStore();
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Неизвестная заявка</div>
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
              Эта заявка не существует либо была удалена.
            </p>
            <p class="b-section__order-status-txt">
              Если вы считаете, что произошла ошибка - напишите нашему оператору
              в чат.
            </p>
            <p class="b-section__order-status-txt">
              ID заявки - {{ orderStore.id }}.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
