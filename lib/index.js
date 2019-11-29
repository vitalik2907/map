"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Map_1 = require("./components/Map");
const serviceWorker = __importStar(require("./serviceWorker"));
const style = {
    border: 'solid 1px #000',
    height: '800px',
    left: '300px',
    position: 'absolute',
    width: '800px',
};
const mapProps = {
    center: {
        lat: 50.1102,
        lng: 3.1506,
    },
    zoom: 7,
    markers: [
        {
            lat: 50.1102,
            lng: 3.1506,
        },
        {
            lat: 50.2102,
            lng: 3.1506,
        },
        {
            lat: 50.3102,
            lng: 3.1506,
        },
        {
            lat: 50.1102,
            lng: 3.2506,
        },
        {
            lat: 50.1102,
            lng: 3.3506,
        },
        {
            lat: 50.2102,
            lng: 3.2506,
        },
        {
            lat: 50.3102,
            lng: 3.3506,
        },
    ],
    squares: [
        {
            filled: false,
            points: [
                {
                    lat: 50.1102,
                    lng: 3.3506,
                },
                {
                    lat: 50.2102,
                    lng: 3.2506,
                },
                {
                    lat: 50.3102,
                    lng: 3.3506,
                },
            ],
        },
    ],
    rounds: [
        {
            center: {
                lat: 50.3102,
                lng: 3.3506,
            },
            radius: {
                lat: 0.1,
                lng: 0.15,
            },
            filled: true,
            color: 'rgba(255, 255, 0, 0.5)',
        }
    ],
    onMouseMove: (position, coordinates) => {
        console.log(position, coordinates);
    }
};
react_dom_1.default.render((react_1.default.createElement(Map_1.Map, Object.assign({ style: style }, mapProps))), document.getElementById('root'));
serviceWorker.unregister();
//# sourceMappingURL=index.js.map