import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

function loadSpawners(scene: THREE.Scene): void {
  // Create a GLTFLoader instance to load GLTF resources
  const loader = new GLTFLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
  loader.setDRACOLoader(dracoLoader);

  // Define parameters for the spawner objects
  const spawnerParameters = [
    { positionX: 0, material: 0x0000ff },
    { positionX: 10, material: 0x0000ff },
  ];

  // Declare an array to store the loaded mesh objects
  const spawnerObjects: THREE.Mesh[] = [];

  // Load a glTF resource
  loader.load(
    // Resource URL
    '../src/Objects/Spawner.gltf',
    // Called when the resource is loaded
    function (gltf) {
      // Iterate through the spawnerParameters array
      for (let i = 0; i < spawnerParameters.length; i++) {
        // Check if the loaded GLTF scene contains a valid mesh object
        if (gltf.scene.children.length > 0 && gltf.scene.children[0] instanceof THREE.Mesh) {
          // Clone the loaded mesh object and assign it to the spawnerObjects array at index i
          const spawnerObject = (gltf.scene.children[0] as THREE.Mesh).clone();
          // Set the position and rotation of the mesh object
          spawnerObject.position.set(spawnerParameters[i].positionX, 9.9, 0);
          spawnerObject.rotation.x = THREE.MathUtils.degToRad(90);
          // Assign a new material with the specified color to the mesh object
          spawnerObject.material = new THREE.MeshBasicMaterial({ color: spawnerParameters[i].material });

          // Add the mesh object to the scene
          scene.add(spawnerObject);
          spawnerObjects.push(spawnerObject);
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
}

export { loadSpawners };
