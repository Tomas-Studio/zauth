// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  routeRules: {
    '/': { redirect: '/auth/sign-in' },
    '/auth': { redirect: '/auth/sign-in' },
  },
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
        redirectUrl: '',
      },
    },
    jwt: {
      accessSecret: '',
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
  experimental: {
    asyncContext: true,
  },
  vueuse: {
    ssrHandlers: true,
  },
})
