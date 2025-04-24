import type { Role } from "@/types/auth"

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
    case "customer":
      return "Kunde"
    case "agent":
      return "Berater"
    default:
      return "Unbekannt"
  }
}
