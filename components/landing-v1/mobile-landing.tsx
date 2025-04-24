"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight, Home, Users, User, Package, LogIn } from "lucide-react"

export function MobileLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                src="/elternheld_logo_transparent_full.png"
                alt="ElternHeld Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="ml-2 text-xl font-bold">ElternHeld</span>
          </Link>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white px-4 py-2 shadow-lg"
          >
            <nav className="flex flex-col space-y-3 py-2">
              <button
                onClick={() => scrollToSection("home")}
                className={`text-left py-2 px-3 rounded-lg flex items-center ${activeSection === "home" ? "bg-salmon/10 text-salmon" : ""}`}
              >
                <Home className="h-4 w-4 mr-2" /> Home
              </button>
              <button
                onClick={() => scrollToSection("dashboard")}
                className={`text-left py-2 px-3 rounded-lg flex items-center ${activeSection === "dashboard" ? "bg-salmon/10 text-salmon" : ""}`}
              >
                <Package className="h-4 w-4 mr-2" /> Dashboard
              </button>
              <button
                onClick={() => scrollToSection("community")}
                className={`text-left py-2 px-3 rounded-lg flex items-center ${activeSection === "community" ? "bg-salmon/10 text-salmon" : ""}`}
              >
                <Users className="h-4 w-4 mr-2" /> Community
              </button>
              <button
                onClick={() => scrollToSection("profile")}
                className={`text-left py-2 px-3 rounded-lg flex items-center ${activeSection === "profile" ? "bg-salmon/10 text-salmon" : ""}`}
              >
                <User className="h-4 w-4 mr-2" /> Profil
              </button>
            </nav>

            <div className="pt-3 pb-2 border-t border-gray-100 mt-2">
              <Button className="w-full bg-salmon text-white mb-2">
                <LogIn className="h-4 w-4 mr-2" /> Registrieren
              </Button>
              <Button variant="outline" className="w-full border-salmon text-salmon">
                Anmelden
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content with sections */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="px-4 py-10 bg-gradient-to-b from-salmon/5 to-white">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-3"
            >
              Gemeinsame <span className="text-salmon">Abenteuer</span> mit deinen Kindern
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 mb-6"
            >
              Entdecke kreative Aktivitäten, die perfekt auf deine Familie zugeschnitten sind.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button className="bg-salmon text-white rounded-full px-6 py-2 mb-3 w-full sm:w-auto">
                Jetzt entdecken <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto max-w-xs"
          >
            <div className="relative z-10 mx-auto mb-4 w-[240px] h-[430px] rounded-3xl shadow-lg border-4 border-border overflow-hidden bg-white">
              <div className="bg-salmon p-4 text-white">
                <div className="text-lg font-bold">ElternHeld</div>
                <div className="text-sm">Aktivitätsvorschläge für heute</div>
              </div>
              <div className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">EMPFOHLEN FÜR DICH</div>
                <div className="relative rounded-xl overflow-hidden border-2 border-green mb-3">
                  <div className="h-32 relative bg-gray-100">
                    <img src="/placeholder.svg?key=bao8w" alt="App Screenshot" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 bg-white">
                    <h4 className="font-bold text-sm">Familienausflug in die Natur</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs bg-green/10 text-green px-2 py-1 rounded-full">2-3 Stunden</span>
                      <span className="text-xs bg-blue/10 text-blue px-2 py-1 rounded-full">Draußen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue/20 rounded-full"></div>
          </motion.div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="px-4 py-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-block mb-3 px-3 py-1 bg-green/10 rounded-full">
              <span className="text-xs font-medium text-green">Dashboard</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Dein persönliches <span className="text-green">Dashboard</span>
            </h2>
            <p className="text-gray-600 text-sm">Verfolge deine Aktivitäten und finde neue Inspirationen.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 bg-green/5 border-b border-gray-100">
              <h3 className="font-bold">Aktivitäten für heute</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-green/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Waldabenteuer</h4>
                    <p className="text-xs text-gray-500">2 Stunden • Draußen</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-salmon/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-salmon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Kreatives Basteln</h4>
                    <p className="text-xs text-gray-500">1 Stunde • Drinnen</p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 bg-green text-white">Mehr Aktivitäten entdecken</Button>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="px-4 py-12 bg-blue/5">
          <div className="text-center mb-8">
            <div className="inline-block mb-3 px-3 py-1 bg-blue/10 rounded-full">
              <span className="text-xs font-medium text-blue">Community</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Verbinde dich mit anderen <span className="text-blue">Eltern</span>
            </h2>
            <p className="text-gray-600 text-sm">Teile Erfahrungen und finde Unterstützung in unserer Community.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center">
                  <span className="font-bold text-blue">J</span>
                </div>
                <div>
                  <h4 className="font-bold">Julia M.</h4>
                  <p className="text-xs text-gray-500">Mutter von zwei Kindern • 2 Stunden</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Wir haben am Wochenende einen tollen Ausflug in den Wald gemacht und verschiedene Naturmaterialien
                gesammelt. Die Kinder waren begeistert!
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-green/10 text-green px-2 py-1 rounded-full">Draußen</span>
                <span className="text-xs bg-blue/10 text-blue px-2 py-1 rounded-full">Natur</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-salmon/10 flex items-center justify-center">
                  <span className="font-bold text-salmon">T</span>
                </div>
                <div>
                  <h4 className="font-bold">Thomas K.</h4>
                  <p className="text-xs text-gray-500">Vater eines 6-jährigen • 5 Stunden</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Nach den Vorschlägen aus der App haben wir heute verschiedene Experimente mit Wasser durchgeführt.
                Besonders das Experiment mit den unterschiedlichen Dichten hat meinen Sohn fasziniert.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue/10 text-blue px-2 py-1 rounded-full">Experimente</span>
                <span className="text-xs bg-green/10 text-green px-2 py-1 rounded-full">Lernen</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-blue text-white">Zur Community</Button>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="px-4 py-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-block mb-3 px-3 py-1 bg-salmon/10 rounded-full">
              <span className="text-xs font-medium text-salmon">Profil</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Dein <span className="text-salmon">Profil</span>
            </h2>
            <p className="text-gray-600 text-sm">Verwalte deine persönlichen Einstellungen und Präferenzen.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 flex flex-col items-center border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-salmon/10 flex items-center justify-center mb-3">
                <User className="h-10 w-10 text-salmon" />
              </div>
              <h3 className="font-bold text-lg">Max Mustermann</h3>
              <p className="text-gray-500 text-sm">Vater von zwei Kindern</p>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Meine Aktivitäten</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Gespeicherte Ideen</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Einstellungen</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Abonnement</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 border-salmon text-salmon">
                Abmelden
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-salmon text-white px-4 py-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center">
            <div className="relative h-10 w-10">
              <Image
                src="/elternheld_logo_transparent_full.png"
                alt="ElternHeld Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="ml-2 text-xl font-bold">ElternHeld</span>
          </Link>
          <p className="text-white/70 text-sm mt-2">
            ElternHeld hilft Eltern dabei, kreative und sinnvolle Aktivitäten für ihre Kinder zu finden.
          </p>
        </div>

        <div className="text-center text-sm text-white/70">
          <p>© 2023 ElternHeld. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}
