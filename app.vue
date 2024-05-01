<script setup lang="ts">
import '@unocss/reset/tailwind.css'

useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'font-sec' },
  link: [{ rel: 'icon', href: '/northbase.png' }],
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'NorthBase',
  description:
    'NorthBase an SSO implemenation using access & refresh token',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
