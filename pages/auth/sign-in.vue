<script setup lang="ts">
const route = useRoute()
const isAuthenticated = ref(false)

onMounted(async () => {
  if (route.query.code)
    isAuthenticated.value = true
})
</script>

<template>
  <main min-h-100dvh h-100dvh wfull relative>
    <div absolute text-7 tracking-tighter top-6 left-8>
      North<span text-green-7>Care</span>
    </div>
    <div hfull wfull flex="~ col" items-center justify-center>
      <h1 font-sec text-2xl mb3 text-neutral-8 tracking-tight>
        Sign into North<span text-green-7>Care</span>
      </h1>
      <div text-lg>
        New to NorthCare
        <NuxtLink to="/" text-blue-5 hover:text-blue-6 duration-300>
          Signup for free
        </NuxtLink>
      </div>
      <div v-if="isAuthenticated" mt6 flex py4 text-neutral-8>
        <div i-svg-spinners:180-ring-with-bg size-5 mr2 />
        <span>Authorizing, almost there</span>
      </div>
      <button
        inline-flex items-center v-else mt6 px18 py4
        fw500 border border-gray-3 duration-300
        text-neutral-8
        hover="border-blue-5 text-neutral-9"
        active="border-blue-6 text-blue-6"
      >
        <div i-logos:microsoft-icon size-4.5 mr2 />
        Sign in with Microsoft
      </button>

      <div mt10>
        <span text-sm fyc text-neutral-5>
          &copy; 2024 NorthCare, Inc.
        </span>
      </div>
    </div>
  </main>
</template>
