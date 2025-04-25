
"use client";

import { createContext, useContext, useState } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const newToast = { id: Date.now(), message };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
