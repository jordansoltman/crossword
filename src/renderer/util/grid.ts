export function xPosFromIndex(index: number, width: number): number {
    return index % width;
}

export function yPosFromIndex(index: number, width: number): number {
    return Math.floor(index / width);
}

export function xyFromIndex(index: number, width: number): [x: number, y: number] {
    return [xPosFromIndex(index, width), yPosFromIndex(index, width)];
}

export function xyToIndex(x: number, y: number, width: number): number {
    return y * width + x;
}
