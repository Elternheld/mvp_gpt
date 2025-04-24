"use client"

import { type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { hasPermission } from "@/lib/auth"
import type { Role } from "@/types/auth"
import { PageLoader } from "@/components/ui/page-loader"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: Role | Role[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requiredRole = ["customer", "agent", "admin"],
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !hasPermission(user, requiredRole))) {
      router.push(redirectTo)
    }
  }, [user, isLoading, requiredRole, redirectTo, router])

  if (isLoading) {
    return <PageLoader message="Authentifizierung wird überprüft..." />
  }

  if (!user || !hasPermission(user, requiredRole)) {
    return null
  }

  return <>{children}</>
}
