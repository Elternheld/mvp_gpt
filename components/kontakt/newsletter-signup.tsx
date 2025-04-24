"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function NewsletterSignup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-blue text-white rounded-2xl shadow-md p-8"
    >
      <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
      <p className="mb-6">
        Melde dich für unseren Newsletter an und erhalte regelmäßig Tipps und Ideen für Aktivitäten mit deinen Kindern.
      </p>
      <form className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
        <Button className="w-full bg-white text-blue hover:bg-white/90">
          <Check className="h-4 w-4 mr-2" /> Anmelden
        </Button>
      </form>
    </motion.div>
  )
}
