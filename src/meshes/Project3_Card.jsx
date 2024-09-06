

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useSpring, useChain, useSpringRef, animated } from '@react-spring/three'
import Project_Details from '../faces/Project_Details'
import Project_Card_Face from '../faces/Project_Card_Face'
import { FaceData, DetailsData, ProjMedia } from '../faces/Project3_Data'

export default function Project3_Card({isOpened, onProj3Clicked, Proj3Clicked, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/final_models/Proj3final.glb')
  const { actions } = useAnimations(animations, group)
  const isFirstRender = useRef(true);

  useEffect( () => {
    if (isFirstRender.current) {
      console.log('first render');
      isFirstRender.current = false; // Skip the first render
      return;
    } else {
      console.log('clicked wallet')
    
      if(isOpened) {
          actions['SleeveCloseAnimation'].fadeOut(0.5)
          actions['SleeveOpenAnimation'].reset()
          actions['SleeveOpenAnimation'].setLoop(THREE.LoopOnce, 1);
          actions['SleeveOpenAnimation'].clampWhenFinished = true;
          actions['SleeveOpenAnimation'].fadeIn(0.5).play()
          console.log('opening wallet')
      } else {
          actions['SleeveOpenAnimation'].fadeOut(0.5)
          actions['SleeveCloseAnimation'].reset()
          actions['SleeveCloseAnimation'].setLoop(THREE.LoopOnce, 1);
          actions['SleeveCloseAnimation'].clampWhenFinished = true;
          actions['SleeveCloseAnimation'].fadeIn(0.5).play()
          console.log('closing wallet')
      }
    }
  }, [isOpened])

  const [secTime, toggleSecTime] = useState();

  const positionSpringRef = useSpringRef();
  const rotationSpringRef = useSpringRef();

  const positionSpring = useSpring({
    ref: positionSpringRef,
    pos: Proj3Clicked ? [20, -0.3, -0.93] : [-0.01, 0, -0.758],
    config: Proj3Clicked ? { mass: 1, tension: 60, friction: 8 } : { mass: 1, tension: 50, friction: 20 },
  });

  const rotationSpring = useSpring({
    ref: rotationSpringRef,
    rot: Proj3Clicked ? [0, THREE.MathUtils.degToRad(900), THREE.MathUtils.degToRad(-0.9)] : [0, 0, 0],
  });

  useChain(Proj3Clicked ? [positionSpringRef, rotationSpringRef] : [rotationSpringRef, positionSpringRef], [0, secTime]);

  const helper = () => {
    if(isOpened) {
      console.log('clicked 5');
      if (Proj3Clicked) {              //time for pos to play after rot
        toggleSecTime(0.4);
      } else {                    //time for rot to play after pos
        toggleSecTime(0.9);
      }
      onProj3Clicked();
    }
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" onClick={helper}>
        <animated.group name="ArmatureSleeve" position={positionSpring.pos} rotation={rotationSpring.rot}>
          <skinnedMesh
            name="Proj3Card"
            geometry={nodes.Proj3Card.geometry}
            material={materials.Project_Material}
            skeleton={nodes.Proj3Card.skeleton}
          />
          <primitive object={nodes.firstfold}>
            <primitive object={nodes.secondsleeve}>
              <primitive object={nodes.secondfold}>
                <primitive object={nodes.thirdsleeve}>
                  <Html
                    occlude="blending"
                    wrapperClass="nodes"
                    position={[4.08, 2.93, -0.05]}
                    transform
                    distanceFactor={8.1}
                    rotation-y={THREE.MathUtils.degToRad(179.7)}
                    rotation-x={THREE.MathUtils.degToRad(180)}
                    style={{ pointerEvents: 'none' }}
                  >
                    <Project_Card_Face data={FaceData} ProjMedia={ProjMedia} />
                  </Html>
                  <Html
                    occlude="blending"
                    wrapperClass="nodes"
                    position={[4.08, 2.93, -0.2]}
                    transform
                    distanceFactor={8.1}
                    rotation-y={THREE.MathUtils.degToRad(-0.3)}
                    rotation-x={THREE.MathUtils.degToRad(180)}
                    style={{ pointerEvents: 'none' }}
                  >
                    <Project_Details />
                  </Html>
                </primitive>
              </primitive>
            </primitive>
          </primitive>
          <primitive object={nodes.firstsleeve} />
        </animated.group>
      </group>
    </group>
  )
}

useGLTF.preload('/final_models/Proj3final.glb')