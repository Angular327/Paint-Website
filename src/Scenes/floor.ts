import * as THREE from 'three';
import { fragmentShader, vertexShader } from '../Shaders/floorShaders';


function loadFloor(): THREE.Mesh {
    // Create a plane geometry
    let geometry = new THREE.PlaneGeometry(5, 5, 10, 10);

    //setup Uniforms
    let uniforms = {
        u_time: {  value: 1.0 },
        u_resolution: { value: new THREE.Vector2() },
        u_mouse: {  value: new THREE.Vector2() },
        color1: {  value: new THREE.Vector3(1, 0, 0) },
        color2: { value: new THREE.Vector3(0, 1, 0) },
    };

    document.onmousemove = function(e){
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
      }

    // Shaders
    let shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms
    });

    return new THREE.Mesh(geometry, shaderMaterial);
}

export { loadFloor };