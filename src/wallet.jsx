import React, { useEffect, useRef, useState } from 'react';
import { Html, useGLTF, useAnimations } from '@react-three/drei';
import DL_bio from './DL_Face';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';


export default function Wallet(props) {
  const group = useRef();
  const { nodes, animations } = useGLTF('/HELP_WALLET_lighting.glb');
  const { actions, names } = useAnimations(animations, group);
  console.log(nodes);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initially, pause the animation at the closed state
    actions[names[1]].reset().play().paused = true;
  }, [actions, names]);

  const toggleWallet = () => {
    setIsOpen(!isOpen); // Toggle open/close state

    if (!isOpen) {
      // Play the animation forward to open the wallet
      actions[names[1]].reset().fadeIn(0.5).play();
    } else {
      // Play the animation backward to close the wallet
      actions[names[1]].paused = false;
      actions[names[1]].timeScale = -1; // Reverses the animation
      actions[names[1]].fadeIn(0.5).play();
    }

    // Ensure the animation stops at the end of either open or close
    actions[names[1]].clampWhenFinished = true;
  };

  // Use the useFrame hook to update the position of the Html component based on the transformation of bigwalletopen
  // useFrame(() => {
  //   if (nodes.bigwalletopen && htmlRef.current) {
  //     const bone = nodes.bigwalletopen;

  //     // Get the world position and rotation of the bone
  //     const position = new THREE.Vector3();
  //     bone.getWorldPosition(position);

  //     const rotation = new THREE.Euler();
  //     bone.getWorldRotation(rotation);

  //     // Update the position and rotation of the Html component
  //     htmlRef.current.position.copy(position);
  //     htmlRef.current.rotation.copy(rotation);
  //   }
  // });


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" onClick={toggleWallet}>
        <group name="Armature001" position={[0.742, 1, 0]}>
          <skinnedMesh
            castShadow
            receiveShadow
            name="Plane001"
            geometry={nodes.Plane001.geometry}
            material={nodes.Plane001.material}
            skeleton={nodes.Plane001.skeleton}
          />
          <primitive object={nodes.bigwalletstay} />
          <primitive object={nodes.bigwalletspine}>
            <primitive object={nodes.bigwalletopen}>
              <Html
                wrapperClass="nodes"
                position={[0, 2.7, 0]}
                transform
                distanceFactor={THREE.MathUtils.degToRad(180)}
                // rotation-x={-0.25}
                rotation-x={THREE.MathUtils.degToRad(90)}
                rotation-y={THREE.MathUtils.degToRad(-90)}
              >
                <DL_bio />
              </Html>
            </primitive>
          </primitive>
          <primitive object={nodes.CTRL_bigwallet} />
        </group>
        {/* <primitive object={nodes.bigwalletopen} /> */}
      </group>
    </group>
  );
}

useGLTF.preload('/HELP_WALLET_lighting.glb');