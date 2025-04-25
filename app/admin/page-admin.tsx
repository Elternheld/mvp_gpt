import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SignedIn } from "@clerk/nextjs"

export default function AdminPage() {
  return (
    <SignedIn>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Hier siehst du die Admin-Ansicht.</p>
        </main>
      </div>
    </SignedIn>
  )
}