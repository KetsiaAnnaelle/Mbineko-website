"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ForestDetailPage from "../../reusable-components/Forest/pages/ForestDetailPage"
import type { Forest } from "@/types/forest"
import ForestPage from "../../reusable-components/Forest/pages/ForestPage"
import { forests as staticForests } from "@/data/forests"

export default function ForestMonitoringPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedForest, setSelectedForest] = useState<Forest | null>(null)
  const [forests, setForests] = useState<Forest[]>(staticForests)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchForests = async () => {
      setLoading(true)
      try {
        // TODO: Replace with your actual backend endpoint
        // const response = await fetch('YOUR_BACKEND_API/forests');
        // if (response.ok) {
        //   const data = await response.json();
        //   setForests(data);
        // }

        // For now, use static data
        setForests(staticForests)
      } catch (error) {
        console.error("[v0] Error fetching forests:", error)
        // Fallback to static data on error
        setForests(staticForests)
      } finally {
        setLoading(false)
      }
    }

    fetchForests()
  }, [])

  useEffect(() => {
    if (id) {
      const forest = forests.find((f) => f.id === id)
      if (forest) {
        setSelectedForest(forest)
      } else {
        // If forest not found, redirect to forests list
        navigate("/forests")
      }
    } else {
      setSelectedForest(null)
    }
  }, [id, forests, navigate])

  const handleForestSelect = (forest: Forest) => {
    navigate(`/forests/${forest.id}`)
  }

  const handleBackToHome = () => {
    navigate("/forests")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des forêts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {selectedForest ? (
        <ForestDetailPage forest={selectedForest} onBack={handleBackToHome} />
      ) : (
        <ForestPage forests={forests} onForestSelect={handleForestSelect} />
      )}
    </div>
  )
}
