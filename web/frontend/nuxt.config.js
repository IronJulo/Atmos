import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Atmos',
    title: 'Atmos',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/apexcharts', ssr: false },
    { src: '~/plugins/vueGridLayout', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'vuetify-dialog/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    baseUrl: 'http://loaclhost:3000/'
  },

  proxy: {
    '/api/': { target: 'http://localhost:3001/', pathRewrite: { '^/api/': '' } }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          type: 'Bearer',
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post'
          },
          refresh: {
            url: '/api/auth/refresh',
            method: 'post',
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/register',
      home: '/'
    },
    watchLoggedIn: true,
    rewriteRedirects: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

}
