export type ObjectValues<T> = T[keyof T]

export const ROLE = {
  REGULAR: 'regular',
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const

export const AUTH_TYPE = {
  MICROSOFT: 'microsoft',
  GOOGLE: 'google',
  LINKEDIN: 'linkedin',
  EMAIL: 'email',
} as const

export type Role = ObjectValues<typeof ROLE>
export type Auth_Type = ObjectValues<typeof AUTH_TYPE>
