import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./components/Scene";
import Ocean from './components/Ocean';
import { Soulless } from './components/Soulless';
import { useControls } from 'leva';


function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
  })
  return (
    <mesh ref={ref} scale={20}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

const Scene = () => {
  return (
    <>
      {/* <pointLight intensity={1} color={'blue'}/> */}
      <Model />
    </>
  );
};

const App = () => {

  const options = useMemo(() => {
    return { position: [50, 50, -30], color:"red", intensity: 3 }
  }, [])

  const light = useControls('light', options)
  return (
    <Canvas camera={{ position: [0, 5, 120], fov: 55, near: 1, far: 20000 }}>
     <ambientLight intensity={0.5} />
        <spotLight position={[50, 50, -30]} castShadow />
        <pointLight {...light} />
        <pointLight position={[0, -5, 5]} intensity={0.5} />
        <directionalLight position={[0, -5, 0]} color="red" intensity={2} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Ocean />
        <Soulless scale={[0.1,0.1,0.1]}/>
        {/* <Box /> */}
      </Suspense>
      <Environment files={'/wasteland_clouds_puresky_2k.hdr'} background/>
    </Canvas>
  );
};

export default App;
