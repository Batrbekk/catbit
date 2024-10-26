<template>
  <section class="benefits">
    <div class="container">
      <div class="benefits-block">
        <picture>
          <source srcset="/img/benefits.webp" type="image/webp" />
          <source srcset="/img/benefits.png" type="image/png" />
          <img class="benefits__bg" src="/img/benefits.png" />
        </picture>
        <h2 class="title benefits__title">
          Преимущества обмена криптовалют через <span>CatBit.io</span>
        </h2>
        <Swiper
          class="swiper benefits-slider"
          :wrapper-class="'benefits-grid'"
          :space-between="20"
          :slides-per-view="width <= 940 ? 'auto' : 3"
          :allow-touch-move="true"
          :breakpoints="{
            0: {
              spaceBetween: '10',
            },
            579: {
              spaceBetween: '20',
            },
            940: {
              allowTouchMove: false,
            },
          }"
        >
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">Анонимность</h3>
            <div class="benefits-box__text">
              Мы не просим и не храним данные наших пользователей. Только чистые
              активы - мы внимательно следим за AML входящих и исходящих
              платежей.
            </div>
          </SwiperSlide>
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits2.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">Лучший курс</h3>
            <div class="benefits-box__text">
              Наш обменник находится в системе мониторинга bestchange.ru - это
              гарант надежности, качества и лучших условий обмена
            </div>
          </SwiperSlide>
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits3.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">Фиксированный курс</h3>
            <div class="benefits-box__text">
              Курс фиксируется по первому подтверждению входящей транзакции
            </div>
          </SwiperSlide>
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits4.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">
              600+ <br />
              рыночных пар
            </h3>
            <div class="benefits-box__text">
              Всего один клик — и любая популярная криптовалюта ваша
            </div>
          </SwiperSlide>
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits5.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">Мгновенные обменные транзакции</h3>
            <div class="benefits-box__text">
              Обмен со скоростью молнии. Двигайтесь в такт изменений на рынке
              криптовалют. Проводите обмен по любым из доступных рыночных пар в
              режиме реального времени
            </div>
          </SwiperSlide>
          <SwiperSlide class="benefits-box swiper-slide">
            <div class="benefits-box_icon">
              <img src="/img/icons/benefits6.svg" alt="Иконка" />
            </div>
            <h3 class="benefits-box__title">Анонимные наличные</h3>
            <div class="benefits-box__text">
              Наличные ¥, $, €, ₽ по всей России и в крупных городах по всему
              миру. Бесконтактное анонимное снятие через QR-коды Тинькофф. Клады
              и доставка курьером
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { width, height } = useWindowSize();
const init = ref(false);
</script>

<style scoped></style>
