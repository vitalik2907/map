import React, { useEffect, useState } from 'react';

import {
    TilesList,
} from '../../tiles';
import {
    Coordinates,
    Position,
    Size,
} from '../../types';

export interface GridProps {
    tilesCount: Size;
    tileSize: Size;
    center: Coordinates;
    startTilePosition: Position;
    zoom: number;
}

const list = new TilesList();
const tilesRefs = new Array();
const tilesGrid = new Array();

export const Grid = (props: GridProps) => {
    const {
        tilesCount,
        tileSize,
        center,
        zoom,
        startTilePosition,
    } = props;
    // console.log(tilesCount);
    for (let i = 0; i < tilesCount.height; i++) {
        tilesGrid[i] = new Array();
        tilesRefs[i] = new Array();

        for (let j = 0; j < tilesCount.width; j++) {
            tilesGrid[i][j] = list.getTile(
                zoom,
                {
                    lat: startTilePosition.y + i,
                    lng: startTilePosition.x + j,
                }
            ).getImage();
        }
    }

    const [loadedTiles, setLoadTiles] = useState<number>(0);

    useEffect(
        () => {
            // console.log(1);
        },
        [center]
    );

    return (
        <>
            {
                tilesGrid.map((row: HTMLImageElement[], rowIndex: number) => (
                    <div
                        style={{
                            height: `${tileSize.height}px`,
                            width: `${tileSize.width * tilesCount.width}px`,
                        }}
                        key={rowIndex}
                    >
                        {
                            row.map((cell: HTMLImageElement, collIndex: number) => (
                                <div
                                    style={{
                                        float: 'left',
                                        height: `${tileSize.height}px`,
                                        width: `${tileSize.width}px`,
                                        backgroundColor:
                                            rowIndex === Math.floor(tilesCount.height / 2) &&
                                            collIndex === Math.floor(tilesCount.width / 2) ?
                                            'rgba(0, 255, 0, 0.5)' : '#fff',
                                    }}
                                    key={collIndex}
                                >
                                    {cell}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </>
    );
};
