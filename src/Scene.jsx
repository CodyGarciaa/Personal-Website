

import { useFrame } from "@react-three/fiber"
import { Scroll, ScrollControls } from "@react-three/drei"

import './css/App.css'
import './css/Card.css'
import Wallet from './meshes/Wallet';
import DL_Card from './meshes/DL_Card';
import Business_Card from './meshes/Business_Card';
import Project1_Card from './meshes/Project1_Card';
import Project2_Card from './meshes/Project2_Card';
import Project3_Card from './meshes/Project3_Card';
import Project4_Card from './meshes/Project4_Card';
import Project5_Card from './meshes/Project5_Card';
import Project6_Card from './meshes/Project6_Card';

export default function Scene( {
    handleWalletClick, 
    handleDLClick, 
    handleProj1Clicked,
    handleProj2Clicked,
    handleProj3Clicked,
    handleProj4Clicked,
    handleProj5Clicked,
    handleProj6Clicked,
    setFrameData,
    isOpened,
    DLClicked,
    proj1Clicked,
    proj2Clicked,
    proj3Clicked,
    proj4Clicked,
    proj5Clicked,
    proj6Clicked
} ) {

  
          
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
      <ScrollControls pages={3} damping={0.25}>
        {/* <Overlay /> */}
        <group>
          <mesh position={[18.8, -26.2, -1]}>
              <sphereGeometry />
              <meshStandardMaterial color="hotpink" />
          </mesh>
          <Wallet onWalletClick={handleWalletClick} isOpened={isOpened} />
          <DL_Card onDLClick={handleDLClick} DLClicked={DLClicked} />
          <Business_Card />
          <Project1_Card isOpened={isOpened} onProj1Clicked={handleProj1Clicked} Proj1Clicked={proj1Clicked} />
          <Project2_Card isOpened={isOpened} onProj2Clicked={handleProj2Clicked} Proj2Clicked={proj2Clicked} />
          <Project3_Card isOpened={isOpened} onProj3Clicked={handleProj3Clicked} Proj3Clicked={proj3Clicked} />
          <Project4_Card isOpened={isOpened} onProj4Clicked={handleProj4Clicked} Proj4Clicked={proj4Clicked} />
          <Project5_Card isOpened={isOpened} onProj5Clicked={handleProj5Clicked} Proj5Clicked={proj5Clicked} />
          <Project6_Card isOpened={isOpened} onProj6Clicked={handleProj6Clicked} Proj6Clicked={proj6Clicked} />
        </group>
      </ScrollControls>
    </>
  )
}
