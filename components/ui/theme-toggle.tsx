"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState("classic")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("classic")}
        className="px-3 py-1 rounded-md text-sm border bg-white shadow"
      >
        Classic
      </button>
      <button
        onClick={() => setTheme("pastell")}
        className="px-3 py-1 rounded-md text-sm border bg-white shadow"
      >
        Pastell
      </button>
    </div>
  )
}