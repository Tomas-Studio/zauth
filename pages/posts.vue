<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { logout, user, token } = useUserSession()
</script>

<template>
  <div>
    Posts
    {{ token }}
    <pre>
      {{ user }}
    </pre>
  </div>
  <button fxc py1 w20 border @click="logout">
    Logout
  </button>
</template>
