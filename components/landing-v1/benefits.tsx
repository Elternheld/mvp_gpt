"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useState } from "react"

const benefits = [
  "Spare Zeit bei der Suche nach passenden Aktivitäten",
  "Fördere die Entwicklung deines Kindes gezielt",
  "Entdecke neue Ideen für gemeinsame Zeit",
  "Tausche dich mit anderen Eltern aus",
  "Erhalte Expertentipps zu Erziehungsfragen",
  "Nutze die App jederzeit und überall",
]

export function LandingBenefits() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="über-uns" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/30 to-background"></div>

      {/* Playful shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-salmon/10"></div>
      <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-blue/10"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-gray-100 h-[500px]">
              <div className="w-full h-full">
                <img
                  src="/family-outdoor-activity.png"
                  alt="Familie bei gemeinsamen Aktivitäten in der Natur"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2023.%20Apr.%202025%2C%2001_31_27-eHR6o2iRFA9dtOMLN3CFjOpUZFOuJy.png"
                    setImageLoaded(true)
                  }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-salmon border-t-transparent animate-spin mb-2"></div>
                    <span className="text-sm text-gray-500 ml-3">Lädt...</span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-8 -left-8 w-64 h-64 bg-green/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 right-8 w-64 h-64 bg-salmon/20 rounded-full blur-3xl -z-10" />

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-border/50">
              <div className="bg-green/20 rounded-full p-2">
                <svg className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-border/50">
              <div className="bg-salmon/20 rounded-full p-2">
                <svg className="w-6 h-6 text-salmon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-green/10 rounded-full">
              <span className="text-sm font-medium text-green">Vorteile</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Warum Eltern ElternHeld <span className="text-green">lieben</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Mit ElternHeld findest du nicht nur Beschäftigung für deine Kinder, sondern förderst auch ihre Entwicklung
              – und das ganz ohne Stress.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-salmon rounded-full p-1 mt-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
