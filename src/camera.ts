import * as THREE from 'three';
import { sizes } from './constants';

function loadCamera(scene: THREE.Scene): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, .1, 100);

    camera.position.z = 5;
    scene.add(camera);
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();

    return camera;
}

export { loadCamera };