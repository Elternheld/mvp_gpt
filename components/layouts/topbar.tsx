"use client"

import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/layouts/mobile-sidebar"

export function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <MobileSidebar />
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/elternheld_logo_transparent_full.png"
            alt="ElternHeld Logo"
            width={140}
            height={40}
            priority
          />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="text-sm font-medium">
            Anmelden
          </Link>
        </SignedOut>
      </div>
    </header>
  )
}