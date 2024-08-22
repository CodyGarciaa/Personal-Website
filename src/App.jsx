import * as THREE from 'three';
import { useRef, useState } from 'react'
import { Suspense } from 'react'
import { extend } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll, ScrollControls, Float, Html } from "@react-three/drei"

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
import Scene from './Scene';

function App() {

  const [isOpened, setIsOpened] = useState(false);

  const handleWalletClick = () => {
    setIsOpened(!isOpened);
    console.log(isOpened);
  };

  return (
    <>
      <div
      style={{display: isOpened ? 'block' : 'none'}}
      onClick={handleWalletClick}
      >
        Click here to go back
      </div>
      <Scene handleWalletClick={handleWalletClick} isOpened={isOpened} />
    </>
  )
}

export default App
