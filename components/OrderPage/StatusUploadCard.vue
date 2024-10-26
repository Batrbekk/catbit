<script setup lang="ts">
import { useOrderStore } from "~~/stores/orderStore";
const orderStore = useOrderStore();

const uploadedImage = ref(null);
const uploadedImgPreview = ref(null);

const handleFileInputChange = (e) => {
  uploadedImage.value = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImgPreview.value.src = e.target.result;
    uploadedImgPreview.value.style["z-index"] = 1;
    // uploadedImgPreview.value.style[
    //   "background-image"
    // ] = `url(${e.target.result})`;
  };
  reader.readAsDataURL(uploadedImage.value);
};

const updateTransaction = async () => {
  try {
    const fd = new FormData();
    fd.append("image", uploadedImage.value);
    fd.append("step", 6);
    await orderStore.updateOrder(fd);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div>
    <section class="s-about b-section pt-0">
      <div class="b-section__heading">
        <div class="b-section__title">Верификация</div>
        <div class="b-section__subtitle">ID заявки: {{ orderStore.id }}</div>
      </div>
      <div class="b-section__content w80 ml-auto mr-auto">
        <article class="article">
          <p>
            Для обмена требуется проверка банковской карты. Эта процедура
            необходима для того, чтобы обезопасить ваши денежные средства от
            мошеннических действий, и занимает всего пару минут.
          </p>
          <br />
          <p>Как пройти верификацию:</p>
          <ol>
            <li>
              <p>В зависимости от того, какая у вас карта:</p>
              <p>
                <ul>
                  <li class="no-numeration">
                    Пластиковая карта именная
                  </li>
                </ul>
                Сделайте фото карты на фоне обменника <strong>ИЛИ</strong> Сделайте селфи с картой и запиской в руке
              на которой будет написан адрес "Catbit.io"
              </p>
              <p>
                <ul>
                  <li class="no-numeration">
                    Пластиковая карта неименная
                  </li>
                </ul>
                Сделайте фото карты и паспорта на фоне обменника <strong>ИЛИ</strong> Сделайте селфи с картой, паспортом и запиской в руке на которой будет написан адрес "Catbit.io"
              </p>
              <p>
                <ul>
                  <li class="no-numeration">
                    Виртуальная карта
                  </li>
                </ul>
                Сделайте селфи с устройством с открытой картой, паспортом и запиской в руке
              на которой написан адрес "Catbit.io"
              </p>
              <p>
                Сфотографируйте карту на фоне нашего сайта, где виден номер заявки.

                Должны быть видны первые и последние четыре цифры номера карты и ФИО владельца
                (отчество - если есть)
              </p>
            </li>
          </ol>

          <div class="b-upload b-upload--fix-width">
            <div class="b-upload__heading">
              <p>Пример фото:</p>
            </div>
            <div class="b-upload__body">
              <div class="b-upload__preview" data-title="Пример фото">
                <img
                  ref="uploadedImgPreview"
                  id="imagePreview"
                  class="b-upload__preview-pic"
                  src="/img/icons/logo.png"
                  alt=""
                  style="object-fit: contain"
                />
              </div>
              <div class="b-upload__zone b-upload__button text-center">
                <input
                  class="hide"
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  @change="handleFileInputChange"
                />
                <label class="abs-link" for="imageUpload"></label>
                <div class="b-upload__zone-title">Выбрать фото</div>
                <div class="b-upload__zone-icn">
                  <i class="icon-upload-img"></i>
                </div>
              </div>
            </div>
          </div>

          <ol start="2">
            <li>Дождитесь верификации карты. Обычно это занимает 1-3 минуты</li>
            <li>
              После верификации вашей карты вы получите реквизиты для оплаты
            </li>
            <li>Ожидайте обработку заявки оператором</li>
          </ol>
        </article>

        <div class="row-field row-field--btn text-center mt-4">
          <!-- <a href="#!" class="btn size-medium">ОТПРАВИТЬ</a> -->
          <button
            :disabled="!uploadedImage || orderStore.isBusy"
            @click="updateTransaction"
          >
            Отправить
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.no-numeration {
  list-style-type: disc;
  padding: initial;
}
.no-numeration::before {
  content: "";
  position: initial;
  margin: initial;
  line-height: initial;
}
</style>
