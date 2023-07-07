import * as THREE from 'three';
import skyboxImg from '/skybox.jpg'; // Assuming 'skybox.jpg' is in the same directory as this JavaScript file

function loadSky(): THREE.Mesh {
  // Create a plane geometry
  const geometry = new THREE.PlaneGeometry(300, 200);

  // Create the material for the skybox
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(skyboxImg);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // Create the plane mesh
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(20, 100, 0);
  plane.lookAt(new THREE.Vector3(-20, -40, 20));
  plane.rotation.z = THREE.MathUtils.degToRad(0);

  return plane;
}

export { loadSky };
