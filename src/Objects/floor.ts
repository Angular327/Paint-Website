import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shaders/floorShaders';
import { leftPaint, rightPaint, leftCamera, rightCamera, scale } from '../constants';

function loadFloor(camera: THREE.Camera, x: number): THREE.Mesh {
  // Create a plane geometry
  let geometry = new THREE.PlaneGeometry(400, 40);

  // Setup uniforms
  let uniforms = {
    color1: { value: new THREE.Vector3(1, 0, 0) },
    color2: { value: new THREE.Vector3(0, 1, 0) },
    u_resolution: { value: new THREE.Vector2(geometry.parameters.width, geometry.parameters.height) },
    u_bl: { value: new THREE.Vector2(leftPaint, 0.45) },
    u_tr: { value: new THREE.Vector2(leftPaint, 0.55) },
  };



  // Shaders
  let shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  });

  window.addEventListener('wheel', function (event: WheelEvent) {
    // Update u_tr based on mouse wheel delta
    x += event.deltaY * scale;

    if(x < 0) {
      x = 0;
    }

    if(x > 1) {
      x = 1;
    }

    console.log(uniforms);

    uniforms.u_tr.value.x = THREE.MathUtils.lerp(leftPaint, rightPaint, x);
    camera.position.x = THREE.MathUtils.lerp(leftCamera, rightCamera, x);

  });

  const plane = new THREE.Mesh(geometry, shaderMaterial);
  plane.position.set(160, 10, 0)
  return plane;
  
}

export { loadFloor };