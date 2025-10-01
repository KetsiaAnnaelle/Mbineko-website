import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import VirtualTourViewer from "../../reusable-components/virtual-visite/VirtualTourViewer"
import { getAvailableForestImages } from "@/services/imageSource"

export default function VirtualTourViewerPage() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log("[v0] Starting to load forest images...")
        const forestImages = await getAvailableForestImages()
        console.log("[v0] Loaded images:", forestImages)

        if (forestImages.length === 0) {
          setError("Aucune image disponible pour la visite virtuelle")
        } else {
          setImages(forestImages)
        }
      } catch (err) {
        console.error("[v0] Error loading images:", err)
        setError("Erreur lors du chargement des images")
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 grid place-items-center">
        <div className="text-center text-white">
          <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"></div>
          <p className="text-xl font-medium">Chargement de la visite virtuelle...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 grid place-items-center p-4">
        <div className="text-center text-white max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Erreur</h2>
          <p className="text-lg mb-6">{error}</p>
          <Link
            to="/vitual-visite"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-900 rounded-full font-medium hover:bg-green-50 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-green-300 transition-colors">
            <ArrowLeft size={24} />
            <span className="font-medium">Retour</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Visite Virtuelle 360°</h1>
          <div className="w-24"></div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto h-full"
        >
          <div className="h-full rounded-3xl overflow-hidden shadow-2xl">
            <VirtualTourViewer images={images} />
          </div>
        </motion.div>
      </div>

      {/* Info Footer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-80 bg-black/30 backdrop-blur-md rounded-2xl p-4 text-white"
      >
        <h3 className="font-bold mb-2">💡 Conseils de navigation</h3>
        <ul className="text-sm space-y-1 text-white/90">
          <li>• Glissez pour explorer à 360°</li>
          <li>• Utilisez les contrôles pour naviguer</li>
          <li>• Profitez de l'expérience immersive</li>
        </ul>
      </motion.div>
    </div>
  )
}
