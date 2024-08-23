import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

export default function CameraController({ frameData, DLClicked }) {
  
  const [currentView, setCurrentView] = useState('main');
  const [currentTargetPos, setCurrentTargetPos] = useState({
    x: -7.7,
    y: 3,
    z: 0.3
  })
  const [viewChangeInProgress, setViewChangeInProgress] = useState(false);
  const cameraControls = useRef();
  const [openingDone, setOpeningDone] = useState(false);

  const lerp = (start, end, t) => start + (end - start) * t;

  const introCamera = () => {
    let pos1 = new THREE.Vector3(10, 12, 12);
    let pos2 = new THREE.Vector3(20, 35, 35);
    let endPos = new THREE.Vector3(15, 15, 30);

    let targetLookAt = new THREE.Vector3(-7.7, 3, 0.3);

    let currentTime = 0;
    const duration1 = 1;
    const duration2 = 0.3;

    function animatePhase1() {
      currentTime += 0.01;
      const t = Math.min(currentTime / duration1, 1);

      const x = lerp(pos1.x, pos2.x, t);
      const y = lerp(pos1.y, pos2.y, t);
      const z = lerp(pos1.z, pos2.z, t);

      const lookAtX = lerp(cameraControls.current.getTarget().x, targetLookAt.x, t);
      const lookAtY = lerp(cameraControls.current.getTarget().y, targetLookAt.y, t);
      const lookAtZ = lerp(cameraControls.current.getTarget().z, targetLookAt.z, t);

      cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

      if (t < 1) {
        requestAnimationFrame(animatePhase1);
      } else {
        currentTime = 0;
        requestAnimationFrame(animatePhase2);
      }
    }

    function animatePhase2() {
      currentTime += 0.01;
      const t = Math.min(currentTime / duration2, 1);

      const x = lerp(pos2.x, endPos.x, t);
      const y = lerp(pos2.y, endPos.y, t);
      const z = lerp(pos2.z, endPos.z, t);

      const lookAtX = lerp(cameraControls.current.getTarget().x, targetLookAt.x, t);
      const lookAtY = lerp(cameraControls.current.getTarget().y, targetLookAt.y, t);
      const lookAtZ = lerp(cameraControls.current.getTarget().z, targetLookAt.z, t);

      cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

      if (t < 1) {
        requestAnimationFrame(animatePhase2);
      } else {
        setOpeningDone(true);
      }
    }

    animatePhase1();
  };

  useEffect(() => {
    introCamera();
  }, []);

  useFrame(() => {
    if (frameData && openingDone && !viewChangeInProgress) {
      const xPos = frameData['pointer'].x;

      switch(currentView) {
        case 'main':
            if (xPos < -0.3 || xPos > 0.4) {
                setViewChangeInProgress(true);
        
                const newView = xPos < -0.3 ? 'left' : 'right';
                const newTarget = xPos < -0.3 ? new THREE.Vector3(-10, 3, 8) : new THREE.Vector3(-1, 3, 0);
                const newCameraPos = xPos < -0.3 ? new THREE.Vector3(5, 7, 12) : new THREE.Vector3(-2, 7, 15);
        
                const animateViewChange = () => {
                  let currentTime = 0;
                  const duration = 1.0; // Adjust duration for smoother transition
        
                  function animate() {
                    currentTime += 0.01;
                    const t = Math.min(currentTime / duration, 1);
        
                    const x = lerp(cameraControls.current.getPosition().x, newCameraPos.x, t);
                    const y = lerp(cameraControls.current.getPosition().y, newCameraPos.y, t);
                    const z = lerp(cameraControls.current.getPosition().z, newCameraPos.z, t);
        
                    const lookAtX = lerp(cameraControls.current.getTarget().x, newTarget.x, t);
                    const lookAtY = lerp(cameraControls.current.getTarget().y, newTarget.y, t);
                    const lookAtZ = lerp(cameraControls.current.getTarget().z, newTarget.z, t);
        
                    cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);
        
                    if (t < 1) {
                      requestAnimationFrame(animate);
                    } else {
                      console.log('changed');
                      setCurrentView(newView);
                      setCurrentTargetPos({x: newTarget.x, y: newTarget.y, z: newTarget.z})
                      setViewChangeInProgress(false);
                    }
                  }
        
                  animate();
                };
        
                animateViewChange();
              } else {
                const targetX = -frameData['pointer'].x * 400;
                const targetY = -frameData['pointer'].y * 200;

                frameData['camera'].position.lerp({ x: targetX, y: targetY, z: 0 }, 0.1);
                frameData['camera'].lookAt(currentTargetPos.x, currentTargetPos.y, currentTargetPos.z);
                frameData['camera'].updateProjectionMatrix();
              }
              break;

        case 'left':
            if (DLClicked || xPos > 0.1) {
                setViewChangeInProgress(true);
        
                const newView = DLClicked ? 'dl card' : 'main';
                // const newTarget = DLClicked ? new THREE.Vector3(-10, 18, 8) : new THREE.Vector3(-7.7, 3, 0.3);
                const newTarget = DLClicked ? new THREE.Vector3(-9, 17.6, 8) : new THREE.Vector3(-7.7, 3, 0.3);
                // const newCameraPos = DLClicked ? new THREE.Vector3(5, 22, 12): new THREE.Vector3(15, 15, 30);
                const newCameraPos = DLClicked ? new THREE.Vector3(-3, 17.6, 9.8): new THREE.Vector3(15, 15, 30);
        
                const animateViewChange = () => {
                  let currentTime = 0;
                  const duration = 1.0; // Adjust duration for smoother transition
        
                  function animate() {
                    currentTime += 0.01;
                    const t = Math.min(currentTime / duration, 1);
        
                    const x = lerp(cameraControls.current.getPosition().x, newCameraPos.x, t);
                    const y = lerp(cameraControls.current.getPosition().y, newCameraPos.y, t);
                    const z = lerp(cameraControls.current.getPosition().z, newCameraPos.z, t);
        
                    const lookAtX = lerp(cameraControls.current.getTarget().x, newTarget.x, t);
                    const lookAtY = lerp(cameraControls.current.getTarget().y, newTarget.y, t);
                    const lookAtZ = lerp(cameraControls.current.getTarget().z, newTarget.z, t);
        
                    cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);
        
                    if (t < 1) {
                      requestAnimationFrame(animate);
                    } else {
                      setCurrentView(newView);
                      setCurrentTargetPos({x: newTarget.x, y: newTarget.y, z: newTarget.z})
                      setViewChangeInProgress(false);
                    }
                  }
        
                  animate();
                };
        
                animateViewChange();
              } else {
                const targetX = -frameData['pointer'].x * 400;
                const targetY = -frameData['pointer'].y * 200;

                frameData['camera'].position.lerp({ x: targetX, y: targetY, z: 0 }, 0.1);
                frameData['camera'].lookAt(currentTargetPos.x, currentTargetPos.y, currentTargetPos.z);
                frameData['camera'].updateProjectionMatrix();
              }
              break;
        case 'right':
            if (xPos < -0.3) {
                setViewChangeInProgress(true);
        
                const newView = 'main';
                const newTarget = new THREE.Vector3(-7.7, 3, 0.3);
                const newCameraPos = new THREE.Vector3(15, 15, 30);
        
                const animateViewChange = () => {
                  let currentTime = 0;
                  const duration = 1.0; // Adjust duration for smoother transition
        
                  function animate() {
                    currentTime += 0.01;
                    const t = Math.min(currentTime / duration, 1);
        
                    const x = lerp(cameraControls.current.getPosition().x, newCameraPos.x, t);
                    const y = lerp(cameraControls.current.getPosition().y, newCameraPos.y, t);
                    const z = lerp(cameraControls.current.getPosition().z, newCameraPos.z, t);
        
                    const lookAtX = lerp(cameraControls.current.getTarget().x, newTarget.x, t);
                    const lookAtY = lerp(cameraControls.current.getTarget().y, newTarget.y, t);
                    const lookAtZ = lerp(cameraControls.current.getTarget().z, newTarget.z, t);
        
                    cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);
        
                    if (t < 1) {
                      requestAnimationFrame(animate);
                    } else {
                      setCurrentView(newView);
                      setCurrentTargetPos({x: newTarget.x, y: newTarget.y, z: newTarget.z})
                      setViewChangeInProgress(false);
                    }
                  }
        
                  animate();
                };
        
                animateViewChange();
              } else {
                const targetX = -frameData['pointer'].x * 400;
                const targetY = -frameData['pointer'].y * 200;
                
                frameData['camera'].position.lerp({ x: targetX, y: targetY, z: 0 }, 0.1);
                frameData['camera'].lookAt(currentTargetPos.x, currentTargetPos.y, currentTargetPos.z);
                frameData['camera'].updateProjectionMatrix();
              }
              break;
        case 'dl card':
            if(!DLClicked) {
                setViewChangeInProgress(true);
        
                const newView = 'left';
                const newTarget = new THREE.Vector3(-10, 3, 8);
                const newCameraPos = new THREE.Vector3(5, 7, 12);
        
                const animateViewChange = () => {
                  let currentTime = 0;
                  const duration = 1.0; // Adjust duration for smoother transition
        
                  function animate() {
                    currentTime += 0.01;
                    const t = Math.min(currentTime / duration, 1);
        
                    const x = lerp(cameraControls.current.getPosition().x, newCameraPos.x, t);
                    const y = lerp(cameraControls.current.getPosition().y, newCameraPos.y, t);
                    const z = lerp(cameraControls.current.getPosition().z, newCameraPos.z, t);
        
                    const lookAtX = lerp(cameraControls.current.getTarget().x, newTarget.x, t);
                    const lookAtY = lerp(cameraControls.current.getTarget().y, newTarget.y, t);
                    const lookAtZ = lerp(cameraControls.current.getTarget().z, newTarget.z, t);
        
                    cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);
        
                    if (t < 1) {
                      requestAnimationFrame(animate);
                    } else {
                      setCurrentView(newView);
                      setCurrentTargetPos({x: newTarget.x, y: newTarget.y, z: newTarget.z})
                      setViewChangeInProgress(false);
                    }
                  }
        
                  animate();
                };
        
                animateViewChange();
            }
            break;
        case 'project scroll':
            break;
        case 'project card':
            break;
        case 'contact card':
            break;

      }
    }
  });

  return <CameraControls ref={cameraControls} />;
}




