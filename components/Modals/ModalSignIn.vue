<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import ModalContainer from '~~/components/Modals/ModalContainer.vue';
import { useModalStore } from '~~/stores/modalStore';
import { useUserStore } from '~~/stores/userStore';
const modalStore = useModalStore();
const userStore = useUserStore();
// const { $useToast, $callvfm } = useNuxtApp();
// const toast = $useToast();
const login = ref('');
const password = ref('');

const captchaSolved = ref(false);

const isInProd = process.env.NODE_ENV === 'production';

const handleSubmit = async () => {
  if (userStore.loading) return;
  try {
    await userStore.logIn({
      login: login.value,
      password: password.value,
    });
    return modalStore.closeAllModals();
  } catch (error) {
    return error;
  }
};
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
        class="modal__close"
        aria-label="Close modal"
        data-microModal-close
        @click="close"
      ></a>
      <!--<header class="modal__header">
                <h2 class="modal__title">Авторизация</h2>
            </header>-->
      <div class="modal__content">
        <form
          class="form form-auth app-form-sign-up"
          @submit.prevent="handleSubmit"
        >
          <div class="row-field row-field--narrow">
            <label class="block" for="sign_in_account_login"
              ><span class="required">*</span>Логин или электронная почта</label
            >
            <input
              id="sign_in_account_login"
              v-model="login"
              name="sign_in_account_login"
              type="text"
              required
            />
          </div>
          <div class="row-field row-field--narrow">
            <label class="block" for="account_pass"
              ><span class="required">*</span>Пароль</label
            >
            <input
              id="account_pass"
              v-model="password"
              name="account_pass"
              type="password"
              required
            />
          </div>
          <div class="row-field row-field--narrow text-right">
            <a
              class="link-form"
              data-microModal-close="modalSignIn"
              data-microModal-trigger="modalRePass"
              href="#"
              @click="modalStore.openModal('ModalRestorePass')"
              >Забыли пароль?</a
            >
          </div>
          <div class="row-field text-center">
            <client-only>
              <div class="b-exchange__row row-field text-center">
                <vue-hcaptcha
                  sitekey="81e72088-11e1-438f-9084-0eff53348b80"
                  @verify="captchaSolved = true"
                  @error="captchaSolved = false"
                  @expired="captchaSolved = false"
                  @challenge-expired="captchaSolved = false"
                ></vue-hcaptcha>
              </div>
            </client-only>
          </div>
          <div class="row-field row-field--btn text-center mt-5">
            <button
              :disabled="isInProd && !captchaSolved"
              type="submit"
              class="btn size-extra"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  </ModalContainer>
</template>
