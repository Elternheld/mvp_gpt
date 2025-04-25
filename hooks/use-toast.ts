import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  // weitere Felder je nach Bedarf
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};