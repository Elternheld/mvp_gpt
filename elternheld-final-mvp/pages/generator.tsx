import { useState } from 'react'

export default function Generator() {
  const [activity, setActivity] = useState<string | null>(null)

  const handleGenerate = async () => {
    const res = await fetch('/api/generate-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: "8 Jahre, Regen, drinnen, kein Fernseher" })
    })
    const data = await res.json()
    setActivity(data.activity)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Aktivität generieren</h1>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Vorschlag anzeigen
      </button>
      {activity && <p className="mt-4 text-lg">{activity}</p>}
    </div>
  )
}