import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Willkommen im Adminbereich. Hier kannst du Benutzer verwalten, Aktivitäten prüfen und Einstellungen ändern.</p>
        </main>
      </div>
    </div>
  )
}