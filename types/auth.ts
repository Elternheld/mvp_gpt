export type Role =
  | "admin"
  | "user"
  | "moderator"
  | "guest"
  | "customer"
  | "agent"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}