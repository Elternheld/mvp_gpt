
import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </main>
      </div>
    </div>
  )
}
