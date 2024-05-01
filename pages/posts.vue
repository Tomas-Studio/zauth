<script setup lang="ts">
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
