import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shaders/floorShaders';

function loadFloor(): THREE.Mesh {
  // Create a plane geometry
  let geometry = new THREE.PlaneGeometry(5, 5, 10, 10);

  // Setup uniforms
  let uniforms = {
    color1: { value: new THREE.Vector3(1, 0, 0) },
    color2: { value: new THREE.Vector3(0, 1, 0) },
    u_resolution: { value: new THREE.Vector2(geometry.parameters.width, geometry.parameters.height) },
    u_bl: { value: new THREE.Vector2(0.0, 0.4) },
    u_tr: { value: new THREE.Vector2(1.0, 0.6) },
  };

  // Shaders
  let shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  });

  window.addEventListener('wheel', function (event: WheelEvent) {
    // Update u_tr based on mouse wheel delta
    const output = uniforms.u_tr.value.x;
    let result = output + event.deltaY * -0.001;

    if(output < 0) {
        result = 0;
    }

    if(output > 1) {
        result = 1;
    }

    uniforms.u_tr.value.x = result;
  });


  return new THREE.Mesh(geometry, shaderMaterial);
}

export { loadFloor };
