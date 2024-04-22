import type { Auth_Type, Role } from './resource'

export interface Payload {
  /**
   * Subject to whom the token refers to, userId
   */
  sub: string
  /**
   * Subject's id
   */
  id: string
  /**
   * Subject's email
   */
  email: string
  /**
   * Subject's firstname
   */
  firstname: string
  /**
   * Subject's lastname
   */
  lastname: string
  /**
   * Subject's role
   */
  role: Role
  /**
   * Authentication provider
   */
  auth_type: Auth_Type
}
