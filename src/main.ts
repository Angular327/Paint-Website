import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import { loadSky } from './Objects/sky';
import { leftPaint, rightPaint, leftCamera, rightCamera, 
    scrollScale, dragScale, dragDeceleration } from '../src/constants'
import './style.css';

function init(): void {    
    let x = 0.0;

    //create intial scene
    const scene = new THREE.Scene();

    //enable camera
    const camera = loadCamera();
    scene.add(camera);

    //loads the main scene
    // Setup uniforms
    let uniforms = {
        color1: { value: new THREE.Vector3(1, 0, 0) },
        color2: { value: new THREE.Vector3(0, 1, 0) },
        u_resolution: { value: new THREE.Vector2(400, 40) },
        u_bl: { value: new THREE.Vector2(leftPaint, 0.45) },
        u_tr: { value: new THREE.Vector2(leftPaint + .001, 0.55) },
    };

    const floor = loadFloor(uniforms);
    scene.add(floor);

    const sky = loadSky();
    scene.add(sky);

    //Loop Creation
    //create renderer
    const renderer = loadRenderer(camera);
    renderer.render(scene, camera);


    /*   Animation Loops
    *   Mouse Scrolling, Drag, Renderer
    */
    //Move X value on mouse scroll
    let dragVelocity = 0;
    window.addEventListener('wheel', function (event: WheelEvent) {
    // Update u_tr based on mouse wheel delta
    x += event.deltaY * scrollScale;
    
    dragVelocity = 0;
  });

  //move X value on mouse drag
  // Mouse event handlers
  let isDragging = false;
  let previousMouseX = 0;

  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
  document.addEventListener('mousemove', onMouseMove, false);

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


    //Animation Loop
    const loop = () => {
        renderer.render(scene, camera);
        //(floor.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime() / 5;

        x += dragVelocity;
        
        if(dragVelocity > dragDeceleration || dragVelocity < -1 * dragDeceleration) {
            dragVelocity += Math.sign(dragVelocity) * -1  * dragDeceleration;
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