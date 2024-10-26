<script lang="ts" setup></script>

<template>
  <div class="wrapper">
    <section class="work">
      <div class="container">
        <div class="work-block">
          <picture>
            <source srcset="/img/work-bg.webp" type="image/webp" />
            <source srcset="/img/work-bg.png" type="image/png" />
            <img class="work__bg" src="/img/work-bg.png" />
          </picture>
          <picture>
            <source srcset="/img/work-bg2.webp" type="image/webp" />
            <source srcset="/img/work-bg2.png" type="image/png" />
            <img class="work__bg2" src="/img/work-bg2.png" />
          </picture>
          <h2 class="title work__title">Принципы работы <span>CatBit</span></h2>
          <div class="work-block__subtitle">
            Покупайте, продавайте и обменивайте криптоактивы максимально просто
          </div>
          <div class="work-row">
            <div class="work-box">
              <img src="/img/icons/work.svg" alt="Иконка" />
              <div class="work-box__text">Поддержка операторов 24/7</div>
            </div>
            <div class="work-box">
              <img src="/img/icons/work2.svg" alt="Иконка" />
              <div class="work-box__text">100% чистота активов</div>
            </div>
            <div class="work-box">
              <img src="/img/icons/work3.svg" alt="Иконка" />
              <div class="work-box__text">Полная анонимность</div>
            </div>
            <div class="work-box">
              <img src="/img/icons/work4.svg" alt="Иконка" />
              <div class="work-box__text">Мгновенное исполнение</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <RunningLine grad />
    <section class="support">
      <div class="container">
        <div class="support-block">
          <picture class="hide-mob">
            <source srcset="/img/support-bg.webp" type="image/webp" />
            <source srcset="/img/support-bg.jpg" type="image/jpeg" />
            <img class="support__bg" src="/img/support-bg.jpg" />
          </picture>
          <picture class="show-mob">
            <source srcset="/img/support-bg_tab.webp" type="image/webp" />
            <source srcset="/img/support-bg_tab.jpg" type="image/jpeg" />
            <img class="support__bg" src="/img/support-bg_tab.jpg" />
          </picture>
          <div class="support-box">
            <h2 class="title support__title">Cлужба поддержки клиентов</h2>
            <div class="support__subtitle">Работает для вас 24/7</div>
            <a href="#" class="btn support__btn">
              <span>
                Регистрация
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M8.5 0C4.084 0 0.5 3.584 0.5 8C0.5 12.416 4.084 16 8.5 16C12.916 16 16.5 12.416 16.5 8C16.5 3.584 12.916 0 8.5 0ZM12.212 5.44C12.092 6.704 11.572 9.776 11.308 11.192C11.196 11.792 10.972 11.992 10.764 12.016C10.3 12.056 9.948 11.712 9.5 11.416C8.796 10.952 8.396 10.664 7.716 10.216C6.924 9.696 7.436 9.408 7.892 8.944C8.012 8.824 10.06 6.96 10.1 6.792C10.1056 6.76655 10.1048 6.74014 10.0978 6.71504C10.0909 6.68995 10.0779 6.66693 10.06 6.648C10.012 6.608 9.948 6.624 9.892 6.632C9.82 6.648 8.7 7.392 6.516 8.864C6.196 9.08 5.908 9.192 5.652 9.184C5.364 9.176 4.82 9.024 4.412 8.888C3.908 8.728 3.516 8.64 3.548 8.36C3.564 8.216 3.764 8.072 4.14 7.92C6.476 6.904 8.028 6.232 8.804 5.912C11.028 4.984 11.484 4.824 11.788 4.824C11.852 4.824 12.004 4.84 12.1 4.92C12.18 4.984 12.204 5.072 12.212 5.136C12.204 5.184 12.22 5.328 12.212 5.44Z"
                    fill="white"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer-block">
          <picture>
            <source srcset="/img/footer-bg.webp" type="image/webp" />
            <source srcset="/img/footer-bg.png" type="image/png" />
            <img class="footer__bg" src="/img/footer-bg.png" />
          </picture>
          <div class="footer-row">
            <div class="footer-left">
              <a href="/" class="footer-logo">
                <img src="/img/icons/logo.png" alt="Логотип" />
                <span>CATBIT.IO</span>
              </a>
              <div class="footer__text">
                CatBit — обмен криптовалют с максимальной скоростью и полной
                анонимностью. <br />Лучшие курсы, мгновенные транзакции и
                строгий контроль чистоты активов.
              </div>
            </div>
            <ul class="footer-menu">
              <li class="footer-menu__item">
                <a href="index.html" class="footer-menu__link">Главная</a>
              </li>
              <li class="footer-menu__item">
                <a href="rules.html" class="footer-menu__link"
                  >Правила обмена</a
                >
              </li>
              <li class="footer-menu__item">
                <a href="partners.html" class="footer-menu__link"
                  >Партнерская программа</a
                >
              </li>
              <li class="footer-menu__item">
                <a href="reviews.html" class="footer-menu__link">Отзывы</a>
              </li>
              <li class="footer-menu__item">
                <a href="rules.html" class="footer-menu__link">Правила AML</a>
              </li>
              <li class="footer-menu__item">
                <a href="/" class="footer-menu__link">FAQ</a>
              </li>
            </ul>
            <div class="footer-right">
              <div class="footer-right_block">
                <span class="footer-right__text footer-right__text--first"
                  >Best</span
                >
                <span class="footer-right__text footer-right__text--last"
                  >change</span
                >
              </div>
              <div class="footer-time">
                <span>Время работы</span>
                <div class="footer-time_box">24/7</div>
              </div>
            </div>
            <div class="footer-soc">
              <a href="#" class="footer-soc__item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2100_113)">
                    <path
                      d="M19.5829 3.96915L19.5829 3.96912C19.9124 3.83044 20.2731 3.78261 20.6273 3.83061C20.9816 3.87861 21.3165 4.02068 21.5972 4.24203C21.8779 4.46339 22.0941 4.75594 22.2234 5.08923C22.3527 5.42252 22.3903 5.78437 22.3323 6.13712L22.3322 6.1373L20.0642 19.8943L20.0642 19.8947C19.7901 21.5475 17.97 22.5108 16.4393 21.6793L16.4392 21.6793C15.4166 21.1238 13.891 20.2644 12.5143 19.3645L12.5141 19.3643C12.1696 19.1389 11.4483 18.6519 10.8412 18.0819C10.5389 17.7981 10.244 17.4746 10.0403 17.1351C9.84136 16.8036 9.68465 16.3811 9.79611 15.9396L9.79626 15.939C9.84691 15.7394 9.96997 15.5321 10.0955 15.3491C10.23 15.1531 10.4049 14.9324 10.6058 14.6969C11.0081 14.2252 11.5389 13.6659 12.1179 13.0806C12.7062 12.4859 13.3532 11.8556 13.9776 11.2532C11.8776 12.7903 9.49123 14.4734 8.54092 15.052L8.54082 15.0521C7.98416 15.3908 7.52736 15.6103 7.10173 15.724C6.66256 15.8414 6.28087 15.8398 5.88683 15.7742C4.63019 15.5651 3.45549 15.2399 2.48637 14.8378L19.5829 3.96915ZM19.5829 3.96915L2.48287 11.1691L2.48283 11.1692M19.5829 3.96915L2.48283 11.1692M2.48283 11.1692C0.907583 11.8326 0.796555 14.137 2.4863 14.8378L2.48283 11.1692Z"
                      fill="none"
                      stroke="#8688AA"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2100_113">
                      <rect width="24" height="24" fill="none" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" class="footer-soc__item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                >
                  <path
                    d="M1.62061 4H1.1101L1.12071 4.5104C1.21971 9.26988 2.45813 13.1459 4.77559 15.8396C7.10312 18.545 10.4696 20 14.6924 20H15.1572H15.6572V19.5V14.7162C18.1661 15.19 20.0792 17.1324 20.887 19.6526L20.9983 20H21.3631H25.6206H26.2762L26.1028 19.3678C25.032 15.4626 22.4285 13.0915 20.4459 11.9333C22.3517 10.5716 24.6162 7.98114 25.2135 4.58664L25.3167 4H24.721H20.8533H20.475L20.3721 4.36413C19.9753 5.76953 19.1854 7.11775 18.2158 8.14061C17.4132 8.9872 16.519 9.57918 15.6572 9.82432V4.5V4H15.1572H11.2895H10.7895V4.5V14.1952C8.77065 13.3364 6.34755 10.5875 6.22792 4.49019L6.21831 4H5.72802H1.62061Z"
                    fill="none"
                    stroke="#8688AA"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
