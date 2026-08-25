import { Float, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

function MapIslands() {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={group} rotation={[-0.3, 0.2, 0]}>
      {[
        [-1.35, 0.1, '#f6bd3a'],
        [0, 0.25, '#5faa48'],
        [1.35, 0.1, '#4b5ec9'],
      ].map(([x, y, color]) => (
        <Float key={String(x)} speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
          <mesh position={[Number(x), Number(y), 0]}>
            <icosahedronGeometry args={[0.64, 1]} />
            <meshStandardMaterial color={String(color)} roughness={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function AdventureScene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 48 }} gl={{ antialias: true }}>
        <color attach="background" args={['#123a57']} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 4, 4]} intensity={2.5} />
        <Stars radius={40} depth={18} count={450} factor={2.5} saturation={0.5} fade speed={0.8} />
        <MapIslands />
      </Canvas>
    </div>
  )
}
