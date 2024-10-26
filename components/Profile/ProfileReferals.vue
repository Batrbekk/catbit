<script setup lang="ts">
import PaginatedList from '../UI/PaginatedList.vue';
import { useUserStore } from '~~/stores/userStore';
import { copyText } from 'vue3-clipboard';
import { useErrorsStore } from '~~/stores/errorsStore';

const { $useToast } = useNuxtApp();
const toast = $useToast();

const errorsStore = useErrorsStore();

const userStore = useUserStore();
const referalLink = computed(() => {
  return process.env.NODE_ENV === 'production'
    ? `https://catbit.io/referal/${userStore.profileData._id}`
    : `http://localhost:3100/referal/${userStore.profileData._id}`;
});

const doCopy = (text) => {
  copyText(text, undefined, (error, event) => {
    if (error) {
      errorsStore.emitError('Не удалось скопировать в буфер обмена!');
    } else {
      toast.success('Ссылка скопирована в буфер обмена!');
    }
  });
};
</script>
<template>
  <div class="b-profile__tab tab-content">
    <div class="b-profile__row">
      <div class="b-profile__subtitle">Ваша реферальная ссылка:</div>
      <div class="b-profile__data">
        <span class="b-profile__data-txt">{{ referalLink }}</span>
      </div>
      <a
        class="b-profile__data-link link-form copy-click"
        :data-copy-string="referalLink"
        href="#"
        @click.prevent="doCopy(referalLink)"
        >Скопировать</a
      >
    </div>
    <div class="b-profile__row">
      <div class="b-profile__subtitle">Ваши рефералы:</div>
      <PaginatedList
        v-slot="item"
        :data="userStore.profileData.referals"
        :no-items-text="'Здесь пока пусто. Делитесь реферальной ссылкой и приглашайте своих друзей! Вы будете получать процент от всех сделок своих рефералов!'"
        class="b-profile__list list-counter"
      >
        <li>
          <p>{{ item.item.login }}</p>
        </li>
      </PaginatedList>
      <!-- <ol
        v-if="
          userStore.profileData.referals &&
          userStore.profileData.referals.length
        "
        class="b-profile__list list-counter"
      >
        <li
          v-for="(referal, index) in userStore.profileData.referals"
          :key="index"
        >
          <p>{{ referal.login }}</p>
        </li>
      </ol>
      <div v-else>
        Здесь пока пусто. Делитесь реферальной ссылкой и приглашайте своих
        друзей! Вы будете получать процент от всех сделок своих рефералов!
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
