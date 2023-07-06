import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Cloud, Environment, OrbitControls, ScrollControls, TransformControls, useScroll } from "@react-three/drei";
import Ocean from "./components/Ocean";
import { Soulless } from "./components/Soulless";
import {BakeShadows } from "@react-three/drei";
import { UnrealBloomPass, RenderPass, EffectComposer } from "three-stdlib";
import { block } from 'million/react';
import Loader from "./components/Loader";
import Effects from "./components/Effects";

extend({ UnrealBloomPass, RenderPass, EffectComposer });


const OppApp = block (function App() {

  return (
    <Canvas camera={{ position: [0, 5, 140], fov: 55, near: 1, far: 20000 }} shadows gl={{ antialias: false }}>
      <Scene/>
    </Canvas>
  );
});

export default OppApp;


function Scene()  {

  // const options = useMemo(() => {
  //   return { position: [50, 50, -30], color: "red", intensity: 3 };
  // }, []);

  //used to edit lights
  // const light = useControls("light", options);
 

  


  return (
    <>
    <ambientLight intensity={1} />
    <spotLight position={[50, 50, -30]} castShadow />
    <pointLight position={[50, 50, -30]} color={'red'} intensity={3} />
    <pointLight position={[0, -5, 5]} intensity={0.5} />
    <directionalLight position={[0, -5, 0]} color='red' intensity={2} />
    {/*add enable zoom to */}
    <OrbitControls enableZoom={false} />
 
    <Suspense fallback={<Loader />}>
    <ScrollControls  pages={2}>
    <Model/>
      </ScrollControls>
    </Suspense>
    <Environment files={"/wasteland_clouds_puresky_2k.hdr"} background />
    </>
  )
}


function Model() {
  const scroll = useScroll()
  const [down, set] = useState(false)
  // const ref = useRef()

  // const mouse = useRef([0, 0])
  useFrame((state, delta) => {

    // console.log(scroll)
    const b = scroll.range(4/ 6, 1)
    // const offset = 1 - scroll.offset
    state.camera.position.set(0,  b * 60 + 5, 100 * -scroll.offset + 180)
    // state.camera.lookAt(0, 0, 0)
  })
  return (
    <>
      <Ocean />
      <Cloud  speed={1} opacity={1} position={[10, -2, -40]} scale={5} />
      <Cloud  speed={0.8} opacity={0.5} position={[30, 2, -65]} scale={5}   />
      <Cloud  speed={0.4} opacity={1}  position={[-40, 2, -60]} scale={5}/>
      <Cloud  speed={0.9} opacity={0.5} position={[50, -2, 98]} scale={5} />
      <Cloud  speed={0.5} opacity={0.75} position={[-35, 2, 101]} scale={5}/>
      <Soulless scale={[0.1, 0.1, 0.1]}  />
      <Effects/>
      <BakeShadows />
    </>
  )
}