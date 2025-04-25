import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the ToastContext
interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string) => void;
  removeToast: (id: string) => void;
}

// Create the ToastContext
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Debugging: Log the created ToastContext
console.log("ToastContext:", ToastContext);

// Toast Provider Component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Math.random().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};