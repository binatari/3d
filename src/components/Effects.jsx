import * as THREE from 'three'
import { useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Effects as EffectBloom } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { useControls } from 'leva'

extend({ UnrealBloomPass})



export default function Effects() {
  const { intensity, radius } = useControls({
    intensity: { value: 1.2, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0, min: 0, max: 1, step: 0.01 }
  })
  return (
    <>
      <ambientLight />
      <EffectBloom disableGamma>
        {/* threshhold has to be 1, so nothing at all gets bloom by default */}
        <unrealBloomPass threshold={1} strength={intensity} radius={radius} />
      </EffectBloom>
      <Shape color="blue" position={[-30, 0, 50]} >
      <sphereGeometry />
      </Shape>
      <Shape color="red" position={[-40, 0, 70]} >
      <sphereGeometry />
      </Shape>
      <Shape color="hotpink" position={[-10, 0, 50]} >
      <sphereGeometry />
      </Shape>
      <Shape color="orange" position={[30, 0, 30]} rotation={[0, 0, Math.PI / 2]}>
      <sphereGeometry />
      </Shape>
      <Shape color="skyblue" position={[20, 0, 70]} >
      <sphereGeometry />
      </Shape>
      <Shape color="blue" position={[-20, 0, 100]} >
      <sphereGeometry />
      </Shape>
      <Shape color="red" position={[40, 0, 600]} >
      <sphereGeometry />
      </Shape>
      <Shape color="hotpink" position={[-10, 0, 120]} >
      <sphereGeometry />
      </Shape>
      <Shape color="orange" position={[70, 0, 30]} rotation={[0, 0, Math.PI / 2]}>
      <sphereGeometry />
      </Shape>
      <Shape color="skyblue" position={[50, 0, 45]} >
      <sphereGeometry />
      </Shape>
      <Shape color="hotpink" position={[10, 0, 120]} >
      <sphereGeometry />
      </Shape>
      <Shape color="skyblue" position={[70, 0, 35]} >
      <sphereGeometry />
      </Shape>
      <Shape color="green" position={[40, 0, -10]} >
      <sphereGeometry />
      </Shape>
    </>
  )
}

function Shape({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)} scale={0.3}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2 : 0} toneMapped={false} />
    </mesh>
  )
}
