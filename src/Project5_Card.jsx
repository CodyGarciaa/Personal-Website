

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import Project_Card_Face from './Project_Card_Face'

export default function Project5_Card({isOpened, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/final_models/Proj5final.glb')
  const { actions } = useAnimations(animations, group)

  // const helper = () => {
  //   console.log('clicked proj5')
  //   actions['SleeveOpenAnimation'].setLoop(THREE.LoopOnce, 1);
  //   actions['SleeveOpenAnimation'].clampWhenFinished = true;
  //   actions['SleeveOpenAnimation'].fadeIn(0.5).play()
  // }
  
  useEffect( () => {    
    if(!isOpened) {
        actions['SleeveCloseAnimation'].fadeOut(0.5)
        actions['SleeveOpenAnimation'].reset()
        actions['SleeveOpenAnimation'].setLoop(THREE.LoopOnce, 1);
        actions['SleeveOpenAnimation'].clampWhenFinished = true;
        actions['SleeveOpenAnimation'].fadeIn(0.5).play()
        console.log('opening proj')
    } else {
        actions['SleeveOpenAnimation'].fadeOut(0.5)
        actions['SleeveCloseAnimation'].reset()
        actions['SleeveCloseAnimation'].setLoop(THREE.LoopOnce, 1);
        actions['SleeveCloseAnimation'].clampWhenFinished = true;
        actions['SleeveCloseAnimation'].fadeIn(0.5).play()
        console.log('closing proj')
    }
  }, [isOpened])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ArmatureSleeve" position={[-0.01, 0, -0.758]}>
          <skinnedMesh
            name="Proj5Card"
            geometry={nodes.Proj5Card.geometry}
            material={materials.Project_Material}
            skeleton={nodes.Proj5Card.skeleton}
          />
          <primitive object={nodes.firstfold}>
            <primitive object={nodes.secondsleeve}>
              <primitive object={nodes.secondfold}>
                <primitive object={nodes.thirdsleeve}>
                  <primitive object={nodes.thirdfold}>
                    <primitive object={nodes.fourthsleeve}>
                      <primitive object={nodes.fourthfold}>
                        <primitive object={nodes.fifthsleeve}>
                          <Html
                            occlude="blending"
                            wrapperClass="nodes"
                            position={[4.08, 2.93, 0.135]}
                            transform
                            distanceFactor={8.1}
                            rotation-y={THREE.MathUtils.degToRad(179.07)}
                            rotation-x={THREE.MathUtils.degToRad(180)}
                            style={{ pointerEvents: 'none' }}
                          >
                            <Project_Card_Face number={5} />
                          </Html>
                        </primitive>
                      </primitive>
                    </primitive>
                  </primitive>
                </primitive>
              </primitive>
            </primitive>
          </primitive>
          <primitive object={nodes.firstsleeve} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/final_models/Proj5final.glb')