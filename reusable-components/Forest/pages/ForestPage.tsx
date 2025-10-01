import ForestsGrid from "../sections/ForestsGrid"
import FeaturesSection from "../sections/FeaturesSection"
import CTASection from "../sections/CTASection"
import Footer from "../../Layout/Footer"
import { features } from "@/data/forests"
import type { Forest } from "@/types/forest"
import Hero from "../sections/Hero"
import Header from "../../Layout/Header"

interface ForestPageProps {
  forests: Forest[]
  onForestSelect: (forest: Forest) => void
}

export default function ForestPage({ forests, onForestSelect }: ForestPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">
        <Hero />
      </div>
      <ForestsGrid forests={forests} onForestSelect={onForestSelect} />
      <FeaturesSection features={features} />
      <CTASection />
      <Footer />
    </div>
  )
}
