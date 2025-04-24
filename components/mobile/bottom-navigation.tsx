"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, User, Search, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/mobile"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/mobile") ? "text-salmon" : "text-gray-500",
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/mobile/aktivitaeten"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/mobile/aktivitaeten") ? "text-green" : "text-gray-500",
          )}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Aktivitäten</span>
        </Link>

        <Link
          href="/mobile/community"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/mobile/community") ? "text-blue" : "text-gray-500",
          )}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Community</span>
        </Link>

        <Link
          href="/mobile/profile"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/mobile/profile") ? "text-salmon" : "text-gray-500",
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profil</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">Mehr</span>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/mobile/settings-landing"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50"
            >
              <span className="font-medium">Einstellungen</span>
            </Link>
            <Link
              href="/mobile/help-landing"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50"
            >
              <span className="font-medium">Hilfe</span>
            </Link>
            <Link
              href="/mobile/about-landing"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50"
            >
              <span className="font-medium">Über uns</span>
            </Link>
            <Link
              href="/mobile/contact-landing"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50"
            >
              <span className="font-medium">Kontakt</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
