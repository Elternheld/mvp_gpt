// hooks/use-toast.ts

import { useState } from "react"

interface Toast {
  id: number
  message: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function showToast(message: string) {
    const id = Date.now()
    const newToast = { id, message }
    setToasts((prevToasts) => [...prevToasts, newToast])

    // Remove toast automatically after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return {
    toasts,
    showToast,
  }
}
