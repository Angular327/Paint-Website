import * as THREE from 'three';

//keypad location and rotation constants
const keypadLocation: THREE.Vector3 = new THREE.Vector3(1.5, 3.37, -2.6);
const keypadRotation: THREE.Euler = new THREE.Euler(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(90));

export { keypadLocation, keypadRotation}