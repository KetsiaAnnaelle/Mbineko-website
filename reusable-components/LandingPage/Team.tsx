
import { motion } from "framer-motion";

const Team = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-green-200 opacity-30 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-green-300 opacity-20 blur-2xl" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
        >
          Équipe et Partenaires
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-gray-600 max-w-2xl mx-auto"
        >
          Nous croyons que la technologie peut être un allié puissant de la nature.
        </motion.p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center justify-items-center">
          {[
            { src: "/assets/img/odc.jpg", alt: "Orange" },
            { src: "/assets/img/Apadime.PNG", alt: "Apadime" },
            { src: "/assets/img/aws.png", alt: "AWS" },
            { src: "/assets/img/meta.png", alt: "META" },
            // { src: "/assets/img/EY.png", alt: "EY" },
          ].map((partner, i) => (
            <motion.div
              key={partner.alt}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all p-3 border border-gray-100 w-50 h-50 grid place-items-center"
            >
              <img src={partner.src} alt={partner.alt} className="max-h-20 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
