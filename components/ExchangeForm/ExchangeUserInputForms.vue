<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { useCurrenciesStore } from '~~/stores/currenciesStore';
import { useAppStore } from '~~/stores/appStore';

const appStore = useAppStore();
const currenciesStore = useCurrenciesStore();
currenciesStore.captchaSolved = false;
const isInProd = process.env.NODE_ENV === 'production';
</script>
<template>
  <transition name="slideDown" mode="out-in">
    <div v-if="appStore.isInit">
      <div
        v-if="
          currenciesStore.giveCurrency && currenciesStore.giveCurrency.forms
        "
        class="b-exchange__row row-field row-field--flex align-center"
      >
        <div
          v-for="form in currenciesStore.giveCurrency.forms.filter(
            (f) => f.type === 0,
          )"
          :key="form.key"
          class="b-exchange__col"
        >
          <div class="row-field has-error">
            <label class="block" :for="form.key"
              ><span v-if="form.required" class="required">*</span
              >{{ form.title }}</label
            >
            <input
              :id="form.key"
              v-model="currenciesStore.giveForms[form._id]"
              :name="form.key"
              type="text"
              :pattern="form.regexp.value || '.*'"
              :maxlength="form.maxLength || form.length"
              :minlength="form.minLength || form.length"
              :placeholder="form.placeholder"
              :required="form.required"
            />
            <div class="text-message--error">
              <div
                v-for="error in currenciesStore.giveFormsError[form._id].errors"
                :key="error.type"
              >
                {{ error.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="currenciesStore.getCurrency && currenciesStore.getCurrency.forms"
        class="b-exchange__row row-field row-field--flex align-center"
      >
        <div
          v-for="form in currenciesStore.getCurrency.forms.filter(
            (f) => f.type === 1,
          )"
          :key="form.key"
          class="b-exchange__col"
        >
          <div class="row-field has-error">
            <label class="block" :for="form.key"
              ><span v-if="form.required" class="required">*</span
              >{{ form.title }}</label
            >
            <input
              :id="form.key"
              v-model="currenciesStore.getForms[form._id]"
              :name="form.key"
              type="text"
              :pattern="form.regexp.value || '.*'"
              :maxlength="form.maxLength || form.length"
              :minlength="form.minLength || form.length"
              :placeholder="form.placeholder"
              :required="form.required"
            />
            <div class="text-message--error">
              <div
                v-for="error in currenciesStore.getFormsError[form._id].errors"
                :key="error.type"
              >
                {{ error.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="b-exchange__row row-field row-field--flex align-center">
        <div class="b-exchange__col">
          <div class="row-field has-error">
            <label class="block" for="exchange_user_email"
              ><span class="required">*</span> Ваша электронная почта</label
            >
            <input
              id="exchange_user_email"
              v-model="currenciesStore.getForms['email']"
              name="exchange_user_email"
              type="email"
              :required="true"
            />
            <div
              v-if="!currenciesStore.getForms['email']"
              class="text-message--error"
            >
              <div>Введите электронную почту</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          currenciesStore.getCurrency?.isCash ||
          currenciesStore.giveCurrency?.isCash
        "
        class="b-exchange__row row-field row-field--flex align-center"
      >
        <div class="b-exchange__col">
          <div class="row-field has-error">
            <label class="block" for="exchange_user_telegram"
              ><span class="required">*</span> Ваш аккаунт telegram</label
            >
            <input
              id="exchange_user_telegram"
              v-model="currenciesStore.getForms['telegram']"
              name="exchange_user_telegram"
              type="telegram"
              :required="true"
            />
            <div
              v-if="!currenciesStore.getForms['telegram']"
              class="text-message--error"
            >
              <div>Введите ваш аккаунт telegram</div>
            </div>
          </div>
        </div>
        <div class="b-exchange__col">
          <div class="row-field has-error">
            <label class="block" for="exchange_city">
              <span class="required">*</span> Город
            </label>
            <div class="select-wrp">
              <select
                id="exchange_city"
                v-model="currenciesStore.getForms['city']"
                name="exchange_city"
                :required="true"
                @change="currenciesStore.handleDeliveryTypeOrCity"
              >
                <option
                  v-for="city in currenciesStore.filteredCities"
                  :key="city._id"
                  :value="city"
                  :label="city.name"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div
              v-if="!currenciesStore.getForms['city']"
              class="text-message--error"
            >
              <div>Выберите ваш город</div>
            </div>
          </div>
        </div>
        <div
          v-if="
            currenciesStore.getForms['city'] &&
            currenciesStore.getCurrency?.isCash
          "
          class="b-exchange__col"
        >
          <div class="row-field has-error">
            <label class="block" for="delivery_type">
              <span class="required">*</span> Вид доставки
            </label>
            <div class="select-wrp">
              <select
                id="delivery_type"
                v-model="currenciesStore.getForms['deliveryType']"
                name="delivery_type"
                :required="true"
                @change="currenciesStore.handleDeliveryTypeOrCity"
              >
                <option
                  v-for="typeEL in currenciesStore.deliveryTypes"
                  :key="typeEL.key"
                  :value="typeEL"
                  :label="typeEL.name"
                >
                  {{ typeEL.name }}
                </option>
              </select>
            </div>
            <div
              v-if="!currenciesStore.getForms['deliveryType']"
              class="text-message--error"
            >
              <div>Выберите вид доставки</div>
            </div>
          </div>
        </div>
      </div>

      <client-only>
        <div class="b-exchange__row row-field text-center">
          <vue-hcaptcha
            sitekey="81e72088-11e1-438f-9084-0eff53348b80"
            @verify="currenciesStore.captchaSolved = true"
            @error="currenciesStore.captchaSolved = false"
            @expired="currenciesStore.captchaSolved = false"
            @challenge-expired="currenciesStore.captchaSolved = false"
          ></vue-hcaptcha>
        </div>
      </client-only>
      <div class="b-exchange__row row-field text-center">
        <input
          id="exchange_user_aml_agree"
          v-model="currenciesStore.amlAgree"
          name="exchange_user_aml_agree"
          class="checkbox"
          type="checkbox"
        />
        <label class="label" for="exchange_user_aml_agree">
          <NuxtLink class="link-txt" to=""> Согласен с правилами AML </NuxtLink>
        </label>
      </div>
      <div class="b-exchange__row row-field row-field--btn text-center">
        <button
          :disabled="
            currenciesStore.hasAnyErrors ||
            (isInProd && !currenciesStore.captchaSolved) ||
            !currenciesStore.getForms['email'] ||
            !currenciesStore.amlAgree
          "
          class="btn size-extra"
        >
          ОБМЕНЯТЬ
        </button>
      </div>
    </div>
  </transition>
</template>
