import * as THREE from 'three';
import { useRef, useState } from 'react'
import { Suspense } from 'react'
import { extend } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll, ScrollControls, SoftShadows } from "@react-three/drei"

import './App.css'

import Wallet from './wallet';
import DL_Card from './dl_card';
import Business_Card from './Business_Card';
import Project1_Card from './Project1_Card';
import Project2_Card from './Project2_Card';
import Project3_Card from './Project3_Card';
import Project4_Card from './Project4_Card';
import Project5_Card from './Project5_Card';
import Project6_Card from './Project6_Card';

function App() {

  return (
    <Canvas camera={{ position: [15, 10, 10], fov: 50 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
      <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
        <Wallet />
        <DL_Card />
        <Business_Card />
        <Project1_Card />
        <Project2_Card />
        <Project3_Card />
        <Project4_Card />
        <Project5_Card />
        <Project6_Card />
      </ScrollControls>            
    </Canvas>
  )
}

export default App
