import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
