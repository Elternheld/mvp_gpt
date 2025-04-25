import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-end p-4 border-b">
      <nav className="space-x-4">
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Anmelden
        </Link>
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Registrieren
        </Link>
      </nav>
    </header>
  )
}