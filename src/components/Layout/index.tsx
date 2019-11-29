import React, {
    useEffect,
    useState,
} from 'react';
import {
    defaultDelta,
    defaultTilesCount,
    defaultTileSize,
} from '../../defaults';
import {
    getTilesCount,
} from '../../helpers';
import {
    Coordinates,
    Position,
    Size,
} from '../../types';
import { Grid } from '../Grid';

export interface LayoutProps {
    displayMapSize: Size;
    delta: Position;
    center: Coordinates;
    startTilePosition: Position;
    zoom: number;
}

export const Layout = (props: LayoutProps) => {
    const {
        displayMapSize,
        delta,
        center,
        startTilePosition,
        zoom,
    } = props;

    const [tilesCount, setTilesCount] = useState(defaultTilesCount);
    const [margins, setMargins] = useState(defaultDelta);

    useEffect(
        () => {
            setTilesCount(getTilesCount(displayMapSize, defaultTileSize));
        },
        [displayMapSize]
    );

    return (
        <div
            style={{
                height: `${defaultTileSize.height * tilesCount.height}px`,
                marginLeft: `${delta.x}px`,
                marginTop: `${delta.y}px`,
                width: `${defaultTileSize.width * tilesCount.width}px`,
            }}
        >
            <Grid
                tilesCount={tilesCount}
                tileSize={defaultTileSize}
                center={center}
                startTilePosition={startTilePosition}
                zoom={props.zoom}
            />
        </div>
    );
};
