import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { ArrowRight } from 'lucide-react'

export default function Page1Celebration({ onNext }) {
    const [isExiting, setIsExiting] = useState(false)
    const groupRef = useRef()

    const handleNext = () => {
        setIsExiting(true)
        setTimeout(onNext, 2000)
    }

    // Vortex Pull / Antigravity Whirlpool variants
    const variants = {
        visible: { scale: 1, rotateZ: 0, opacity: 1 },
        exit: {
            scale: 0,
            rotateZ: Math.PI * 2, // 1 spin is enough for effect
            opacity: 0,
            transition: {
                duration: 2,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.group
            ref={groupRef}
            initial="visible"
            animate={isExiting ? "exit" : "visible"}
            variants={variants}
            onAnimationComplete={() => {
                // Optional: Cleanup
            }}
        >
            {/* Central Floating Text - Grand Opening */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Text
                    fontSize={1.0}
                    color="#38bdf8"
                    position={[0, 2.5, 0]}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#ffffff"
                    maxWidth={12}
                    textAlign="center"
                >
                    Happy Birthday Bunny
                </Text>
            </Float>

            {/* Decorative Balloons / Orbs */}
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[0.5, 32, 32]} position={[-3, 2, -2]}>
                    <MeshDistortMaterial color="#ff7eb3" speed={2} distort={0.4} roughness={0.2} metalness={0.8} />
                </Sphere>
                <Sphere args={[0.3, 32, 32]} position={[3, -2, -1]}>
                    <MeshDistortMaterial color="#a5b4fc" speed={3} distort={0.3} roughness={0.2} metalness={0.9} />
                </Sphere>
                <Sphere args={[0.4, 32, 32]} position={[-2, -3, 1]}>
                    <MeshDistortMaterial color="#fbbf24" speed={1.5} distort={0.5} roughness={0.1} metalness={1} />
                </Sphere>
                <Sphere args={[0.6, 32, 32]} position={[4, 3, -3]}>
                    <MeshDistortMaterial color="#6ee7b7" speed={2.5} distort={0.4} roughness={0.3} metalness={0.7} />
                </Sphere>
            </Float>

            {/* Image Placeholder (Center Bottom) */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh position={[0, -1.0, 0]}>
                    <planeGeometry args={[3, 2]} />
                    <meshStandardMaterial color="#333" roughness={0.8} />
                    {/* This would be an Image texture ideally */}
                    <Html transform occlude position={[0, 0, 0.01]} style={{ width: '300px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                            {/* Replace with your image */}
                            <img src="/assets/images/bunny_main.jpg" alt="Bunny" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = "(Add bunny_main.jpg to public/assets/images)" }} />
                        </div>
                    </Html>
                </mesh>
            </Float>

            {/* Next Button Overlay - Lifted Up and Forced Interactive */}
            <Html position={[0, -4.5, 0]} center style={{ pointerEvents: 'auto', zIndex: 10000 }}>
                <button
                    onClick={handleNext}
                    style={{
                        background: 'linear-gradient(90deg, #ff7eb3, #a5b4fc)',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(165, 180, 252, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'transform 0.2s',
                        fontFamily: "'Outfit', sans-serif",
                        pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Start Experience <ArrowRight size={20} />
                </button>
            </Html>
        </motion.group>
    )
}
