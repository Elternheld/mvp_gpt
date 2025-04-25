"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Benutzer", href: "/admin/users", icon: Users },
    { name: "Aktivitäten", href: "/admin/activities", icon: FileText },
    { name: "Einstellungen", href: "/admin/settings", icon: Settings }
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen border-r bg-white">
      <div className="p-4 font-bold text-lg border-b">ElternHeld Admin</div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100",
              pathname === item.href ? "bg-gray-100 text-green-600" : "text-gray-800"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-2 text-sm text-red-600 hover:underline">
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </div>
    </aside>
  )
}