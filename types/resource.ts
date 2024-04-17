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
} as const

export type Role = ObjectValues<typeof ROLE>
export type Auth_Type = ObjectValues<typeof AUTH_TYPE>

export interface User {
  id: string
  email: string
  role: Role
}

export interface UserSession {
  user?: User
}
