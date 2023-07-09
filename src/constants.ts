export const planeLength = 400;
export const midPoint = 160;

export const leftPaint = 0.05;
export const rightPaint = 1;
export const paintLength = planeLength - (planeLength * (1 - (rightPaint - leftPaint)));

export const leftCamera = -70;
export const rightCamera = leftCamera + paintLength;

export const leftBrush = -20;
export const rightBrush = leftBrush + paintLength;

export const totalRotation = -524/2;

export const scrollScale = -0.00002;

export const dragScale = -0.0001;
export const dragDeceleration = 0.0001;
