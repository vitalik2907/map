import React from 'react';
import { coordinatesToTile } from '../helpers';
import { Coordinates, Position } from '../types';
import { loadTile } from './loader';

export class Tile {
    private zoom: number;
    private coordinates: Coordinates;
    // tslint:disable-next-line:no-any
    private image: any;

    public constructor(zoom: number, coordinates: Coordinates, onload: () => void) {
        this.zoom = zoom;
        this.coordinates = coordinates;
        this.image = (
            <img
                src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinates.lng}/${coordinates.lat}.png`}
                onLoad={onload}
            />
        );
        // this.image.src = `https://maps.wikimedia.org/osm-intl/${zoom}/${coordinates.lng}/${coordinates.lat}.png`;
    }

    public getImage = (): HTMLImageElement =>
        this.image

    public isTile = (zoom: number, coordinates: Coordinates) => (
        this.zoom === zoom &&
        this.coordinates.lat === coordinates.lat &&
        this.coordinates.lng === coordinates.lng
    )

    public getCoordinates = (): Coordinates => this.coordinates;
}
