"use client"

import Link from "next/link"
import { Shield, Users, LayoutDashboard, LogOut, Menu } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"
import { useState } from "react"

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md shadow-md"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform fixed lg:static z-40 w-64 h-screen bg-gray-100 border-r p-4 space-y-6`}
      >
        <div className="text-lg font-bold flex items-center gap-2">
          <Shield className="h-5 w-5" /> Admin Panel
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="hover:underline text-sm flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/admin/users" className="hover:underline text-sm flex items-center gap-2">
            <Users className="h-4 w-4" /> Benutzer
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
    </>
  )
}