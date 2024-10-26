module.exports = {
  apps: [
    {
      name: 'CatbitFrontSSR',
      script: './.output/server/index.mjs',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
      env: {
        PORT: 3100,
        HOST: '127.0.0.1',
      },
    },
  ],
};
