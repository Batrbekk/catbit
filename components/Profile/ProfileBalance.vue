<script setup lang="ts">
import PaginatedList from '../UI/PaginatedList.vue';
import { useUserStore } from '~~/stores/userStore';
const userStore = useUserStore();
</script>
<template>
  <div class="b-profile__tab tab-content">
    <div class="b-profile__row flex">
      <span class="b-profile__subtitle mb-0">На вашем счете:</span>
      <span class="b-profile__txt"
        >{{ userStore.profileData.balance }} руб.</span
      >
    </div>
    <div class="b-profile__row">
      <div class="b-profile__subtitle">Список транзакций:</div>

      <PaginatedList
        v-slot="item"
        :data="userStore.profileData.balance_list"
        :no-items-text="'Пусто...'"
        class="b-feedback-list"
      >
        <div class="b-feedback b-feedback--inline">
          <div class="b-feedback__body">
            <div class="b-feedback__head">
              <div class="b-feedback__txt">
                Начислено: {{ item.item.balance.toFixed(2) }} руб.
              </div>
            </div>
            <div class="b-feedback__txt _bold ml-auto">
              {{
                item.item.createdAt
                  ? useDateFormat(item.item.createdAt, 'YYYY-MM-DD HH:mm:ss')
                  : 'NA'
              }}
            </div>
          </div>
        </div>
      </PaginatedList>

      <!-- <div
        v-if="
          userStore.profileData.balance_list &&
          userStore.profileData.balance_list.length
        "
        class="b-feedback-list"
      >
        <div
          v-for="(item, index) in userStore.profileData.balance_list"
          :key="index"
          class="b-feedback b-feedback--inline"
        >
          <div class="b-feedback__body">
            <div class="b-feedback__head">
              <div class="b-feedback__txt">
                Начислено: {{ item.balance.toFixed(2) }} руб.
              </div>
            </div>
            <div class="b-feedback__txt _bold ml-auto">
              {{ item.transactionDate }}
            </div>
          </div>
        </div>
      </div>
      <p v-else>Пусто...</p> -->
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
