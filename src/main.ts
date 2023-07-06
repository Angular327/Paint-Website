// Three.js and other necessary modules are imported.
import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import { loadSky } from './Objects/sky';
//import { loadSpawners } from './Objects/spawners';
import { loadPaintBrush } from './Objects/paintBrush';
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

async function init(): Promise<void> {
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();


    const uniforms = {
        color1: { value: new THREE.Vector3(1, 0, 0) },
        color2: { value: new THREE.Vector3(0, 1, 0) },
        texture1: { value: textureLoader.load(laminateFloorTexture) },
        u_resolution: { value: new THREE.Vector2(400, 40) },
        u_bl: { value: new THREE.Vector2(leftPaint, 0.43) },
        u_tr: { value: new THREE.Vector2(leftPaint + 0.001, 0.57) },
    };

    const floor = loadFloor(uniforms);
    const sky = loadSky();
    const camera = loadCamera();
    const { handle, brush }: PaintBrush = await loadPaintBrush(scene);
    //const spawnerObjects: Array<THREE.Mesh> = await loadSpawners(scene);
    const renderer = loadRenderer(camera);

    scene.add(floor);
    scene.add(sky);
    scene.add(camera);

    renderer.render(scene, camera);

    let x = 0.0;
    let dragVelocity = 0;
    let isDragging = false;
    let previousMouseX = 0;

    // Assuming you have a cube mesh called 'cube' in your scene

    // Update the cube's matrix world to ensure accurate bounding box calculation
    brush.updateMatrixWorld(true);

    // Create a new Box3 object
    var box = new THREE.Box3();

    // Set the cube as the object for which we want to calculate the bounding box
    box.setFromObject(brush);

    // Retrieve the bounding box dimensions
    var boxSize = new THREE.Vector3();
    box.getSize(boxSize);

    // Retrieve the minimum and maximum points of the bounding box
    var minPoint = box.min;
    var maxPoint = box.max;

    console.log(minPoint, " ", maxPoint);

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
        handle.position.x = THREE.MathUtils.lerp(-20, 360, x);
        brush.position.x = THREE.MathUtils.lerp(-20, 360, x);
        brush.rotation.z = THREE.MathUtils.lerp(0, -524/2, x);

        window.requestAnimationFrame(loop);
    }
    loop();
}
init();