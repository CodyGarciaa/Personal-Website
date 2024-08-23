

export default function IntroCameraTransition(
    cameraControls,
    setOpeningDone,
    pos1,
    pos2,
    endPos,
    target,
    duration1,
    duration2
) {
    const lerp = (start, end, t) => start + (end - start) * t;
    let currentTime = 0;

    function animatePhase1() {
      currentTime += 0.01;
      const t = Math.min(currentTime / duration1, 1);

      const x = lerp(pos1.x, pos2.x, t);
      const y = lerp(pos1.y, pos2.y, t);
      const z = lerp(pos1.z, pos2.z, t);

      const lookAtX = lerp(cameraControls.current.getTarget().x, target.x, t);
      const lookAtY = lerp(cameraControls.current.getTarget().y, target.y, t);
      const lookAtZ = lerp(cameraControls.current.getTarget().z, target.z, t);

      cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

      if (t < 1) {
        requestAnimationFrame(animatePhase1);
      } else {
        currentTime = 0;
        requestAnimationFrame(animatePhase2);
      }
    }

    function animatePhase2() {
      currentTime += 0.01;
      const t = Math.min(currentTime / duration2, 1);

      const x = lerp(pos2.x, endPos.x, t);
      const y = lerp(pos2.y, endPos.y, t);
      const z = lerp(pos2.z, endPos.z, t);

      const lookAtX = lerp(cameraControls.current.getTarget().x, target.x, t);
      const lookAtY = lerp(cameraControls.current.getTarget().y, target.y, t);
      const lookAtZ = lerp(cameraControls.current.getTarget().z, target.z, t);

      cameraControls.current.setLookAt(x, y, z, lookAtX, lookAtY, lookAtZ, false);

      if (t < 1) {
        requestAnimationFrame(animatePhase2);
      } else {
        setOpeningDone(true);
      }
    }

    animatePhase1();
}