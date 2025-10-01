// import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden shadow-2xl rounded-3xl border-0">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 min-h-[600px]">
                {/* Image Section */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <img
                      src="/assets/img/Team.jpg"
                      alt="Équipe MBINEKO"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    
                    {/* Badge BIENVENUE */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="absolute top-8 left-8"
                    >
                      <div className="bg-orange-500 text-white px-5 py-3 rounded-lg shadow-lg">
                        <h3 className="text-sm font-bold tracking-wider">BIENVENUE</h3>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Content Section */}
                <div className="bg-gradient-to-br from-white to-green-50 p-10 md:p-14 flex flex-col justify-center relative">
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300 rounded-full translate-y-12 -translate-x-12 opacity-15"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-8 relative z-10"
                  >
                    {/* Title Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <h2 className="text-lg font-semibold text-green-800 tracking-widest uppercase">
                        À PROPOS DE
                      </h2>
                      <h3 className="text-5xl md:text-6xl font-bold text-green-900">
                        NOUS
                      </h3>
                    </motion.div>
                    
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="space-y-6 text-gray-700 leading-relaxed"
                    >
                      <p className="text-base md:text-lg">
                        Méthodes est une initiative née de la conviction que la technologie peut aider 
                        à préserver nos forêts. Grâce à des capteurs intelligents et à une plateforme 
                        de suivi, nous collectons et analysons des données précieuses sur les sols, 
                        les arbres et les écosystèmes.
                      </p>
                      <p className="text-base md:text-lg">
                        Ces informations permettent d'anticiper les risques, de mieux comprendre 
                        l'état des forêts et d'accompagner les communautés, chercheurs et décideurs 
                        dans la protection de l'environnement.
                      </p>
                      <p className="text-base md:text-lg font-medium text-green-800">
                        Notre mission est simple : transformer les données en actions concrètes 
                        pour un avenir durable, où la nature et l'innovation avancent ensemble.
                      </p>
                    </motion.div>
                    
                    {/* Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="pt-4"
                    >
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-base font-bold tracking-wide rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        size="lg"
                      >
                        NOUS CONTACTER
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
