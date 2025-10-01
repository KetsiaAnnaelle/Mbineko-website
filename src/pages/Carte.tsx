import { motion } from "framer-motion"
import { MapPin, ArrowLeft, Info, Trees, Users, Calendar } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Forest {
  id: string
  name: string
  position: { x: number; y: number }
  area: string
  biodiversity: string
  lastVisit: string
  description: string
  color: string
}

const forests: Forest[] = [
  {
    id: "mayombe",
    name: "Forêt du Mayombe",
    position: { x: 15, y: 75 },
    area: "13,000 km²",
    biodiversity: "Très élevée",
    lastVisit: "Mars 2024",
    description: "Forêt tropicale dense avec une biodiversité exceptionnelle",
    color: "#10b981",
  },
  {
    id: "odzala",
    name: "Parc National Odzala-Kokoua",
    position: { x: 45, y: 35 },
    area: "13,546 km²",
    biodiversity: "Exceptionnelle",
    lastVisit: "Février 2024",
    description: "Habitat des gorilles des plaines et éléphants de forêt",
    color: "#3b82f6",
  },
  {
    id: "nouabale",
    name: "Nouabalé-Ndoki",
    position: { x: 60, y: 25 },
    area: "4,000 km²",
    biodiversity: "Pristine",
    lastVisit: "Janvier 2024",
    description: "Une des dernières forêts vierges d'Afrique centrale",
    color: "#8b5cf6",
  },
  {
    id: "conkouati",
    name: "Conkouati-Douli",
    position: { x: 20, y: 85 },
    area: "5,045 km²",
    biodiversity: "Élevée",
    lastVisit: "Avril 2024",
    description: "Écosystème unique entre forêt et océan",
    color: "#f59e0b",
  },
]

export default function Carte() {
  const [selectedForest, setSelectedForest] = useState<Forest | null>(null)
  const [hoveredForest, setHoveredForest] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/virtual-visite">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-emerald-900">Carte des Forêts du Congo</h1>
          <div className="w-24" />
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-2xl border-2 border-emerald-100">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-green-200">
                  {/* SVG Map of Congo */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                  >
                    {/* Congo outline - simplified */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M 10 20 Q 15 15, 25 18 L 40 15 Q 50 12, 60 15 L 75 20 Q 85 25, 88 35 L 90 50 Q 88 65, 85 75 L 75 85 Q 65 90, 50 88 L 35 90 Q 25 88, 18 82 L 12 70 Q 8 55, 10 40 Z"
                      fill="#059669"
                      fillOpacity="0.2"
                      stroke="#047857"
                      strokeWidth="0.5"
                      strokeDasharray="2,1"
                    />

                    {/* Forest regions */}
                    {forests.map((forest, index) => (
                      <g key={forest.id}>
                        {/* Pulse effect */}
                        <motion.circle
                          cx={forest.position.x}
                          cy={forest.position.y}
                          r="3"
                          fill={forest.color}
                          opacity="0.3"
                          initial={{ scale: 0 }}
                          animate={{
                            scale: hoveredForest === forest.id ? [1, 2, 1] : 1,
                            opacity: hoveredForest === forest.id ? [0.3, 0, 0.3] : 0.3,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.3,
                          }}
                        />

                        {/* Marker */}
                        <motion.circle
                          cx={forest.position.x}
                          cy={forest.position.y}
                          r="1.5"
                          fill={forest.color}
                          stroke="white"
                          strokeWidth="0.3"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.2 }}
                          whileHover={{ scale: 1.5 }}
                          onMouseEnter={() => setHoveredForest(forest.id)}
                          onMouseLeave={() => setHoveredForest(null)}
                          onClick={() => setSelectedForest(forest)}
                          className="cursor-pointer"
                        />

                        {/* Label */}
                        <motion.text
                          x={forest.position.x}
                          y={forest.position.y - 3}
                          textAnchor="middle"
                          fontSize="2.5"
                          fontWeight="600"
                          fill={forest.color}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.2 }}
                          className="pointer-events-none"
                          style={{ filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.8))" }}
                        >
                          {forest.name.split(" ")[0]}
                        </motion.text>
                      </g>
                    ))}
                  </svg>

                  {/* Legend */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-900 mb-2">
                      <MapPin className="w-4 h-4" />
                      Légende
                    </div>
                    <div className="space-y-1 text-xs">
                      {forests.map((forest) => (
                        <div key={forest.id} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: forest.color }} />
                          <span className="text-gray-700">{forest.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-emerald-900">
                    {selectedForest ? selectedForest.name : "Informations"}
                  </h2>
                </div>

                {selectedForest ? (
                  <motion.div
                    key={selectedForest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedForest.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Trees className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Superficie</div>
                          <div className="font-semibold text-gray-900">{selectedForest.area}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Biodiversité</div>
                          <Badge
                            variant="secondary"
                            className="mt-1"
                            style={{
                              backgroundColor: `${selectedForest.color}20`,
                              color: selectedForest.color,
                            }}
                          >
                            {selectedForest.biodiversity}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Dernière visite</div>
                          <div className="font-semibold text-gray-900">{selectedForest.lastVisit}</div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">Explorer cette forêt</Button>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Cliquez sur un marqueur pour voir les détails</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-emerald-900 mb-4">Statistiques</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Forêts cartographiées</span>
                    <span className="font-bold text-emerald-600">{forests.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Surface totale</span>
                    <span className="font-bold text-emerald-600">35,591 km²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Espèces protégées</span>
                    <span className="font-bold text-emerald-600">1,200+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
