import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import useCameraTransition from "../CameraTransition";
import IntroCameraTransition from "./IntroCameraTransition";

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

  useEffect(() => {
    IntroCameraTransition(
        cameraControls,
        setOpeningDone,
        new THREE.Vector3(10, 12, 12),
        new THREE.Vector3(20, 35, 35),
        new THREE.Vector3(15, 15, 30),
        new THREE.Vector3(-7.7, 3, 0.3),
        1,
        0.3
    );
  }, []);

  const CameraTransition = useCameraTransition(
    cameraControls,
    setViewChangeInProgress,
    setCurrentView,
    setCurrentTargetPos
  );


  const updateCameraPosition = (frameData, radius, xAngleMin, xAngleMax, yAngleMin, yAngleMax) => {

    const sensitivity = 3;
    let angleX = -frameData.pointer.x * Math.PI * sensitivity;
    let angleY = frameData.pointer.y * (Math.PI / 4) * sensitivity;
    let target = new THREE.Vector3(currentTargetPos.x, currentTargetPos.y, currentTargetPos.z)

    let angleXMin = THREE.MathUtils.degToRad(xAngleMin);
    let angleXMax = THREE.MathUtils.degToRad(xAngleMax);
    let angleYMin = THREE.MathUtils.degToRad(yAngleMin);
    let angleYMax = THREE.MathUtils.degToRad(yAngleMax);

    angleX = THREE.MathUtils.clamp(angleX, angleXMin, angleXMax);
    angleY = THREE.MathUtils.clamp(angleY, angleYMin, angleYMax);

    let cameraX = target.x + radius * Math.cos(angleX) * Math.cos(angleY);
    let cameraY = target.y + radius * Math.sin(angleY);
    let cameraZ = target.z + radius * Math.sin(angleX) * Math.cos(angleY);

    frameData.camera.position.lerp({ x: cameraX, y: cameraY, z: cameraZ }, 0.1);
    frameData.camera.lookAt(target);
    frameData.camera.updateProjectionMatrix();
    
  };

  useFrame(() => {
    if (frameData && openingDone && !viewChangeInProgress) {
      const xPos = frameData.pointer.x;

      switch(currentView) {
        case 'main':
            if (xPos < -0.3) {
                CameraTransition(
                    'left', 
                    new THREE.Vector3(-10, 3, 8), 
                    new THREE.Vector3(5, 7, 12), 
                    1.0
                );
            } else if (xPos > 0.4) {
                CameraTransition(
                    'right', 
                    new THREE.Vector3(0, 3, -2), 
                    new THREE.Vector3(-2, 7, 15), 
                    1.0
                );
              } else {
                updateCameraPosition(frameData, 100, -40, 100, -45, 45);
              }
              break;

        case 'left':
            if (DLClicked) {
                CameraTransition(
                    'dl card', 
                    new THREE.Vector3(-9, 17.6, 8), 
                    new THREE.Vector3(-3, 17.6, 9.8), 
                    1.0
                );
            } else if (xPos > 0.5) {
                CameraTransition(
                    'main', 
                    new THREE.Vector3(-7.7, 3, 0.3), 
                    new THREE.Vector3(15, 15, 30), 
                    1.0
                );
              } else {
                updateCameraPosition(frameData, 100, -60, 60, -45, 45);
              }
              break;
        case 'right':
            if (xPos < -0.6) {
                CameraTransition(
                    'main', 
                    new THREE.Vector3(-7.7, 3, 0.3), 
                    new THREE.Vector3(15, 15, 30), 
                    1.0
                );
            } else {
                updateCameraPosition(frameData, 100, -10, 100, -45, 45);
            }
              break;
        case 'dl card':
            if(!DLClicked) {
                CameraTransition(
                    'left', 
                    new THREE.Vector3(-10, 3, 8), 
                    new THREE.Vector3(5, 7, 12), 
                    1.0
                );
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