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
const defaults_1 = require("../../defaults");
const helpers_1 = require("../../helpers");
const Grid_1 = require("../Grid");
exports.Layout = (props) => {
    const { displayMapSize, delta, center, startTilePosition, zoom, } = props;
    const [tilesCount, setTilesCount] = react_1.useState(defaults_1.defaultTilesCount);
    const [margins, setMargins] = react_1.useState(defaults_1.defaultDelta);
    react_1.useEffect(() => {
        setTilesCount(helpers_1.getTilesCount(displayMapSize, defaults_1.defaultTileSize));
    }, [displayMapSize]);
    return (react_1.default.createElement("div", { style: {
            height: `${defaults_1.defaultTileSize.height * tilesCount.height}px`,
            marginLeft: `${delta.x}px`,
            marginTop: `${delta.y}px`,
            width: `${defaults_1.defaultTileSize.width * tilesCount.width}px`,
        } },
        react_1.default.createElement(Grid_1.Grid, { tilesCount: tilesCount, tileSize: defaults_1.defaultTileSize, center: center, startTilePosition: startTilePosition, zoom: props.zoom })));
};
//# sourceMappingURL=index.js.map