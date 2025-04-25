import LayoutShell from "@/components/layouts/layout-shell"
import { ThemeToggle } from "@/components/ui/theme-toggle"

<ThemeToggle />

export default function DashboardPage() {
  return (
    <LayoutShell>
      <section className="max-w-3xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">Willkommen bei ElternHeld 👋</h1>
        <p className="text-gray-600 text-lg">
          Dein persönliches Dashboard – starte direkt mit dem Aktivitäts-Generator oder entdecke neue Vorschläge für deinen Familienalltag!
        </p>
      </section>
    </LayoutShell>
  )
}