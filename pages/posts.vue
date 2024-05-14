<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { logout, user, token } = useUserSession()
const { data, error } = await useAPI('/api/posts')
</script>

<template>
  <div>
    Posts
    {{ token }}
    <div>
      {{ user }}
    </div>
    <div>
      {{ data }}
    </div>
    <div>
      {{ error }}
    </div>
  </div>
  <button fxc py1 w20 border @click="logout">
    Logout
  </button>
</template>
