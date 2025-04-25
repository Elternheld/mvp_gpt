import "./globals.css"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export const metadata: Metadata = {
  title: "ElternHeld",
  description: "Dein Eltern-Alltagshelfer"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="de">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
