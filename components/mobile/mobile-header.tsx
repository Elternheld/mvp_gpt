"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/auth/user-menu"
import Image from "next/image"
import Link from "next/link"

interface MobileHeaderProps {
  title?: string
  showBackButton?: boolean
  showLogo?: boolean
  backUrl?: string
}

export function MobileHeader({ title, showBackButton = false, showLogo = true, backUrl }: MobileHeaderProps) {
  const router = useRouter()
  const [logoLoaded, setLogoLoaded] = useState(false)

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl)
    } else {
      router.back()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="max-w-screen-xl mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            {showBackButton && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {showLogo && (
              <Link href="/mobile" className="flex items-center">
                <div className="h-8 w-8 relative mr-2">
                  <Image
                    src="/elternheld_logo_transparent_full.png"
                    alt="ElternHeld Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    onLoad={() => setLogoLoaded(true)}
                    priority
                  />
                  {!logoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border-2 border-salmon border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>
                {title && <h1 className="font-bold text-lg">{title}</h1>}
              </Link>
            )}
            {!showLogo && title && <h1 className="font-bold text-lg">{title}</h1>}
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  )
}
