<script setup lang="ts">
import { useUserStore } from '~~/stores/userStore';
import { useErrorsStore } from '~~/stores/errorsStore';

const userStore = useUserStore();
const { $useToast } = useNuxtApp();
const toast = $useToast();

const errorsStore = useErrorsStore();

const login = ref('');
const email = ref('');
const mobileNumber = ref('');

const old_password = ref('');
const pass1 = ref('');
const pass2 = ref('');

const visibleForm = ref('login');

login.value = userStore.profileData.login;
email.value = userStore.profileData.email;
mobileNumber.value = userStore.profileData.mobileNumber;

const editProfile = async () => {
  try {
    await userStore.editProfile({
      login: login.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
    });
    toast.success('Данные изменены успешно!');
  } catch (error) {
    // errorsStore.emitError(error);
  }
};

const editPassword = async () => {
  if (pass1.value !== pass2.value)
    return errorsStore.emitError('Пароли не совпадают!');
  try {
    await userStore.editProfile({
      old_password: old_password.value,
      new_password: pass1.value,
    });
    toast.success('Данные изменены успешно!');
  } catch (error) {
    // errorsStore.emitError(error);
  }
};
</script>
<template>
  <div class="b-profile__tab tab-content">
    <form
      v-if="visibleForm === 'login'"
      id="profile_info"
      data-toggler
      class="form form-auth app-form-sign-up"
      @submit.prevent="editProfile"
    >
      <div class="row-field row-field--narrow">
        <label class="block" for="profile_account_login">Логин</label>
        <input
          id="profile_account_login"
          name="profile_account_login"
          type="text"
          v-model="login"
          required
        />
      </div>
      <div class="row-field has-error row-field--narrow">
        <label class="block" for="profile_account_email">Email</label>
        <input
          id="profile_account_email"
          name="profile_account_email"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="row-field has-error row-field--narrow">
        <label class="block" for="profile_account_phone">Телефон</label>
        <input
          id="profile_account_phone"
          name="profile_account_phone"
          type="tel"
          v-model="mobileNumber"
        />
      </div>
      <div
        class="row-field row-field--flex row-field--btn text-center mt-3 align-center align-middle _wide"
      >
        <a
          class="link-form"
          data-toggle="profile_pass"
          @click.prevent="visibleForm = 'password'"
          href="#!"
          >Изменить пароль</a
        >
        <button type="submit" class="btn size-normal">ИЗМЕНИТЬ</button>
      </div>
    </form>
    <form
      v-if="visibleForm === 'password'"
      id="profile_pass"
      data-toggler
      class="form form-auth app-form-sign-up"
      @submit.prevent="editPassword"
    >
      <div class="row-field row-field--narrow">
        <label class="block" for="profile_account_pass"
          ><span class="required">*</span>Старый пароль</label
        >
        <input
          id="profile_account_pass_old"
          name="profile_account_pass_old"
          type="password"
          v-model="old_password"
          required
        />
      </div>
      <div class="row-field row-field--narrow">
        <label class="block" for="profile_account_pass"
          ><span class="required">*</span>Новый пароль</label
        >
        <input
          id="profile_account_pass"
          name="profile_account_pass"
          type="password"
          v-model="pass1"
          required
        />
      </div>
      <div class="row-field row-field--narrow">
        <label class="block" for="profile_account_pass_re"
          ><span class="required">*</span>Повторите новый пароль</label
        >
        <input
          id="profile_account_pass_re"
          name="profile_account_pass_re"
          type="password"
          v-model="pass2"
          required
        />
      </div>
      <div
        class="row-field row-field--flex row-field--btn text-center mt-3 align-center align-middle _wide"
      >
        <a
          data-toggle="profile_info"
          class="link-form"
          href="#!"
          @click.prevent="visibleForm = 'login'"
          >Изменить данные</a
        >
        <button type="submit" class="btn size-normal">ИЗМЕНИТЬ</button>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped></style>
