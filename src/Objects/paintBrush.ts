import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function loadPaintBrush(scene: THREE.Scene): Promise<PaintBrush> {
  return new Promise<PaintBrush>((resolve, reject) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      // Resource URL
      '/Paint.glb',
      // Called when the resource is loaded
      function (gltf) {       
        let brush: THREE.Mesh = (gltf.scene.children[1] as THREE.Mesh).clone();
        let handle: THREE.Mesh = (gltf.scene.children[0] as THREE.Mesh).clone();

        brush.position.set(-20, 7, 0.5);
        brush.rotation.x = THREE.MathUtils.degToRad(90);
        brush.material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        handle.position.set(-20, 7, 0.5);
        handle.rotation.x = THREE.MathUtils.degToRad(90);
        handle.material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        scene.add(brush);
        scene.add(handle);

        resolve({ handle, brush }); // Resolve the promise with handle and brush
      },
      // Called while loading is progressing
      function (xhr) {
        console.log('Brush: ' + (xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // Called when loading has errors
      function (error) {
        reject(error); // Reject the promise if there's an error
      }
    );
  });
}

export { loadPaintBrush };