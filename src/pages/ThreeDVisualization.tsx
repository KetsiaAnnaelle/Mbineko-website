// import Header from '../../reusable-components/Layout/Header';
// import Footer from '../../reusable-components/Layout/Footer';
// import { Suspense, useEffect, useMemo, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Float, Environment, useTexture } from '@react-three/drei';
// import { motion } from 'framer-motion';
// import { getForestImageUrls } from '@/services/imageSource';

// function TexturedBillboard({ url, position }: { url: string, position: [number, number, number] }) {
//   const texture = useTexture(url);
//   return (
//     <Float floatIntensity={0.8} rotationIntensity={0.2} speed={1.2}>
//       <mesh position={position}>
//         <planeGeometry args={[3.2, 1.8]} />
//         <meshStandardMaterial map={texture} roughness={0.9} metalness={0.1} />
//       </mesh>
//     </Float>
//   );
// }

// export default function ThreeDVisualization() {
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     getForestImageUrls().then(setImages);
//   }, []);

//   const positions = useMemo<([number, number, number])[]>(() => (
//     [
//       [-3, 1, -2],
//       [0, 1.2, -3.5],
//       [3, 1, -2],
//     ]
//   ), []);

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <Header />
//       <main className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
//         <motion.h1
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold mb-4"
//         >
//           Visualisation 3D des forêts
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="text-gray-600 mb-6"
//         >
//           Explorez vos images sous forme de panneau 3D avec interactions fluides.
//         </motion.p>
//         <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
//           <Suspense fallback={<div className="w-full h-full grid place-items-center">Chargement 3D…</div>}>
//             <Canvas camera={{ position: [0, 1.5, 5], fov: 55 }}>
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[3, 4, 2]} intensity={1} />
//               <Environment preset="forest" />
//               {images.slice(0, 3).map((url, i) => (
//                 <TexturedBillboard key={url} url={url} position={positions[i] || [i * 2 - 2, 1, -2]} />
//               ))}
//               <OrbitControls enableDamping dampingFactor={0.08} />
//             </Canvas>
//           </Suspense>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }



import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { getForestImageUrls } from '../services/imageSource';
import Header from '../../reusable-components/Layout/Header';
import Footer from '../../reusable-components/Layout/Footer';

function TexturedBillboard({ url, position }: { url: string, position: [number, number, number] }) {
  const texture = useTexture(url);
  return (
    <Float floatIntensity={0.8} rotationIntensity={0.2} speed={1.2}>
      <mesh position={position}>
        <planeGeometry args={[3.2, 1.8]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0.1} />
      </mesh>
    </Float>
  );
}

export default function ThreeDVisualization() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getForestImageUrls().then(setImages);
  }, []);

  const positions = useMemo<([number, number, number])[]>(() => (
    [
      [-3, 1, -2],
      [0, 1.2, -3.5],
      [3, 1, -2],
    ]
  ), []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Visualisation 3D des forêts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-gray-600 mb-6"
        >
          Explorez vos images sous forme de panneau 3D avec interactions fluides.
        </motion.p>
        <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <Suspense fallback={<div className="w-full h-full grid place-items-center">Chargement 3D…</div>}>
            <Canvas camera={{ position: [0, 1.5, 5], fov: 55 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 4, 2] } intensity={1} />
              <Environment preset="forest" />
              {images.slice(0, 3).map((url, i) => (
                <TexturedBillboard key={url} url={url} position={positions[i] || [i * 2 - 2, 1, -2]} />
              ))}
              <OrbitControls enableDamping dampingFactor={0.08} />
            </Canvas>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
