<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import ModalContainer from '~~/components/Modals/ModalContainer.vue';
import { useModalStore } from '~~/stores/modalStore';
import { useUserStore } from '~~/stores/userStore';
import { useErrorsStore } from '~~/stores/errorsStore';
const modalStore = useModalStore();
const userStore = useUserStore();
const errorsStore = useErrorsStore();

const login = ref('');
const email = ref('');
const password = ref('');
const password2 = ref('');
const agree = ref(false);

const captchaSolved = ref(false);

const isInProd = process.env.NODE_ENV === 'production';

const handleSubmit = async () => {
  if (userStore.loading) return;
  if (!agree.value) {
    return errorsStore.emitError('Вы должны согласиться с правилами!');
  }
  if (password.value !== password2.value) {
    return errorsStore.emitError('Пароли не совпадают!');
  }
  try {
    await userStore.register({
      login: login.value,
      email: email.value,
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
      <!-- <header class="modal__header">
        <h2 class="modal__title">Регистрация</h2>
      </header> -->
      <div class="modal__content">
        <form
          class="form form-auth app-form-sign-up"
          @submit.prevent="handleSubmit"
        >
          <div class="row-field row-field--narrow">
            <label class="block" for="sign_up_account_login"
              ><span class="required">*</span>Логин</label
            >
            <input
              id="sign_up_account_login"
              v-model="login"
              name="sign_up_account_login"
              type="text"
              required
            />
          </div>
          <div class="row-field has-error row-field--narrow">
            <label class="block" for="sign_up_account_email"
              ><span class="required">*</span>Email</label
            >
            <input
              id="sign_up_account_email"
              v-model="email"
              name="sign_up_account_email"
              type="email"
              required
            />
            <!-- <p class="text-message--error">
              Error message! Error message! <br />
              Error message! Error message!
            </p> -->
          </div>
          <div class="row-field row-field--narrow">
            <label class="block" for="sign_up_account_pass"
              ><span class="required">*</span>Пароль</label
            >
            <input
              id="sign_up_account_pass"
              v-model="password"
              name="sign_up_account_pass"
              type="password"
              required
            />
          </div>
          <div class="row-field row-field--narrow">
            <label class="block" for="sign_up_account_pass_re"
              ><span class="required">*</span>Повторите пароль</label
            >
            <input
              id="sign_up_account_pass_re"
              v-model="password2"
              name="sign_up_account_pass_re"
              type="password"
              required
            />
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

          <div class="row-field">
            <div class="mt-1.5">
              <input
                id="sign_up_ch_policy"
                v-model="agree"
                name="sign_up_ch_policy"
                class="checkbox"
                type="checkbox"
              />
              <label class="label" for="sign_up_ch_policy">
                <NuxtLink class="link-txt" to="/rules">
                  С правилами сервиса ознакомлен и согласен
                </NuxtLink>
              </label>
            </div>
          </div>

          <div class="row-field row-field--btn">
            <button
              :disabled="isInProd && !captchaSolved"
              type="submit"
              class="btn fullWidth"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </ModalContainer>
</template>
