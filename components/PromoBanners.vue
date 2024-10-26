<script setup lang="ts">
const next = ref<HTMLElement | null>(null);
const prev = ref<HTMLElement | null>(null);
const pagination = ref<HTMLElement | null>(null);
</script>
<template>
  <section class="banner">
    <div class="container">
      <Swiper
        class="banner-inner"
        :loop="true"
        :modules="[SwiperNavigation, SwiperPagination]"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
        :pagination="{
          el: pagination,
          clickable: true,
        }"
      >
        <SwiperSlide class="banner-slide">
          <picture>
            <source srcset="/img/banner.webp" type="image/webp" />
            <source srcset="/img/banner.jpg" type="image/jpeg" />
            <img src="/img/banner.jpg" />
          </picture>
        </SwiperSlide>
        <SwiperSlide class="banner-slide">
          <picture>
            <source srcset="/img/banner2.webp" type="image/webp" />
            <source srcset="/img/banner2.jpg" type="image/jpeg" />
            <img src="/img/banner2.jpg" />
          </picture>
        </SwiperSlide>
        <div class="banner-nav">
          <span ref="prev" class="banner-nav__btn banner-nav__prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
            >
              <path
                d="M0.146447 4.14645C-0.0488156 4.34171 -0.0488155 4.65829 0.146447 4.85355L3.32843 8.03553C3.52369 8.2308 3.84027 8.2308 4.03553 8.03553C4.2308 7.84027 4.2308 7.52369 4.03553 7.32843L1.20711 4.5L4.03553 1.67157C4.2308 1.47631 4.2308 1.15973 4.03553 0.964467C3.84027 0.769205 3.52369 0.769205 3.32843 0.964467L0.146447 4.14645ZM10.5 4L0.5 4L0.5 5L10.5 5L10.5 4Z"
                fill="white"
              />
            </svg>
          </span>
          <span ref="next" class="banner-nav__btn banner-nav__next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
            >
              <path
                d="M10.8536 4.85355C11.0488 4.65829 11.0488 4.34171 10.8536 4.14645L7.67157 0.964466C7.47631 0.769204 7.15973 0.769204 6.96447 0.964466C6.7692 1.15973 6.7692 1.47631 6.96447 1.67157L9.79289 4.5L6.96447 7.32843C6.7692 7.52369 6.7692 7.84027 6.96447 8.03553C7.15973 8.2308 7.47631 8.2308 7.67157 8.03553L10.8536 4.85355ZM0.5 5H10.5V4H0.5V5Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
        <div ref="pagination" class="banner-pag"></div>
      </Swiper>
    </div>
  </section>
</template>
