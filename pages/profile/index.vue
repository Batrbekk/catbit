<script setup lang="ts">
import { useUserStore } from '~~/stores/userStore';
import ProfilePersonal from '~~/components/Profile/ProfilePersonal.vue';
import ProfileReferals from '~~/components/Profile/ProfileReferals.vue';
import ProfileBalance from '~~/components/Profile/ProfileBalance.vue';
import ProfileWithdraw from '~~/components/Profile/ProfileWithdraw.vue';

// const { $useToast } = useNuxtApp();
const userStore = useUserStore();
useHead({
  title: `Профиль пользователя ${userStore.user}`,
});

const tabs = [
  {
    name: 'ProfilePersonal',
    title: 'Личные данные',
    component: ProfilePersonal,
  },
  {
    name: 'ProfileReferals',
    title: 'Ваши рефералы и реферальная ссылка',
    component: ProfileReferals,
  },
  {
    name: 'ProfileBalance',
    title: 'Внутренний счет',
    component: ProfileBalance,
  },
  {
    name: 'ProfileWithdraw',
    title: 'Вывод партнерских средств',
    component: ProfileWithdraw,
  },
];

const defaultTab = ProfilePersonal;

const activeTabName = ref('ProfilePersonal');
const activeTab = computed(() => {
  const tab = tabs.find((tab) => tab.name === activeTabName.value);
  if (!tab) return defaultTab;
  return tab.component;
});
</script>
<template>
  <div class="s-main__content fullWidth">
    <!-- -->
    <client-only>
      <section class="s-about b-section pt-0">
        <div class="b-section__heading">
          <div class="b-section__title">Данные профиля</div>
        </div>
        <div class="b-section__content w85 ml-auto mr-auto">
          <div class="b-profile">
            <div class="b-profile__aside">
              <nav class="b-profile__aside-nav">
                <a
                  v-for="(tab, index) in tabs"
                  :key="index"
                  href="#!"
                  :data-tabby-active="activeTabName === tab.name ? true : null"
                  @click.prevent="activeTabName = tab.name"
                  >{{ tab.title }}</a
                >
              </nav>
            </div>
            <div class="b-profile__body">
              <transition name="fade" mode="out-in">
                <component :is="activeTab" />
              </transition>
            </div>
          </div>
        </div>
      </section>
    </client-only>
  </div>
</template>
<style lang="scss" scoped></style>
