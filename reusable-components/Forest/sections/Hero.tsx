"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/i18n"

export default function Hero() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { t } = useI18n()

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/img/forets1.jpg')",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative text-center text-white max-w-4xl mx-auto px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t("forest.title", "Explorez les Forêts du Monde").split(" ").slice(0, 3).join(" ")}{" "}
          <span className="text-[#228B22]">
            {t("forest.title", "Explorez les Forêts du Monde").split(" ").slice(3).join(" ")}
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          {t(
            "forest.subtitle",
            "Découvrez les merveilles et vivez les plus belles forêts de la planète. Accédez à des données environnementales en temps réel et rejoignez la communauté de surveillance forestière mondiale.",
          )}
        </p>

        {/* Barre de recherche */}
        <div className="flex justify-center items-center mb-6">
          <div
            className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 cursor-pointer border border-white/20"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5 text-white" />
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  type="text"
                  placeholder={t("forest.searchPlaceholder", "Entrez le nom d'une forêt")}
                  className="ml-2 bg-transparent border-none text-white placeholder-white/70 focus:outline-none"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <Button size="lg" className="bg-[#228B22] hover:bg-green-400 text-white px-8 py-3 text-lg group">
          {t("forest.startExploration", "Commencer l'exploration")}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}
