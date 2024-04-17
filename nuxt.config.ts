// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  runtimeConfig: {
    oauth: {
      microsoft: {
        clientId: '',
        clientSecret: '',
        tenant: '',
        scope: [],
        authorizationURL: '',
        tokenURL: '',
        userURL: '',
      },
    },
    jwt: {
      accessSecret: '',
    },
  },
})
