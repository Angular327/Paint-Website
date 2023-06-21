import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { keypadLocation, keypadRotation } from './constants';

export function loadElevatorScene(scene: THREE.Scene, camera: THREE.Camera): void {
    loadElevatorGLTF(scene);

    //Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 0);
    scene.add(light);

    //Camera
    camera.position.copy(keypadLocation);
    camera.rotation.copy(keypadRotation)
    scene.add(camera);
    console.log(camera.rotation);
}


function loadElevatorGLTF(scene: THREE.Scene): void {
    //Load Model
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    // Load a glTF resource
    loader.load(
        // resource URL
        '../Elevator.gltf',
        // called when the resource is loaded
        function ( gltf ) {

            gltf.scenes.forEach((gltfScene) => {
                // Add the GLTF scene to the Three.js scene
                scene.add(gltfScene);
              });
              
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( `An error happened: ${error}` );

        }
    );
}
