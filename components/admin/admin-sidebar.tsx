"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AdminSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Benutzer", href: "/admin/users", icon: Users },
    { name: "Aktivitäten", href: "/admin/activities", icon: FileText },
    { name: "Community", href: "/admin/community", icon: MessageSquare },
    { name: "Berichte", href: "/admin/reports", icon: BarChart3 },
    { name: "Berechtigungen", href: "/admin/permissions", icon: Shield },
    { name: "Einstellungen", href: "/admin/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <SignedIn>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-salmon flex items-center justify-center text-white mr-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">ElternHeld Admin</p>
                    <p className="text-xs text-gray-500">{user?.fullName}</p>
                  </div>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      isActive(item.href) ? "bg-salmon/10 text-salmon" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <SignOutButton>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Abmelden
                  </Button>
                </SignOutButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-salmon flex items-center justify-center text-white mr-3">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">ElternHeld Admin</p>
                <p className="text-xs text-gray-500">{user?.fullName}</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 rounded-full bg-salmon flex items-center justify-center text-white mx-auto">
              <Shield className="h-5 w-5" />
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                isActive(item.href) ? "bg-salmon/10 text-salmon" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mx-auto" : "mr-3")} />
              {!isCollapsed && item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <SignOutButton>
            <Button
              variant="outline"
              className={cn("flex items-center", isCollapsed ? "justify-center p-2" : "justify-center w-full")}
            >
              <LogOut className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && "Abmelden"}
            </Button>
          </SignOutButton>
        </div>
      </div>
    </SignedIn>
  )
}
