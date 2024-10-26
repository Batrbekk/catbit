<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    transition="slideup"
    classes="modal-container modal microModal-slide"
    content-class="modal-content "
  >
    <!-- modal__container -->
    <slot :close="close" />
  </vue-final-modal>
</template>
<style scoped>
::v-deep(.modal-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 1rem;

  /* border: 1px solid #e2e8f0; */

  /* border-radius: 0.25rem; */

  /* background: #fff; */
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep(.modal-content) {
  /* border-color: #2d3748; */

  /* background-color: #1a202c; */
}
</style>
