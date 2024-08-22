

export default function CameraController() {
    return({

    });
}

// import { useEffect, useRef, useState } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { CameraControls } from "@react-three/drei";

// export default function CameraHandler({frameData}) {
// //   const viewport = useThree(frameData['state'] => frameData['state'].viewport);
//   const cameraControls = useRef();
//   const [openingDone, setOpeningDone] = useState(false);
//   const cameraLimits = {
//     xMin: -50, // left boundary
//     xMax: 190,  // right boundary
//     yMin: -40, // bottom boundary
//     yMax: 75,  // top boundary
//   };

//   // Lerp function to interpolate between two values
//   const lerp = (start, end, t) => start + (end - start) * t;

//   const moveToSlide = () => {
//     let pos1 = new THREE.Vector3(10, 12, 12);
//     let pos2 = new THREE.Vector3(20, 35, 35);
//     let endPos = new THREE.Vector3(15, 15, 30);

//     let targetLookAt = new THREE.Vector3(-7.7, 3, 0.3);

//     let currentTime = 0;
//     const duration1 = 0.55; // Duration from pos1 to pos2 in seconds
//     const duration2 = 0.05; // Duration from pos2 to end in seconds

//     function animatePhase1() {
//       currentTime += 0.01; // Time step
//       const t = Math.min(currentTime / duration1, 1); // Normalize time to [0, 1]

//       // Interpolating the position between pos1 and pos2
//       const x = lerp(pos1.x, pos2.x, t);
//       const y = lerp(pos1.y, pos2.y, t);
//       const z = lerp(pos1.z, pos2.z, t);

//       // Interpolating the look-at target
//       const lookAtX = lerp(cameraControls.current.getTarget().x, targetLookAt.x, t);
//       const lookAtY = lerp(cameraControls.current.getTarget().y, targetLookAt.y, t);
//       const lookAtZ = lerp(cameraControls.current.getTarget().z, targetLookAt.z, t);

//       cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

//       if (t < 1) {
//         requestAnimationFrame(animatePhase1); // Continue phase 1
//       } else {
//         // Start phase 2 after phase 1 is complete
//         currentTime = 0;
//         requestAnimationFrame(animatePhase2);
//       }
//     }

//     function animatePhase2() {
//       currentTime += 0.01; // Time step
//       const t = Math.min(currentTime / duration2, 1); // Normalize time to [0, 1]

//       // Interpolating the position between pos2 and endPos
//       const x = lerp(pos2.x, endPos.x, t);
//       const y = lerp(pos2.y, endPos.y, t);
//       const z = lerp(pos2.z, endPos.z, t);

//       // Interpolating the look-at target (can remain the same if needed)
//       const lookAtX = lerp(cameraControls.current.getTarget().x, targetLookAt.x, t);
//       const lookAtY = lerp(cameraControls.current.getTarget().y, targetLookAt.y, t);
//       const lookAtZ = lerp(cameraControls.current.getTarget().z, targetLookAt.z, t);

//       cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

//       if (t < 1) {
//         requestAnimationFrame(animatePhase2); // Continue phase 2
//       } else {
//         setOpeningDone(true);
//       }
//     }

//     // Start the first phase of the animation
//     animatePhase1();
//   };

//   useEffect(() => {
//     moveToSlide();
//   }, []);

//   useFrame(() => {
//     if (frameData && openingDone) {
//         // state.camera.position.lerp({ x: clampedX, y: clampedY, z: 1000 }, 0.1);
        
//         // v.copy({ x: frameData['pointer'].x, y: frameData['pointer'].y, z: 10 });
//         // v.unproject(frameData['camera']);
//         const targetX = -frameData['pointer'].x * 400;
//         const targetY = -frameData['pointer'].y * 200;
//         // console.log('x: ', targetX)
//         // console.log('y: ', targetY)
//         const clampedX = THREE.MathUtils.clamp(targetX, cameraLimits.xMin, cameraLimits.xMax);
//         const clampedY = THREE.MathUtils.clamp(targetY, cameraLimits.yMin, cameraLimits.yMax);

//         // frameData['camera'].zoom = THREE.MathUtils.lerp(frameData['camera'].zoom, 0.9, 0.025);
//         // frameData["camera"].position.lerp({ x: -frameData['pointer'].x * 400, y: -frameData['pointer'].y * 200, z: 0 }, 0.1);
//         frameData['camera'].position.lerp({ x: clampedX, y: clampedY, z: 0 }, 0.1);
//         frameData['camera'].lookAt(-7.7, 3, 0.3);
//         frameData['camera'].updateProjectionMatrix();
//     }
//   })

//   return <CameraControls ref={cameraControls} />;
// }





// // import { CameraControls } from "@react-three/drei";
// // import { useThree } from "@react-three/fiber";
// // import { useEffect, useRef, useState } from "react";


// // export default function CameraHandler({ slideDistance }) {
// //     const viewport = useThree((state) => state.viewport);
// //     const cameraControls = useRef();
// //     const [moveTime, setMoveTime] = useState(0.25);
  
