import type { H3Error, H3Event } from 'h3'

export interface OAuthConfig<TConfig, TReturn = any, TUser = any, TTokens = any> {
  config?: TConfig
  onSuccess?: (event: H3Event, result: { user: TUser, tokens: TTokens }) => Promise<void> | Promise<TReturn> | void
  onError?: (event: H3Event, error: H3Error) => Promise<void> | void
}
