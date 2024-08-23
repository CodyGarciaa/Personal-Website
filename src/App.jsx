import { useRef, useState } from 'react'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from "@react-three/fiber"

import './App.css'
import Scene from './Scene';
import CameraController from './CameraController';

function App() {
  const [frameData, setFrameData] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [DLClicked, setDLClicked] = useState(false);

  const handleWalletClick = () => {
    setIsOpened(!isOpened);
    console.log(isOpened);
  };

  const handleDLClick = () => {
    setDLClicked(!DLClicked);
    console.log('dl click working')
  }

  return (
    <>
      <div
      style={{display: (isOpened || DLClicked) ? 'block' : 'none'}}
      >
        <div onClick={handleWalletClick}>
          Click here to go back (sleeve)
        </div>
        <div onClick={handleDLClick}>
          Click here to go back (dl)
        </div>
      </div>
      <Canvas camera={{ position: [15, 10, 10], fov: 50 }}>
        {/* <OrbitControls /> */}
        <CameraController frameData={frameData} DLClicked={DLClicked} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
        <Scene handleWalletClick={handleWalletClick} handleDLClick={handleDLClick} isOpened={isOpened} DLClicked={DLClicked} setFrameData={setFrameData}/>
      </Canvas>
    </>
  )
}

export default App