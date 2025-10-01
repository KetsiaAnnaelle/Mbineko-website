"use client"

import { useState, useEffect } from "react"
import ForestStats from "../sections/ForestStats"
import CTASection from "../sections/CTASection"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import type { Forest } from "@/types/forest"
import ForestHero from "../sections/ForestHero"

interface ForestDetailPageProps {
  forest: Forest
  onBack: () => void
}

interface SensorData {
  id: string
  type: string
  value: number
  unit: string
  timestamp: string
  location?: string
  [key: string]: any
}

export default function ForestDetailPage({ forest }: ForestDetailPageProps) {
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("https://et09i0tfoj.execute-api.us-east-1.amazonaws.com/dev/sensors")
        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Sensor data received:", data)
          setSensorData(Array.isArray(data) ? data : [data])
        } else {
          throw new Error("Failed to fetch sensor data")
        }
      } catch (error) {
        console.error("[v0] Error fetching sensor data:", error)
        setError("Impossible de charger les données des capteurs")
        // Keep using static data on error
      } finally {
        setLoading(false)
      }
    }

    fetchSensorData()
  }, [forest.id])

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">
        <ForestHero forest={forest} />
      </div>

      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-700">Chargement des données des capteurs...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700">{error}</p>
            <p className="text-sm text-yellow-600 mt-1">Affichage des données statiques par défaut</p>
          </div>
        </div>
      )}

      {sensorData.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Données des Capteurs en Temps Réel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sensorData.map((sensor, index) => (
                <div
                  key={sensor.id || index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {sensor.type || "Capteur"}
                      </p>
                      {sensor.location && <p className="text-xs text-gray-500 mt-1">{sensor.location}</p>}
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mb-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {sensor.value}
                      <span className="text-lg text-gray-600 ml-1">{sensor.unit}</span>
                    </p>
                  </div>
                  {sensor.timestamp && (
                    <p className="text-xs text-gray-500">{new Date(sensor.timestamp).toLocaleString("fr-FR")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ForestStats forest={forest} />
      <CTASection />
      <Footer />
    </div>
  )
}
