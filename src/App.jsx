import * as THREE from 'three';
import { useRef, useState } from 'react'
import { Suspense } from 'react'
import { extend } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll, ScrollControls, SoftShadows } from "@react-three/drei"
import Wallet2 from './wallet2';
import Wallet3 from './wallet3';
import Wallet4 from './wallet4';
// import { EffectComposer, TiltShift2 } from "@react-three/postprocessing"

import './App.css'

import Wallet from './wallet'
import { Model } from './testing';
import Wallet5 from './wallet5';
import Wallet6 from './wallet6';
import DL_Card from './dl_card';

function App() {

  return (
    <Canvas camera={{ position: [15, 10, 10], fov: 50 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
      <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
        {/* <Wallet /> */}
        {/* <Model position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} /> */}
        {/* <Wallet2 /> */}
        {/* <Wallet4 /> */}
        <Wallet6 />
        <DL_Card />
      </ScrollControls>            
    </Canvas>
  )
}

export default App
