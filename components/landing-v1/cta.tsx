"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Smartphone } from "lucide-react"
import { useState } from "react"

export function LandingCta() {
  const [appStoreLoaded, setAppStoreLoaded] = useState(false)
  const [playStoreLoaded, setPlayStoreLoaded] = useState(false)
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)

  return (
    <section id="kontakt" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-green/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-salmon/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-border/50 p-8 md:p-12 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bereit für mehr <span className="text-gradient-primary-secondary">Qualitätszeit</span> mit deinen
                  Kindern?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Lade jetzt die ElternHeld App herunter und entdecke hunderte kreative Aktivitäten für deine Familie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-salmon hover:bg-salmon/90 text-white rounded-full flex items-center gap-2"
                  >
                    <Smartphone className="h-5 w-5" />
                    App herunterladen
                  </Button>
                  <Button variant="outline" size="lg" className="border-salmon text-salmon rounded-full">
                    Mehr erfahren
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
                  <a href="#" className="transition-transform hover:scale-105 relative h-14 w-[160px]">
                    <img
                      src="/app-store-badge.png"
                      alt="Download on the App Store"
                      className="h-14 w-auto"
                      onLoad={() => setAppStoreLoaded(true)}
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='53' viewBox='0 0 160 53'%3E%3Crect width='160' height='53' rx='8' fill='%23000000'/%3E%3Ctext x='80' y='30' fontFamily='Arial' fontSize='14' textAnchor='middle' fill='white'%3EApp Store%3C/text%3E%3C/svg%3E"
                      }}
                    />
                    {!appStoreLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-salmon border-t-transparent animate-spin"></div>
                      </div>
                    )}
                  </a>
                  <a href="#" className="transition-transform hover:scale-105 relative h-14 w-[180px]">
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="h-14 w-auto"
                      onLoad={() => setPlayStoreLoaded(true)}
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='53' viewBox='0 0 180 53'%3E%3Crect width='180' height='53' rx='8' fill='%23FFFFFF' stroke='%23DDDDDD'/%3E%3Ctext x='90' y='30' fontFamily='Arial' fontSize='14' textAnchor='middle' fill='%23333333'%3EGoogle Play%3C/text%3E%3C/svg%3E"
                      }}
                    />
                    {!playStoreLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-salmon border-t-transparent animate-spin"></div>
                      </div>
                    )}
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  {/* QR Code with frame */}
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-border/50">
                    <div className="relative w-64 h-64 bg-gray-100 flex items-center justify-center">
                      <img
                        src="/elternheld-qr-code.png"
                        alt="QR-Code zum Download der ElternHeld App"
                        className="w-full h-full object-contain"
                        onLoad={() => setQrCodeLoaded(true)}
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FFFFFF'/%3E%3Cpath d='M50,50 L50,90 L90,90 L90,50 L50,50 M60,60 L80,60 L80,80 L60,80 L60,60 M110,50 L110,90 L150,90 L150,50 L110,50 M120,60 L140,60 L140,80 L120,80 L120,60 M50,110 L50,150 L90,150 L90,110 L50,110 M60,120 L80,120 L80,140 L60,140 L60,120 M110,110 L110,120 L120,120 L120,110 L110,110 M130,110 L130,120 L150,120 L150,110 L130,110 M110,130 L110,150 L120,150 L120,130 L110,130 M130,130 L130,150 L150,150 L150,130 L130,130' fill='%23000000'/%3E%3C/svg%3E"
                        }}
                      />
                      {!qrCodeLoaded && (
                        <div className="w-10 h-10 rounded-full border-4 border-salmon border-t-transparent animate-spin"></div>
                      )}
                    </div>
                    <p className="text-center mt-4 font-medium text-foreground">Scanne mich für die App</p>
                  </div>

                  {/* App logo floating */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-full p-2 shadow-md border border-border/50 w-10 h-10 flex items-center justify-center">
                    {!logoLoaded && (
                      <div className="w-5 h-5 rounded-full border-2 border-salmon border-t-transparent animate-spin"></div>
                    )}
                    <div>
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='16' fill='%23F58A7B'/%3E%3Ctext x='20' y='25' fontFamily='Arial' fontSize='16' textAnchor='middle' fill='white'%3EE%3C/text%3E%3C/svg%3E"
                        alt="ElternHeld Logo"
                        className="h-10 w-10"
                      />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -left-4 bg-green/10 rounded-full p-3">
                    <Smartphone className="h-6 w-6 text-green" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
