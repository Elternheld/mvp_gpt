"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, X, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PricingFeature = {
  name: string
  tooltip?: string
  free: boolean | string
  basic: boolean | string
  premium: boolean | string
}

const pricingFeatures: PricingFeature[] = [
  {
    name: "Aktivitätsvorschläge pro Monat",
    tooltip: "Anzahl der personalisierten Aktivitätsvorschläge, die du monatlich erhalten kannst",
    free: "10",
    basic: "50",
    premium: "Unbegrenzt",
  },
  {
    name: "Bilderzeugung bei Aktivitätsvorschlägen",
    tooltip: "KI-generierte Bilder, die dir helfen, die Aktivitäten besser zu visualisieren",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Voicebot (Brainstorming)",
    tooltip: "Sprachgesteuerter Assistent für kreative Ideen und Aktivitätsvorschläge",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Datenanalyse für personalisierte Vorschläge",
    tooltip: "Fortschrittliche Analyse deiner Präferenzen für bessere Aktivitätsvorschläge",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Zugang zur Community",
    tooltip: "Austausch mit anderen Eltern und Zugang zu Community-Inhalten",
    free: true,
    basic: true,
    premium: true,
  },
  {
    name: "Werbefrei",
    tooltip: "Nutzung der App ohne Werbeanzeigen",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Offline-Zugriff",
    tooltip: "Speichere Aktivitäten für den Zugriff ohne Internetverbindung",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Persönlicher Service-Mitarbeiter",
    tooltip: "Direkter Ansprechpartner für alle deine Fragen und Anliegen",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Familienkonto mit mehreren Profilen",
    tooltip: "Erstelle separate Profile für verschiedene Kinder mit individuellen Einstellungen",
    free: false,
    basic: "2 Profile",
    premium: "5 Profile",
  },
  {
    name: "Prioritäts-Support",
    tooltip: "Bevorzugte Bearbeitung deiner Anfragen durch unser Support-Team",
    free: false,
    basic: false,
    premium: true,
  },
]

