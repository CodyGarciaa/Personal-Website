

import { useFrame } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"

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
import CameraController from './CameraController';

export default function Scene( {handleWalletClick, setFrameData, isOpened} ) {
          
  useFrame((state) => {
    const currentFrameData = {
    state: state,
    camera: state.camera,
    pointer: state.pointer,
    test: 'passing',
    };

    setFrameData(currentFrameData);
  });

  return (
    <>
      <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
          <group>
            <Wallet onWalletClick={handleWalletClick} isOpened={isOpened} />
            <DL_Card />
            <Business_Card />
            <Project1_Card isOpened={isOpened} />
            <Project2_Card isOpened={isOpened} />
            <Project3_Card isOpened={isOpened} />
            <Project4_Card isOpened={isOpened} />
            <Project5_Card isOpened={isOpened} />
            <Project6_Card isOpened={isOpened} />
          </group>
        </ScrollControls>  
    </>
  )
}
