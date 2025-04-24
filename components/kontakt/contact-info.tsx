"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-md border border-border/50 p-8 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">Kontaktinformationen</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue/10 rounded-full p-3 mt-1">
            <Mail className="h-6 w-6 text-blue" />
          </div>
          <div>
            <h3 className="font-bold text-lg">E-Mail</h3>
            <p className="text-foreground/70">info@elternheld.de</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-salmon/10 rounded-full p-3 mt-1">
            <Phone className="h-6 w-6 text-salmon" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Telefon</h3>
            <p className="text-foreground/70">+49 (0) 123 456789</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green/10 rounded-full p-3 mt-1">
            <MapPin className="h-6 w-6 text-green" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Adresse</h3>
            <p className="text-foreground/70">
              ElternHeld GmbH
              <br />
              Musterstraße 123
              <br />
              10115 Berlin
              <br />
              Deutschland
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-yellow/10 rounded-full p-3 mt-1">
            <Clock className="h-6 w-6 text-yellow" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Öffnungszeiten</h3>
            <p className="text-foreground/70">
              Montag - Freitag: 9:00 - 17:00 Uhr
              <br />
              Samstag & Sonntag: Geschlossen
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
