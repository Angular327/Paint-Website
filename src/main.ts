import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import './style.css';

function init(): void {    
    //create intial scene
    const scene = new THREE.Scene();

    //enable camera
    const camera = loadCamera();
    scene.add(camera);

    //loads the main scene

    const floor = loadFloor();
    scene.add(floor);

    //Loop Creation
    //create renderer
    const renderer = loadRenderer(camera);
    renderer.render(scene, camera);

    //Animation Loop
    const loop = () => {
        renderer.render(scene, camera);
        //(floor.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime() / 5;
        window.requestAnimationFrame(loop);
    }
    loop();
}

init();