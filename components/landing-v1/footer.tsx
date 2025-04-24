"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function LandingFooter() {
  const [logoLoaded, setLogoLoaded] = useState(false)

  return (
    <footer className="bg-salmon text-white pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/landing-v1" className="flex items-center mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/elternheld_logo_transparent_full.png"
                  alt="ElternHeld Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  onLoad={() => setLogoLoaded(true)}
                />
                {!logoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
              <span className="ml-2 text-2xl font-bold text-white">ElternHeld</span>
            </Link>
            <p className="text-white/70 mb-6">
              ElternHeld hilft Eltern dabei, kreative und sinnvolle Aktivitäten für ihre Kinder zu finden.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Aktivitäten</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-green transition-colors">
                  Aktivitäten finden
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-green transition-colors">
                  Nach Alter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-green transition-colors">
                  Nach Ort
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-green transition-colors">
                  Nach Wetter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Beiträge
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Kategorien
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Beliebte Tags
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Mitglieder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} ElternHeld. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
