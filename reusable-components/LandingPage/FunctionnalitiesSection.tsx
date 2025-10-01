import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Satellite, Download, Shield, MapPin } from "lucide-react";

const FunctionnalitiesSection = () => {
  const features = [
    {
      title: "Surveillance en temps réel",
      description: "de votre zone forestière",
      icon: <Satellite className="w-6 h-6" />,
    },
    {
      title: "Visite virtuelle des forêts",
      description: "Plongez dans les forêts avec une visite virtuelle",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: "Assistance technique 24h/24 et 7j/7",
      description: "et maintenance",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Données téléchargeables",
      description: "et rapports détaillés",
      icon: <Download className="w-6 h-6" />,
    },
  ];

  // Variantes d'animation pour l'arborescence
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const branchVariants: Variants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-6"
          >
            FONCTIONNALITÉS
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-2 bg-gradient-to-r from-green-500 to-[#228B22] mx-auto mb-8 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            Chaque kit MBINEKO comprend des drones de surveillance, des capteurs
            environnementaux et un accès complet à notre plateforme de
            surveillance intelligente.
          </motion.p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="relative">
          {/* Enhanced Trunk - visible only on desktop */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-green-200 to-green-300 -translate-x-1/2 z-0 rounded-full shadow-lg"
          />

          {/* Enhanced Main Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Colonne gauche - 2 premières fonctionnalités */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12 pt-4"
            >
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <motion.div
                    variants={branchVariants}
                    className="hidden md:block w-8 h-0.5 bg-[#228B22] mt-5 mr-4"
                  />

                  <div className="relative mt-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + 0.4,
                      }}
                      className="hidden md:block w-4 h-4 rounded-full bg-[#228B22] absolute -left-7 top-1 z-10"
                    />
                  </div>

                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3 } 
                    }}
                    className="bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 flex-1 backdrop-blur-sm"
                  >
                    <div className="flex items-start">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex-shrink-0 mr-6 p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl text-green-700 shadow-md"
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-green-900 text-xl mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Colonne droite - 2 dernières fonctionnalités */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12 pt-4"
            >
              {features.slice(2, 4).map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <motion.div
                    variants={branchVariants}
                    className="hidden md:block w-8 h-0.5 bg-[#228B22] mt-5 mr-4"
                  />
                  <div className="relative mt-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + 0.4,
                      }}
                      className="hidden md:block w-4 h-4 rounded-full bg-[#228B22] absolute -left-7 top-1 z-10"
                    />
                  </div>

                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3 } 
                    }}
                    className="bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 flex-1 backdrop-blur-sm"
                  >
                    <div className="flex items-start">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex-shrink-0 mr-6 p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl text-green-700 shadow-md"
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-green-900 text-xl mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunctionnalitiesSection;
