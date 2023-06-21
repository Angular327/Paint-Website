import * as THREE from 'three';
import { loadFloor } from './Scenes/floor';
import { loadRenderer } from './renderer';
import { loadCamera } from './camera';
import './style.css';

function init(): void {
    const scene = new THREE.Scene();

    const camera = loadCamera(scene);
    
    //loads the main scene
    const floor = loadFloor();
    scene.add(floor);

    const renderer = loadRenderer(scene, camera);

    //Animation Loop
    const loop = () => {
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }
    loop();
}

init();