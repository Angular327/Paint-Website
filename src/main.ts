// Three.js and other necessary modules are imported.
import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import { loadSky } from './Objects/sky';
import { loadSpawners } from './Objects/spawners';
import {
    leftPaint,
    rightPaint,
    leftCamera,
    rightCamera,
    scrollScale,
    dragScale,
    dragDeceleration,
} from '../src/constants';

// Textures
import laminateFloorTexture from './Textures/laminate_floor_02_diff_4k.jpg';

import './style.css';

// Initialize the scene and set up the environment
function init(): void {
    // Scene setup
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();

    // Camera setup
    const camera = loadCamera();
    scene.add(camera);

    // Uniforms for the shader
    const uniforms = {
        color1: { value: new THREE.Vector3(1, 0, 0) },
        color2: { value: new THREE.Vector3(0, 1, 0) },
        texture1: { value: textureLoader.load(laminateFloorTexture) },
        u_resolution: { value: new THREE.Vector2(400, 40) },
        u_bl: { value: new THREE.Vector2(leftPaint, 0.45) },
        u_tr: { value: new THREE.Vector2(leftPaint + 0.001, 0.55) },
    };

    // Floor setup
    const floor = loadFloor(uniforms);
    scene.add(floor);

    // Sky setup
    const sky = loadSky();
    scene.add(sky);

    // Spawner objects setup
    loadSpawners(scene);

    // Renderer setup
    const renderer = loadRenderer(camera);
    renderer.render(scene, camera);

    // User interaction setup
    let x = 0.0;
    let dragVelocity = 0;
    let isDragging = false;
    let previousMouseX = 0;

    window.addEventListener('wheel', handleMouseWheel);

    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousemove', onMouseMove, false);

    function handleMouseWheel(event: WheelEvent) {
        x += event.deltaY * scrollScale;
        dragVelocity = 0;
    }

    function onMouseDown(event: MouseEvent) {
        event.preventDefault();
        isDragging = true;
        previousMouseX = event.clientX;
        dragVelocity = 0;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseMove(event: MouseEvent) {
        if (!isDragging) return;
        dragVelocity = (event.clientX - previousMouseX) * dragScale;
        previousMouseX = event.clientX;
    }

    // Animation loop
    const loop = () => {
        renderer.render(scene, camera);

        x += dragVelocity * (2005 / window.innerWidth);

        if (dragVelocity > dragDeceleration || dragVelocity < -1 * dragDeceleration) {
            dragVelocity += Math.sign(dragVelocity) * -1 * dragDeceleration;
        } else {
            dragVelocity = 0;
        }

        x = Math.max(0, Math.min(1, x));

        uniforms.u_tr.value.x = THREE.MathUtils.lerp(leftPaint, rightPaint, x);
        camera.position.x = THREE.MathUtils.lerp(leftCamera, rightCamera, x);

        window.requestAnimationFrame(loop);
    }
    loop();
}
init();