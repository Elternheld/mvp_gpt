import { ToastProvider } from "../components/ui/use-toast";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;