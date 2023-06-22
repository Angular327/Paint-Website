import * as THREE from 'three';

function loadCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100);

    camera.position.z = 5;
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();

    return camera;
}

export { loadCamera };