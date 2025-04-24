"use client"

import { useEffect, useState } from "react"

export default function ActivityFetcher() {
  const [activity, setActivity] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/activity")
        const data = await response.json()
        setActivity(data.message || "Keine Aktivität erhalten.")
      } catch (error) {
        setActivity("Fehler beim Laden der Aktivität.")
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      {loading ? (
        <p className="text-gray-500 italic">Lade Aktivität...</p>
      ) : (
        <p className="text-xl font-semibold">{activity}</p>
      )}
    </div>
  )
}