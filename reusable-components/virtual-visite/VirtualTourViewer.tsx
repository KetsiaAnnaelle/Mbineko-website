import { Suspense, useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, useTexture } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Maximize2, Volume2, VolumeX, Info } from "lucide-react"
import * as THREE from "three"

// === Sphère panoramique avec qualité optimisée ===
function AnimatedEquirectSphere({
  textureUrl,
  isPlaying,
}: {
  textureUrl: string
  isPlaying: boolean
}) {
  const map = useTexture(textureUrl)
  const meshRef = useRef<THREE.Mesh | null>(null)

  // Configuration de texture pour une meilleure qualité
  useEffect(() => {
    if (map) {
      map.minFilter = THREE.LinearFilter
      map.magFilter = THREE.LinearFilter
      map.anisotropy = 16
    }
  }, [map])

  useFrame((state) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += 0.0015
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03
    }
  })

  return (
    <Sphere ref={meshRef} args={[3, 128, 128]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={map} side={THREE.BackSide} toneMapped={false} />
    </Sphere>
  )
}

// === Barre de progression élégante ===
function VideoProgress({
  current,
  total,
  onSeek,
}: {
  current: number
  total: number
  onSeek: (index: number) => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="w-full space-y-3">
      <div className="relative w-full bg-white/10 rounded-full h-1.5 backdrop-blur-sm overflow-hidden group">
        <motion.div
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-full rounded-full relative"
          style={{ width: `${((current + 1) / total) * 100}%` }}
          animate={{ opacity: isDragging ? 0.8 : 1 }}
        >
          <motion.div 
            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          />
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center">
        {Array.from({ length: total }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => onSeek(i)}
            className={`relative transition-all ${
              i === current ? "scale-100" : "scale-75 opacity-50 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`w-2 h-2 rounded-full ${
              i === current 
                ? "bg-green-500 shadow-lg shadow-green-500/50" 
                : "bg-white/60"
            }`} />
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full bg-green-500"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

interface VirtualTourViewerProps {
  images: string[]
  onImageChange?: (index: number) => void
  title?: string
  location?: string
}

export default function VirtualTourViewer({ 
  images = [], 
  onImageChange,
  title = "Visite Virtuelle Immersive",
  location = "Zone forestière protégée"
}: VirtualTourViewerProps) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [transitionKey, setTransitionKey] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => {
          const next = (c + 1) % images.length
          setTransitionKey((prev) => prev + 1)
          if (!isInitialMount.current) {
            onImageChange?.(next)
          }
          return next
        })
      }, 5000) // 5 secondes pour une meilleure appréciation
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    if (isInitialMount.current) {
      isInitialMount.current = false
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, images.length, onImageChange])

  // Masquer l'info après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowInfo(false), 5000)
    return () => clearTimeout(timer)
  }, [current])

  const togglePlayPause = () => setIsPlaying(!isPlaying)
  const next = () => {
    const nextIndex = (current + 1) % images.length
    setCurrent(nextIndex)
    setTransitionKey((prev) => prev + 1)
    setShowInfo(true)
    onImageChange?.(nextIndex)
  }
  const prev = () => {
    const prevIndex = (current - 1 + images.length) % images.length
    setCurrent(prevIndex)
    setTransitionKey((prev) => prev + 1)
    setShowInfo(true)
    onImageChange?.(prevIndex)
  }
  const seekTo = (index: number) => {
    setCurrent(index)
    setTransitionKey((prev) => prev + 1)
    setShowInfo(true)
    onImageChange?.(index)
  }
  const restart = () => {
    setCurrent(0)
    setTransitionKey((prev) => prev + 1)
    setIsPlaying(true)
    setShowInfo(true)
    onImageChange?.(0)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  console.log("isFullscreen", isFullscreen)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 rounded-3xl">
        <div className="text-center text-white">
          <motion.div 
            className="w-16 h-16 border-4 border-white/20 border-t-green-500 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl font-semibold">Préparation de votre expérience immersive...</p>
          <p className="text-sm text-white/70 mt-2">Chargement des images haute définition</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative bg-black rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Overlay d'introduction élégant */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-6 right-6 z-20 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-black/60 via-black/50 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  {title}
                  <span className="text-sm font-normal px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    360° HD
                  </span>
                </h2>
                <p className="text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton Info */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all"
      >
        <Info size={20} />
      </motion.button>

      <Suspense
        fallback={
          <div className="w-full h-full grid place-items-center bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
            <div className="text-center text-white">
              <motion.div 
                className="w-16 h-16 border-4 border-white/20 border-t-green-500 rounded-full mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-xl font-semibold">Chargement de l'expérience immersive...</p>
            </div>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={transitionKey}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full"
          >
            <Canvas 
              camera={{ position: [0, 0, 0.1], fov: 75 }}
              gl={{ 
                antialias: true, 
                alpha: false,
                powerPreference: "high-performance"
              }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={0.8} />
              {images.length > 0 && <AnimatedEquirectSphere textureUrl={images[current]} isPlaying={isPlaying} />}
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                rotateSpeed={-0.4}
                autoRotate={isPlaying}
                autoRotateSpeed={0.3}
                minDistance={0.5}
                maxDistance={5}
                dampingFactor={0.05}
                enableDamping
              />
            </Canvas>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {/* Panneau de contrôle premium */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-auto">
          <motion.div 
            className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 space-y-5 border border-white/10 shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Barre de progression */}
            {images.length > 0 && <VideoProgress current={current} total={images.length} onSeek={seekTo} />}
            
            {/* Contrôles principaux */}
            <div className="flex items-center justify-between gap-4">
              {/* Contrôles gauche */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restart}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  <RotateCcw size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>
              </div>

              {/* Contrôles centraux */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  <SkipBack size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlayPause}
                  className="p-5 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all shadow-lg shadow-green-500/30"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={next}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  <SkipForward size={20} />
                </motion.button>
              </div>

              {/* Contrôles droite */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  <Maximize2 size={18} />
                </motion.button>
              </div>
            </div>

            {/* Informations */}
            <div className="flex items-center justify-between text-white/90 text-sm">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500" : "bg-gray-400"}`}
                  animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-medium">
                  {isPlaying ? "Lecture automatique" : "En pause"}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="text-green-400 font-semibold">{current + 1}</span>
                <span className="text-white/50">/</span>
                <span className="text-white/70">{images.length}</span>
                <span className="text-white/50 text-xs ml-1">scènes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}