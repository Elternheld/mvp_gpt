"use client"

import Link from "next/link"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/layouts/mobile-sidebar"

<header className="...">
  <div className="flex items-center space-x-2">
    <MobileSidebar />
    ...
  </div>
</header>

export function Topbar() {
  return (
    <header className="w-full border-b bg-white px-4 py-3 shadow-sm flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="ElternHeld Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold tracking-tight">ElternHeld</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}