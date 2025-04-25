"use client"

import Link from "next/link"
import Image from "next/image"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { useState } from "react"
import { Menu } from "lucide-react"

export function Topbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 bg-gray-100 rounded-md shadow-sm"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ElternHeld Logo" width={32} height={32} />
          <span className="font-bold text-lg tracking-tight">ElternHeld</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Anmelden
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  )
}