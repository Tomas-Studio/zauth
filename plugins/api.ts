export default defineNuxtPlugin(() => {
  const { token, logout, refresh } = useUserSession()
  const api = $fetch.create({
    onRequest({ options }) {
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
        api(request, {
          onRequest({ options }) {
            options.headers = (options.headers || {}) as Record<string, string>
            options.headers.Authorization = `Bearer ${token.value}`
          },
          onResponse(ctx) {
            Object.assign(context, ctx)
          },
        })
      }
      catch (error) {
        console.log(error)
        await logout()
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
