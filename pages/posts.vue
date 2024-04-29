<script setup lang="ts">
const token = useAccessToken()
const user = useUser()
</script>

<template>
  <div>
    Posts
    {{ token }}
    {{ user }}
  </div>
</template>
