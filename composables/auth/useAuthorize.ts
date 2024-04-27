import type { LocationQuery } from 'vue-router'

export default async function (param: LocationQuery) {
  const { data, pending, status, execute } = await useFetch(
    '/api/auth/callback/microsoft',
    { query: param, immediate: false },
  )

  if (data.value && status.value === 'success') {
    setToken(data.value.accessToken)
    navigateTo('/posts')
  }

  return {
    data,
    pending,
    status,
    execute,
  }
}
