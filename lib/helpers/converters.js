"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../defaults");
exports.latToTile = (lat, zoom) => Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) /
    2 * Math.pow(2, zoom));
exports.lngToTile = (lng, zoom) => Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
exports.tileToLng = (x, zoom) => ((x / Math.pow(2, zoom) * 360 - 180));
exports.tileToLat = (y, zoom) => {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
};
exports.latToY = (lat, zoom) => (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) /
    2 * Math.pow(2, zoom);
exports.lngToX = (lng, zoom) => (lng + 180) / 360 * Math.pow(2, zoom);
exports.coordinatesToTile = (coordinates, zoom) => ({
    x: exports.lngToTile(coordinates.lng, zoom),
    y: exports.latToTile(coordinates.lat, zoom),
});
exports.tileToCoordinates = (position, zoom) => ({
    lng: exports.tileToLng(position.x, zoom),
    lat: exports.tileToLat(position.y, zoom),
});
exports.coordinatesOnPositionedTile = (coordinates, zoom, tileSize = defaults_1.defaultTileSize, startPosition, endPosition) => {
    const start = exports.tileToCoordinates(startPosition, zoom);
    const end = exports.tileToCoordinates(endPosition, zoom);
    return {
        x: (coordinates.lng - start.lng) * tileSize.width / (end.lng - start.lng),
        y: (coordinates.lat - start.lat) * tileSize.height / (end.lat - start.lat),
    };
};
exports.coordinatesOnTile = (coordinates, zoom, tileSize = defaults_1.defaultTileSize) => {
    const startPosition = exports.coordinatesToTile(coordinates, zoom);
    const endPosition = {
        x: startPosition.x + 1,
        y: startPosition.y + 1,
    };
    return exports.coordinatesOnPositionedTile(coordinates, zoom, tileSize, startPosition, endPosition);
};
exports.invertPosition = (position) => ({
    x: -position.x,
    y: -position.y,
});
exports.getCoordinates = (cursorPosition, delta, startTile, tilesCount, displayMapSize, tileSize, zoom) => {
    const start = exports.tileToCoordinates(startTile, zoom);
    const end = exports.tileToCoordinates({
        x: startTile.x + tilesCount.width,
        y: startTile.y + tilesCount.height,
    }, zoom);
    return {
        lng: (cursorPosition.x - delta.x) * (end.lng - start.lng) / (tilesCount.width * tileSize.width) + start.lng,
        lat: (cursorPosition.y - delta.y) * (end.lat - start.lat) / (tilesCount.height * tileSize.height) + start.lat,
    };
};
//# sourceMappingURL=converters.js.map