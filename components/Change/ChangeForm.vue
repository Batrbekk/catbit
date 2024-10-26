<template>
  <section class="change">
    <div class="container">
      <form class="change-inner">
        <picture>
          <source srcset="/img/change-bg.webp" type="image/webp" />
          <source srcset="/img/change-bg.png" type="image/png" />
          <img class="change__bg" src="/img/change-bg.png" />
        </picture>
        <picture>
          <source srcset="/img/change-bg2.webp" type="image/webp" />
          <source srcset="/img/change-bg2.png" type="image/png" />
          <img class="change__bg2" src="/img/change-bg2.png" />
        </picture>
        <h1 class="change__title title">
          Выберите валюту <br />
          или монеты <span>для обмена</span>
        </h1>
        <div class="change-row">
          <ChangeSelect type="give" first />

          <ChangeSelect type="get" />
        </div>
        <div class="change-block_bottom change-block">
          <h3 class="change-block__title">Введите данные для обмена</h3>
          <div class="change-box">
            <template
              v-if="
                currenciesStore.giveCurrency &&
                currenciesStore.giveCurrency.forms
              "
            >
              <div
                v-for="form in currenciesStore.giveCurrency?.forms.filter(
                  (f) => f.type === 0 && f.required,
                )"
                :key="form.key"
                class="change-box_input"
                :class="{
                  _error:
                    currenciesStore.giveFormsError[form._id]?.errors.length,
                }"
              >
                <input
                  :id="form.key"
                  v-model="currenciesStore.giveForms[form._id]"
                  :name="form.key"
                  type="text"
                  :pattern="form.regexp.value || '.*'"
                  :maxlength="form.maxLength || form.length || undefined"
                  :minlength="form.minLength || form.length || undefined"
                  :placeholder="form.placeholder"
                  :required="!!form.required"
                />
                <span
                  v-if="currenciesStore.giveFormsError[form._id]?.errors"
                  class="change-box__error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d="M5 1C7.20915 1 9 2.79085 9 5C9 7.20915 7.20915 9 5 9C2.79085 9 1 7.20915 1 5C1 2.79085 2.79085 1 5 1Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.17166 4.45917C5.37861 4.47118 5.51099 4.632 5.52381 4.83889C5.53537 5.02544 5.54553 5.30855 5.54553 5.72726V6.64151C5.77642 6.64627 5.94868 6.65378 6.07502 6.66151C6.27391 6.67367 6.43355 6.79607 6.44824 6.9948C6.45219 7.04827 6.45462 7.11026 6.45462 7.1818C6.45462 7.25335 6.45219 7.31533 6.44824 7.3688C6.43355 7.56753 6.27391 7.68993 6.07502 7.70209C5.86421 7.71498 5.52559 7.72726 5.00008 7.72726C4.47457 7.72726 4.13595 7.71498 3.92513 7.70209C3.72624 7.68993 3.56661 7.56753 3.55191 7.3688C3.54797 7.31533 3.54553 7.25335 3.54553 7.1818C3.54553 7.11026 3.54797 7.04827 3.55191 6.9948C3.56661 6.79607 3.72624 6.67367 3.92513 6.66151C4.05148 6.65378 4.22373 6.64627 4.45462 6.64151V5.72726C4.45462 5.66331 4.45486 5.60251 4.4553 5.54475C4.42631 5.5452 4.39582 5.54544 4.36371 5.54544C4.25726 5.54544 4.16835 5.5428 4.09439 5.53871C3.87864 5.52673 3.73453 5.36762 3.72913 5.1516C3.728 5.10664 3.72735 5.05627 3.72735 4.99998C3.72735 4.94369 3.728 4.89333 3.72913 4.84837C3.73453 4.63235 3.87864 4.47324 4.09439 4.46126C4.16835 4.45717 4.25726 4.45453 4.36371 4.45453H5.00008C5.06486 4.45453 5.12179 4.45627 5.17166 4.45917Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.54537 2.99998C5.54537 3.40163 5.21975 3.72725 4.81809 3.72725C4.41644 3.72725 4.09082 3.40163 4.09082 2.99998C4.09082 2.59832 4.41644 2.27271 4.81809 2.27271C5.21975 2.27271 5.54537 2.59832 5.54537 2.99998Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <template
                    v-for="e in currenciesStore.giveFormsError[form._id].errors"
                    :key="e.type"
                  >
                    {{ e.message }}
                  </template>
                </span>
              </div>
            </template>
            <template
              v-if="
                currenciesStore.getCurrency && currenciesStore.getCurrency.forms
              "
            >
              <div
                v-for="form in currenciesStore.getCurrency?.forms.filter(
                  (f) => f.type === 1 && f.required,
                )"
                :key="form.key"
                class="change-box_input"
                :class="{
                  _error:
                    currenciesStore.getFormsError[form._id]?.errors.length,
                }"
              >
                <input
                  v-if="currenciesStore.getForms"
                  :id="form.key"
                  v-model="currenciesStore.getForms[form._id as FormKeys]"
                  :name="form.key"
                  type="text"
                  :pattern="form.regexp.value || '.*'"
                  :maxlength="
                    form.maxLength !== null ? form.maxLength : undefined
                  "
                  :minlength="form.minLength || form.length || undefined"
                  :placeholder="form.placeholder"
                  :required="!!form.required"
                />
                <span
                  v-if="currenciesStore.getFormsError[form._id]?.errors.length"
                  class="change-box__error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d="M5 1C7.20915 1 9 2.79085 9 5C9 7.20915 7.20915 9 5 9C2.79085 9 1 7.20915 1 5C1 2.79085 2.79085 1 5 1Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.17166 4.45917C5.37861 4.47118 5.51099 4.632 5.52381 4.83889C5.53537 5.02544 5.54553 5.30855 5.54553 5.72726V6.64151C5.77642 6.64627 5.94868 6.65378 6.07502 6.66151C6.27391 6.67367 6.43355 6.79607 6.44824 6.9948C6.45219 7.04827 6.45462 7.11026 6.45462 7.1818C6.45462 7.25335 6.45219 7.31533 6.44824 7.3688C6.43355 7.56753 6.27391 7.68993 6.07502 7.70209C5.86421 7.71498 5.52559 7.72726 5.00008 7.72726C4.47457 7.72726 4.13595 7.71498 3.92513 7.70209C3.72624 7.68993 3.56661 7.56753 3.55191 7.3688C3.54797 7.31533 3.54553 7.25335 3.54553 7.1818C3.54553 7.11026 3.54797 7.04827 3.55191 6.9948C3.56661 6.79607 3.72624 6.67367 3.92513 6.66151C4.05148 6.65378 4.22373 6.64627 4.45462 6.64151V5.72726C4.45462 5.66331 4.45486 5.60251 4.4553 5.54475C4.42631 5.5452 4.39582 5.54544 4.36371 5.54544C4.25726 5.54544 4.16835 5.5428 4.09439 5.53871C3.87864 5.52673 3.73453 5.36762 3.72913 5.1516C3.728 5.10664 3.72735 5.05627 3.72735 4.99998C3.72735 4.94369 3.728 4.89333 3.72913 4.84837C3.73453 4.63235 3.87864 4.47324 4.09439 4.46126C4.16835 4.45717 4.25726 4.45453 4.36371 4.45453H5.00008C5.06486 4.45453 5.12179 4.45627 5.17166 4.45917Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.54537 2.99998C5.54537 3.40163 5.21975 3.72725 4.81809 3.72725C4.41644 3.72725 4.09082 3.40163 4.09082 2.99998C4.09082 2.59832 4.41644 2.27271 4.81809 2.27271C5.21975 2.27271 5.54537 2.59832 5.54537 2.99998Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <template
                    v-for="e in currenciesStore.getFormsError[form._id]?.errors"
                    :key="e.type"
                  >
                    {{ e.message }}
                  </template>
                </span>
              </div>
            </template>
            <div
              class="change-box_input"
              :class="{ _error: !currenciesStore.getForms['email'] }"
            >
              <input
                v-model="currenciesStore.getForms['email']"
                type="email"
                name="email"
                placeholder="Email"
              />
              <span
                v-if="!currenciesStore.getForms['email']"
                class="change-box__error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                >
                  <path
                    d="M5 1C7.20915 1 9 2.79085 9 5C9 7.20915 7.20915 9 5 9C2.79085 9 1 7.20915 1 5C1 2.79085 2.79085 1 5 1Z"
                    stroke="#F54E6C"
                    stroke-width="0.25"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.17166 4.45917C5.37861 4.47118 5.51099 4.632 5.52381 4.83889C5.53537 5.02544 5.54553 5.30855 5.54553 5.72726V6.64151C5.77642 6.64627 5.94868 6.65378 6.07502 6.66151C6.27391 6.67367 6.43355 6.79607 6.44824 6.9948C6.45219 7.04827 6.45462 7.11026 6.45462 7.1818C6.45462 7.25335 6.45219 7.31533 6.44824 7.3688C6.43355 7.56753 6.27391 7.68993 6.07502 7.70209C5.86421 7.71498 5.52559 7.72726 5.00008 7.72726C4.47457 7.72726 4.13595 7.71498 3.92513 7.70209C3.72624 7.68993 3.56661 7.56753 3.55191 7.3688C3.54797 7.31533 3.54553 7.25335 3.54553 7.1818C3.54553 7.11026 3.54797 7.04827 3.55191 6.9948C3.56661 6.79607 3.72624 6.67367 3.92513 6.66151C4.05148 6.65378 4.22373 6.64627 4.45462 6.64151V5.72726C4.45462 5.66331 4.45486 5.60251 4.4553 5.54475C4.42631 5.5452 4.39582 5.54544 4.36371 5.54544C4.25726 5.54544 4.16835 5.5428 4.09439 5.53871C3.87864 5.52673 3.73453 5.36762 3.72913 5.1516C3.728 5.10664 3.72735 5.05627 3.72735 4.99998C3.72735 4.94369 3.728 4.89333 3.72913 4.84837C3.73453 4.63235 3.87864 4.47324 4.09439 4.46126C4.16835 4.45717 4.25726 4.45453 4.36371 4.45453H5.00008C5.06486 4.45453 5.12179 4.45627 5.17166 4.45917Z"
                    stroke="#F54E6C"
                    stroke-width="0.25"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.54537 2.99998C5.54537 3.40163 5.21975 3.72725 4.81809 3.72725C4.41644 3.72725 4.09082 3.40163 4.09082 2.99998C4.09082 2.59832 4.41644 2.27271 4.81809 2.27271C5.21975 2.27271 5.54537 2.59832 5.54537 2.99998Z"
                    stroke="#F54E6C"
                    stroke-width="0.25"
                    stroke-linejoin="round"
                  />
                </svg>
                Введите электронную почту
              </span>
            </div>
            <template
              v-if="
                currenciesStore.getCurrency?.isCash ||
                currenciesStore.giveCurrency?.isCash
              "
            >
              <div
                class="change-box_input"
                :class="{ _error: !currenciesStore.getForms['telegram'] }"
              >
                <input
                  v-model="currenciesStore.getForms['telegram']"
                  type="text"
                  name="telegram"
                  placeholder="Telegram"
                />
                <span
                  v-if="!currenciesStore.getForms['telegram']"
                  class="change-box__error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d="M5 1C7.20915 1 9 2.79085 9 5C9 7.20915 7.20915 9 5 9C2.79085 9 1 7.20915 1 5C1 2.79085 2.79085 1 5 1Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.17166 4.45917C5.37861 4.47118 5.51099 4.632 5.52381 4.83889C5.53537 5.02544 5.54553 5.30855 5.54553 5.72726V6.64151C5.77642 6.64627 5.94868 6.65378 6.07502 6.66151C6.27391 6.67367 6.43355 6.79607 6.44824 6.9948C6.45219 7.04827 6.45462 7.11026 6.45462 7.1818C6.45462 7.25335 6.45219 7.31533 6.44824 7.3688C6.43355 7.56753 6.27391 7.68993 6.07502 7.70209C5.86421 7.71498 5.52559 7.72726 5.00008 7.72726C4.47457 7.72726 4.13595 7.71498 3.92513 7.70209C3.72624 7.68993 3.56661 7.56753 3.55191 7.3688C3.54797 7.31533 3.54553 7.25335 3.54553 7.1818C3.54553 7.11026 3.54797 7.04827 3.55191 6.9948C3.56661 6.79607 3.72624 6.67367 3.92513 6.66151C4.05148 6.65378 4.22373 6.64627 4.45462 6.64151V5.72726C4.45462 5.66331 4.45486 5.60251 4.4553 5.54475C4.42631 5.5452 4.39582 5.54544 4.36371 5.54544C4.25726 5.54544 4.16835 5.5428 4.09439 5.53871C3.87864 5.52673 3.73453 5.36762 3.72913 5.1516C3.728 5.10664 3.72735 5.05627 3.72735 4.99998C3.72735 4.94369 3.728 4.89333 3.72913 4.84837C3.73453 4.63235 3.87864 4.47324 4.09439 4.46126C4.16835 4.45717 4.25726 4.45453 4.36371 4.45453H5.00008C5.06486 4.45453 5.12179 4.45627 5.17166 4.45917Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.54537 2.99998C5.54537 3.40163 5.21975 3.72725 4.81809 3.72725C4.41644 3.72725 4.09082 3.40163 4.09082 2.99998C4.09082 2.59832 4.41644 2.27271 4.81809 2.27271C5.21975 2.27271 5.54537 2.59832 5.54537 2.99998Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Введите ваш аккаунт telegram
                </span>
              </div>
              <div class="change-box_input">
                <UISelect
                  v-model="cityId"
                  :placeholder="'Город'"
                  class="nice-select"
                  :options="
                    currenciesStore.filteredCities.map((city) => ({
                      text: city.name.toString(),
                      value: city._id.toString(),
                    }))
                  "
                />
              </div>
              <div
                v-if="
                  currenciesStore.getForms['city'] &&
                  currenciesStore.getCurrency?.isCash
                "
                class="change-box_input"
                :class="{ _error: !currenciesStore.getForms['deliveryType'] }"
              >
                <UISelect
                  v-model="deliveryKey"
                  class="nice-select"
                  :placeholder="'Выберите тип доставки'"
                  :options="
                    currenciesStore.deliveryTypes.map((city) => ({
                      text: city.name.toString(),
                      value: city.key.toString(),
                    }))
                  "
                />
                <span
                  v-if="!currenciesStore.getForms['deliveryType']"
                  class="change-box__error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d="M5 1C7.20915 1 9 2.79085 9 5C9 7.20915 7.20915 9 5 9C2.79085 9 1 7.20915 1 5C1 2.79085 2.79085 1 5 1Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.17166 4.45917C5.37861 4.47118 5.51099 4.632 5.52381 4.83889C5.53537 5.02544 5.54553 5.30855 5.54553 5.72726V6.64151C5.77642 6.64627 5.94868 6.65378 6.07502 6.66151C6.27391 6.67367 6.43355 6.79607 6.44824 6.9948C6.45219 7.04827 6.45462 7.11026 6.45462 7.1818C6.45462 7.25335 6.45219 7.31533 6.44824 7.3688C6.43355 7.56753 6.27391 7.68993 6.07502 7.70209C5.86421 7.71498 5.52559 7.72726 5.00008 7.72726C4.47457 7.72726 4.13595 7.71498 3.92513 7.70209C3.72624 7.68993 3.56661 7.56753 3.55191 7.3688C3.54797 7.31533 3.54553 7.25335 3.54553 7.1818C3.54553 7.11026 3.54797 7.04827 3.55191 6.9948C3.56661 6.79607 3.72624 6.67367 3.92513 6.66151C4.05148 6.65378 4.22373 6.64627 4.45462 6.64151V5.72726C4.45462 5.66331 4.45486 5.60251 4.4553 5.54475C4.42631 5.5452 4.39582 5.54544 4.36371 5.54544C4.25726 5.54544 4.16835 5.5428 4.09439 5.53871C3.87864 5.52673 3.73453 5.36762 3.72913 5.1516C3.728 5.10664 3.72735 5.05627 3.72735 4.99998C3.72735 4.94369 3.728 4.89333 3.72913 4.84837C3.73453 4.63235 3.87864 4.47324 4.09439 4.46126C4.16835 4.45717 4.25726 4.45453 4.36371 4.45453H5.00008C5.06486 4.45453 5.12179 4.45627 5.17166 4.45917Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.54537 2.99998C5.54537 3.40163 5.21975 3.72725 4.81809 3.72725C4.41644 3.72725 4.09082 3.40163 4.09082 2.99998C4.09082 2.59832 4.41644 2.27271 4.81809 2.27271C5.21975 2.27271 5.54537 2.59832 5.54537 2.99998Z"
                      stroke="#F54E6C"
                      stroke-width="0.25"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Выберите вид доставки
                </span>
              </div>
            </template>
            <!-- <div class="change-box_input">
              <input type="text" name="wallet" placeholder="Номер кошелька" />
            </div> -->
            <div class="change-box_exchange">
              <button
                class="btn change-box__btn"
                :disabled="
                  currenciesStore.hasAnyErrors ||
                  !currenciesStore.getForms['email'] ||
                  !currenciesStore.amlAgree
                "
              >
                <span>Совершить обмен</span>
              </button>
              <label class="change-box_rules chk_label">
                <input v-model="currenciesStore.amlAgree" type="checkbox" />
                <span></span>
                Согласен с правилами AML
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const currenciesStore = useCurrenciesStore();
type FormKeys = 'email' | 'telegram' | 'city' | 'deliveryType';

const isInProd = process.env.NODE_ENV === 'production';
const changeParams = ref({ get: {}, give: {} });
const submitHandler = async () => {
  if (
    currenciesStore.hasAnyErrors ||
    (isInProd && !currenciesStore.captchaSolved)
  )
    return;
  await navigateTo({ path: '/new' });
};
const city = ref('');
const appStore = useAppStore();

const props = defineProps<{ type: 'get' | 'give' }>();

const error = computed(() => {
  return currenciesStore[props.type === 'get' ? 'getError' : 'giveError'];
});

const cityId = ref();
const deliveryKey = ref();
watch(cityId, () => {
  currenciesStore.getForms.city = currenciesStore.filteredCities.find(
    (city) => city._id === cityId.value,
  );
});
watch(deliveryKey, () => {
  currenciesStore.getForms.deliveryType = currenciesStore.deliveryTypes.find(
    (t) => t.key === deliveryKey.value,
  );
});
</script>

<style scoped></style>
