import * as THREE from 'three';

function loadRenderer(camera: THREE.PerspectiveCamera): THREE.WebGLRenderer {
    let sizes: CameraSizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    //Renderer
    const canvas = document.querySelector('.webgl') as HTMLCanvasElement | undefined;
    const renderer = new THREE.WebGLRenderer({ canvas, precision: 'mediump', antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);

    //Resize
    window.addEventListener('resize', ()=> {
        //Update Sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        //Update Camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix();

        //Update Renderer
        renderer.setSize(sizes.width, sizes.height);
    })

    return renderer;
}

export { loadRenderer };