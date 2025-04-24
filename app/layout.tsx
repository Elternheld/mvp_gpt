import Header from "@/components/layout/header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}