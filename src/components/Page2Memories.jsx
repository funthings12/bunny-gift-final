import { useRef, useState } from 'react'
import { Text, Html, Float, Image } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { ArrowRight } from 'lucide-react'

// Placeholder image (using a public Unsplash source or a gradient)
const IMAGE_URL = "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=500&h=500&fit=crop"

const Frame = ({ position, rotation, delay, isLaunching, imageUrl }) => {
    // Variants for individual frame movement
    const variants = {
        floating: {
            y: position[1] + Math.sin(delay) * 0.1, // Reduced amplitude
            x: position[0],
            z: position[2],
            rotateZ: rotation[2] * 0.5, // Reduced rotation speed
            rotateY: rotation[1] * 0.5,
            transition: {
                y: { repeat: Infinity, repeatType: "mirror", duration: 8 + delay }, // Slower duration (was 6)
                rotateZ: { repeat: Infinity, repeatType: "mirror", duration: 12 + delay } // Slower duration (was 8)
            }
        },
        launch: {
            x: 0,
            y: 0, // Will stack based on provided props or simplified logic
            z: 0,
            rotateZ: 0,
            rotateY: 0,
            transition: { duration: 1.5, type: "spring", stiffness: 50 } // Assemble phase
        }
    }

    return (
        <motion.group
            position={position}
            rotation={rotation}
            variants={variants}
            initial="floating"
            animate={isLaunching ? "launch" : "floating"}
        >
            <mesh>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            <Image url={imageUrl || "/assets/images/bunny_mem1.jpg"} position={[0, 0, 0.06]} scale={[2.8, 1.8]} />
            {/* Frame Border Glow */}
            <mesh position={[0, 0, 0.05]}>
                <torusGeometry args={[1.6, 0.02, 16, 100]} />
                <meshBasicMaterial color="#a5b4fc" toneMapped={false} />
            </mesh>
        </motion.group>
    )
}

export default function Page2Memories({ onNext }) {
    const [isLaunching, setIsLaunching] = useState(false)
    const groupRef = useRef()

    const handleNext = () => {
        setIsLaunching(true)
        // FORCE transition after 3.0s (reduce wait time slightly for better UX)
        // Matches approximate visual exit time
        setTimeout(onNext, 3000)
    }

    // Rocket Group Animation
    // First, frames assemble (handled by child variants).
    // Then, the whole group launches up and to the right corner.
    // Rocket Group launch sequence
    const rocketVariants = {
        idle: { x: 0, y: 0, z: 0, rotateZ: 0 },
        launch: {
            x: 15,
            y: 15,
            z: -20, // Fly away into distance
            scale: 0.1,
            rotateZ: -Math.PI / 4, // 45 deg tilt
            transition: {
                delay: 2, // Wait for assembly (1.5s) + pause (0.5s)
                duration: 2.5,
                ease: "easeInOut"
            }
        }
    }

    return (
        <group>
            {/* Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5} position={[0, 3.5, 0]}>
                <Text
                    fontSize={1.2}
                    color="#fbbf24" // Amber/Gold for nostalgia
                    anchorX="center"
                    anchorY="middle"
                >
                    Our Memories
                </Text>
            </Float>

            <motion.group
                ref={groupRef}
                variants={rocketVariants}
                initial="idle"
                animate={isLaunching ? "launch" : "idle"}
                onAnimationComplete={() => {
                    // Optional cleanup
                }}
            >
                {/* 3 Floating Frames - Smoother Slower Motion */}
                {/* Slowed speed from 0.8 to 0.4 */}
                <Float speed={isLaunching ? 0 : 0.4} rotationIntensity={isLaunching ? 0 : 0.2} floatIntensity={isLaunching ? 0 : 0.3}>
                    {/* Top Frame (Nose) */}
                    <Frame
                        position={isLaunching ? [0, 2.2, 0] : [-2.5, 0.5, 0]}
                        rotation={[0, 0.2, 0.1]}
                        delay={0}
                        isLaunching={isLaunching}
                        imageUrl="/assets/images/bunny_mem1.jpg"
                    />
                    {/* Middle Frame (Body) */}
                    <Frame
                        position={isLaunching ? [0, 0, 0] : [0, -0.5, 1]}
                        rotation={[0, -0.1, -0.05]}
                        delay={1}
                        isLaunching={isLaunching}
                        imageUrl="/assets/images/bunny_mem2.jpg"
                    />
                    {/* Bottom Frame (Tail) */}
                    <Frame
                        position={isLaunching ? [0, -2.2, 0] : [2.5, 0.8, -0.5]}
                        rotation={[0, 0.1, 0.05]}
                        delay={0.5}
                        isLaunching={isLaunching}
                        imageUrl="/assets/images/bunny_mem3.jpg"
                    />
                </Float>

                {/* Simulating Rocket Parts via conditional rendering or just morphing the frames?
             Let's just group them tight.
         */}
            </motion.group>

            {/* Button */}
            <Html position={[0, -3.8, 0]} center style={{ opacity: isLaunching ? 0 : 1, transition: 'opacity 0.5s', pointerEvents: 'auto', zIndex: 1000 }}>
                <button
                    onClick={handleNext}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '12px 32px',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: "'Outfit', sans-serif",
                        pointerEvents: 'auto'
                    }}
                >
                    Relive Journey <ArrowRight size={16} />
                </button>
            </Html>
        </group>
    )
}
