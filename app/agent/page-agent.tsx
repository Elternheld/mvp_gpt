import { SignedIn } from "@clerk/nextjs"
import { AgentSidebar } from "@/components/agent/agent-sidebar"

export default function AgentPage() {
  return (
    <SignedIn>
      <div className="flex">
        <AgentSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Agent Dashboard</h1>
          <p className="mt-2 text-gray-600">Hier siehst du die Ansicht für Agenten.</p>
        </main>
      </div>
    </SignedIn>
  )
}