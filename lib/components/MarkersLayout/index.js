"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const defaults_1 = require("../../defaults");
const helpers_1 = require("../../helpers");
const marker_png_1 = __importDefault(require("./marker.png"));
exports.MarkersLayout = (props) => {
    const [canvas, setCanvas] = React.useState(null);
    const [tilesCount, setTilesCount] = React.useState(defaults_1.defaultTilesCount);
    React.useEffect(() => {
        setTilesCount(helpers_1.getTilesCount(props.size, defaults_1.defaultTileSize));
    }, [props.size]);
    React.useEffect(() => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.src = marker_png_1.default;
                ctx.clearRect(0, 0, props.size.width, props.size.height);
                props.markers.forEach((item) => {
                    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                    const size = item.size || {
                        width: 20,
                        height: 32,
                    };
                    ctx.drawImage(img, (helpers_1.lngToX(item.lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaults_1.defaultTileSize.width /
                        tilesCount.width + props.delta.x - size.width / 2, (helpers_1.latToY(item.lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaults_1.defaultTileSize.height /
                        tilesCount.height + props.delta.y - size.height, size.width, size.height);
                });
                props.squares.forEach((item) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    }
                    else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();
                    ctx.moveTo((helpers_1.lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaults_1.defaultTileSize.width /
                        tilesCount.width + props.delta.x, (helpers_1.latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaults_1.defaultTileSize.height /
                        tilesCount.height + props.delta.y);
                    for (let i = 1; i < item.points.length; i++) {
                        ctx.lineTo((helpers_1.lngToX(item.points[i].lng, props.zoom) - props.startTilePosition.x) *
                            tilesCount.width *
                            defaults_1.defaultTileSize.width /
                            tilesCount.width + props.delta.x, (helpers_1.latToY(item.points[i].lat, props.zoom) - props.startTilePosition.y) *
                            tilesCount.height *
                            defaults_1.defaultTileSize.height /
                            tilesCount.height + props.delta.y);
                    }
                    ctx.lineTo((helpers_1.lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaults_1.defaultTileSize.width /
                        tilesCount.width + props.delta.x, (helpers_1.latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaults_1.defaultTileSize.height /
                        tilesCount.height + props.delta.y);
                    if (item.filled) {
                        ctx.fill();
                    }
                    else {
                        ctx.stroke();
                    }
                });
                props.rounds.forEach((item) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    }
                    else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();
                    const center = {
                        x: helpers_1.lngToX(item.center.lng, props.zoom),
                        y: helpers_1.latToY(item.center.lat, props.zoom),
                    };
                    ctx.ellipse((center.x - props.startTilePosition.x) *
                        tilesCount.width *
                        defaults_1.defaultTileSize.width /
                        tilesCount.width + props.delta.x, (center.y - props.startTilePosition.y) *
                        tilesCount.height *
                        defaults_1.defaultTileSize.height /
                        tilesCount.height + props.delta.y, (Math.abs(helpers_1.lngToX(item.center.lng + item.radius.lng, props.zoom) - center.x)) *
                        tilesCount.width *
                        defaults_1.defaultTileSize.width /
                        tilesCount.width, (Math.abs(helpers_1.latToY(item.center.lat + item.radius.lat, props.zoom) - center.y)) *
                        tilesCount.height *
                        defaults_1.defaultTileSize.height /
                        tilesCount.height, 0, 0, 2 * Math.PI);
                    if (item.filled) {
                        ctx.fill();
                    }
                    else {
                        ctx.stroke();
                    }
                });
            }
        }
    });
    return (React.createElement("canvas", { style: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        }, width: props.size.width, height: props.size.height, ref: (element) => setCanvas(element) }));
};
//# sourceMappingURL=index.js.map