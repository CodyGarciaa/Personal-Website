import { useCallback } from "react";
import * as THREE from 'three';

export default function useCameraTransition(
    cameraControls,
    setViewChangeInProgress,
    setCurrentView,
    setCurrentTargetPos) {

    const lerp = (start, end, t) => start + (end - start) * t;

    const CameraTransition = useCallback((
        newView,
        newTarget,
        newCameraPos,
        duration
    ) => {
        setViewChangeInProgress(true);
        const animateViewChange = () => {
            let currentTime = 0;

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
    },
    [cameraControls, setViewChangeInProgress, setCurrentView, setCurrentTargetPos]
    );
    return CameraTransition;
}