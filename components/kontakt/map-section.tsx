"use client"

import { MapPin } from "lucide-react"

export function MapSection() {
  return (
    <section className="py-16 bg-blue/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Besuche uns</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Wir freuen uns, dich in unserem Büro in Berlin begrüßen zu dürfen.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-border/50 overflow-hidden">
          <div className="h-[400px] w-full bg-gray-200">
            {/* Hier würde normalerweise eine Karte eingebunden werden */}
            <div className="w-full h-full flex items-center justify-center bg-blue/10">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold">ElternHeld GmbH</h3>
                <p>Musterstraße 123, 10115 Berlin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
