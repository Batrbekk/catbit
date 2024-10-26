<script setup lang="ts">
import { useCurrenciesStore } from '~~/stores/currenciesStore';
import { useOrderStore } from '~~/stores/orderStore';
useHead({
  title: 'Новая заявка',
});

const currenciesStore = useCurrenciesStore();
const orderStore = useOrderStore();
async function sendTransaction() {
  try {
    const result = await orderStore.createOrder(currenciesStore.dataToSend);
    return navigateTo({ path: `/order/${result._id}` });
  } catch (error) {
    return error;
  }
}
</script>
<template>
  <div class="s-main__content fullWidth">
    <section class="s-feedback b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">
          Обмен {{ currenciesStore.giveCurrency?.title }} на
          {{ currenciesStore.getCurrency?.title }}
        </div>
        <div class="b-section__subtitle">
          Выплата происходит после первого подтверждения транзакции
        </div>
        <div
          v-if="
            currenciesStore.getCurrency?.isCash ||
            currenciesStore.giveCurrency?.isCash
          "
        >
          <div>
            С вами свяжется оператор по указанному вами аккаунту telegram для
            уточнения условий доставки
          </div>
        </div>
      </div>
      <div class="b-section__content w80 ml-auto mr-auto">
        <div class="b-section__heading">
          <div class="b-section__txt">Детали заявки:</div>
        </div>

        <div class="b-section__feedback-list b-feedback-list">
          <!--- feedback-->
          <div class="b-feedback b-feedback--inline">
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__txt">Сумма отправки</div>
              </div>
              <div class="b-feedback__txt _bold ml-auto">
                {{ currenciesStore.giveAmount }}
                {{ currenciesStore.giveCurrency?.key }}
              </div>
            </div>
          </div>
          <!--- feedback-->
          <div class="b-feedback b-feedback--inline">
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__txt">Сумма к получению</div>
              </div>
              <div class="b-feedback__txt _bold ml-auto">
                {{ currenciesStore.getAmount }}
                {{ currenciesStore.getCurrency?.key }}
              </div>
            </div>
          </div>
          <!--- feedback-->
          <div class="b-feedback b-feedback--inline">
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__txt">
                  Курс {{ currenciesStore.giveCurrency?.title }} на момент
                  создания заявки
                </div>
              </div>
              <div class="b-feedback__txt _bold ml-auto">
                {{ currenciesStore.giveCurrency?.course }} RUB
              </div>
            </div>
          </div>
          <!--- feedback-->
          <div class="b-feedback b-feedback--inline">
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__txt">
                  Курс {{ currenciesStore.getCurrency?.title }} на момент
                  создания заявки
                </div>
              </div>
              <div class="b-feedback__txt _bold ml-auto">
                {{ currenciesStore.getCurrency?.course }} RUB
              </div>
            </div>
          </div>
          <div class="b-feedback b-feedback--inline">
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__txt">
                  Курс обмена {{ currenciesStore.giveCurrency?.title }} на
                  {{ currenciesStore.getCurrency?.title }} на момент создания
                  заявки
                </div>
              </div>
              <div class="b-feedback__txt _bold ml-auto">
                <div>
                  {{
                    (currenciesStore.reverseExchangeRate || 0) >
                    (currenciesStore.directExchangeRate || 0)
                      ? currenciesStore.reverseExchangeRate?.toFixed(4)
                      : currenciesStore.directExchangeRate?.toFixed(4)
                  }}
                  {{
                    (currenciesStore.reverseExchangeRate || 0) >
                    (currenciesStore.directExchangeRate || 0)
                      ? currenciesStore.getCurrency?.key
                      : currenciesStore.giveCurrency?.key
                  }}
                  за 1
                  {{
                    (currenciesStore.reverseExchangeRate || 0) >
                    (currenciesStore.directExchangeRate || 0)
                      ? currenciesStore.giveCurrency?.key
                      : currenciesStore.getCurrency?.key
                  }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              currenciesStore.getCurrency?.isCash ||
              currenciesStore.giveCurrency?.isCash
            "
          >
            <div class="b-feedback b-feedback--inline">
              <div class="b-feedback__body">
                <div class="b-feedback__head">
                  <div class="b-feedback__txt">Город</div>
                </div>
                <div class="b-feedback__txt _bold ml-auto">
                  {{ currenciesStore.getForms['city']?.name }}
                </div>
              </div>
            </div>
            <div class="b-feedback b-feedback--inline">
              <div class="b-feedback__body">
                <div class="b-feedback__head">
                  <div class="b-feedback__txt">Вид доставки</div>
                </div>
                <div class="b-feedback__txt _bold ml-auto">
                  {{
                    currenciesStore.getCurrency?.isCash
                      ? currenciesStore.getForms['deliveryType']?.name
                      : currenciesStore.deliveryTypes.find(
                          (dt) => dt.key === 'courier',
                        )?.['name']
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-field row-field--btn text-center mt-4">
          <a
            class="btn size-medium"
            @click.prevent="!orderStore.isBusy && sendTransaction()"
            >ПОДТВЕРЖДАЮ</a
          >
        </div>
      </div>
    </section>
    <!-- </LoadingWrapper> -->
  </div>
</template>
<style lang="scss" scoped></style>
