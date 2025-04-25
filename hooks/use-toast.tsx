
"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type Toast = {
  id: number
  title: string
  description?: string
}

type ToastContextType = {
  toasts: Toast[]
  showToast: (toast: Toast) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast])
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
