<script setup lang="ts">
const token = useAccessToken()
console.log(`token: ${token.value}`)
</script>

<template>
  <div>
    Posts
    {{ token }}
  </div>
</template>
