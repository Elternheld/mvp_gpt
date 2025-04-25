import { AdminSidebar } from "@/components/layouts/admin/admin-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">Admin-Dashboard-Inhalt</main>
      </div>
    </div>
  )
}
