
import { AgentSidebar } from "@/components/layouts/agent-sidebar"
import { Topbar } from "@/components/layouts/topbar"

export default function AgentDashboard() {
  return (
    <div className="flex min-h-screen">
      <AgentSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4">Agent Dashboard Inhalt</main>
      </div>
    </div>
  )
}
