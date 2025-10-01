
import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/i18n"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Package } from "lucide-react"

interface TestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TestModal({ isOpen, onClose }: TestModalProps) {
  const { user } = useAuth()
  const { t } = useI18n()
  const [sensorBoxNumber, setSensorBoxNumber] = useState("")
  const [droneNumber, setDroneNumber] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const kitImages = ["/assets/img/Boite a capteur.jpg", "/assets/img/Drone2.jpg"]

  // Rotate images every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % kitImages.length)
    }, 3000)
    return () => clearInterval(interval)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle test submission
    console.log("[v0] Test started with:", { sensorBoxNumber, droneNumber })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("test.modalTitle", "Commencer un Test de Surveillance")}
          </DialogTitle>
        </DialogHeader>

        {!user?.hasKit ? (
          // User doesn't have KIT
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
                <Package className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("test.noKit", "Pas de KIT disponible")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("test.downloadApp", "Veuillez télécharger l'application mobile MBINEKO pour commander le KIT")}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {t("test.scanQR", "Scannez le QR code")}
                </p>
              </div>
            </div>

            {/* Rotating KIT Images */}
            <div className="relative h-64 overflow-hidden rounded-lg">
              {kitImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`KIT ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.src = "/mbineko-monitoring-kit-equipment.jpg"
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // User has KIT
          <div className="space-y-6 py-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <p className="text-green-800 dark:text-green-200 text-center font-medium">
                {t("test.scanApp", "Commencer à Monitorer votre forêt grâce à nos équipements MBINEKO")}
              </p>
            </div>

            {/* QR Code for scanning */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {t("test.scanQR", "Scannez le QR code")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="sensorBox" className="text-gray-700 dark:text-gray-300">
                  {t("test.sensorBox", "Numéro de Boîte à Capteur")}
                </Label>
                <Input
                  id="sensorBox"
                  type="text"
                  value={sensorBoxNumber}
                  onChange={(e) => setSensorBoxNumber(e.target.value)}
                  placeholder="SB-001"
                  className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <Label htmlFor="drone" className="text-gray-700 dark:text-gray-300">
                  {t("test.droneNumber", "Numéro du Drone")}
                </Label>
                <Input
                  id="drone"
                  type="text"
                  value={droneNumber}
                  onChange={(e) => setDroneNumber(e.target.value)}
                  placeholder="DR-001"
                  className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  {t("test.cancel", "Annuler")}
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  {t("test.submit", "Démarrer le Test")}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
