import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import './style.css';
import { loadSky } from './Objects/sky';

function init(): void {    
    let x = 0.0;

    //create intial scene
    const scene = new THREE.Scene();

    //enable camera
    const camera = loadCamera();
    scene.add(camera);

    //loads the main scene

    const floor = loadFloor(camera, x);
    scene.add(floor);

    const sky = loadSky();
    scene.add(sky);

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