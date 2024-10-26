<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { useReviewsStore } from '~~/stores/reviewsStore';
useHead({
  title: 'Отзывы',
});

const captchaSolved = ref(false);
const captchaInstance = ref(null);

const reviewsStore = useReviewsStore();
reviewsStore.getReviews();

const formatDate = (date) =>
  useDateFormat(date, 'DD.MM.YYYY HH:mm', {
    locales: 'ru-RU',
  });

const changePageHandler = (page) => {
  reviewsStore.goToPage(page);
};

const postReviewHandler = () => {
  captchaSolved.value = false;
  captchaInstance.value.reset();
  reviewsStore.postReview();
};
</script>
<template>
  <div class="s-main__content fullWidth">
    <!-- -->
    <section class="s-feedback-form b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Написать отзыв</div>
      </div>
      <div class="b-section__content">
        <div class="b-section__feedback-form ml-auto mr-auto">
          <form
            class="form form-feedback app-form-feedback"
            @submit.prevent="postReviewHandler"
          >
            <div class="form-feedback__row">
              <div class="form-feedback__col form-feedback__left">
                <div class="row-field has-error">
                  <label class="block" for="feedback_name"
                    ><span class="required">*</span>Имя</label
                  >
                  <input
                    id="feedback_name"
                    v-model="reviewsStore.fullName"
                    name="feedback_name"
                    type="text"
                    required
                  />
                  <p class="text-message--error">Минимум 2 символа</p>
                </div>
              </div>
              <div class="form-feedback__col form-feedback__right">
                <div class="row-field has-error">
                  <label class="block" for="feedback_message"
                    ><span class="required">*</span>Текст отзыва</label
                  >
                  <textarea
                    id="feedback_message"
                    v-model="reviewsStore.description"
                    name="feedback_message"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <p class="text-message--error">Минимум 5 символов</p>
                </div>
              </div>
            </div>

            <div class="row-field text-center">
              <client-only>
                <div class="b-exchange__row row-field text-center">
                  <vue-hcaptcha
                    ref="captchaInstance"
                    sitekey="81e72088-11e1-438f-9084-0eff53348b80"
                    @verify="captchaSolved = true"
                    @error="captchaSolved = false"
                    @expired="captchaSolved = false"
                    @challenge-expired="captchaSolved = false"
                  ></vue-hcaptcha>
                </div>
              </client-only>
            </div>

            <div class="row-field row-field--btn text-center mt-5">
              <button
                :disabled="!captchaSolved"
                type="submit"
                class="btn size-medium"
              >
                ОТПРАВИТЬ
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- -->
    <section class="s-feedback b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Отзывы</div>
      </div>
      <div class="b-section__content">
        <div class="b-section__feedback-list b-feedback-list">
          <!--- feedback-->
          <div
            v-for="review in reviewsStore.reviews"
            :key="review._id"
            class="b-feedback"
          >
            <div class="b-feedback__body">
              <div class="b-feedback__head">
                <div class="b-feedback__name">{{ review.fullName }}</div>
                <div class="b-feedback__date">
                  {{ formatDate(review.date) }}
                </div>
              </div>
              <div class="b-feedback__txt">{{ review.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <VueAwesomePaginate
      v-model="reviewsStore.page"
      :total-items="reviewsStore.totalDocs || 0"
      :items-per-page="reviewsStore.limit"
      :max-pages-shown="3"
      :on-click="changePageHandler"
    />
  </div>
</template>
<style lang="scss">
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.active-page {
  color: var(--color-primary);
}
</style>
