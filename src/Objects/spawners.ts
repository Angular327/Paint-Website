import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

async function loadSpawners(scene: THREE.Scene): Promise<Array<THREE.Mesh>> {
  return new Promise<Array<THREE.Mesh>>((resolve, reject) => {

    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const spawnerParameters = [
      { positionX: 0, material: 0x0000ff },
      { positionX: 10, material: 0x0000ff },
    ];

    loader.load(
      'Spawner.gltf',
      function (gltf) {
        const spawnerObjects: THREE.Mesh[] = [];

        for (let i = 0; i < spawnerParameters.length; i++) {
          if (gltf.scene.children.length > 0 && gltf.scene.children[0] instanceof THREE.Mesh) {
            const spawnerObject = (gltf.scene.children[0] as THREE.Mesh).clone();

            spawnerObject.position.set(spawnerParameters[i].positionX, 9.9, 0);
            spawnerObject.rotation.x = THREE.MathUtils.degToRad(90);
            spawnerObject.material = new THREE.MeshBasicMaterial({ color: spawnerParameters[i].material });

            scene.add(spawnerObject);
            spawnerObjects.push(spawnerObject);
          }
        }

        resolve(spawnerObjects);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        reject(`An error happened: ${error}`);
      }
      );
    });
  }

export { loadSpawners };
