"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin, TreePine, Leaf } from "lucide-react"
import type { Forest } from "@/types/forest"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ForestCardProps {
  forest: Forest
  onExplore: () => void
  className?: string
}

export default function ForestCard({ forest, onExplore, className }: ForestCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - top) / height - 0.5) * 15 // inclinaison verticale
    const y = ((e.clientX - left) / width - 0.5) * 15 // inclinaison horizontale
    setRotate({ x, y })
  }

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 })

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={cn("w-full", className)}
    >
      <motion.div
        style={{
          rotateX: rotate.x,
          rotateY: -rotate.y,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="transform-gpu"
      >
        <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 relative">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <img
              src={forest.image || "/placeholder.svg"}
              alt={forest.name}
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Badge couverture */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-md">
              <Leaf className="h-3 w-3 text-green-600" />
              <span className="text-xs font-semibold text-green-600">{forest.coverage}%</span>
            </div>
          </div>

          {/* Contenu */}
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{forest.name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
              <MapPin className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm">{forest.location}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <TreePine className="h-5 w-5 text-green-700" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Surface</div>
                  <div className="font-bold text-gray-900 dark:text-white">{forest.area}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Couverture</div>
                <div className="font-bold text-green-700 text-lg">{forest.coverage}%</div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={onExplore}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl relative overflow-hidden"
            >
              Explorer la forêt
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              {/* Effet shine */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
