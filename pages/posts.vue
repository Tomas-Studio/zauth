<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { logout, user } = useUserSession()

const { data } = await useFetch('/api/auth/refresh-token')
</script>

<template>
  <div>
    Posts
    {{ data }}
    <pre>
      {{ user }}
    </pre>
  </div>
  <button fxc py1 w20 border @click="logout">
    Logout
  </button>
</template>
