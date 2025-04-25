"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/layouts/mobile-sidebar"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-950">
      <div className="flex items-center space-x-2">
        <MobileSidebar />
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/elternheld_logo_transparent_full.png" alt="ElternHeld Logo" width={40} height={40} />
            <span className="font-bold text-lg">ElternHeld</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </header>
  )
}