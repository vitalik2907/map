"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Tile {
    constructor(zoom, coordinates, onload) {
        this.getImage = () => this.image;
        this.isTile = (zoom, coordinates) => (this.zoom === zoom &&
            this.coordinates.lat === coordinates.lat &&
            this.coordinates.lng === coordinates.lng);
        this.getCoordinates = () => this.coordinates;
        this.zoom = zoom;
        this.coordinates = coordinates;
        this.image = (react_1.default.createElement("img", { src: `https://maps.wikimedia.org/osm-intl/${zoom}/${coordinates.lng}/${coordinates.lat}.png`, onLoad: onload }));
    }
}
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map