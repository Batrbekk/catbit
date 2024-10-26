<script setup lang="ts">
import PaginatedList from '../UI/PaginatedList.vue';
import WithdrawForm from './ProfileWithdraw/WithdrawForm.vue';
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
    <div class="spacer" style="padding: 1rem 0px"></div>
    <WithdrawForm />
    <div class="spacer" style="padding: 1rem 0px"></div>
    <div class="b-profile__row">
      <div class="b-profile__subtitle">Выводы по реферальной программе:</div>

      <PaginatedList
        v-slot="item"
        :data="userStore.profileData.balance_outputs"
        class="b-feedback-list"
        tag="ol"
      >
        <div class="b-feedback b-feedback--inline">
          <div class="b-feedback__body">
            <div class="b-feedback__head">
              <div class="b-feedback__txt">
                {{ item.item.count }} RUB ( {{ item.item.forms[0].value }}
                {{ item.item.currency.key }} ).
              </div>
            </div>
            <div class="b-feedback__txt _bold ml-auto">
              Статус:
              <span>{{
                item.item.status === 0
                  ? 'В обработке'
                  : item.item.status === 1
                    ? 'Подтверждено'
                    : 'Отклонено'
              }}</span>
            </div>
          </div>
          <div class="b-feedback__body">
            <div class="b-feedback__txt _bold ml-auto">
              Дата:
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
        class="b-feedback-list"
        v-if="
          userStore.profileData.balance_outputs &&
          userStore.profileData.balance_outputs.length
        "
      >
        <div
          v-for="(item, index) in userStore.profileData.balance_outputs"
          :key="index"
          class="b-feedback b-feedback--inline"
        >
          <div class="b-feedback__body">
            <div class="b-feedback__head">
              <div class="b-feedback__txt">
                Количество: {{ item.count }} {{ item.currency.key }}.
              </div>
            </div>
            <div class="b-feedback__txt _bold ml-auto">
              Статус:
              <span>{{
                item.status === 0
                  ? "В обработке"
                  : item.status === 1
                  ? "Подтверждено"
                  : "Отклонено"
              }}</span>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <p v-else>Пусто...</p> -->
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
