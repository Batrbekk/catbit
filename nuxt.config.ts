import svgLoader from 'vite-svg-loader';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-swiper',
    [
      'nuxt-yandex-metrika',
      {
        id: 89665322,
      },
    ],
  ],
  css: ['@/assets/styles/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";',
        },
      },
    },
    plugins: [svgLoader()],
  },
  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      devApiUrl: process.env.NUXT_PUBLIC_DEVAPIURL || 'http://localhost:3000',
      prodApiUrl:
        process.env.NUXT_PUBLIC_PRODAPIURL || 'https://next.catbit.io',
    },
  },
  app: {
    head: {
      script: [
        { src: '/js/jquery.min.js', type: 'text/javascript', defer: true },
        {
          src: '/js/swiper-bundle.min.js',
          type: 'text/javascript',
          defer: true,
        },
        {
          src: '/js/jquery.nice-select.min.js',
          type: 'text/javascript',
          defer: true,
        },
        { src: '/js/scripts.js', type: 'text/javascript', defer: true },
      ],
    },
  },

  swiper: {
    modules: ['navigation', 'pagination'],
  },

  pinia: {
    storesDirs: ['stores/**/*'],
  },
  typescript: {
    strict: true,
  },
});
