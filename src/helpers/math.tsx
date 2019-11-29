import { Position } from '../types';

export const minusPositions = (minuend: Position, subtrahend: Position) => ({
    x: minuend.x - subtrahend.x,
    y: minuend.y - subtrahend.y,
});

export const sumPositions = (addend1: Position, addend2: Position) => ({
    x: addend1.x + addend2.x,
    y: addend1.y + addend2.y,
});
