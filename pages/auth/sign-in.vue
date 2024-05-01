<script setup lang="ts">
const route = useRoute()
const { status } = await useAuthorize(route.query)
</script>

<template>
  <main min-h-100dvh h-100dvh wfull relative>
    <div absolute text-7 tracking-tighter top-6 left-8>
      North<span text-green-7>Base</span>
    </div>
    <div hfull wfull flex="~ col" items-center justify-center>
      <h1 font-sec text-2xl mb3 text-neutral-8 tracking-tight>
        Sign into North<span text-green-7>Base</span>
      </h1>
      <div text-lg>
        New to NorthBase
        <NuxtLink to="/" text-blue-5 hover:text-blue-6 duration-300>
          Signup for free
        </NuxtLink>
      </div>

      <div v-if="status === 'idle' && !route.query.code" flex="~ col">
        <button
          btn-auth mt6
          @click="navigateTo('/api/auth/provider/microsoft', { external: true })"
        >
          <div i-logos:microsoft-icon size-4.5 mr2 />
          Sign in with Microsoft
        </button>
        <button
          btn-auth mt5
        >
          <div i-logos:google-icon size-4.5 mr2 />
          Sign in with Google
        </button>
      </div>

      <div v-else mt6 fyc py4 text-neutral-8>
        <div i-svg-spinners:180-ring-with-bg text-green-5 size-6 mr2 />
        <span>Authorizing,  Redirecting....</span>
      </div>

      <div mt10>
        <span text-sm fyc text-neutral-5>
          &copy; 2024 NorthCare, Inc.
        </span>
      </div>
    </div>
  </main>
</template>
