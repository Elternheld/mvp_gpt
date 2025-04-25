"use client"

import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function UserMenu() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role

  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <div className="flex flex-col items-end text-sm text-right mr-2">
          <span className="font-semibold">{user?.fullName}</span>
          {role && (
            <span className="text-xs text-gray-500">
              {role === "admin" && "👑 Admin"}
              {role === "agent" && "🎧 Agent"}
              {role === "customer" && "👨‍👩‍👧‍👦 Kunde"}
            </span>
          )}
        </div>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Anmelden
          </button>
        </SignInButton>
        <Link href="/sign-up" className="text-sm font-medium text-blue-600 hover:underline">
          Registrieren
        </Link>
      </SignedOut>
    </div>
  )
}