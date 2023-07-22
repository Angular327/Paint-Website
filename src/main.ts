// Three.js and other necessary modules are imported.
import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import { loadSky } from './Objects/sky';
import { loadSpawners } from './Objects/spawners';
import { loadPaintBrush } from './Objects/paintBrush';
import { loadPlane } from './Objects/infoPlane';
import {
    leftPaint,
    rightPaint,
    leftCamera,
    rightCamera,
    scrollScale,
    dragScale,
    dragDeceleration,
    leftBrush,
    rightBrush,
    totalRotation,
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

    const planes: planeList = [
        {
            leftBound: 0,
            rightBound: 20,
            material: 0x0000ff
        },
        {
            leftBound: 30,
            rightBound: 40,
            material: 0xFFF000
        }
    ]


    const floor = loadFloor(uniforms);
    const plane = loadPlane();
    const sky = loadSky();
    const camera = loadCamera();
    const { handle, brush }: PaintBrush = await loadPaintBrush(scene);
    await loadSpawners(planes, scene);
    const renderer = loadRenderer(camera);

    scene.add(floor);
    scene.add(sky);
    scene.add(plane);
    scene.add(camera);
    plane.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);

    renderer.render(scene, camera);

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
        
        plane.position.set(camera.position.x + 5, camera.position.y + 20, camera.position.z - 2 );
        let isPlaneVisible = false;
        for(let i = 0; i < planes.length; i++) {
            if(brush.position.x > planes[i].leftBound && brush.position.x < planes[i].rightBound) {
                isPlaneVisible = true;
                break;
            }
        }
        plane.visible = isPlaneVisible;
        
        x += dragVelocity * (2005 / window.innerWidth);

        if (dragVelocity > dragDeceleration || dragVelocity < -1 * dragDeceleration) {
            dragVelocity += Math.sign(dragVelocity) * -1 * dragDeceleration;
        } else {
            dragVelocity = 0;
        }

        x = Math.max(0, Math.min(1, x));

        uniforms.u_tr.value.x = THREE.MathUtils.lerp(leftPaint, rightPaint, x);
        camera.position.x = THREE.MathUtils.lerp(leftCamera, rightCamera, x);
        handle.position.x = THREE.MathUtils.lerp(leftBrush, rightBrush, x);
        brush.position.x = THREE.MathUtils.lerp(leftBrush, rightBrush, x);
        brush.rotation.z = THREE.MathUtils.lerp(0, totalRotation, x);


        window.requestAnimationFrame(loop);
    }
    loop();
}
init();