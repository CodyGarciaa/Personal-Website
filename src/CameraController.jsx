import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import useCameraTransition from "./CameraTransition";
import IntroCameraTransition from "./IntroCameraTransition";

export default function CameraController({ 
    frameData, 
    DLClicked, 
    isOpened, 
    proj1Clicked, 
    proj2Clicked, 
    proj3Clicked, 
    proj4Clicked, 
    proj5Clicked, 
    proj6Clicked}) {
  
  const [currentView, setCurrentView] = useState('main');
  const [currentTargetPos, setCurrentTargetPos] = useState({
    x: -7.7,
    y: 3,
    z: 0.3
  })
  const [viewChangeInProgress, setViewChangeInProgress] = useState(false);
  const cameraControls = useRef();
  const [openingDone, setOpeningDone] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(3); // Initial scroll position (y-coordinate)


  useEffect(() => {
    const handleScroll = (event) => {
      setScrollPosition((prev) => {
        const newScrollPos = prev - event.deltaY * 0.01; // Adjust the multiplier for sensitivity
        return THREE.MathUtils.clamp(newScrollPos, -25, 3); // Clamp between the target positions
      });
    };

    if (currentView === 'project scroll') {
      window.addEventListener('wheel', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentView]);


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
                // CameraTransition(
                //     'dl card', 
                //     new THREE.Vector3(-9, 17.6, 8), 
                //     new THREE.Vector3(5, 30, 15), 
                //     1.0
                // );
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
            if (isOpened){
                CameraTransition(
                    'project scroll', 
                    new THREE.Vector3(0.5, 3, -1), 
                    new THREE.Vector3(0.5, 6, 14), 
                    1.0
                );
            } else if (xPos < -0.6) {
                CameraTransition(
                    'main', 
                    new THREE.Vector3(-7.7, 3, 0.3), 
                    new THREE.Vector3(15, 15, 30), 
                    1.0
                );
            } else {
                updateCameraPosition(frameData, 100, 10, 100, -45, 45);
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
            if (!isOpened){
                CameraTransition(
                    'right', 
                    new THREE.Vector3(0, 3, -2), 
                    new THREE.Vector3(-2, 7, 15), 
                    1.0
                );
            } else if (proj1Clicked) {
                CameraTransition(
                    'project1', 
                    new THREE.Vector3(19.5, 2.7, 0), 
                    new THREE.Vector3(19.7, 2.7, 6), 
                    1.0
                );
            } else if (proj2Clicked) {
                CameraTransition(
                    'project2', 
                    new THREE.Vector3(19.7, -2.7, 0), 
                    new THREE.Vector3(19.7, -2.5, 6), 
                    1.0
                );
            } else if (proj3Clicked) {
                CameraTransition(
                    'project3', 
                    new THREE.Vector3(19.7, -9.2, -1), 
                    new THREE.Vector3(19.7, -9.2, 6), 
                    1.0
                );
            } else if (proj4Clicked) {
                CameraTransition(
                    'project4', 
                    new THREE.Vector3(19.7, -14.5, -1), 
                    new THREE.Vector3(19.7, -13.2, 6), 
                    1.0
                );
            } else if (proj5Clicked) {
                CameraTransition(
                    'project4', 
                    new THREE.Vector3(19.85, -20.5, -1), 
                    new THREE.Vector3(19.85, -20.8, 6), 
                    1.0
                );
            } else if (proj6Clicked) {
                CameraTransition(
                    'project4', 
                    new THREE.Vector3(20.4, -26.2, -1), 
                    new THREE.Vector3(20.4, -25.3, 6), 
                    1.0
                );
            }
            else {
                cameraControls.current.setLookAt(
                    0.5, scrollPosition + 3, 14, // Camera position
                    0.5, scrollPosition, -1, // Target position (adjust this as needed)
                    true
                );
            }
            break;
        case 'project1':
            break;
        case 'project2':
            break;
        case 'project3':
            break;
        case 'project4':
            break;
        case 'project5':
            break; 
        case 'project6':
            break;
        case 'contact card':
            break;

      }
    }
  });

  return <CameraControls ref={cameraControls} />;
}