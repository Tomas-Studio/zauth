<script setup lang="ts">
import type { JwtPayload } from 'jsonwebtoken'

definePageMeta({ middleware: 'auth' })
const { logout, user, token } = useUserSession()

interface Post {
  payload: string | JwtPayload
}

const { data } = await useAPI<Post>('/api/posts')
</script>

<template>
  <div>
    Posts
    {{ token }}
    <pre>
      {{ user }}
    </pre>
    <pre>
      {{ data }}
    </pre>
  </div>
  <button fxc py1 w20 border @click="logout">
    Logout
  </button>
</template>
