// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', 'nuxt-security'],
  runtimeConfig: {
    private: {
      database: {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS
      }
    }
  }
})