import { UserButton, useUser } from "@clerk/nextjs"

export function UserMenuFull() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role as "admin" | "agent" | undefined

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-end text-sm text-right mr-2">
        <span className="font-semibold">{user?.fullName}</span>
        {role && (
          <span className="text-xs text-gray-500">
            {role === "admin" && "👑 Admin"}
            {role === "agent" && "🎧 Agent"}
          </span>
        )}
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}