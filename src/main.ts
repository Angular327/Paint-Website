import * as THREE from 'three';
import { loadElevatorScene } from './Scenes/loadElevator';
import './style.css';

const scene = new THREE.Scene();

//Sizes
const sizes: CameraSizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//setup Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, .1, 100);

//loads the main scene
loadElevatorScene(scene, camera);

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
    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();
    //Update Renderer
    renderer.setSize(sizes.width, sizes.height);
})

//Animation Loop
const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();