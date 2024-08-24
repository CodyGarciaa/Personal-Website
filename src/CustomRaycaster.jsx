import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber';

export default function CustomRaycaster() {
  const { camera, scene } = useThree();

  useFrame(({ pointer }) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      console.log('Object clicked:', intersects[0].object);
    }
  });

  return null;
}