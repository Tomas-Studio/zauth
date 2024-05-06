import type { UseFetchOptions } from '#app'

export function useAPI<T>(
  url: string | (() => string),
  options?: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) {
  const { logout, refresh, token } = useUserSession()
  return useFetch(url, {
    ...options,
    async onRequest({ options }) {
      if (!token.value)
        await refresh()
      options.headers = (options.headers || {}) as Record<string, string>
      options.headers.Authorization = `Bearer ${token.value}`
    },
    async onResponse(context) {
      const { response, request } = context
      const isUnauthorized = response.status === 401
      if (!isUnauthorized)
        return

      try {
        await refresh()
        await $fetch(request, {
          onRequest({ options }) {
            if (!token.value)
              return
            options.headers = (options.headers || {}) as Record<string, string>
            options.headers.Authorization = `Bearer ${token.value}`
          },
          onResponse(ctx) {
            Object.assign(context, ctx)
          },
        })
      }
      catch (error) {
        await logout()
      }
    },
  })
}
