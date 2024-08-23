

import { useFrame } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"

import './css/App.css'
import Wallet from './meshes/Wallet';
import DL_Card from './meshes/DL_Card';
import Business_Card from './meshes/Business_Card';
import Project1_Card from './meshes/Project1_Card';
import Project2_Card from './meshes/Project2_Card';
import Project3_Card from './meshes/Project3_Card';
import Project4_Card from './meshes/Project4_Card';
import Project5_Card from './meshes/Project5_Card';
import Project6_Card from './meshes/Project6_Card';

export default function Scene( {handleWalletClick, handleDLClick, setFrameData, isOpened, DLClicked} ) {
          
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
            {/* <mesh position={[-3, 17.6, 9.8]}>
                <sphereGeometry />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            <Wallet onWalletClick={handleWalletClick} isOpened={isOpened} />
            <DL_Card onDLClick={handleDLClick} DLClicked={DLClicked} />
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
