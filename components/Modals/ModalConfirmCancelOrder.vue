<script setup lang="ts">
import ModalContainer from '~~/components/Modals/ModalContainer.vue';
</script>
<template>
  <ModalContainer v-slot="{ close }" v-bind="$attrs">
    <div
      class="modal__container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalNotification-title"
    >
      <a
        href="#"
        @click="close"
        class="modal__close"
        aria-label="Close modal"
        data-microModal-close
      ></a>
      <!--<header class="modal__header">
                <h2 class="modal__title">Восстановление пароля</h2>
            </header>-->
      <div class="modal__content text-center pt-2">
        <p>Вы уверены, что хотите отменить заявку?</p>
      </div>
      <footer class="modal__footer mt-2">
        <div class="btn-group text-center">
          <a
            class="modal__btn btn btn-gradient size-normal uppercase"
            data-microModal-close
            href="#!"
            aria-label="Close this dialog window"
            >НЕТ, ВЕРНУТЬСЯ</a
          >
          <a
            class="modal__btn btn btn-gradient size-normal uppercase"
            href="./order-cancel.html"
            aria-label="Close this dialog window"
            >ДА</a
          >
        </div>
      </footer>
    </div>

    <!-- <button class="modal__close" @click="close">X</button>
    <span class="modal__title">Hello, vue-final-modal</span>
    <div class="modal__content">
      <p>
        Vue Final Modal is a renderless, stackable, detachable and lightweight
        modal component.
      </p>
    </div> -->
  </ModalContainer>
</template>
