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
  firstname: string
  lastname: string
  role: Role
  authType: Auth_Type
}

export interface UserSession {
  user?: User
}

export interface NewRT {
  expireAt: Date
  userId: string
}

export type NewUser = User
