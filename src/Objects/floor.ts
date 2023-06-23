import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shaders/floorShaders';

function loadFloor(uniforms: any): THREE.Mesh {
  // Create a plane geometry
  let geometry = new THREE.PlaneGeometry(400, 40);

  // Shaders
  let shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  });

  const plane = new THREE.Mesh(geometry, shaderMaterial);
  plane.position.set(160, 10, 0)
  return plane;
}

export { loadFloor };