// import { useEffect, useRef, useState } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { CameraControls } from "@react-three/drei";

// export default function CameraController({frameData}) {
// const cameraViews = [
//     'main',
//     'main left',
//     'main right',
//     'dl card',
//     'project scroll',
//     'project card',
//     'contact card'
// ]
// const [currentView, setCurrentView] = useState('main');
//   const cameraControls = useRef();
//   const [openingDone, setOpeningDone] = useState(false);
//   const cameraLimits = {
//     xMin: -200, // left boundary
//     xMax: 150,  // right boundary
//     yMin: -40, // bottom boundary
//     yMax: 75,  // top boundary
//   };

//   // Lerp function to interpolate between two values
//   const lerp = (start, end, t) => start + (end - start) * t;

//   const introCamera = () => {
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
//     introCamera();
//   }, []);

//   useFrame(() => {
    
//     if (frameData && openingDone) {
//         // state.camera.position.lerp({ x: clampedX, y: clampedY, z: 1000 }, 0.1);
//         // if (frameData['pointer'].x > 0 && frameData['pointer'].y > 0) {
//         //     console.log('quadrant 1');
//         // } else if (frameData['pointer'].x < 0 && frameData['pointer'].y > 0) {
//         //     console.log('quadrant 2');
//         // } else if (frameData['pointer'].x < 0 && frameData['pointer'].y < 0) {
//         //     console.log('quadrant 3');
//         // } else {
//         //     console.log('quadrant 4');
//         // } -0.3 0.3
//         var targetX;
//         var targetY;
//         var clampedX;
//         var clampedY;
//         // console.log('x: ' + frameData['pointer'].x + ' y: ' + frameData['pointer'].y);
//         switch (currentView) {
//             case 'main':
//                 if (frameData['pointer'].x < -0.3) {
//                     console.log('switch left');
//                     break;
//                 } else if (frameData['pointer'].x > 0.4) {
//                     console.log('switch right');
//                     break;
//                 }
//                 targetX = -frameData['pointer'].x * 400;
//                 targetY = -frameData['pointer'].y * 200;
//                 clampedX = THREE.MathUtils.clamp(targetX, cameraLimits.xMin, cameraLimits.xMax);
//                 clampedY = THREE.MathUtils.clamp(targetY, cameraLimits.yMin, cameraLimits.yMax);

//                 frameData['camera'].position.lerp({ x: clampedX, y: clampedY, z: 0 }, 0.1);
//                 frameData['camera'].lookAt(-7.7, 3, 0.3);
//                 frameData['camera'].updateProjectionMatrix();
//             case 'main left':
//                 break;
//             default:
//                 targetX = -frameData['pointer'].x * 400;
//                 targetY = -frameData['pointer'].y * 200;
//                 clampedX = THREE.MathUtils.clamp(targetX, cameraLimits.xMin, cameraLimits.xMax);
//                 clampedY = THREE.MathUtils.clamp(targetY, cameraLimits.yMin, cameraLimits.yMax);

//                 frameData['camera'].position.lerp({ x: clampedX, y: clampedY, z: 0 }, 0.1);
//                 frameData['camera'].lookAt(-7.7, 3, 0.3);
//                 frameData['camera'].updateProjectionMatrix();
//         }
//     }

//   })

//   return <CameraControls ref={cameraControls} />;
// }