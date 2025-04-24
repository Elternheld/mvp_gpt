"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

type FormData = {
  name: string
  email: string
  betreff: string
  nachricht: string
  newsletter: boolean
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    betreff: "",
    nachricht: "",
    newsletter: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würde normalerweise die Formularverarbeitung stattfinden
    alert("Vielen Dank für deine Nachricht! Wir werden uns so schnell wie möglich bei dir melden.")
    setFormData({
      name: "",
      email: "",
      betreff: "",
      nachricht: "",
      newsletter: false,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-border/50 p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Schreib uns eine Nachricht</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border bg-white px-4 py-3 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border bg-white px-4 py-3 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="betreff" className="block text-sm font-medium mb-2">
            Betreff
          </label>
          <select
            id="betreff"
            name="betreff"
            value={formData.betreff}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-border bg-white px-4 py-3 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
            required
          >
            <option value="">Bitte wählen</option>
            <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
            <option value="Technischer Support">Technischer Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Kooperation">Kooperation</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="nachricht" className="block text-sm font-medium mb-2">
            Deine Nachricht
          </label>
          <textarea
            id="nachricht"
            name="nachricht"
            value={formData.nachricht}
            onChange={handleInputChange}
            rows={6}
            className="w-full rounded-lg border border-border bg-white px-4 py-3 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
              Ja, ich möchte den ElternHeld Newsletter erhalten und über neue Funktionen und Angebote informiert werden.
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Du kannst dich jederzeit vom Newsletter abmelden. Weitere Informationen findest du in unserer
            Datenschutzerklärung.
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue text-white rounded-full px-8 py-3">
            <Send className="h-4 w-4 mr-2" /> Nachricht senden
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
