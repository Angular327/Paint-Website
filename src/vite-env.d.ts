/// <reference types="vite/client" />

type CameraSizes = {
    width: number,
    height: number
}

type PaintBrush = {
    handle: THREE.Mesh;
    brush: THREE.Mesh;
  };

type planeList = Array<{
    leftBound: number,
    rightBound: number,
    material: number
}>