// Three.js and other necessary modules are imported.
import * as THREE from 'three';
import { loadFloor } from './Objects/floor';
import { loadRenderer } from './Renderer/renderer';
import { loadCamera } from './Renderer/camera';
import { loadSky } from './Objects/sky';
import { leftPaint, rightPaint, leftCamera, rightCamera, 
    scrollScale, dragScale, dragDeceleration } from '../src/constants'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//textures
import laminate_floor_02_diff_4k from './Textures/laminate_floor_02_diff_4k.jpg'; // Assuming 'skybox.jpg' is in the same directory as this JavaScript file

import './style.css';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

function init(): void {    
    let x = 0.0;

    // A new Three.js Scene object is created.
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();


    // Camera is loaded and added to the scene.
    const camera = loadCamera();
    scene.add(camera);

    // Uniforms for the shader are created. These will control the color and positioning of the objects in the scene.
    let uniforms = {
        color1: { value: new THREE.Vector3(1, 0, 0) },
        color2: { value: new THREE.Vector3(0, 1, 0) },
        texture1: { value: textureLoader.load(laminate_floor_02_diff_4k)},
        u_resolution: { value: new THREE.Vector2(400, 40) },
        u_bl: { value: new THREE.Vector2(leftPaint, 0.45) },
        u_tr: { value: new THREE.Vector2(leftPaint + .001, 0.55) },
    };

    // The floor is loaded with the defined uniforms and added to the scene.
    const floor = loadFloor(uniforms);
    scene.add(floor);

    // The sky is loaded and added to the scene.
    const sky = loadSky();
    scene.add(sky);

    // Create a GLTFLoader instance to load GLTF resources
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Define parameters for the spawner objects
    const SpawnerParameters = [
        {
            positionX: 0,
            material: 0x0000ff
        },
        {
            positionX: 10,
            material: 0x0000ff
        }
    ];

    // Declare an array to store the loaded mesh objects
    let SpawnerObject: Array<THREE.Mesh> = [];

    // Load a glTF resource
    loader.load(
        // Resource URL
        '../src/Objects/Spawner.gltf',
        // Called when the resource is loaded
        function (gltf) {

            // Iterate through the SpawnerParameters array
            for (let i = 0; i < SpawnerParameters.length; i++) {

                // Check if the loaded GLTF scene contains a valid mesh object
                if (gltf.scene.children.length > 0 && gltf.scene.children[0] instanceof THREE.Mesh) {
                    
                    // Assign the loaded mesh object to the SpawnerObject array at index i
                    SpawnerObject[i] = (gltf.scene.children[0] as THREE.Mesh).clone();
                    // Set the position and rotation of the mesh object
                    SpawnerObject[i].position.set(SpawnerParameters[i].positionX, 9.9, 0);
                    SpawnerObject[i].rotation.x = THREE.MathUtils.degToRad(90);
                    // Assign a new material with the specified color to the mesh object
                    SpawnerObject[i].material = new THREE.MeshBasicMaterial({ color: SpawnerParameters[i].material });

                    // Add the mesh object to the scene
                    scene.add(SpawnerObject[i]);
                }
            }
        },
        // Called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Called when loading has errors
        function (error) {
            console.log(`An error happened: ${error}`);
        }
    );

    // The renderer is set up and renders the initial state of the scene.
    const renderer = loadRenderer(camera);
    renderer.render(scene, camera);


    // Event listeners are added for mouse scroll and drag to move the X value, and animate the scene based on user interaction.
    let dragVelocity = 0;
    window.addEventListener('wheel', function (event: WheelEvent) {
        x += event.deltaY * scrollScale;
        dragVelocity = 0;
    });

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


    // Animation loop is created, updating the scene for each frame and rendering the updated state of the scene.
    const loop = () => {
        renderer.render(scene, camera);

        x += dragVelocity * (2005 / window.innerWidth);

        if(dragVelocity > dragDeceleration || dragVelocity < -1 * dragDeceleration) {
            dragVelocity += Math.sign(dragVelocity) * -1  * dragDeceleration;
        } else {
            dragVelocity = 0;
        }

        x = Math.max(0, Math.min(1, x));

        uniforms.u_tr.value.x = THREE.MathUtils.lerp(leftPaint, rightPaint, x);
        camera.position.x = THREE.MathUtils.lerp(leftCamera,   rightCamera, x);

        window.requestAnimationFrame(loop);
    }
    loop();
}

init();