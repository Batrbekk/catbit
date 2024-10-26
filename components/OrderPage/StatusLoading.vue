<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Загрузка...</div>
        <div class="b-section__subtitle">Спасибо, что ожидаете!</div>
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
              Заявка загружается, нужно немного подождать.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.b-section__order-status-img {
  animation: filter-animation 8s infinite;
}
@keyframes filter-animation {
  0% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(100deg);
  }

  100% {
    filter: hue-rotate(0deg);
  }
}
</style>
