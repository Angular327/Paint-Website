import * as THREE from 'three';
import { sizes } from './constants';

function loadRenderer(scene: THREE.Scene, camera: THREE.Camera): THREE.WebGLRenderer {
    //Renderer
    const canvas = document.querySelector('.webgl') as HTMLCanvasElement | undefined;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    //Resize
    window.addEventListener('resize', ()=> {
        //Update Sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight


        //Update Renderer
        renderer.setSize(sizes.width, sizes.height);
    })

    return renderer;
}

export { loadRenderer };