// //     const moveToSlide = async () => {
// //       setMoveTime(0.7)
// //       await cameraControls.current.setLookAt(
// //         20,
// //         35,
// //         35,
// //         -7.7,
// //         3,
// //         0.3,
// //         true
// //       );
// //       console.log('moved')

// //       setMoveTime(0.05)
// //       await cameraControls.current.setLookAt(
// //         13,
// //         10,
// //         27,
// //         -7.7,
// //         3,
// //         0.3,
// //         true
// //       );
// //     }; 
  
// //     useEffect(() => {
// //       console.log('doing')
// //       moveToSlide();
// //     }, []);
// //     return (
// //       <CameraControls
// //         smoothTime={moveTime}
// //         ref={cameraControls}
// //         touches={{
// //           one: 0,
// //           two: 0,
// //           three: 0,
// //         }}
// //         mouseButtons={{
// //           left: 0,
// //           middle: 0,
// //           right: 0,
// //         }}
// //       />
// //     );
// //   };


//--------------------------------------------------------------------------------------------------------------------------------

// import * as THREE from 'three';
// import { useEffect, useRef, useState } from 'react'
// import { Suspense } from 'react'
// import { extend } from '@react-three/fiber'
// import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { Canvas, useFrame } from "@react-three/fiber"
// import { useGLTF, useAnimations, useScroll, ScrollControls, Float, Html } from "@react-three/drei"

// import './App.css'

// import Wallet from './wallet';
// import DL_Card from './dl_card';
// import Business_Card from './Business_Card';
// import Project1_Card from './Project1_Card';
// import Project2_Card from './Project2_Card';
// import Project3_Card from './Project3_Card';
// import Project4_Card from './Project4_Card';
// import Project5_Card from './Project5_Card';
// import Project6_Card from './Project6_Card';
// import CameraHandler from './CameraHandler';

// export default function Scene({setFrameData}) {
//   const v = new THREE.Vector3()
//   const [isOpened, setIsOpened] = useState(false);

//   const handleWalletClick = () => {
//     setIsOpened(!isOpened);
//     console.log(isOpened);
//   };
  
// //   useFrame((state) => {
// //     const currentFrameData = {
// //       state: state,
// //       camera: state.camera,
// //       pointer: state.pointer,
// //       test: 'passing',
// //     };

// //     // Passing frame data back to App
// //     setFrameData(currentFrameData);
// //   });

//   return (
//     <group>
//     <mesh position={[, 3, 0.3]}>
//         <meshBasicMaterial color={'white'} />
//         <boxGeometry />
//     </mesh>
//     <Wallet onWalletClick={handleWalletClick} isOpened={isOpened} />
//     <DL_Card />
//     <Business_Card />
//     <Project1_Card isOpened={isOpened} />
//     <Project2_Card isOpened={isOpened} />
//     <Project3_Card isOpened={isOpened} />
//     <Project4_Card isOpened={isOpened} />
//     <Project5_Card isOpened={isOpened} />
//     <Project6_Card isOpened={isOpened} />
//     </group>
//   )
// }



//--------------------------------------------------------------------------------------------------------------------------------



// import { OrbitControls } from '@react-three/drei'
// import { Canvas } from "@react-three/fiber"

// import './App.css'
// import Wallet from './wallet';
// import DL_Card from './dl_card';
// import Business_Card from './Business_Card';
// import Project1_Card from './Project1_Card';
// import Project2_Card from './Project2_Card';
// import Project3_Card from './Project3_Card';
// import Project4_Card from './Project4_Card';
// import Project5_Card from './Project5_Card';
// import Project6_Card from './Project6_Card';
// // import CameraHandler from './CameraHandler';
// // import Scene from './Scene';
// import { useState } from 'react';

// function App() {
//   // const [frameData, setFrameData] = useState();
//   const [isOpened, setIsOpened] = useState(false);

//   const handleWalletClick = () => {
//     setIsOpened(!isOpened);
//     console.log(isOpened);
//   };

//   return (
//     <Canvas camera={{ position: [10, 12, 12], fov: 50 }}>
//       <OrbitControls />
//       <ambientLight intensity={0.5} />
//       <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
//       {/* <CameraHandler frameData={frameData} /> */}
//       {/* <Scene setFrameData={setFrameData} /> */}
//       <group>
//         {/* <mesh position={[0, 3, 0.3]}>
//             <meshBasicMaterial color={'white'} />
//             <boxGeometry />
//         </mesh> */}
//         <Wallet onWalletClick={handleWalletClick} isOpened={isOpened} />
//         <DL_Card />
//         <Business_Card />
//         <Project1_Card isOpened={isOpened} />
//         <Project2_Card isOpened={isOpened} />
//         <Project3_Card isOpened={isOpened} />
//         <Project4_Card isOpened={isOpened} />
//         <Project5_Card isOpened={isOpened} />
//         <Project6_Card isOpened={isOpened} />
//       </group>
//     </Canvas>
//   )
// }

// export default App
