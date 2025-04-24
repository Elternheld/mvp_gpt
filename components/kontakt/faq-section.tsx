"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// FAQ-Einträge
const faqItems = [
  {
    question: "Wie funktioniert die ElternHeld App?",
    answer:
      "Die ElternHeld App schlägt dir basierend auf dem Alter deiner Kinder, dem verfügbaren Ort, dem aktuellen Wetter und deiner Zeit passende Aktivitäten vor. Du kannst diese Aktivitäten speichern, bewerten und mit anderen Eltern teilen.",
  },
  {
    question: "Ist die ElternHeld App kostenlos?",
    answer:
      "Ja, die Grundfunktionen der ElternHeld App sind kostenlos. Es gibt jedoch eine Premium-Version mit zusätzlichen Funktionen wie unbegrenztem Zugriff auf alle Aktivitäten, werbefreier Nutzung und exklusiven Inhalten.",
  },
  {
    question: "Für welches Alter sind die Aktivitäten geeignet?",
    answer:
      "Die Aktivitäten in der ElternHeld App sind für Kinder im Alter von 0 bis 12 Jahren konzipiert. Du kannst die Altersgruppe deiner Kinder in der App einstellen, um passende Vorschläge zu erhalten.",
  },
  {
    question: "Kann ich eigene Aktivitäten vorschlagen?",
    answer:
      "Ja, als Teil der ElternHeld-Community kannst du eigene Aktivitäten vorschlagen und mit anderen Eltern teilen. Diese werden von unserem Team geprüft und bei Eignung in die App aufgenommen.",
  },
  {
    question: "Wie funktioniert der Sprachbot?",
    answer:
      "Der Sprachbot ist ein KI-gestützter Assistent, der dir bei Fragen zur Erziehung, zu Aktivitäten oder zur App selbst helfen kann. Du kannst ihm einfach deine Frage stellen und erhältst personalisierte Antworten.",
  },
]

export function FaqSection({ onContactClick }: { onContactClick: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-md border border-border/50 p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Häufig gestellte Fragen</h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium focus:outline-none"
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${activeFaq === index ? "transform rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeFaq === index && (
                <div className="p-5 pt-0 border-t border-border">
                  <p className="text-foreground/70">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">Deine Frage wurde nicht beantwortet?</p>
          <Button onClick={onContactClick} className="bg-blue text-white rounded-full px-8 py-3">
            Kontaktiere uns
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
