import * as THREE from 'three';

function loadPlane(): THREE.Mesh {
    let geometry = new THREE.PlaneGeometry(5, 5, 1, 1);

    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;

    return plane;
}

export { loadPlane };
