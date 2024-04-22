<script setup lang="ts">
import '@unocss/reset/tailwind.css'

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/icon.png' }],
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'Zauth App',
  description:
    'Zauth an SSO implemenation using access & refresh token',
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
