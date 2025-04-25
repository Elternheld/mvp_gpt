"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/layouts/mobile-sidebar"
import { UserButton } from "@clerk/nextjs"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <MobileSidebar />
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/elternheld_logo_transparent_full.png" alt="ElternHeld Logo" width={40} height={40} />
            <span className="font-bold text-lg">ElternHeld</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}