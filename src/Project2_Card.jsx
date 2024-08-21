

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import Project_Card_Face from './Project_Card_Face'

export default function Project2_Card({ isOpened, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/final_models/Proj2final.glb')
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

  const helper = () => {
    console.log('clicked proj2');
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" onClick={helper}>
        <group name="ArmatureSleeve" position={[-0.01, 0, -0.758]}>
          <skinnedMesh
            name="Proj2Card"
            geometry={nodes.Proj2Card.geometry}
            material={materials.Project_Material}
            skeleton={nodes.Proj2Card.skeleton}
          />
          <primitive object={nodes.firstfold}>
            <primitive object={nodes.secondsleeve}>
              <Html
                occlude="blending"
                wrapperClass="nodes"
                position={[4.08, 2.7, 0.17]}
                transform
                distanceFactor={8.1}
                rotation-y={THREE.MathUtils.degToRad(179.8)}
                rotation-x={THREE.MathUtils.degToRad(180)}
                style={{ pointerEvents: 'none' }}
              >
                <Project_Card_Face number={2} />
              </Html>
            </primitive>
          </primitive>
          <primitive object={nodes.firstsleeve} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/final_models/Proj2final.glb')