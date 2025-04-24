"use client"

import { useRef, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function LandingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Add safety checks for transform values
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const [activityImageLoaded, setActivityImageLoaded] = useState(false)
  const [familyImageLoaded, setFamilyImageLoaded] = useState(false)

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Playful background with soft patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-salmon/5 via-background to-background/20"></div>

      {/* Playful shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-green/10 animate-float"></div>
        <div
          className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-blue/10 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 left-40 w-16 h-16 rounded-full bg-salmon/10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-pattern"></div>
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ opacity, y }} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-1 bg-salmon/10 rounded-full"
            >
              <span className="text-sm font-medium text-salmon">Entdecke die ElternHeld App</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Gemeinsame <span className="text-salmon">Abenteuer</span> mit deinen Kindern
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-foreground/70 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Entdecke kreative Aktivitäten, die perfekt auf deine Familie zugeschnitten sind – angepasst an Alter, Ort,
              Wetter und verfügbare Zeit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="rounded-full px-8 py-6 text-lg group bg-salmon text-white">
                <span>Jetzt entdecken</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-salmon text-salmon">
                Mehr erfahren
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[
                  { color: "salmon", initial: "J" },
                  { color: "green", initial: "M" },
                  { color: "blue", initial: "S" },
                  { color: "yellow", initial: "T" },
                ].map((avatar, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <div
                      className={`w-full h-full flex items-center justify-center`}
                      style={{ backgroundColor: `var(--${avatar.color})20` }}
                    >
                      <span style={{ color: `var(--${avatar.color})` }} className="font-bold text-sm">
                        {avatar.initial}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow fill-yellow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-foreground/70">
                  <span className="font-bold text-foreground">4.8/5</span> von über 2.000 Eltern
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ scale, opacity }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-10"
            >
              {/* App preview with activity suggestion */}
              <div className="relative mx-auto">
                {/* App preview floating */}
                <div className="relative z-20 mx-auto mb-4 w-[280px] h-[500px] rounded-3xl shadow-lg border-4 border-border overflow-hidden bg-white">
                  {/* App header */}
                  <div className="bg-salmon p-4 text-white">
                    <div className="text-lg font-bold">ElternHeld</div>
                    <div className="text-sm">Aktivitätsvorschläge für heute</div>
                  </div>

                  {/* App content */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">EMPFOHLEN FÜR DICH</div>

                    {/* Activity card - highlighted */}
                    <div className="relative rounded-xl overflow-hidden border-2 border-green mb-3">
                      <div className="absolute top-2 right-2 bg-green text-white rounded-full p-1 z-10">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="h-32 relative bg-gray-100">
                        <div className="w-full h-full">
                          <img
                            src="/family-activities-illustration.png"
                            alt="Familienausflug in die Natur"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?key=7temc"
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <h4 className="font-bold text-sm">Familienausflug in die Natur</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs bg-green/10 text-green px-2 py-1 rounded-full">2-3 Stunden</span>
                          <span className="text-xs bg-blue/10 text-blue px-2 py-1 rounded-full">Draußen</span>
                        </div>
                      </div>
                    </div>

                    {/* Other activity cards (simplified) */}
                    <div className="space-y-3">
                      {[1, 2].map((item) => (
                        <div key={item} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0"></div>
                          <div>
                            <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connection line from app to real activity */}
                <div className="hidden lg:block absolute top-1/2 left-[60%] w-32 h-20 z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,30 C30,30 70,0 100,30" stroke="var(--salmon)" strokeWidth="2" strokeDasharray="5 5" />
                    <path d="M90,25 L100,30 L90,35" stroke="var(--salmon)" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Real-life activity implementation */}
                <div className="relative lg:absolute lg:top-0 lg:left-[75%] lg:w-[350px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-border/50 mt-8 lg:mt-0">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-border/50">
                    <div className="text-sm font-bold text-salmon">Von der App vorgeschlagen</div>
                    <div className="text-xs text-foreground/70">Familienausflug in die Natur</div>
                  </div>
                  <div className="bg-gray-100 w-full h-full">
                    <div className="w-full h-full">
                      <img
                        src="/parent-child-activity.jpg"
                        alt="Familie setzt Aktivitätsvorschlag aus der App um"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/family-bike-ride.png"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Playful elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-yellow/40 rounded-full animate-pulse-slow"></div>
                </div>
                <div className="absolute -bottom-5 left-1/4 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div
                    className="w-8 h-8 bg-secondary/40 rounded-full animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Playful scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-foreground/50 mb-2">Entdecke mehr</span>
          <div className="w-6 h-10 border-2 border-blue/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-blue rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
