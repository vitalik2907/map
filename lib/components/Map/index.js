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
const types_1 = require("../../types");
const Layout_1 = require("../Layout");
const MarkersLayout_1 = require("../MarkersLayout");
const styles = {
    controlFlowStyle: {
        height: '100%',
        width: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
    },
    helpFlowStyle: {
        height: '50%',
        width: '50%',
        left: 0,
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.25)',
    },
};
exports.Map = (props) => {
    const style = Object.assign({ position: 'relative' }, props.style, { overflow: 'hidden', userSelect: 'none' });
    const [zoom, setZoom] = react_1.useState(props.zoom);
    const [center, setCenter] = react_1.useState(props.center);
    const [map, setMap] = react_1.useState(null);
    const [mapSize, setMapSize] = react_1.useState(defaults_1.defaultMapSize);
    const [dragable, setDragable] = react_1.useState(false);
    const [cursorPosition, setCursorPosition] = react_1.useState(defaults_1.defaultPosition);
    const [cursorStartPosition, setCursorStartPosition] = react_1.useState(defaults_1.defaultPosition);
    const [tilesCount, setTilesCount] = react_1.useState(defaults_1.defaultTilesCount);
    const [delta, setDelta] = react_1.useState({
        x: ((tilesCount.width - 1) * defaults_1.defaultTileSize.width - mapSize.width) / 2 + helpers_1.coordinatesOnTile(center, zoom).x,
        y: ((tilesCount.height - 1) * defaults_1.defaultTileSize.height - mapSize.height) / 2 + helpers_1.coordinatesOnTile(center, zoom).y,
    });
    const [startTile, setStartTile] = react_1.useState(helpers_1.minusPositions(helpers_1.coordinatesToTile(center, zoom), {
        x: Math.floor(defaults_1.defaultTilesCount.width / 2),
        y: Math.floor(defaults_1.defaultTilesCount.height / 2),
    }));
    const [previousDelta, setPreviousDelta] = react_1.useState(delta);
    const [currentCoordinates, setCurrentCoordinates] = react_1.useState(center);
    const [controlState, setControlState] = react_1.useState(types_1.ControlState.Default);
    const [markers, setMarkers] = react_1.useState(props.markers);
    const [squares, setSquares] = react_1.useState(props.squares);
    const [rounds, setRounds] = react_1.useState(props.rounds);
    react_1.useEffect(() => {
        const size = helpers_1.getElementSize(map);
        setMapSize(size);
        const count = helpers_1.getTilesCount(size, defaults_1.defaultTileSize);
        setTilesCount(count);
        const start = helpers_1.minusPositions(helpers_1.coordinatesToTile(center, zoom), {
            x: Math.floor(count.width / 2),
            y: Math.floor(count.height / 2),
        });
        setStartTile(start);
        const d = {
            x: -(((count.width - 1) * defaults_1.defaultTileSize.width - size.width) /
                2 + helpers_1.coordinatesOnTile(center, zoom).x),
            y: -(((count.height - 1) * defaults_1.defaultTileSize.height - size.height) /
                2 + helpers_1.coordinatesOnTile(center, zoom).y),
        };
        setDelta(d);
    }, [map, zoom]);
    react_1.useEffect(() => {
        const changedDelta = helpers_1.minusPositions(previousDelta, delta);
        const vector = {
            x: -Math.round(changedDelta.x / defaults_1.defaultTileSize.width),
            y: -Math.round(changedDelta.y / defaults_1.defaultTileSize.height),
        };
        if (Math.abs(vector.x) === 1 || Math.abs(vector.y) === 1) {
            setStartTile(helpers_1.sumPositions(startTile, vector));
        }
        setPreviousDelta(delta);
    }, [delta]);
    const handleOnMouseMove = (event) => {
        const position = helpers_1.getCursorPosition(event, map);
        setCursorPosition(position);
        if (dragable) {
            const d = helpers_1.amendDelta(helpers_1.minusPositions(position, cursorStartPosition), defaults_1.defaultTileSize, mapSize);
            setDelta(d);
        }
        else {
            const coords = helpers_1.getCoordinates(position, delta, startTile, tilesCount, mapSize, defaults_1.defaultTileSize, zoom);
            setCurrentCoordinates(coords);
            props.onMouseMove && props.onMouseMove(position, coords);
        }
    };
    const handleOnMouseUp = (event) => {
        setDragable(false);
    };
    const handleOnMouseDown = (event) => {
        setCursorStartPosition(helpers_1.minusPositions(cursorPosition, delta));
        setDragable(true);
    };
    const handleOnMouseClick = (event) => {
        setDragable(false);
    };
    const handleOnMouseDoubleClick = (event) => {
        setDragable(false);
    };
    const handleOnMouseLeave = (event) => {
        setDragable(false);
    };
    const handleOnMouseWheel = (event) => {
        if (event.deltaY > 0 && zoom > 0) {
            setCenter(currentCoordinates);
            setZoom(zoom - 1);
        }
        if (event.deltaY < 0 && zoom < 19) {
            setCenter(currentCoordinates);
            setZoom(zoom + 1);
        }
    };
    return (react_1.default.createElement("div", { style: style, ref: (element) => setMap(element) },
        react_1.default.createElement(Layout_1.Layout, { displayMapSize: mapSize, delta: delta, center: center, startTilePosition: startTile, zoom: zoom }),
        react_1.default.createElement(MarkersLayout_1.MarkersLayout, { markers: markers, squares: squares, rounds: rounds, delta: delta, startTilePosition: startTile, size: mapSize, zoom: zoom }),
        react_1.default.createElement("div", { style: styles.controlFlowStyle, onMouseMove: handleOnMouseMove, onMouseUp: handleOnMouseUp, onMouseDown: handleOnMouseDown, onClick: handleOnMouseClick, onDoubleClick: handleOnMouseDoubleClick, onMouseLeave: handleOnMouseLeave, onWheel: handleOnMouseWheel })));
};
//# sourceMappingURL=index.js.map