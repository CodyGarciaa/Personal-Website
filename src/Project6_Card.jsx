

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, useSpringRef, useChain, animated } from '@react-spring/three'
import Project_Card_Face from './Project_Card_Face'
import Project_Details from './Project_Details'
import Projects_Face from './Projects_Face'

export default function Project6_Card({isOpened, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/final_models/Proj6final.glb')
  const { actions } = useAnimations(animations, group)
  const isFirstRender = useRef(true);
  const [projsVisible, setProjsVisible] = useState(true)

  useEffect( () => {
    if (isFirstRender.current) {
      console.log('first render');
      isFirstRender.current = false; // Skip the first render
      return;
    } else {
      console.log('clicked wallet')
      
      const sleeveOpenAction = actions['SleeveOpenAnimation'];
      const sleeveCloseAction = actions['SleeveCloseAnimation'];
      if(isOpened) {
        sleeveCloseAction.fadeOut(0.5)
          sleeveOpenAction.reset()
          sleeveOpenAction.setLoop(THREE.LoopOnce, 1);
          sleeveOpenAction.clampWhenFinished = true;
          sleeveOpenAction.fadeIn(0.5).play()
          console.log('opening wallet')
          sleeveOpenAction.getMixer().addEventListener('finished', () => {
            setProjsVisible(false);
          });
      } else {
          sleeveOpenAction.getMixer().addEventListener('finished', () => {
            setProjsVisible(true);
          });
          setProjsVisible(true);
          sleeveOpenAction.fadeOut(0.5)
          sleeveCloseAction.reset()
          sleeveCloseAction.setLoop(THREE.LoopOnce, 1);
          sleeveCloseAction.clampWhenFinished = true;
          sleeveCloseAction.fadeIn(0.5).play()
          console.log('closing wallet')
      }
    }
  }, [isOpened])


  const [clicked, toggleClick] = useState(false);
  const [secTime, toggleSecTime] = useState();

  const positionSpringRef = useSpringRef();
  const rotationSpringRef = useSpringRef();

  const positionSpring = useSpring({
    ref: positionSpringRef,
    pos: clicked ? [20, -0.3, -0.93] : [-0.01, 0, -0.758],
    config: clicked ? { mass: 1, tension: 60, friction: 8 } : { mass: 1, tension: 50, friction: 20 },
  });

  const rotationSpring = useSpring({
    ref: rotationSpringRef,
    rot: clicked ? [0, THREE.MathUtils.degToRad(900), 0] : [0, 0, 0],
  });

  useChain(clicked ? [positionSpringRef, rotationSpringRef] : [rotationSpringRef, positionSpringRef], [0, secTime]);

  const helper = () => {
    if(isOpened) {
      console.log('clicked 5');
      if (clicked) {              //time for pos to play after rot
        toggleSecTime(0.4);
      } else {                    //time for rot to play after pos
        toggleSecTime(0.9);
      }
      toggleClick(!clicked);
    }
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" onClick={helper}>
        <animated.group name="ArmatureSleeve" position={positionSpring.pos} rotation={rotationSpring.rot}>
          <skinnedMesh
            name="Proj6Card"
            geometry={nodes.Proj6Card.geometry}
            material={materials.Project_Material}
            skeleton={nodes.Proj6Card.skeleton}
          />
          <primitive object={nodes.firstfold}>
            <primitive object={nodes.secondsleeve}>
              <primitive object={nodes.secondfold}>
                <primitive object={nodes.thirdsleeve}>
                  <primitive object={nodes.thirdfold}>
                    <primitive object={nodes.fourthsleeve}>
                      <primitive object={nodes.fourthfold}>
                        <primitive object={nodes.fifthsleeve}>
                          <primitive object={nodes.fifthfold}>
                            <primitive object={nodes.sixthsleeve}>
                              <Html
                                occlude="blending"
                                wrapperClass="nodes"
                                position={[4.08, 2.69, 0.22]}
                                transform
                                distanceFactor={8.1}
                                rotation-y={THREE.MathUtils.degToRad(179.6)}
                                rotation-x={THREE.MathUtils.degToRad(180)}
                                style={{ pointerEvents: 'none' }}
                              >
                                <Project_Card_Face number={6} />
                              </Html>
                              {projsVisible && (
                                <Html
                                  occlude="blending"
                                  wrapperClass="nodes"
                                  position={[4.08, 2.69, 0.07]}
                                  transform
                                  distanceFactor={8.1}
                                  rotation-y={THREE.MathUtils.degToRad(180.2)}
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <Projects_Face />
                                </Html>
                              )}
                              {!projsVisible && (
                                <Html
                                  occlude="blending"
                                  wrapperClass="nodes"
                                  position={[4.08, 2.69, 0.07]}
                                  transform
                                  distanceFactor={8.1}
                                  rotation-y={THREE.MathUtils.degToRad(0)}
                                  rotation-x={THREE.MathUtils.degToRad(180)}
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <Project_Details />
                                </Html>
                              )}
                            </primitive>
                          </primitive>
                        </primitive>
                      </primitive>
                    </primitive>
                  </primitive>
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

useGLTF.preload('/final_models/Proj6final.glb')