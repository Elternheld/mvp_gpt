export type Role = "admin" | "user" | "moderator" | "guest"

export function getUserRoleLabel(role: Role): string {
  switch (role) {
    case "admin":
      return "Administrator"
    case "moderator":
      return "Moderator"
    case "user":
      return "Elternteil"
    case "guest":
      return "Gast"
    default:
      return "Unbekannt"
  }
}