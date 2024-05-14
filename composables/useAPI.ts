import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'
import type { AsyncData, FetchResult, UseFetchOptions } from '#app'

/**
 * Types are gotten from nuxt repo
 * @see https://github.com/nuxt/nuxt/blob/2d1ab61b2ede074dc71b0cd89ce314f9c6075fef/packages/nuxt/src/app/composables/asyncData.ts
 */

type KeysOf<T> = Array<
  T extends T // Include all keys of union types, not just common keys
    ? keyof T extends string
      ? keyof T
      : never
    : never
>

type PickFrom<T, K extends Array<string>> = T extends Array<any>
  ? T
  : T extends Record<string, any>
    ? keyof T extends K[number]
      ? T // Exact same keys as the target, skip Pick
      : K[number] extends never
        ? T
        : Pick<T, K[number]>
    : T

export default function<
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void ? 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT> : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null,
> (
  url: ReqT | Ref<ReqT> | (() => ReqT),
  options?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>,
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null> {
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
