
import { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  showToast: (message: string) => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<string[]>([]);

  const showToast = (message: string) => {
    setToasts((prev) => [...prev, message]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast, index) => (
          <div key={index} className="bg-black text-white p-2 rounded">
            {toast}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
