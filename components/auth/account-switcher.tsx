"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, MessageSquare } from "lucide-react"
import { getUserRoleLabel } from "@/lib/auth"
import type { Role } from "@/types/auth"

const DEMO_ACCOUNTS = [
  {
    id: "user-1",
    name: "Max Mustermann",
    email: "max@example.com",
    role: "customer" as Role,
    description: "Standard-Benutzer mit Zugriff auf die mobile App und alle Kundenfunktionen.",
  },
  {
    id: "agent-1",
    name: "Anna Support",
    email: "anna@elternheld.de",
    role: "agent" as Role,
    description: "Kundenberater mit Zugriff auf Support-Tools und Kundenanfragen.",
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@elternheld.de",
    role: "admin" as Role,
    description: "Administrator mit vollständiger Kontrolle über die Plattform und alle Funktionen.",
  },
]

export function AccountSwitcher() {
  const { user, login } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleAccountSwitch = async (email: string) => {
    // Für Demo-Zwecke verwenden wir ein einfaches Passwort
    await login(email, "password123")
    setIsOpen(false)
  }

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "customer":
        return "bg-green text-white"
      case "agent":
        return "bg-blue text-white"
      case "admin":
        return "bg-salmon text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case "customer":
        return <Users className="h-5 w-5" />
      case "agent":
        return <MessageSquare className="h-5 w-5" />
      case "admin":
        return <Shield className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${getRoleColor(user?.role || "customer")}`}></div>
          <span>
            {user ? getUserRoleLabel(user.role) : "Nicht angemeldet"} {user && `(${user.name})`}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Account-Typ wechseln</DialogTitle>
          <DialogDescription>
            Wählen Sie einen Account-Typ aus, um zwischen verschiedenen Benutzerrollen zu wechseln.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {DEMO_ACCOUNTS.map((account) => (
            <Card
              key={account.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                user?.email === account.email ? "ring-2 ring-offset-2 " + getRoleColor(account.role) : ""
              }`}
              onClick={() => handleAccountSwitch(account.email)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(account.role)}`}>
                    {getUserRoleLabel(account.role)}
                  </div>
                </div>
                <CardDescription>{account.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{account.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <div
                    className={`w-8 h-8 rounded-full ${getRoleColor(account.role)} flex items-center justify-center mr-2`}
                  >
                    {getRoleIcon(account.role)}
                  </div>
                  {account.role === "customer" && "Zugriff auf mobile App und Kundenfunktionen"}
                  {account.role === "agent" && "Zugriff auf Support-Dashboard"}
                  {account.role === "admin" && "Vollständige Administratorrechte"}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
