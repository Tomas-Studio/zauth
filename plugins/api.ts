export default defineNuxtPlugin({
  name: 'custom-api',
  setup: () => {
    const { token, logout, refresh } = useUserSession()
    const api = $fetch.create({
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
          logout()
        }
      },
    })

    return {
      provide: {
        api,
      },
    }
  },
})
