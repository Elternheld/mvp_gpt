import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4">Admin Dashboard Inhalte hier...</main>
      </div>
    </div>
  )
}