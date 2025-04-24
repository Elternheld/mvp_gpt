"use client"

import { useState } from "react"
import { useUser, SignOutButton, SignedIn } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield, Users, MessageSquare, LogOut } from "lucide-react"

const DEMO_ACCOUNTS = [
  {
    name: "Demo Admin",
    email: "admin@elternheld.de",
    role: "admin",
  },
  {
    name: "Demo Agent",
    email: "agent@elternheld.de",
    role: "agent",
  },
  {
    name: "Demo User",
    email: "user@elternheld.de",
    role: "user",
  },
]

export default function AccountSwitcher() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <SignedIn>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Account wechseln</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Accounts</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {DEMO_ACCOUNTS.map((account) => (
              <Card key={account.email}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <div className="text-sm text-gray-500">{account.email}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs text-muted-foreground">
                    Rolle: {account.role}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <SignOutButton>
              <Button variant="destructive" className="w-full flex items-center justify-center">
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </Button>
            </SignOutButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SignedIn>
  )
}