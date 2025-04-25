"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, MessageSquare } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

export function AgentSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r p-4 space-y-6">
      <div className="text-lg font-bold flex items-center gap-2">
        <MessageSquare className="h-5 w-5" /> Agent Panel
      </div>
      <nav className="flex flex-col space-y-2">
        <Link href="/agent" className="hover:underline text-sm flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
        <Link href="/agent/tickets" className="hover:underline text-sm flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Anfragen
        </Link>
      </nav>
      <div className="pt-6 border-t">
        <SignOutButton>
          <button className="text-sm text-red-500 hover:underline flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Abmelden
          </button>
        </SignOutButton>
      </div>
    </aside>
  )
}