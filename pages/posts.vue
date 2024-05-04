<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { logout, user } = useUserSession()
</script>

<template>
  <div>
    Posts
    <pre>
      {{ user }}
    </pre>
  </div>
  <button fxc py1 w20 border @click="logout">
    Logout
  </button>
</template>
