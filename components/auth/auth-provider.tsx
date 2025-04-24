"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "@/types/auth"
import { login as apiLogin, register as apiRegister } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ success: false, message: "AuthContext not initialized" }),
  logout: () => {},
  register: async () => ({ success: false, message: "AuthContext not initialized" }),
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const result = await apiLogin(email, password)
      if (result.success && result.user) {
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
      return result
    } catch (error) {
      console.error("Login error", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await apiRegister(name, email, password)
      if (result.success && result.user) {
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
      return result
    } catch (error) {
      console.error("Registration error", error)
      return { success: false, message: "An error occurred during registration" }
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}
