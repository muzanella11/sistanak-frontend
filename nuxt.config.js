module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'Sistem Informasi Hewan Ternak',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/dialog.js',
    '~/plugins/moment.js',
    '~/plugins/event-bus.js',
    '~/plugins/vee-validate.js'
  ],
  modules: [
    '@nuxtjs/toast'
    // '@nuxtjs/vendor',
    // '@nuxtjs/font-awesome'
  ],
  toast: {
    position: 'top-center',
    duration: 5000,
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },
  css: [
    '~/assets/style/app.styl'
  ],
  env: {
    env: process.env.APP_ENV || 'production',
    apiUrl: process.env.API_LOCAL_URL || '//api.sistanak.me',
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#fb8b34' },
  router: {
    middleware: 'authenticated',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'pagesNotFound',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
