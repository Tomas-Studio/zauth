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
  <button fxc py1 w20 border @click="useLogout()">
    Logout
  </button>
</template>
