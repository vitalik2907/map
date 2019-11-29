import React from 'react';
import { coordinatesToTile } from '../helpers';
import { Coordinates, Position } from '../types';
import { loadTile } from './loader';
import { Tile } from './tile';

export class TilesList {
    private list: Tile[] = [];
    private isHiddenLoadingStarted: boolean = false;
    private center: Coordinates = {
        lat: 0,
        lng: 0,
    };
    private zoom: number = 0;

    public getTile = (zoom: number, coordinates: Coordinates) => {
        let tile = this.list.find(
            (item: Tile) => item.isTile(zoom, coordinates)
        );
        if (tile === undefined) {
            tile = new Tile(zoom, coordinates, this.hiddenLoading);
            this.list.push(tile);
        }
        return tile;
    }

    public setCurentMapState = (center: Coordinates, zoom: number) => {
        this.center = center;
        this.zoom = zoom;
    }

    private continueHiddenLoading = () => {
        // this.continueHiddenLoading();
    }

    private findTile = (zoom: number, coordinates: Coordinates) => {
        const index = this.list.findIndex(
            (item: Tile) => item.isTile(
                zoom,
                coordinates
            )
        );
        if (index === -1) {
            return {
                zoom,
                coordinates,
            };
        }
        return null;
    }

    private findNextPosition = (round: number) => {
        const center = coordinatesToTile(this.center, this.zoom);
        for (let i = -round; i <= round; i++) {
            for (let j = -round; j <= round; j++) {
                if (Math.abs(i) === round || Math.abs(j) === round) {
                    const tile = this.findTile(
                        this.zoom,
                        {
                            lat: center.y + i,
                            lng: center.x + j,
                        }
                    );
                    if (tile != null) {
                        return tile;
                    }
                }
            }
        }

        for (let k = 1; k <= round; k++) {
            const centerPlus = coordinatesToTile(this.center, this.zoom + k);
            const centerMinus = coordinatesToTile(this.center, this.zoom - k);

            for (let i = -round; i <= round; i++) {
                for (let j = -round; j <= round; j++) {
                    if (Math.abs(i) === round || Math.abs(j) === round) {
                        let tile = this.findTile(
                            this.zoom + k,
                            {
                                lat: centerPlus.y + i,
                                lng: centerPlus.x + j,
                            }
                        );
                        if (tile != null) {
                            return tile;
                        }
                        tile = this.findTile(
                            this.zoom - k,
                            {
                                lat: centerMinus.y + i,
                                lng: centerMinus.x + j,
                            }
                        );
                        if (tile != null) {
                            return tile;
                        }
                    }
                }
            }
        }
    }

    private hiddenLoading = () => {
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
    }
}
