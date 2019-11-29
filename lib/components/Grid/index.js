"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const tiles_1 = require("../../tiles");
const list = new tiles_1.TilesList();
const tilesRefs = new Array();
const tilesGrid = new Array();
exports.Grid = (props) => {
    const { tilesCount, tileSize, center, zoom, startTilePosition, } = props;
    for (let i = 0; i < tilesCount.height; i++) {
        tilesGrid[i] = new Array();
        tilesRefs[i] = new Array();
        for (let j = 0; j < tilesCount.width; j++) {
            tilesGrid[i][j] = list.getTile(zoom, {
                lat: startTilePosition.y + i,
                lng: startTilePosition.x + j,
            }).getImage();
        }
    }
    const [loadedTiles, setLoadTiles] = react_1.useState(0);
    react_1.useEffect(() => {
    }, [center]);
    return (react_1.default.createElement(react_1.default.Fragment, null, tilesGrid.map((row, rowIndex) => (react_1.default.createElement("div", { style: {
            height: `${tileSize.height}px`,
            width: `${tileSize.width * tilesCount.width}px`,
        }, key: rowIndex }, row.map((cell, collIndex) => (react_1.default.createElement("div", { style: {
            float: 'left',
            height: `${tileSize.height}px`,
            width: `${tileSize.width}px`,
            backgroundColor: rowIndex === Math.floor(tilesCount.height / 2) &&
                collIndex === Math.floor(tilesCount.width / 2) ?
                'rgba(0, 255, 0, 0.5)' : '#fff',
        }, key: collIndex }, cell))))))));
};
//# sourceMappingURL=index.js.map