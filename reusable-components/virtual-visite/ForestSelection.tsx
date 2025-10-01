import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Camera, Eye, Maximize2 } from "lucide-react"
import { motion } from "framer-motion"
import { getAvailableForestImages } from "@/services/imageSource"
import ErrorBoundary from "@/components/ErrorBoundary"
import VirtualTourViewer from "./VirtualTourViewer"

const forests = [
  {
    id: 1,
    name: "Forêt du Dia et Lobo",
    visitors: 2,
    active: true,
    description: "Forêt primaire exceptionnelle",
  },
  {
    id: 2,
    name: "Forêt du Dia et Lobo",
    visitors: 0,
    active: false,
    description: "Zone de conservation",
  },
  {
    id: 3,
    name: "Forêt du Dia et Lobo",
    visitors: 1,
    active: false,
    description: "Écosystème diversifié",
  },
  {
    id: 4,
    name: "Forêt du Dia et Lobo",
    visitors: 0,
    active: false,
    description: "Patrimoine naturel",
  },
]

export default function ForestSelection() {
  const [selectedForest, setSelectedForest] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const activeForest = forests.find((f) => f.id === selectedForest)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const urls = await getAvailableForestImages()
        setImages(urls)
      } catch (error) {
        console.error("[v0] Error loading forest images:", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sélectionner une <span className="text-green-600">forêt</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez parmi nos forêts disponibles et plongez dans une expérience immersive unique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Forest Selection Panel - Now displays images from the virtual tour */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="xl:col-span-1 space-y-4"
          >
            {/* Forest Cards */}
            <div className="space-y-4 mb-6">
              {forests.map((forest, index) => (
                <motion.div
                  key={forest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedForest === forest.id
                        ? "ring-2 ring-green-500 bg-gradient-to-r from-green-50 to-green-25 shadow-lg"
                        : "hover:shadow-md hover:border-green-200"
                    }`}
                    onClick={() => setSelectedForest(forest.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{forest.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">{forest.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            {forest.visitors} visiteur{forest.visitors !== 1 ? "s" : ""}
                          </div>
                        </div>
                        {forest.active && (
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mb-1" />
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              Live
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Image Gallery from Virtual Tour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Galerie de la visite</h3>
              {isLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {images.slice(0, 8).map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer ${
                        currentImageIndex === index ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Forest view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Forest Preview - Now contains the 3D virtual tour viewer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="xl:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[16/10] relative">
                <ErrorBoundary>
                  {images.length > 0 && <VirtualTourViewer images={images} onImageChange={setCurrentImageIndex} />}
                </ErrorBoundary>


                {/* Top Controls */}
                <div className="absolute top-6 right-6 flex space-x-3 z-10">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full">
                      <MapPin className="w-5 h-5 text-gray-700" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full">
                      <Camera className="w-5 h-5 text-gray-700" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full">
                      <Maximize2 className="w-5 h-5 text-gray-700" />
                    </Button>
                  </motion.div>
                </div>

                {/* Live Indicator */}
                {activeForest?.active && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 left-6 z-10"
                  >
                    <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>EN DIRECT</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Entrée de la forêt</h3>
                    <p className="text-gray-600 leading-relaxed max-w-2xl">
                      Bienvenue à l'entrée majestueuse de la forêt du Dia et lobo. Les Ébènes centenaires forment une
                      arche naturelle qui vous invite à découvrir ce patrimoine forestier exceptionnel.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
                      <Eye className="w-4 h-4 mr-2" />
                      Visiter
                    </Button>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-full">
                      Entrée de la forêt
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                    >
                      Cœur de la forêt
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                    >
                      Rochers emblématiques
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                    >
                      Zone de biodiversité
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
