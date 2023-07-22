import * as THREE from 'three';
import planetexture from '/AboutMe.png'
function loadPlane(): THREE.Mesh {
    let geometry = new THREE.PlaneGeometry(15, 7, 1, 1);

    // Create the material for the skybox
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(planetexture);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 20;

    return plane;
}

export { loadPlane };
