import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

async function loadSpawners(planes: planeList, scene: THREE.Scene): Promise<Array<THREE.Mesh>> {
  return new Promise<Array<THREE.Mesh>>((resolve, reject) => {

    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      'Spawner.gltf',
      function (gltf) {
        const spawnerObjects: THREE.Mesh[] = [];

        for (let i = 0; i < planes.length; i++) {
          if (gltf.scene.children.length > 0 && gltf.scene.children[0] instanceof THREE.Mesh) {
            const spawnerObject = (gltf.scene.children[0] as THREE.Mesh).clone();

            spawnerObject.position.set(planes[i].leftBound, 9.9, 0);
            spawnerObject.rotation.x = THREE.MathUtils.degToRad(90);
            spawnerObject.material = new THREE.MeshBasicMaterial({ color: planes[i].material });
            
            scene.add(spawnerObject);
            spawnerObjects.push(spawnerObject);
          }
        }

        resolve(spawnerObjects);
      },
      function (xhr) {
        console.log('Spawner: ' + (xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        reject(`An error happened: ${error}`);
      }
      );
    });
  }

export { loadSpawners };
