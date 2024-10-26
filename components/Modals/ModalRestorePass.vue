<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import ModalContainer from '~~/components/Modals/ModalContainer.vue';
import { useModalStore } from '~~/stores/modalStore';
import { useUserStore } from '~~/stores/userStore';
const userStore = useUserStore();

const email = ref('');
const completed = ref(false);

const captchaSolved = ref(false);

const handleSubmit = async (e) => {
  if (userStore.loading) return;
  try {
    await userStore.restore({
      email: email.value,
    });
    // return modalStore.closeAllModals($callvfm);
  } catch (error) {
    return error;
  } finally {
    completed.value = true;
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
        @click="close"
        class="modal__close"
        aria-label="Close modal"
        data-microModal-close
      ></a>
      <!--<header class="modal__header">
                <h2 class="modal__title">Восстановление пароля</h2>
            </header>-->
      <div class="modal__content" v-if="!completed">
        <form
          class="form form-auth app-form-sign-up"
          @submit.prevent="handleSubmit"
        >
          <div class="row-field">
            <label class="block" for="sign_in_account_login"
              ><span class="required">*</span>Логин или электронная почта</label
            >
            <input
              id="sign_in_account_login"
              name="sign_in_account_login"
              type="text"
              v-model="email"
              required
            />
          </div>
          <div class="row-field text-center">
            <client-only>
              <div class="b-exchange__row row-field text-center">
                <vue-hcaptcha
                  @verify="captchaSolved = true"
                  @error="captchaSolved = false"
                  @expired="captchaSolved = false"
                  @challengeExpired="captchaSolved = false"
                  sitekey="81e72088-11e1-438f-9084-0eff53348b80"
                ></vue-hcaptcha>
              </div>
            </client-only>
          </div>

          <div class="row-field row-field--btn text-center">
            <button :disabled="!captchaSolved" type="submit" class="btn">
              Восстановить пароль
            </button>
          </div>
        </form>
      </div>
      <div v-else class="modal__content">
        <div class="row-field text-center">
          На Вашу почту отправлены инструкции!
        </div>
      </div>
    </div>
  </ModalContainer>
</template>
