import { useRef, useState } from 'react'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from "@react-three/fiber"

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
      </Canvas>
    </>
  )
}

export default App