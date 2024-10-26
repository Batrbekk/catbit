<script setup lang="ts">
import { useOrderStore } from '~~/stores/orderStore';
const orderStore = useOrderStore();
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Ожидает верификации</div>
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
            <p class="b-section__order-status-txt">
              Ваша заявка ожидает верификации банковской карты модератором.
              Обычно это занимает не более 5 минут. Страница автоматически
              обновится когда заявка будет принята. Для уточнения можете
              написать нам в чат и оператор вас оповестит о статусе.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
