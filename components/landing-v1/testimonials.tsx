"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Julia M.",
    role: "Mutter von zwei Kindern",
    content:
      "ElternHeld hat unseren Familienalltag komplett verändert. Früher war es oft schwierig, passende Aktivitäten zu finden, jetzt haben wir immer tolle Ideen zur Hand. Besonders die altersgerechten Vorschläge sind super!",
    rating: 5,
    initial: "J",
    bgColor: "salmon",
  },
  {
    name: "Thomas K.",
    role: "Vater eines 6-jährigen",
    content:
      "Als alleinerziehender Vater war ich oft ratlos, was ich mit meinem Sohn unternehmen könnte. Die App gibt mir nicht nur Ideen, sondern auch das Gefühl, Teil einer unterstützenden Community zu sein.",
    rating: 5,
    initial: "T",
    bgColor: "green",
  },
  {
    name: "Sarah L.",
    role: "Mutter von drei Kindern",
    content:
      "Die Sprachbot-Funktion ist ein Lebensretter! Ich kann jederzeit Fragen stellen und bekomme hilfreiche Antworten. Die Aktivitätsvorschläge sind kreativ und fördern die Entwicklung meiner Kinder.",
    rating: 4,
    initial: "S",
    bgColor: "blue",
  },
]

export function LandingTestimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const next = () => {
    try {
      setCurrent((current + 1) % testimonials.length)
    } catch (error) {
      console.error("Error setting current testimonial:", error)
    }
  }

  const prev = () => {
    try {
      setCurrent((current - 1 + testimonials.length) % testimonials.length)
    } catch (error) {
      console.error("Error setting current testimonial:", error)
    }
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    try {
      resetTimeout()
      if (autoplay) {
        timeoutRef.current = setTimeout(() => {
          next()
        }, 6000)
      }
      return () => {
        resetTimeout()
      }
    } catch (error) {
      console.error("Error in testimonial autoplay:", error)
    }
  }, [current, autoplay])

  return (
    <section id="community" className="py-24 md:py-32 relative overflow-hidden bg-salmon text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-salmon to-salmon/90"></div>

      {/* Playful shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-white/5"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-white/5"></div>

      {/* Playful pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern-light"></div>

      {/* Paper cut style decorations */}
      <div
        className="absolute top-0 left-0 w-full h-12 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 30%)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-12 bg-white"
        style={{ clipPath: "polygon(0 70%, 100% 0, 100% 100%, 0 100%)" }}
      ></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-white/10 rounded-full">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <Quote className="h-4 w-4" />
              Erfahrungen
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            Das sagen unsere <span className="text-green">Familien</span>
          </h2>
          <p className="text-xl text-white/80">
            Tausende Eltern vertrauen bereits auf ElternHeld, um den Alltag mit ihren Kindern zu bereichern.
          </p>
        </motion.div>

        <div className="relative px-12">
          {/* Carousel controls */}
          <button
            onClick={() => {
              prev()
              setAutoplay(false)
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => {
              next()
              setAutoplay(false)
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonials */}
          <div className="overflow-hidden relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 h-full">
                  <div className="flex flex-col md:flex-row gap-8 h-full">
                    <div className="flex flex-col items-center md:items-start">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow mb-4">
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: `var(--${testimonials[current].bgColor})20` }}
                        >
                          <span
                            className="text-3xl font-bold"
                            style={{ color: `var(--${testimonials[current].bgColor})` }}
                          >
                            {testimonials[current].initial}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl text-white">{testimonials[current].name}</h3>
                      <p className="text-white/70 text-sm mb-4">{testimonials[current].role}</p>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonials[current].rating ? "fill-yellow text-yellow" : "text-white/30"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow flex items-center">
                      <blockquote className="relative">
                        <Quote className="absolute -top-6 -left-6 h-12 w-12 text-white/10" />
                        <p className="text-xl md:text-2xl text-white/90 italic relative z-10">
                          "{testimonials[current].content}"
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setAutoplay(false)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === index ? "bg-yellow w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
