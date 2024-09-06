import { useRef, useState } from 'react'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { Depth, LayerMaterial, Noise } from "lamina";

import './css/App.css'
import Scene from './Scene';
import CameraController from './CameraController';

function App() {
  const [frameData, setFrameData] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [DLClicked, setDLClicked] = useState(false);
  const [proj1Clicked, setProj1Clicked] = useState(false);
  const [proj2Clicked, setProj2Clicked] = useState(false);
  const [proj3Clicked, setProj3Clicked] = useState(false);
  const [proj4Clicked, setProj4Clicked] = useState(false);
  const [proj5Clicked, setProj5Clicked] = useState(false);
  const [proj6Clicked, setProj6Clicked] = useState(false);

  const BG_SPEED = 0.3;

  const Background = () => {
    const ref = useRef();
  
    useFrame((_state, delta) => {
      ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        delta * BG_SPEED;
    });
  
    return (
      <mesh scale={100} ref={ref}>
        <sphereGeometry args={[1, 15, 15]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth
            colorA="#f21a62"
            colorB="#0081fc"
            alpha={1}
            mode="normal"
            near={130}
            far={200}
            origin={[100, 100, -100]}
          />
          <Noise
            mapping="local"
            type="white"
            scale={100}
            colorA="white"
            colorB="black"
            mode="subtract"
            alpha={0.32}
          />
        </LayerMaterial>
      </mesh>
    );
  };

  const handleWalletClick = () => {
    setIsOpened(!isOpened);
    console.log(isOpened);
  };

  const handleDLClick = () => {
    setDLClicked(!DLClicked);
    console.log('dl click working')
  }

  const handleProj1Clicked = () => {
    setProj1Clicked(!proj1Clicked);
    console.log('proj1: ', proj1Clicked)
  }
  const handleProj2Clicked = () => {
    setProj2Clicked(!proj2Clicked);
    console.log('proj2 click working')
  }
  const handleProj3Clicked = () => {
    setProj3Clicked(!proj3Clicked);
    console.log('proj3 click working')
  }
  const handleProj4Clicked = () => {
    setProj4Clicked(!proj4Clicked);
    console.log('proj4 click working')
  }
  const handleProj5Clicked = () => {
    setProj5Clicked(!proj5Clicked);
    console.log('proj5 click working')
  }
  const handleProj6Clicked = () => {
    setProj6Clicked(!proj6Clicked);
    console.log('proj6 click working')
  }

  return (
    <>
      {/* <div
        style={{
          display: isOpened ? 'block' : 'none',
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 'auto',
          cursor: 'pointer',
        }}
        className='arrow-left'
        onClick={handleWalletClick}
      >
        ⬅
      </div> */}
      <Canvas camera={{ position: [15, 10, 10], fov: 50 }}>
        <CameraController 
          frameData={frameData} 
          DLClicked={DLClicked} 
          isOpened={isOpened}
          proj1Clicked={proj1Clicked}
          proj2Clicked={proj2Clicked}
          proj3Clicked={proj3Clicked}
          proj4Clicked={proj4Clicked}
          proj5Clicked={proj5Clicked}
          proj6Clicked={proj6Clicked}
        />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
        <Scene 
          handleWalletClick={handleWalletClick} 
          handleDLClick={handleDLClick} 
          handleProj1Clicked={handleProj1Clicked}
          handleProj2Clicked={handleProj2Clicked}
          handleProj3Clicked={handleProj3Clicked}
          handleProj4Clicked={handleProj4Clicked}
          handleProj5Clicked={handleProj5Clicked}
          handleProj6Clicked={handleProj6Clicked}
          isOpened={isOpened} 
          DLClicked={DLClicked} 
          proj1Clicked={proj1Clicked}
          proj2Clicked={proj2Clicked}
          proj3Clicked={proj3Clicked}
          proj4Clicked={proj4Clicked}
          proj5Clicked={proj5Clicked}
          proj6Clicked={proj6Clicked}
          setFrameData={setFrameData}
        />
        {/* <Background />   */}
      </Canvas>
      {/* <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontSize: '20px',
          zIndex: 1, // Ensure it appears above the canvas
        }}
      >
        Your Overlay Text
      </div> */}
    </>
  )
}

export default App