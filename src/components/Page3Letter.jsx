import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import { ArrowUp } from 'lucide-react'

function ParticleExplosion({ active, onComplete }) {
    // Create random points
    const count = 2000
    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            // Start clustered around text area [2.5, 1.5, 0]
            pos[i * 3] = (Math.random() - 0.5) * 5 + 2.5
            pos[i * 3 + 1] = (Math.random() - 0.5) * 2 + 1.5
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5
        }
        return pos
    })

    const pointsRef = useRef()

    useFrame((state, delta) => {
        if (active && pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array
            for (let i = 0; i < count; i++) {
                // Drifting stars motion - Up and slightly converging
                positions[i * 3 + 1] += delta * (0.5 + Math.random() * 1.5) // Gentle Up
                // positions[i*3] += (Math.random() - 0.5) * 0.01 // Minimal jitter
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true

            // Check if particles are high enough to trigger next page
            if (positions[1] > 15) {
                // simplistic check, just use timeout in parent
            }
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial transparent vertexColors={false} color="#fbbf24" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={active ? 1 : 0} />
        </points>
    )
}

export default function Page3Letter({ onNext }) {
    const [isExploding, setIsExploding] = useState(false)

    const handleNext = () => {
        setIsExploding(true)
        setTimeout(onNext, 2500) // Wait for particles to fly up
    }

    return (
        <group>
            {/* Letter Text */}
            <motion.group animate={isExploding ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
                    <Text
                        fontSize={0.25}
                        maxWidth={6}
                        lineHeight={1.4}
                        color="#e2e8f0"
                        position={[2.5, 1.5, 0]}
                        anchorX="left"
                        anchorY="top"
                        textAlign="left"
                    >
                        {`Dear Bunny,\n\nEven though miles separate us today,\nyou are always close to our hearts.\n\nWatching you grow and chase your dreams\nmakes me incredibly proud.\n\nKeep shining, brother.\nWe miss you.`}
                    </Text>
                </Float>

                {/* Photo Placeholder */}
                <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2} position={[-3, -1, 0]}>
                    <mesh>
                        <planeGeometry args={[3, 4]} />
                        <meshStandardMaterial color="#444" />
                        <Html transform position={[0, 0, 0.01]}>
                            <div style={{ width: '300px', height: '400px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', overflow: 'hidden' }}>
                                <img src="/assets/images/bunny_letter.jpg" alt="Brother" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = "(Add bunny_letter.jpg)" }} />
                            </div>
                        </Html>
                    </mesh>
                    {/* Simple Frame */}
                    <mesh position={[0, 0, -0.05]}>
                        <planeGeometry args={[3.2, 4.2]} />
                        <meshStandardMaterial color="#fbbf24" />
                    </mesh>
                </Float>
            </motion.group>

            {/* Particle Effect */}
            <ParticleExplosion active={isExploding} />

            <Html position={[2, -3.5, 0]} style={{ opacity: isExploding ? 0 : 1, transition: 'opacity 0.5s', pointerEvents: 'auto', zIndex: 1000 }}>
                <button
                    onClick={handleNext}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.3)',
                        padding: '12px 24px',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        pointerEvents: 'auto'
                    }}
                >
                    <ArrowUp size={24} />
                </button>
            </Html>
        </group>
    )
}
