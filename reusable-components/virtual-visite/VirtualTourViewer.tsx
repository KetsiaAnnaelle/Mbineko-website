import { Suspense, useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, useTexture } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react"
import * as THREE from "three"

// === Sphère panoramique animée ===
function AnimatedEquirectSphere({
  textureUrl,
  isPlaying,
}: {
  textureUrl: string
  isPlaying: boolean
}) {
  const map = useTexture(textureUrl)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useFrame((state) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={map} side={THREE.BackSide} />
    </Sphere>
  )
}

// === Barre de progression façon "vidéo" ===
function VideoProgress({
  current,
  total,
  onSeek,
}: {
  current: number
  total: number
  onSeek: (index: number) => void
}) {
  return (
    <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300 relative"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      >
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer" />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onSeek(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-green-500 scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface VirtualTourViewerProps {
  images: string[]
  onImageChange?: (index: number) => void
}

export default function VirtualTourViewer({ images = [], onImageChange }: VirtualTourViewerProps) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [transitionKey, setTransitionKey] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => {
          const next = (c + 1) % images.length
          setTransitionKey((prev) => prev + 1)
          // Only call onImageChange after initial mount
          if (!isInitialMount.current) {
            onImageChange?.(next)
          }
          return next
        })
      }, 4000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    // Mark that initial mount is complete
    if (isInitialMount.current) {
      isInitialMount.current = false
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, images.length, onImageChange])

  const togglePlayPause = () => setIsPlaying(!isPlaying)
  const next = () => {
    const nextIndex = (current + 1) % images.length
    setCurrent(nextIndex)
    setTransitionKey((prev) => prev + 1)
    onImageChange?.(nextIndex)
  }
  const prev = () => {
    const prevIndex = (current - 1 + images.length) % images.length
    setCurrent(prevIndex)
    setTransitionKey((prev) => prev + 1)
    onImageChange?.(prevIndex)
  }
  const seekTo = (index: number) => {
    setCurrent(index)
    setTransitionKey((prev) => prev + 1)
    onImageChange?.(index)
  }
  const restart = () => {
    setCurrent(0)
    setTransitionKey((prev) => prev + 1)
    setIsPlaying(true)
    onImageChange?.(0)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl">
        <div className="text-center text-white">
          <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Chargement des images...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative bg-black rounded-2xl overflow-hidden">
      <Suspense
        fallback={
          <div className="w-full h-full grid place-items-center bg-gradient-to-br from-green-900 to-emerald-900">
            <div className="text-center text-white">
              <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-lg">Chargement de l'expérience immersive...</p>
            </div>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={transitionKey}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[1, 1, 1]} intensity={0.6} />
              {images.length > 0 && <AnimatedEquirectSphere textureUrl={images[current]} isPlaying={isPlaying} />}
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.3}
                autoRotate={isPlaying}
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {/* Overlay des contrôles */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 space-y-4">
            {images.length > 0 && <VideoProgress current={current} total={images.length} onSeek={seekTo} />}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
              >
                <RotateCcw size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
              >
                <SkipBack size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
              >
                <SkipForward size={20} />
              </motion.button>
            </div>
            <div className="text-center text-white/90">
              <p className="text-sm">
                Scène {current + 1} sur {images.length}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                <span className="text-xs">{isPlaying ? "Lecture automatique" : "En pause"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
