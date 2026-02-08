import { useRef, useState } from 'react'
import { Text, Html, Sparkles, Float, Line } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { RefreshCw } from 'lucide-react'

// Simple Constellation Lines
function Constellation() {
    // Aquarius Constellation Coordinates (Approximate 3D representation)
    const points = [
        [-1.5, 2.5, 0],   // 1
        [-0.5, 2.8, -0.5],// 2
        [1.0, 2.5, 0],    // 3
        [0.5, 1.5, 0.5],  // 4
        [-0.5, 0.5, 0],   // 5
        [0.0, -0.5, -0.5],// 6
        [1.5, -1.0, 0],   // 7
        [0.5, -2.0, 0.5], // 8
        [-1.0, -2.5, 0],  // 9
        [-2.0, -1.5, -0.5]// 10
    ]

    // Create lines connecting them
    return (
        <group>
            <Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.2}>
                {points.map((p, i) => (
                    <mesh key={i} position={p}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color="#fbbf24" />
                    </mesh>
                ))}
            </Float>
            {/* Lines */}
            <Line points={points} color="rgba(255,255,255,0.2)" transparent opacity={0.5} lineWidth={1} />
        </group>
    )
}

export default function Page4Closure() {
    const [replaying, setReplaying] = useState(false)

    // Replay animation variant
    const variants = {
        initial: { opacity: 0, scale: 0.8 },
        enter: { opacity: 1, scale: 1, transition: { duration: 2, ease: "easeOut" } },
        exit: { opacity: 0, scale: 50, transition: { duration: 1.5, ease: "easeInOut" } } // Zoom IN/OUT effect
    }

    const handleReplay = () => {
        setReplaying(true)
        setTimeout(() => window.location.reload(), 1500) // Wait for exit animation
    }

    return (
        <motion.group
            initial="initial"
            animate={replaying ? "exit" : "enter"}
            variants={variants}
        >
            {/* Background Dawn Gradient Sphere */}
            <mesh scale={[100, 100, 100]} position={[0, 0, -50]}>
                <sphereGeometry />
                <meshBasicMaterial color="#1e1b4b" side={2} /> {/* Dark blue backdrop */}
            </mesh>

            {/* Stars/Sparkles */}
            <Sparkles count={500} scale={12} size={2} speed={0.4} opacity={0.5} color="#e0e7ff" />

            {/* Constellation */}
            <Constellation />

            {/* Text */}
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    fontSize={0.6}
                    color="#a5b4fc"
                    position={[0, 1, 0]}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={8}
                    textAlign="center"
                >
                    Distance can't shrink love.
                </Text>
                <Text
                    fontSize={0.4}
                    color="#cbd5e1"
                    position={[0, 0, 0]}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={6}
                    textAlign="center"
                >
                    No matter where you are,{"\n"}we’re always connected.
                </Text>

                <Text
                    fontSize={0.8}
                    color="#fbbf24"
                    position={[0, -1.5, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    Happy Birthday!
                </Text>
            </Float>

            {/* Closure / Replay */}
            <Html position={[0, -3.5, 0]} center>
                <button
                    onClick={handleReplay}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: "'Outfit', sans-serif",
                        opacity: replaying ? 0 : 1,
                        transition: 'opacity 0.5s'
                    }}
                >
                    <RefreshCw size={16} /> Replay
                </button>
            </Html>
        </motion.group>
    )
}
