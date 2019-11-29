import {
    Coordinates,
} from '../types';

export const loadTile = (
    zoom: number,
    coordinates: Coordinates,
    callback: (
        zoom: number,
        coordinates:
        Coordinates,
        data: string | null
    ) => void
) => {
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

const ab2str = (buf: string | ArrayBuffer | null): string => {
    if (buf === null) {
        return '';
    }
    if (typeof buf === 'string') {
        return buf;
    }
    const arr = new Uint16Array(buf);
    const result: string = arr.reduce(
        (pV: string, cV: number) =>
            pV + String.fromCharCode(cV),
        ''
    );
    return result;
};
