<script setup lang="ts">
import { useOrderStore } from "~~/stores/orderStore";
const orderStore = useOrderStore();

const confirmOrder = async () => {
  await orderStore.updateOrder({ step: 1 });
};
const cancelOrder = async () => {
  await orderStore.updateOrder({ step: 4 });
};

const formattedDate = useDateFormat(orderStore.date, "DD.MM.YYYY HH:mm:ss", {
  locales: "ru-RU",
});

if (process.client && orderStore.give.currency.invoiceQw && orderStore.url) {
  // await navigateTo(orderStore.url, {
  //   external: true,
  // });
  window.open(orderStore.url, "_blank");
}
</script>
<template>
  <div>
    <AmlWarningSection />
    <TransactionAmountSection />

    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Как оплатить?</div>
        <div class="b-section__subtitle">ID заявки: {{ orderStore.id }}</div>
      </div>
      <div class="b-section__content w80 ml-auto mr-auto">
        <div class="b-section__order">
          <div class="b-section__order-row flex">
            <div class="b-section__order-content">
              <article class="article">
                <ol>
                  <li v-if="orderStore.url">
                    <p>
                      Оплатите указанную сумму в открывшемся окне. Если окно для
                      совершения оплаты не открылось автоматически, перейдите по
                      ссылке:
                    </p>
                    <p>
                      <a :href="orderStore.url" target="_blank">{{
                        orderStore.url
                      }}</a>
                    </p>
                  </li>
                  <li v-else-if="orderStore.wbDepositStatus">
                    <p>
                      Переведите указанную сумму по реквизитам:
                      <div v-if="orderStore.wbDepositStatus.account && orderStore.wbDepositStatus.account.address">
                        Кошелек: {{ orderStore.wbDepositStatus.account.address }}
                      </div>
                      <div v-if="orderStore.wbDepositStatus.account && orderStore.wbDepositStatus.account.memo">
                        MEMO: {{ orderStore.wbDepositStatus.account.memo }}
                      </div>
                    </p>
                  </li>
                  <li v-else-if="orderStore.sbercoreDepositResult && orderStore.sbercoreDepositResult.id">
                    <p>
                      Переведите указанную сумму по реквизитам:
                      <div v-if="orderStore.sbercoreDepositResult.card_number">
                        Карта: {{ orderStore.sbercoreDepositResult.card_number }}
                      </div>
                      <div v-if="orderStore.sbercoreDepositResult.first_name || orderStore.sbercoreDepositResult.last_name || orderStore.sbercoreDepositResult.middle_name">
                        ФИО: {{ orderStore.sbercoreDepositResult.last_name }} {{ orderStore.sbercoreDepositResult.first_name }} {{ orderStore.sbercoreDepositResult.middle_name }}
                      </div>
                    </p>
                  </li>
                  <li v-else>
                    Переведите указанную сумму по реквизитам: <br />{{
                      orderStore.give.wallet.forms[0].title
                    }}: {{ orderStore.give.wallet.forms[0].description }}
                  </li>
                  <li v-if="!orderStore.paymentId && !orderStore.wbDepositStatus">
                    Нажмите на кнопку “Я оплатил заявку”
                  </li>
                  <li v-else>Дождитесь обновления статуса заявки</li>
                  <li>Ожидайте обработку заявки оператором</li>
                </ol>
              </article>
            </div>
            <div class="b-section__order-info">
              <div class="b-section__order-info-head">
                <div class="color--secondary">
                  Сумма платежа:
                  <span
                    >{{ orderStore.give.forms[0].value }}
                    {{ orderStore.give.currency.title }}
                    {{ orderStore.give.currency.key }}</span
                  >
                </div>
                <div class="color--purple">
                  Вы получите:
                  <span>
                    {{ orderStore.get.forms[0].value }}
                    {{ orderStore.get.currency.title }}
                    {{ orderStore.get.currency.key }}</span
                  >
                </div>
              </div>
              <div class="b-section__order-info-body">
                <div>
                  Дата и время заявки:
                  <span>{{ formattedDate }}</span>
                </div>
                <div>
                  Статус заявки: <span>{{ orderStore.statusText }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- -->
          <div class="b-section__order-row text-center">
            <p class="text-medium">
              Внимание! Если оплата не поступит, заявка будет отменена через 30
              минут с момента ее создания
            </p>
            <p v-if="orderStore.paymentId" class="text-medium">
              Проверка платежа осуществляется автоматически. Просто оставайтесь
              на этой странице.
            </p>
            <p v-if="orderStore.wbDepositStatus" class="text-medium">
              Проверка платежа осуществляется автоматически. Просто оставайтесь
              на этой странице.
            </p>
          </div>
          <!-- -->
          <div class="b-section__order-row b-section__order-btn">
            <div class="btn-group text-center">
              <a
                class="btn btn-flat btn--purple"
                href="#"
                @click.prevent="!orderStore.isBusy && cancelOrder()"
                >ОТМЕНИТЬ ЗАЯВКУ</a
              >
              <a
                v-if="!orderStore.paymentId && !orderStore.wbDepositStatus"
                class="btn btn-flat btn--cyan"
                href="#"
                @click.prevent="!orderStore.isBusy && confirmOrder()"
                >Я ОПЛАТИЛ ЗАЯВКУ</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- -->
    <section class="s-about b-section">
      <div class="b-section__content w80 ml-auto mr-auto">
        <p
          v-if="orderStore.get.currency.categories.includes('cash')"
          class="text-medium"
        >
          Операция обмена на наличные средства - оператор свяжется с вами для
          уточнения деталей сделки
        </p>
        <p class="text-medium">
          Данная операция проводится оператором в ручном режиме и занимает от 5
          до 30 минут в рабочее время (см. статус оператора).
        </p>
        <p class="text-medium">
          Обращаем ваше внимание, что сумма к получению и отображаемая сумма
          могут отличаться в разные стороны из-за волатильности курса. Курс
          фиксируется в момент подтверждения заявки.
        </p>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
</style>