export function LandingPricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <section id="preise" className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-white/30"></div>

      {/* Playful shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue/10"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-salmon/10"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-blue/10 rounded-full">
            <span className="text-sm font-medium text-blue">Preise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Finde das passende <span className="text-blue">Abo</span> für dich
          </h2>
          <p className="text-xl text-foreground/70">
            Wähle das Abo, das am besten zu deinen Bedürfnissen passt und entdecke alle Funktionen von ElternHeld.
          </p>

          {/* Billing period toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 p-1 rounded-full">
            <motion.button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
              whileHover={{ scale: billingPeriod === "monthly" ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monatlich
            </motion.button>
            <motion.button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === "yearly"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
              whileHover={{ scale: billingPeriod === "yearly" ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jährlich{" "}
              <motion.span
                className="text-green text-xs font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
                }}
              >
                -20%
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              y: -8,
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg transition-all relative"
          >
            {/* Hintergrund-Gradient für mehr Farbe */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-6 border-b border-border/50 relative z-10">
              <h3 className="text-xl font-bold mb-2">Kostenfrei</h3>
              <p className="text-foreground/70 mb-4">Perfekt zum Ausprobieren</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">€0</span>
                <span className="text-foreground/70 ml-2">/ für immer</span>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button variant="outline" className="w-full mb-6 hover:bg-gray-100 hover:border-gray-300">
                  Jetzt starten
                </Button>
              </motion.div>
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.free === true ? (
                      <Check className="h-5 w-5 text-green mt-0.5" />
                    ) : feature.free === false ? (
                      <X className="h-5 w-5 text-gray-300 mt-0.5" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center text-xs font-medium text-foreground bg-gray-100 rounded-full mt-0.5">
                        {feature.free}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{feature.name}</span>
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-foreground/40" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Basic plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl shadow-md border border-blue/20 overflow-hidden hover:shadow-lg transition-all relative"
          >
            {/* Hintergrund-Gradient für mehr Farbe */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue/5 to-blue/0 opacity-50 hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-6 border-b border-border/50 bg-blue/5 relative z-10">
              <h3 className="text-xl font-bold mb-2 text-blue">Basis</h3>
              <p className="text-foreground/70 mb-4">Für engagierte Eltern</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{billingPeriod === "monthly" ? "€4,99" : "€3,99"}</span>
                <span className="text-foreground/70 ml-2">/ Monat</span>
              </div>
              {billingPeriod === "yearly" && <p className="text-green text-sm mt-2">Jährliche Abrechnung (€47,88)</p>}
            </div>
            <div className="p-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="w-full mb-6 bg-blue text-white hover:bg-blue-600">
                  <motion.span
                    initial={{ opacity: 1 }}
                    whileHover={{
                      opacity: [1, 0.8, 1],
                      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                    }}
                  >
                    Jetzt starten
                  </motion.span>
                </Button>
              </motion.div>
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    {feature.basic === true ? (
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Check className="h-5 w-5 text-green mt-0.5" />
                      </motion.div>
                    ) : feature.basic === false ? (
                      <X className="h-5 w-5 text-gray-300 mt-0.5" />
                    ) : (
                      <motion.span
                        className="flex h-5 w-5 items-center justify-center text-xs font-medium text-white bg-blue rounded-full mt-0.5"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {typeof feature.basic === "string" && feature.basic.length <= 2 ? feature.basic : "✓"}
                      </motion.span>
                    )}
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{feature.name}</span>
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-foreground/40" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {typeof feature.basic === "string" && feature.basic.length > 2 && (
                        <p className="text-xs text-foreground/60">{feature.basic}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Premium plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl shadow-lg border border-salmon/20 overflow-hidden hover:shadow-xl transition-all relative"
          >
            {/* Hintergrund-Gradient für mehr Farbe */}
            <div className="absolute inset-0 bg-gradient-to-b from-salmon/5 to-salmon/0 opacity-50 hover:opacity-100 transition-opacity duration-300"></div>

            {/* Popular badge mit Animation */}
            <motion.div
              className="absolute top-0 right-0"
              animate={{
                y: [0, -3, 0],
                transition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
              }}
            >
              <div className="bg-salmon text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Beliebt</div>
            </motion.div>

            <div className="p-6 border-b border-border/50 bg-salmon/5 relative z-10">
              <h3 className="text-xl font-bold mb-2 text-salmon">Premium</h3>
              <p className="text-foreground/70 mb-4">Für Familien, die das Beste wollen</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{billingPeriod === "monthly" ? "€9,99" : "€7,99"}</span>
                <span className="text-foreground/70 ml-2">/ Monat</span>
              </div>
              {billingPeriod === "yearly" && <p className="text-green text-sm mt-2">Jährliche Abrechnung (€95,88)</p>}
            </div>
            <div className="p-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="w-full mb-6 bg-salmon text-white hover:bg-salmon-600 relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
                    }}
                  />
                  Jetzt starten
                </Button>
              </motion.div>
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    {feature.premium === true ? (
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Check className="h-5 w-5 text-green mt-0.5" />
                      </motion.div>
                    ) : feature.premium === false ? (
                      <X className="h-5 w-5 text-gray-300 mt-0.5" />
                    ) : (
                      <motion.span
                        className="flex h-5 w-5 items-center justify-center text-xs font-medium text-white bg-salmon rounded-full mt-0.5"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {typeof feature.premium === "string" && feature.premium.length <= 2 ? feature.premium : "✓"}
                      </motion.span>
                    )}
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{feature.name}</span>
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-foreground/40" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {typeof feature.premium === "string" && feature.premium.length > 2 && (
                        <p className="text-xs text-foreground/60">{feature.premium}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Häufig gestellte Fragen</h3>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
              <h4 className="font-bold mb-2">Kann ich mein Abo jederzeit kündigen?</h4>
              <p className="text-foreground/70">
                Ja, du kannst dein Abo jederzeit kündigen. Die Kündigung wird zum Ende deiner aktuellen
                Abrechnungsperiode wirksam.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
              <h4 className="font-bold mb-2">Gibt es eine Testphase?</h4>
              <p className="text-foreground/70">
                Ja, für die Basis- und Premium-Abos bieten wir eine 14-tägige kostenlose Testphase an. Du kannst alle
                Funktionen unverbindlich testen und jederzeit vor Ablauf der Testphase kündigen.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
              <h4 className="font-bold mb-2">Wie funktioniert das Familienkonto?</h4>
              <p className="text-foreground/70">
                Mit einem Familienkonto kannst du mehrere Profile für verschiedene Kinder erstellen. Jedes Profil kann
                individuelle Einstellungen haben, z.B. Alter, Interessen und Aktivitätspräferenzen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
