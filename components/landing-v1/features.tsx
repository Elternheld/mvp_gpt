"use client"

import { motion } from "framer-motion"
import { Sparkles, Users, Mic, Search, Star, BookOpen, Clock, MapPin, Cloud, Target } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <Search className="h-6 w-6 text-salmon" />,
    title: "Aktivitäten finden",
    description: "Finde passende Aktivitäten basierend auf Alter, Ort, Wetter und verfügbarer Zeit.",
    colorClass: "from-salmon/20 to-salmon/5",
    hoverClass: "bg-salmon/5 border-salmon/20",
    delay: 0.1,
  },
  {
    icon: <Sparkles className="h-6 w-6 text-green" />,
    title: "Kreative Vorschläge",
    description: "Erhalte detaillierte Anleitungen mit Materialien, Kosten und Sicherheitshinweisen.",
    colorClass: "from-green/20 to-green/5",
    hoverClass: "bg-green/5 border-green/20",
    delay: 0.2,
  },
  {
    icon: <Mic className="h-6 w-6 text-salmon" />,
    title: "Sprachbot",
    description: "Stelle Fragen und erhalte personalisierte Hilfe zu Erziehungsthemen.",
    colorClass: "from-salmon/20 to-salmon/5",
    hoverClass: "bg-salmon/5 border-salmon/20",
    delay: 0.3,
  },
  {
    icon: <Users className="h-6 w-6 text-green" />,
    title: "Community",
    description: "Teile deine Erfahrungen und tausche dich mit anderen Eltern aus.",
    colorClass: "from-green/20 to-green/5",
    hoverClass: "bg-green/5 border-green/20",
    delay: 0.4,
  },
  {
    icon: <Star className="h-6 w-6 text-salmon" />,
    title: "Bewertungen",
    description: "Bewerte Aktivitäten und sieh, was andere Eltern empfehlen.",
    colorClass: "from-salmon/20 to-salmon/5",
    hoverClass: "bg-salmon/5 border-salmon/20",
    delay: 0.5,
  },
  {
    icon: <BookOpen className="h-6 w-6 text-green" />,
    title: "Förderziele",
    description: "Erfahre, welche Fähigkeiten jede Aktivität bei deinem Kind fördert.",
    colorClass: "from-green/20 to-green/5",
    hoverClass: "bg-green/5 border-green/20",
    delay: 0.6,
  },
]

// Sample activities for the feature highlight
const sampleActivities = [
  {
    title: "Waldabenteuer",
    duration: "2 Stunden",
    location: "Draußen",
    ageRange: "3-8 Jahre",
    weather: "Sonnig",
    color: "green",
  },
  {
    title: "Kreatives Basteln",
    duration: "1 Stunde",
    location: "Drinnen",
    ageRange: "4-10 Jahre",
    weather: "Alle",
    color: "salmon",
  },
  {
    title: "Wasser-Experimente",
    duration: "45 Min",
    location: "Drinnen/Draußen",
    ageRange: "5-12 Jahre",
    weather: "Alle",
    color: "blue",
  },
]

