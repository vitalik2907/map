import React from 'react';

export interface TileProps {
    src?: string;
}

export const Tile = (props: TileProps) => (
    <div>
        <img src={props.src} />
    </div>
);
