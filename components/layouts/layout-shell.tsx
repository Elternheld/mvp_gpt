"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { AgentSidebar } from "@/components/layouts/agent-sidebar"
import { Topbar } from "@/components/layouts/topbar"
import { ReactNode } from "react"

export default function LayoutShell({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const pathname = usePathname()
  const role = user?.publicMetadata?.role

  const renderSidebar = () => {
    if (role === "admin") return <AdminSidebar />
    if (role === "agent") return <AgentSidebar />
    return null
  }

  const isDashboardPage = pathname?.startsWith("/dashboard") || role === "customer"

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {renderSidebar()}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}