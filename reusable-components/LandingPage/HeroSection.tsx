

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useI18n } from "@/i18n"
import { Link } from "react-router-dom"

const Counter = ({ to, duration = 1500, suffix = "" }: { to: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const increment = to / (duration / 16)
    const step = () => {
      start += increment
      if (start < to) {
        setCount(Math.floor(start))
        requestAnimationFrame(step)
      } else {
        setCount(to)
      }
    }
    step()
  }, [to, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const HeroSection = () => {
  const { t } = useI18n()

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/img/forest2.jpg')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-[#228B22]/70 to-green-900/80" />

        {/* Particules animées */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 w-full">
        <div className="grid grid-cols-10 gap-4 md:gap-6 py-12 md:py-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="col-span-10 lg:col-span-6 space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-gray-800 block">{t("hero.title1", "L'INNOVATION")}</span>
              <span className="text-gray-800 block">{t("hero.title2", "AU SERVICE DES")}</span>
              <span className="text-[#228B22] block">{t("hero.title3", "FORÊTS")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-lg text-gray-600 max-w-prose leading-relaxed"
            >
              {t("hero.description", "Les forêts sont les poumons de notre planète...")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#228B22] hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  {t("cta.downloadApp", "Télécharger l'application mobile")}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/vitual-tour-viewer">
                  <Button
                    variant="outline"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    {t("cta.watchVideo", "Regarder la Vidéo")}
                  </Button>
                  
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="col-span-10 lg:col-span-4 relative"
          >
            <div className="relative z-10 w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/Mbineko-main/public/assets/video/video-foret-WJXIVqBa6aLcMEVAPUdYurff95m8in.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Section statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="bg-white/95 mb-10 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-green-200/50 ">
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-8"
              >
                {t("hero.moreThan", "Plus de")}{" "}
                <span className="text-[#228B22]">2 {t("hero.forestsListed", "forêts déjà répertoriées")}</span>
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <motion.div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-[#228B22] mb-2">
                    <Counter to={2} suffix="+" />
                  </div>
                  <div className="text-sm md:text-base text-[#228B22] font-medium">
                    {t("hero.forestsMonitored", "Forêts surveillées")}
                  </div>
                </motion.div>

                <motion.div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-[#228B22] mb-2">
                    <Counter to={2} suffix="/7" />
                  </div>
                  <div className="text-sm md:text-base text-[#228B22] font-medium">
                    {t("hero.continuousMonitoring", "Surveillance continue")}
                  </div>
                </motion.div>

                <motion.div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-[#228B22] mb-2">
                    <Counter to={10} suffix="+" />
                  </div>
                  <div className="text-sm md:text-base text-[#228B22] font-medium">
                    {t("hero.sensorsDeployed", "Capteurs déployés")}
                  </div>
                </motion.div>

                <motion.div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-[#228B22] mb-2">
                    <Counter to={100} suffix="%" />
                  </div>
                  <div className="text-sm md:text-base text-[#228B22] font-medium">
                    {t("hero.clientSatisfaction", "Satisfaction clients")}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
