import * as THREE from 'three';
import { leftCamera } from '../constants';

function loadCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);

    camera.position.set(leftCamera, -40, 20);
    camera.lookAt(new THREE.Vector3(0, 30, 0));
    camera.rotation.z = 0;

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();

    return camera;
}

export { loadCamera };