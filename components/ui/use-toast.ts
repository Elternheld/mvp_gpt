import React, { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

// Create the ToastContext (this is NOT a namespace)
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// Custom Hook
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}