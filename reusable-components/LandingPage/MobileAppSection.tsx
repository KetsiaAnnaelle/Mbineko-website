import { motion } from "framer-motion";
import { QrCode, Shield, BarChart3, MapPin, Download, Star, Users } from "lucide-react";

const MobileAppSection = () => {
  return (
    <section id="mobile-app" className="relative py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête amélioré */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 backdrop-blur-sm rounded-full border border-green-200/60 mb-6">
              <Download className="w-4 h-4 mr-2 text-green-700" />
              <span className="text-sm font-semibold text-green-800 tracking-wide uppercase">
                Application Mobile
              </span>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-green-800 to-emerald-700 bg-clip-text text-transparent">
              La puissance de MBINEKO
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-slate-700 font-semibold">
              dans votre poche
            </span>
          </motion.h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-8 rounded-full"
          ></motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            Surveillez vos forêts où que vous soyez grâce à notre application mobile intuitive et performante
          </motion.p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          {/* Partie gauche - Image du téléphone avec animations avancées */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative xl:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Floating elements around phone */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400/40 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Téléphone avec effets 3D */}
              <motion.div
                initial={{ rotate: -8, y: 30, scale: 0.9 }}
                whileInView={{ rotate: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className="relative z-10 w-80 mx-auto transform-gpu perspective-1000"
              >
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[45px] p-4 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20 border-2 border-gray-700"></div>
                  
                  {/* Screen */}
                  <div className="overflow-hidden rounded-[36px] border-2 border-gray-700 bg-black">
                    <motion.img 
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      src="/assets/img/maquette mobile.PNG" 
                      alt="Interface professionnelle de l'application MBINEKO" 
                      className="w-full h-auto object-cover"
                      style={{ minHeight: '550px' }}
                    />
                  </div>

                  {/* Phone reflection */}
                  <div className="absolute inset-2 rounded-[36px] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Phone shadow */}
                <div className="absolute inset-0 bg-black/20 blur-3xl transform translate-y-12 scale-95 rounded-[45px] -z-10"></div>
              </motion.div>

              {/* Effets d'arrière-plan animés améliorés */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                // transition={{ duration: 1.5, delay: 0.7 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
                className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl"
              ></motion.div>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.2 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  delay: 0.9, // tu peux garder celui que tu veux (0.9 ou 2)
                }}
                className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl"
              />


              {/* Floating UI badges */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-green-400/30"
              >
                 En ligne
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute -bottom-6 -left-8 bg-white/10 backdrop-blur-md text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200/60 shadow-lg"
              >
                 Temps réel
              </motion.div>
            </div>
          </motion.div>

          {/* Partie droite - Contenu amélioré */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="xl:w-1/2"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-4">
                  Téléchargez l'application dès maintenant
                </h3>
                
                <p className="text-xl text-slate-600 leading-relaxed">
                  Accédez à toutes les fonctionnalités de surveillance forestière directement depuis votre smartphone :
                </p>
              </div>

              {/* Liste des fonctionnalités avec design amélioré */}
              <div className="space-y-6">
                {[
                  { icon: MapPin, text: "Localisation GPS en temps réel de vos équipements", color: "from-blue-500 to-cyan-500" },
                  { icon: BarChart3, text: "Données et analyses accessibles à tout moment", color: "from-green-500 to-emerald-500" },
                  { icon: Shield, text: "Alertes instantanées en cas de détection d'anomalies", color: "from-red-500 to-pink-500" }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-start group"
                  >
                    <div className={`flex-shrink-0 mr-4 mt-1 p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Stats section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap items-center gap-8 py-6"
              >
                {[
                  { icon: Star, number: '4.9', label: 'Note moyenne' },
                  { icon: Users, number: '6+', label: 'Utilisateurs' },
                  { icon: Download, number: '6+', label: 'Téléchargements' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-2xl font-bold text-slate-900">{stat.number}</span>
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* QR Code et boutons de téléchargement avec design premium */}
              <div className="flex flex-col lg:flex-row items-start gap-8 pt-6">
                {/* QR Code avec animation et design amélioré */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-900">Scanner pour télécharger</span>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-green-200/60">
                    <div className="w-36 h-36 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-green-600" />
                    </div>
                  </div>
                </motion.div>

                {/* Boutons de téléchargement avec design premium */}
                <div className="space-y-4 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="flex items-center justify-center w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                      <div className="mr-4 p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      </div>
                      {/* <div className="text-left">
                        <div className="text-xs opacity-80">Télécharger sur</div>
                        <div className="font-bold text-lg">App Store</div> */}
                      {/* </div> */}
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="flex items-center justify-center w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                      <div className="mr-4 p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <div className="text-xs opacity-80">Disponible sur</div>
                        <div className="font-bold text-lg">Google Play</div>
                      </div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bannière inférieure avec design premium */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 relative"
        >
          <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background decorative elements */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-green-600/20 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-emerald-600/20 blur-3xl"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-2xl md:text-3xl font-bold mb-6"
              >
                Rejoignez plus de 2 utilisateurs satisfaits
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90"
              >
                L'application MBINEKO a déjà été téléchargée par des milliers de professionnels de la sylviculture à travers le monde.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  ); 
};

export default MobileAppSection;
