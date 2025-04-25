import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-4">Willkommen im Admin-Dashboard!</div>
      </div>
    </div>
  )
}