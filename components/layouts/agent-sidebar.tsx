"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { name: "Aktivitäten", href: "/agent/activities", icon: FileText },
  { name: "Nachrichten", href: "/agent/messages", icon: MessageSquare },
  { name: "Einstellungen", href: "/agent/settings", icon: Settings },
]

export function AgentSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">Agent Panel</h2>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
              pathname === item.href ? "bg-salmon/10 text-salmon" : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
