
"use client"

import * as React from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toasts: Toast[]
  showToast: (toast: Toast) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = (toast: Toast) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}
