import type { H3Error, H3Event } from 'h3'

export interface OAuthConfig<TConfig, TUser = any, TTokens = any> {
  config?: TConfig
  onSuccess: (event: H3Event, result: { user: TUser, tokens: TTokens }) => Promise<any> | any
  onError?: (event: H3Event, error: H3Error) => Promise<void> | void
}
