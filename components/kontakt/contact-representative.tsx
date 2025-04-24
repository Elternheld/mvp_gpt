"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Clock } from "lucide-react"

export function ContactRepresentative() {
  const [salesImageLoaded, setSalesImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-border/50 p-8 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Ihr Ansprechpartner für Sie bereit, jederzeit.</h2>
          <p className="text-foreground/70 mb-6">
            Unser engagiertes Team steht Ihnen bei allen Fragen rund um ElternHeld zur Verfügung. Wir helfen Ihnen gerne
            weiter und freuen uns auf Ihre Nachricht.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue/10 rounded-full p-2 mt-1">
                <Mail className="h-5 w-5 text-blue" />
              </div>
              <div>
                <p className="font-medium">E-Mail</p>
                <p className="text-foreground/70">michael.schmidt@elternheld.de</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-salmon/10 rounded-full p-2 mt-1">
                <Phone className="h-5 w-5 text-salmon" />
              </div>
              <div>
                <p className="font-medium">Telefon</p>
                <p className="text-foreground/70">+49 (0) 123 456789</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green/10 rounded-full p-2 mt-1">
                <Clock className="h-5 w-5 text-green" />
              </div>
              <div>
                <p className="font-medium">Erreichbarkeit</p>
                <p className="text-foreground/70">Mo-Fr: 9:00 - 17:00 Uhr</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="rounded-full px-6 py-2 bg-blue text-white">
              <Phone className="h-4 w-4 mr-2" /> Jetzt anrufen
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue/20">
            <img
              src="/confident-sales-leader.png"
              alt="Michael Schmidt - Ihr Ansprechpartner"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                salesImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setSalesImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = "/confident-leader.png"
                setSalesImageLoaded(true)
              }}
            />
            {!salesImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-10 h-10 rounded-full border-4 border-blue border-t-transparent animate-spin"></div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-blue/80 text-white p-2 text-center">
              <p className="font-medium">Michael Schmidt</p>
              <p className="text-sm">Senior Kundenberater</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
