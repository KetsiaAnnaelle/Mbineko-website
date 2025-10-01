// import Header from '../../reusable-components/Layout/Header';
// import Footer from '../../reusable-components/Layout/Footer';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function Cartography() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <main className="max-w-screen-2xl mx-auto px-4 md:px-6 py-10">
//         <motion.h1
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
//         >
//           Cartographie interactive
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="text-gray-600 mb-6"
//         >
//           Accédez à la visualisation 3D et aux visites virtuelles depuis une même interface.
//         </motion.p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Link to="/visualisation-3d" className="group block rounded-2xl border border-gray-100 p-6 shadow hover:shadow-lg transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">Visualisation 3D</h3>
//                 <p className="text-gray-600">Affichez vos images sous forme de panneaux 3D interactifs.</p>
//               </div>
//               <motion.span
//                 initial={{ x: -4, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 className="text-green-600 text-2xl"
//               >
//                 →
//               </motion.span>
//             </div>
//           </Link>
//           <Link to="/visite-virtuelle" className="group block rounded-2xl border border-gray-100 p-6 shadow hover:shadow-lg transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">Visite virtuelle</h3>
//                 <p className="text-gray-600">Parcourez un panorama interactif avec transitions fluides.</p>
//               </div>
//               <motion.span
//                 initial={{ x: -4, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 className="text-green-600 text-2xl"
//               >
//                 →
//               </motion.span>
//             </div>
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }


// import Header from '../components/Layout/Header';
// import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cuboid as Cube, Eye, Map } from 'lucide-react';
import Footer from '../../reusable-components/Layout/Footer';
import Header from '../../reusable-components/Layout/Header';

export default function Cartography() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-2xl mx-auto px-4 md:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Cartographie Interactive
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez les forêts à travers des visualisations 3D immersives et des visites virtuelles interactives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              to="/visualization-3d" 
              className="group block bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <Cube className="w-12 h-12 text-green-600" />
                <motion.span
                  className="text-green-600 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Visualisation 3D</h3>
              <p className="text-gray-600 leading-relaxed">
                Découvrez vos images forestières sous forme de panneaux 3D interactifs avec des animations fluides et des contrôles intuitifs.
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/virtual-tour" 
              className="group block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-12 h-12 text-blue-600" />
                <motion.span
                  className="text-blue-600 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Visite Virtuelle</h3>
              <p className="text-gray-600 leading-relaxed">
                Immergez-vous dans des panoramas 360° et naviguez de scène en scène avec des hotspots interactifs.
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/cartography-3d" 
              className="group block bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <Map className="w-12 h-12 text-purple-600" />
                <motion.span
                  className="text-purple-600 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cartographie 3D</h3>
              <p className="text-gray-600 leading-relaxed">
                Explorez une galerie 3D interactive avec des images flottantes et des aperçus agrandis.
              </p>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Technologies utilisées
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React Three Fiber', 'Three.js', 'Framer Motion', 'WebGL', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
