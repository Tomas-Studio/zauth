export default defineNuxtPlugin(() => {
  const { token, logout } = useUserSession()
  const api = $fetch.create({
    onRequest({ options }) {
      options.headers = (options.headers || {}) as Record<string, string>
      options.headers.Authorization = `Bearer ${token.value}`
    },
    onResponse(context) {
      const { response } = context
      const isUnauthorized = response.status === 401
      if (!isUnauthorized)
        return

      try {
        // fetch a new access token
        // make the request again

      }
      catch (error) {
        console.log(error)
        logout()
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
