"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Radio } from "lucide-react";

interface PrototypeCardProps {
  title: string;
  image: string;
  description: string[];
  delay: number;
  icon: React.ReactNode;
}

const prototypeData: PrototypeCardProps[] = [
  {
    title: "Drone de surveillance",
    image: "/assets/img/Drone2.jpg",
    icon: <Plane className="w-7 h-7 text-green-600" />,
    description: [
      "Surveillance aérienne des forêts en temps réel",
      "Détection des anomalies (incendies, coupes illégales, intrusions)",
      "Transmission des images et vidéos vers la plateforme",
    ],
    delay: 0.1,
  },
  {
    title: "Boîte à capteurs intelligente",
    image: "/assets/img/Boite a capteur.jpg",
    icon: <Radio className="w-7 h-7 text-green-600" />,
    description: [
      "Collecte de données environnementales (température, humidité, gaz, sons…)",
      "Analyse locale avec IA embarquée",
      "Envoi des données en temps réel pour une télédétection préventive",
    ],
    delay: 0.3,
  },
];

const PrototypeSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="prototype"
      className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-green-50/50 relative overflow-hidden"
    >
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="mx-auto max-w-screen-xl px-6 md:px-10 relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-4 bg-green-100 rounded-full p-4"
          >
            <Plane className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Prototype de notre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Solution
            </span>
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"
          />
          
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Découvrez nos dispositifs innovants pour la télédétection et la surveillance forestière
          </p>
        </motion.div>

        {/* Grille des prototypes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {prototypeData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: item.delay,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 hover:border-green-200 transition-all duration-500">
                {/* Badge avec icône */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: item.delay + 0.3,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                  className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg border border-green-100"
                >
                  {item.icon}
                </motion.div>

                {/* Image du prototype */}
                <div className="h-72 md:h-80 w-full overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-50">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === idx ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Overlay gradient animé */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                    animate={{
                      opacity: hoveredIndex === idx ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: hoveredIndex === idx ? ["100%", "-100%"] : "100%",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Contenu texte */}
                <div className="p-8 relative">
                  {/* Titre */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 group-hover:text-green-600 transition-colors duration-300"
                    animate={{
                      y: hoveredIndex === idx ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Liste des caractéristiques */}
                  <ul className="space-y-3">
                    {item.description.map((line, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: item.delay + 0.5 + i * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed group-hover:text-gray-900 transition-colors"
                      >
                        <motion.span
                          className="text-green-600 font-bold text-xl flex-shrink-0 mt-0.5"
                          animate={{
                            scale: hoveredIndex === idx ? [1, 1.3, 1] : 1,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.1,
                          }}
                        >
                          •
                        </motion.span>
                        <span>{line}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Barre de progression au hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-br-3xl"
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredIndex === idx ? "100%" : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Effet de lueur au hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-tr from-green-500/10 via-emerald-500/5 to-transparent pointer-events-none rounded-3xl"
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Ombre externe animée */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl -z-10"
                animate={{
                  opacity: hoveredIndex === idx ? 0.6 : 0,
                  scale: hoveredIndex === idx ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Indicateur de scroll subtil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm font-medium">
            Passez la souris sur les cartes pour plus d'interactivité
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrototypeSection;