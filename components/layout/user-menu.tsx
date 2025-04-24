"use client"

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function UserMenu() {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Anmelden
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}