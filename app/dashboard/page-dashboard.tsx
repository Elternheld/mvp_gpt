import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs"

export default function DashboardPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Willkommen im ElternHeld Dashboard 👋</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <p className="text-gray-600">Hier erscheinen bald deine personalisierten Inhalte.</p>
        </div>
      </SignedIn>
    </>
  )
}