import React from "react";
import { ToastProvider } from "../components/ui/use-toast";

function MyApp({ Component, pageProps }: any) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;