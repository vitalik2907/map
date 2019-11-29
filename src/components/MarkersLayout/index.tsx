import * as React from 'react';
import { defaultTilesCount, defaultTileSize } from '../../defaults';
import { getTilesCount, kmTolat, kmTolng, latToY, lngToX } from '../../helpers';
import { Line, Marker, Position, Round, Size, Square, Polygon } from '../../types';
import image from './marker.png';

export interface MarkersLayoutProps {
    markers: Marker[];
    squares: Square[];
    rounds: Round[];
    line: Line[];
    polygon: Polygon[];
    size: Size;
    zoom: number;
    delta: Position;
    startTilePosition: Position;
}

export const MarkersLayout: React.FC<MarkersLayoutProps> = (props: MarkersLayoutProps) => {
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
    const [tilesCount, setTilesCount] = React.useState(defaultTilesCount);

    React.useEffect(
        () => {
            setTilesCount(getTilesCount(props.size, defaultTileSize));
        },
        [props.size]
    );

    React.useEffect(() => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.src = image;
                ctx.clearRect(0, 0, props.size.width, props.size.height);

                // markers
                props.markers.forEach((item: Marker) => {
                    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                    const size: Size = item.size || {
                        width: 20,
                        height: 32,
                    };
                    ctx.drawImage(
                        img,
                        (lngToX(item.lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x - size.width / 2,

                        (latToY(item.lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y - size.height,
                        size.width,
                        size.height
                    );
                });

                // squares
                props.squares.forEach((item: Square) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    } else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();

                    ctx.moveTo(
                        (lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,

                        (latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y
                    );

                    for (let i = 1; i < item.points.length; i++) {
                        ctx.lineTo(
                            (lngToX(item.points[i].lng, props.zoom) - props.startTilePosition.x) *
                            tilesCount.width *
                            defaultTileSize.width /
                            tilesCount.width + props.delta.x,

                            (latToY(item.points[i].lat, props.zoom) - props.startTilePosition.y) *
                            tilesCount.height *
                            defaultTileSize.height /
                            tilesCount.height + props.delta.y
                        );
                    }

                    ctx.lineTo(
                        (lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,

                        (latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y
                    );

                    if (item.filled) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                });

                props.rounds.forEach((item: Round) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    } else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();
                    const center: Position = {
                        x: lngToX(item.center.lng, props.zoom),
                        y: latToY(item.center.lat, props.zoom),
                    };
                    ctx.arc(
                        (center.x  - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,
                        (center.y - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y,
                        //(Math.abs(lngToX(item.center.lng + kmTolng(item.radius.km), props.zoom) - center.x)) *
                        //tilesCount.width *
                        //defaultTileSize.width /
                        //tilesCount.width,
                        (Math.abs(latToY(item.center.lat + kmTolat(item.radius.km), props.zoom) - center.y)) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height,
                        0,
                        //0,
                        2 * Math.PI
                    );

                    if (item.filled) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                });

                // line
                props.line.forEach((item: Square) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    } else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();

                    ctx.moveTo(
                        (lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,

                        (latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y
                    );

                    for (let i = 1; i < item.points.length; i++) {
                        ctx.lineTo(
                            (lngToX(item.points[i].lng, props.zoom) - props.startTilePosition.x) *
                            tilesCount.width *
                            defaultTileSize.width /
                            tilesCount.width + props.delta.x,

                            (latToY(item.points[i].lat, props.zoom) - props.startTilePosition.y) *
                            tilesCount.height *
                            defaultTileSize.height /
                            tilesCount.height + props.delta.y
                        );
                    }

                    if (item.filled) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                });

                // polygon
                props.polygon.forEach((item: Square) => {
                    if (item.color) {
                        ctx.fillStyle = item.color;
                        ctx.strokeStyle = item.color;
                    } else {
                        ctx.fillStyle = '#000000';
                        ctx.strokeStyle = '#000000';
                    }
                    ctx.beginPath();

                    ctx.moveTo(
                        (lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,

                        (latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y
                    );

                    for (let i = 1; i < item.points.length; i++) {
                        ctx.lineTo(
                            (lngToX(item.points[i].lng, props.zoom) - props.startTilePosition.x) *
                            tilesCount.width *
                            defaultTileSize.width /
                            tilesCount.width + props.delta.x,

                            (latToY(item.points[i].lat, props.zoom) - props.startTilePosition.y) *
                            tilesCount.height *
                            defaultTileSize.height /
                            tilesCount.height + props.delta.y
                        );
                    }
                    ctx.lineTo(
                        (lngToX(item.points[0].lng, props.zoom) - props.startTilePosition.x) *
                        tilesCount.width *
                        defaultTileSize.width /
                        tilesCount.width + props.delta.x,

                        (latToY(item.points[0].lat, props.zoom) - props.startTilePosition.y) *
                        tilesCount.height *
                        defaultTileSize.height /
                        tilesCount.height + props.delta.y
                    );

                    if (item.filled) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                });

            }
        }
    });

    return (
        <canvas
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
            }}
            width={props.size.width}
            height={props.size.height}
            ref={(element: HTMLCanvasElement) => setCanvas(element)}
        />
    );
};
