"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"

export function AgentSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
    { name: "Aktivitäten", href: "/agent/activities", icon: FileText },
    { name: "Community", href: "/agent/community", icon: MessageSquare },
    { name: "Einstellungen", href: "/agent/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <SignedIn>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 h-screen border-r bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-lg">Agent Panel</div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                isActive(item.href) ? "bg-salmon/10 text-salmon" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-center">
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </aside>
    </SignedIn>
  )
}
