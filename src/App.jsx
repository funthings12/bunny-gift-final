import { Canvas } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Page1Celebration from './components/Page1Celebration'
import Page2Memories from './components/Page2Memories'
import Page3Letter from './components/Page3Letter'
import Page4Closure from './components/Page4Closure'

function ResponsiveGroup({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      // Start scaling down if width is < 768px (typical tablet/mobile breakpoint)
      const width = window.innerWidth
      if (width < 500) {
        setScale(0.5) // Mobile
      } else if (width < 768) {
        setScale(0.7) // Tablet
      } else {
        setScale(1)   // Desktop
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <group scale={scale}>{children}</group>
}

export default function App() {
  const [page, setPage] = useState(0)

  // Audio state
  const audioRef = useRef(new Audio('/assets/bgm_space.mp3')) // Placeholder. I'll need to generate music or omit
  // I'll create a simple synthesized tone/ambient sound component if user doesn't provide file. 
  // Or just leave it for now. User said "Music starts automatically on this page (Page 2)".

  useEffect(() => {
    if (page === 1) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required)", e))
    }
  }, [page])

  return (
    <>
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <color attach="background" args={['#050510']} />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a5b4fc" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff7eb3" />

        {/* Global Environment */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

        {/* Use Suspense for loading assets */}
        <Suspense fallback={null}>
          <ResponsiveGroup>
            {page === 0 && <Page1Celebration onNext={() => setPage(1)} />}
            {page === 1 && <Page2Memories onNext={() => setPage(2)} />}
            {page === 2 && <Page3Letter onNext={() => setPage(3)} />}
            {page === 3 && <Page4Closure />}
          </ResponsiveGroup>
        </Suspense>
      </Canvas>

      {/* Sound Controller (Optional overlay) */}
      <div className="absolute bottom-4 right-4 z-50 text-white/30 text-xs">
        {/* Sound toggle could go here */}
      </div>
    </>
  )
}
