export interface Payload {
  /**
   * Subject to whom the token refers to, userId
   */
  sub: string
  /**
   * Issued at (seconds sine Unix epoch)
   */
  iat: number
  /**
   * Subject's email
   */
  email: string
  /**
   * Subject's role
   */
  role: 'regular' | 'admin' | 'manager'
  /**
   * Authentication provider
   */
  auth_type: 'microsoft' | 'google' | 'linkedin'
}
