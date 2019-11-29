"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementWidth = (element) => {
    if (!element) {
        return 0;
    }
    const style = window.getComputedStyle(element, null);
    return element.getBoundingClientRect().width -
        parseFloat(style.paddingLeft || '0') -
        parseFloat(style.paddingRight || '0') -
        parseFloat(style.borderLeftWidth || '0') -
        parseFloat(style.borderRightWidth || '0');
};
exports.getElementHeight = (element) => {
    if (!element) {
        return 0;
    }
    const style = window.getComputedStyle(element, null);
    return element.getBoundingClientRect().height -
        parseFloat(style.paddingTop || '0') -
        parseFloat(style.paddingBottom || '0') -
        parseFloat(style.borderTopWidth || '0') -
        parseFloat(style.borderBottomWidth || '0');
};
exports.getElementSize = (element) => {
    if (!element) {
        return {
            height: 0,
            width: 0,
        };
    }
    const style = window.getComputedStyle(element, null);
    return {
        height: element.getBoundingClientRect().height -
            parseFloat(style.paddingTop || '0') -
            parseFloat(style.paddingBottom || '0') -
            parseFloat(style.borderTopWidth || '0') -
            parseFloat(style.borderBottomWidth || '0'),
        width: element.getBoundingClientRect().width -
            parseFloat(style.paddingLeft || '0') -
            parseFloat(style.paddingRight || '0') -
            parseFloat(style.borderLeftWidth || '0') -
            parseFloat(style.borderRightWidth || '0'),
    };
};
exports.getTilesCount = (displayMapSize, tileSize) => {
    const result = {
        height: Math.ceil(displayMapSize.height / tileSize.height) + 2,
        width: Math.ceil(displayMapSize.width / tileSize.width) + 2,
    };
    result.height += result.height % 2 === 0 ? 1 : 0;
    result.width += result.width % 2 === 0 ? 1 : 0;
    return result;
};
exports.getCursorPosition = (event, element) => {
    if (!element) {
        return {
            x: 0,
            y: 0,
        };
    }
    return {
        x: event.clientX - element.getBoundingClientRect().left,
        y: event.clientY - element.getBoundingClientRect().top,
    };
};
exports.getCursorCoordinates = (event, element, delta) => ({
    lat: 0,
    lng: 0,
});
exports.amendDelta = (delta, tileSize, mapSize) => {
    const d = Object.assign({}, delta);
    const w = (tileSize.width - (mapSize.width - Math.floor(mapSize.width / tileSize.width) * tileSize.width)) / 2;
    const h = (tileSize.height - (mapSize.height - Math.floor(mapSize.height / tileSize.height) * tileSize.height)) / 2;
    while (tileSize.width + w > -d.x) {
        d.x -= tileSize.width;
    }
    while (tileSize.width * 2 + w < -d.x) {
        d.x += tileSize.width;
    }
    while (tileSize.height + h > -d.y) {
        d.y -= tileSize.height;
    }
    while (tileSize.height * 2 + h < -d.y) {
        d.y += tileSize.height;
    }
    return d;
};
//# sourceMappingURL=coordinators.js.map