export function LandingFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activityImageLoaded, setActivityImageLoaded] = useState(false)

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <section id="aktivitäten" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-background/30"></div>

      {/* Playful shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-yellow/10"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-green/10"></div>
      <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-blue/10"></div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-salmon/10 rounded-full">
            <span className="text-sm font-medium text-salmon">Funktionen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Alle Funktionen auf einen <span className="text-salmon">Blick</span>
          </h2>
          <p className="text-xl text-foreground/70">
            ElternHeld bietet dir alles, was du brauchst, um deine Kinder sinnvoll zu beschäftigen und ihre Entwicklung
            zu fördern.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`bg-white rounded-2xl shadow-lg p-8 h-full border border-border/50 transition-all duration-300 relative overflow-hidden ${hoveredIndex === index ? feature.hoverClass : ""}`}
              >
                {/* Playful corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-32 h-4 bg-gradient-to-r ${feature.colorClass} transform rotate-45 translate-y-4 translate-x-2`}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="bg-white rounded-full p-3 shadow-md mb-6 w-fit border border-border/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Smartphone Mockups Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 mb-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-salmon/5 via-green/5 to-blue/5 rounded-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="p-8 md:p-12">
              <div className="inline-block mb-4 px-4 py-1 bg-blue/10 rounded-full">
                <span className="text-sm font-medium text-blue">Mobile App</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Entdecke die ElternHeld App <span className="text-blue">unterwegs</span>
              </h3>
              <p className="text-lg text-foreground/70 mb-8">
                Mit unserer intuitiven mobilen App hast du alle Funktionen immer dabei. Finde Aktivitäten, erhalte
                Benachrichtigungen und tausche dich mit anderen Eltern aus – ganz egal, wo du bist.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-salmon/10 rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-salmon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Offline-Zugriff</h4>
                    <p className="text-foreground/70">Speichere Aktivitäten für den Zugriff ohne Internet</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green/10 rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Erinnerungen</h4>
                    <p className="text-foreground/70">Erhalte Benachrichtigungen für geplante Aktivitäten</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue/10 rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Schnellzugriff</h4>
                    <p className="text-foreground/70">Finde in Sekunden die perfekte Aktivität</p>
                  </div>
                </div>
              </div>

              <Button className="rounded-full px-6 py-6 bg-blue hover:bg-blue/90 text-text-dark">
                App herunterladen
              </Button>
            </div>

            {/* Smartphone Mockups - nur die neuen Assets verwenden */}
            <div className="relative p-8">
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-salmon/10 rounded-full blur-3xl"></div>

              {/* Smartphone Mockups - nebeneinander mit identischen Rahmen */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Erstes Mockup - Sprachassistent */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%203-JtXQyJIW8Af7jLIqrfdb8OXD3qrupa.png"
                  alt="ElternHeld App Sprachassistent mit Aktivitätsvorschlag"
                  className="w-[240px] h-auto rounded-3xl shadow-lg"
                />

                {/* Zweites Mockup - Aktivitäten */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%202-tiRYOH90lBr3e73cZxwtq5SVp4s2nW.png"
                  alt="ElternHeld App Aktivitäten auswählen"
                  className="w-[240px] h-auto rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature highlight with more playful elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden relative"
        >
          {/* Playful background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow/10"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-green/10"></div>
          </div>

          {/* Feature highlight with more playful elements - Hier kein Bild zeigen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4 px-4 py-1 bg-green/10 rounded-full">
                <span className="text-sm font-medium text-green">Herausragende Funktion</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Personalisierte Aktivitätsvorschläge</h3>
              <p className="text-lg text-foreground/70 mb-8">
                Unsere intelligente Technologie berücksichtigt das Alter deines Kindes, den verfügbaren Ort, das
                aktuelle Wetter und deine Zeit, um die perfekten Aktivitäten vorzuschlagen.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-salmon/10 rounded-full p-2 mt-1 border border-border/50">
                    <Clock className="h-5 w-5 text-salmon" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Zeitangepasst</h4>
                    <p className="text-sm text-foreground/70">Aktivitäten für 15 Minuten bis mehrere Stunden</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green/10 rounded-full p-2 mt-1 border border-border/50">
                    <MapPin className="h-5 w-5 text-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ortsbasiert</h4>
                    <p className="text-sm text-foreground/70">Drinnen, draußen oder unterwegs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-salmon/10 rounded-full p-2 mt-1 border border-border/50">
                    <Cloud className="h-5 w-5 text-salmon" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Wettergerecht</h4>
                    <p className="text-sm text-foreground/70">Passend zum aktuellen Wetter</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green/10 rounded-full p-2 mt-1 border border-border/50">
                    <Target className="h-5 w-5 text-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Altersgerecht</h4>
                    <p className="text-sm text-foreground/70">Für Kinder von 0-12 Jahren</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-auto lg:h-auto p-8 flex items-center justify-center">
              <div className="bg-green/5 rounded-xl p-8 border border-green/20 max-w-md">
                <h4 className="text-xl font-bold mb-4 text-center">Beispielvorschläge</h4>
                <ul className="space-y-4">
                  {sampleActivities.map((activity, index) => (
                    <li key={index} className="bg-white rounded-lg p-4 shadow-sm border border-border/30">
                      <h5 className="font-bold text-lg mb-1">{activity.title}</h5>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span
                          className={`text-xs bg-${activity.color}/10 text-${activity.color} px-2 py-1 rounded-full`}
                        >
                          {activity.duration}
                        </span>
                        <span className={`text-xs bg-blue/10 text-blue px-2 py-1 rounded-full`}>
                          {activity.location}
                        </span>
                        <span className={`text-xs bg-green/10 text-green px-2 py-1 rounded-full`}>
                          {activity.ageRange}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
