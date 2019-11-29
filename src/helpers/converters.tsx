import {
    defaultTileSize,
} from '../defaults';
import {
    Coordinates,
    Position,
    Size,
} from '../types';

export const latToTile = (lat: number, zoom: number): number => Math.floor(
    (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) /
    2 * Math.pow(2, zoom)
);

export const lngToTile = (lng: number, zoom: number): number => Math.floor((lng + 180) / 360 * Math.pow(2, zoom));

export const tileToLng = (x: number, zoom: number): number => (((x / Math.pow(2, zoom)) * 360 - 180));

export const tileToLat = (y: number, zoom: number): number => {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
};

export const latToY = (lat: number, zoom: number): number =>
    (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) /
    2 * Math.pow(2, zoom);

export const lngToX = (lng: number, zoom: number): number => (lng + 180) / 360 * Math.pow(2, zoom);

export const coordinatesToTile = (coordinates: Coordinates, zoom: number): Position => ({
    x: lngToTile(coordinates.lng, zoom),
    y: latToTile(coordinates.lat, zoom),
});

export const tileToCoordinates = (position: Position, zoom: number) => ({
    lng: tileToLng(position.x, zoom),
    lat: tileToLat(position.y, zoom),
});

export const latToKm = (lat: number): number => ((lat * 110.574));

export const lngToKm = (lng: number, lat: number): number => ((lng * 111.320) * Math.cos(lat *  Math.PI / 180));

export const kmTolat = (km: number): number => ((km / 110.574));

export const kmTolng = (km: number): number => ((km / 111.320) * Math.cos(kmTolat(km) *  Math.PI / 180));

export const coordinatesOnPositionedTile = (
    coordinates: Coordinates,
    zoom: number,
    tileSize: Size = defaultTileSize,
    startPosition: Position,
    endPosition: Position
): Position => {
    const start = tileToCoordinates(startPosition, zoom);
    const end = tileToCoordinates(endPosition, zoom);
    return {
        x: (coordinates.lng - start.lng) * tileSize.width / (end.lng - start.lng),
        y: (coordinates.lat - start.lat) * tileSize.height / (end.lat - start.lat),
    };
};

export const coordinatesOnTile = (
    coordinates: Coordinates,
    zoom: number,
    tileSize: Size = defaultTileSize
): Position => {
    const startPosition = coordinatesToTile(coordinates, zoom);
    const endPosition = {
        x: startPosition.x + 1,
        y: startPosition.y + 1,
    };
    return coordinatesOnPositionedTile(coordinates, zoom, tileSize, startPosition, endPosition);
};

export const invertPosition = (position: Position): Position =>
    ({
        x: -position.x,
        y: -position.y,
    });

export const getCoordinates = (
    cursorPosition: Position,
    delta: Position,
    startTile: Position,
    tilesCount: Size,
    displayMapSize: Size,
    tileSize: Size,
    zoom: number
): Coordinates => {
    const start = tileToCoordinates(startTile, zoom);
    const end = tileToCoordinates(
        {
            x: startTile.x + tilesCount.width,
            y: startTile.y + tilesCount.height,
        },
        zoom
    );
    return {
        lng: (cursorPosition.x - delta.x) * (end.lng - start.lng) / (tilesCount.width * tileSize.width) + start.lng,
        lat: (cursorPosition.y - delta.y) * (end.lat - start.lat) / (tilesCount.height * tileSize.height) + start.lat,
    };
};
