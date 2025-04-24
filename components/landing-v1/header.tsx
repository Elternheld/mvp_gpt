"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Navigation items
const navigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Community", href: "/community" },
  { name: "Über uns", href: "/ueber-uns-landing" },
  { name: "Kontakt", href: "/kontakt" },
]

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const router = useRouter()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Scroll-Handler mit Debounce für bessere Performance
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled)
      }
    }

    // Debounce-Funktion für bessere Performance
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    window.addEventListener("scroll", debouncedHandleScroll)
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [isScrolled])

  // Safe navigation function
  const handleNavigation = useCallback(
    (path: string) => {
      try {
        router.push(path)
      } catch (error) {
        console.error("Navigation error:", error)
      }
    },
    [router],
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-md" : "py-5 bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/landing-v1" className="flex items-center">
              <div className="h-12 w-12 relative">
                <Image
                  src="/elternheld_logo_transparent_full.png"
                  alt="ElternHeld Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  onLoad={() => setLogoLoaded(true)}
                  priority
                />
                {!logoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-salmon border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
              <span className="ml-2 text-2xl font-bold text-foreground hidden sm:inline-block">ElternHeld</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-text-dark hover:text-salmon font-medium relative group rounded-full hover:bg-salmon/5 transition-all duration-200 flex items-center"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-salmon to-green group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-3"
          >
            <Button variant="outline" size="sm" className="rounded-full px-5 border-salmon text-salmon">
              Anmelden
            </Button>
            <Button variant="default" size="sm" className="rounded-full px-5 bg-green text-white">
              Registrieren
            </Button>
            <Button
              size="sm"
              onClick={() => handleNavigation("/mobile")}
              className="flex items-center gap-2 rounded-full px-5 bg-salmon text-white"
            >
              <Smartphone className="h-4 w-4" />
              <span>Zur Mobile App</span>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden relative z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pt-4 pb-2 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className="text-salmon hover:text-salmon/70 font-medium block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="pt-2 flex flex-col space-y-2"
                >
                  <Button variant="ghost" className="w-full justify-start text-salmon">
                    Anmelden
                  </Button>
                  <Button className="bg-salmon hover:bg-salmon/90 text-white w-full mb-2">Registrieren</Button>
                  <Button
                    className="bg-blue hover:bg-blue/90 text-text-dark w-full flex items-center justify-center gap-2"
                    onClick={() => handleNavigation("/mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Zur Mobile App</span>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
