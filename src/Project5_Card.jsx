

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useSpring, useChain, useSpringRef, animated } from '@react-spring/three'
import Project_Card_Face from './Project_Card_Face'

export default function Project5_Card({isOpened, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/final_models/Proj5final.glb')
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
        <animated.group name="ArmatureSleeve"  position={positionSpring.pos} rotation={rotationSpring.rot}
        >
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
        </animated.group>
      </group>
    </group>
  )
}

useGLTF.preload('/final_models/Proj5final.glb')