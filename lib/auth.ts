import type { Role, User } from "@/types/auth"

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

// Fake-Login für MVP (später durch echte API ersetzen)
export async function login(email: string, password: string): Promise<User> {
  return {
    id: "1",
    name: "Demo Nutzer",
    email,
    role: "user"
  }
}

// Fake-Registrierung für MVP (später durch echte API ersetzen)
export async function register(email: string, password: string): Promise<User> {
  return {
    id: "2",
    name: "Neuer Nutzer",
    email,
    role: "user"
  }
}