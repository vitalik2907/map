"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTile = (zoom, coordinates, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(zoom, coordinates, ab2str(reader.result || null));
        };
        reader.readAsBinaryString(xhr.response);
    };
    xhr.open('GET', `https://maps.wikimedia.org/osm-intl/${zoom}/${coordinates.lng}/${coordinates.lat}.png`);
    xhr.responseType = 'blob';
    xhr.send();
};
const ab2str = (buf) => {
    if (buf === null) {
        return '';
    }
    if (typeof buf === 'string') {
        return buf;
    }
    const arr = new Uint16Array(buf);
    const result = arr.reduce((pV, cV) => pV + String.fromCharCode(cV), '');
    return result;
};
//# sourceMappingURL=loader.js.map