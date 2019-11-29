"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const tile_1 = require("./tile");
class TilesList {
    constructor() {
        this.list = [];
        this.isHiddenLoadingStarted = false;
        this.center = {
            lat: 0,
            lng: 0,
        };
        this.zoom = 0;
        this.getTile = (zoom, coordinates) => {
            let tile = this.list.find((item) => item.isTile(zoom, coordinates));
            if (tile === undefined) {
                tile = new tile_1.Tile(zoom, coordinates, this.hiddenLoading);
                this.list.push(tile);
            }
            return tile;
        };
        this.setCurentMapState = (center, zoom) => {
            this.center = center;
            this.zoom = zoom;
        };
        this.continueHiddenLoading = () => {
        };
        this.findTile = (zoom, coordinates) => {
            const index = this.list.findIndex((item) => item.isTile(zoom, coordinates));
            if (index === -1) {
                return {
                    zoom,
                    coordinates,
                };
            }
            return null;
        };
        this.findNextPosition = (round) => {
            const center = helpers_1.coordinatesToTile(this.center, this.zoom);
            for (let i = -round; i <= round; i++) {
                for (let j = -round; j <= round; j++) {
                    if (Math.abs(i) === round || Math.abs(j) === round) {
                        const tile = this.findTile(this.zoom, {
                            lat: center.y + i,
                            lng: center.x + j,
                        });
                        if (tile != null) {
                            return tile;
                        }
                    }
                }
            }
            for (let k = 1; k <= round; k++) {
                const centerPlus = helpers_1.coordinatesToTile(this.center, this.zoom + k);
                const centerMinus = helpers_1.coordinatesToTile(this.center, this.zoom - k);
                for (let i = -round; i <= round; i++) {
                    for (let j = -round; j <= round; j++) {
                        if (Math.abs(i) === round || Math.abs(j) === round) {
                            let tile = this.findTile(this.zoom + k, {
                                lat: centerPlus.y + i,
                                lng: centerPlus.x + j,
                            });
                            if (tile != null) {
                                return tile;
                            }
                            tile = this.findTile(this.zoom - k, {
                                lat: centerMinus.y + i,
                                lng: centerMinus.x + j,
                            });
                            if (tile != null) {
                                return tile;
                            }
                        }
                    }
                }
            }
        };
        this.hiddenLoading = () => {
            if (this.isHiddenLoadingStarted) {
                return;
            }
            this.isHiddenLoadingStarted = true;
            let tile = null;
            let i = 0;
            do {
                tile = this.findNextPosition(i);
                i++;
            } while (tile === null);
            this.continueHiddenLoading();
        };
    }
}
exports.TilesList = TilesList;
//# sourceMappingURL=index.js.map