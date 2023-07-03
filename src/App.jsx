import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Cloud, Environment, OrbitControls } from "@react-three/drei";
import Ocean from "./components/Ocean";
import { Soulless } from "./components/Soulless";
import { useControls } from "leva";
import {BakeShadows } from "@react-three/drei";
import { UnrealBloomPass, RenderPass, EffectComposer } from "three-stdlib";

import Loader from "./components/Loader";
import Effects from "./components/Effects";

extend({ UnrealBloomPass, RenderPass, EffectComposer });

function Sphere({ geometry, x, y, z, s }) {
  const ref = useRef();
  useFrame(state => {
    ref.current.position.x = x + Math.sin((state.clock.getElapsedTime() * s) / 2);
    ref.current.position.y = y + Math.sin((state.clock.getElapsedTime() * s) / 2);
    ref.current.position.z = z + Math.sin((state.clock.getElapsedTime() * s) / 2);
  });
  return (
    <mesh ref={ref} position={[x, y, z]} scale={s}>
      <sphereGeometry />
      <meshStandardMaterial color={"gold"} />
    </mesh>
  );
}


const App = () => {
  const options = useMemo(() => {
    return { position: [50, 50, -30], color: "red", intensity: 3 };
  }, []);
  const light = useControls("light", options);
  const [down, set] = useState(false)

  const mouse = useRef([0, 0])
  const cloudPos1 = useControls("clouds1", {
    position: [10, -2, -40],
    scale: 5,
  });

  const cloudPos2 = useControls("clouds2", {
    position: [30, 2, -65],
    scale: 5,
  });

  const cloudPos3 = useControls("clouds3", {
    position: [-40, 2, -60],
    scale: 5,
  });

  const cloudPos4 = useControls("clouds4", {
    position: [50, -2, 98],
    scale: 5,
  });

  const cloudPos5 = useControls("clouds5", {
    position: [-35, 2, 101],
    scale: 5,
  });

  return (
    <Canvas camera={{ position: [0, 5, 120], fov: 55, near: 1, far: 20000 }} shadows gl={{ antialias: false }}>
      <ambientLight intensity={1} />
      <spotLight position={[50, 50, -30]} castShadow />
      <pointLight {...light} />
      <pointLight position={[0, -5, 5]} intensity={0.5} />
      <directionalLight position={[0, -5, 0]} color='red' intensity={2} />
      {/*add enable zoom to */}
      <OrbitControls />
      <Suspense fallback={<Loader />}>
        <Ocean />
        <Cloud  speed={1} opacity={1} {...cloudPos1} />
        <Cloud  speed={0.8} opacity={0.5} {...cloudPos2}   />
        <Cloud  speed={0.4} opacity={1}  {...cloudPos3}/>
        <Cloud  speed={0.9} opacity={0.5} {...cloudPos4} />
        <Cloud  speed={0.5} opacity={0.75}  {...cloudPos5}/>
        <Soulless scale={[0.1, 0.1, 0.1]} />
        <Effects/>
        <BakeShadows />
      </Suspense>
      <Environment files={"/wasteland_clouds_puresky_2k.hdr"} background />
    </Canvas>
  );
};

export default App;
