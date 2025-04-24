"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Redirect based on user role happens in the auth provider
        router.push("/mobile")
      } else {
        setError("Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.")
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ihre-email@beispiel.de"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Passwort</Label>
          <a href="#" className="text-xs text-salmon hover:underline">
            Passwort vergessen?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" className="w-full bg-salmon hover:bg-salmon/90" disabled={isLoading}>
        {isLoading ? "Anmeldung..." : "Anmelden"}
      </Button>

      <div className="mt-6">
        <p className="text-sm text-center text-gray-600 mb-4">Demo-Accounts:</p>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("max@example.com")
              setPassword("password123")
            }}
          >
            Kunde: max@example.com
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("anna@elternheld.de")
              setPassword("password123")
            }}
          >
            Agent: anna@elternheld.de
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("admin@elternheld.de")
              setPassword("password123")
            }}
          >
            Admin: admin@elternheld.de
          </Button>
        </div>
      </div>
    </form>
  )
}
