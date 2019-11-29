import React, {
    CSSProperties,
    useEffect,
    useState,
} from 'react';

import {
    defaultDelta,
    defaultMapSize,
    defaultPosition,
    defaultTilesCount,
    defaultTileSize,
} from '../../defaults';
import {
    amendDelta,
    coordinatesOnTile,
    coordinatesToTile,
    getCoordinates,
    getCursorPosition,
    getElementSize,
    getTilesCount,
    minusPositions,
    sumPositions,
} from '../../helpers';
import {
    ControlState,
    Coordinates,
    InputType,
    Line,
    Marker,
    Polygon,
    Position,
    Round,
    Size,
	Square,
} from '../../types';
import { Layout } from '../Layout';
import { MarkersLayout } from '../MarkersLayout';

const styles = {
    controlFlowStyle: {
        height: '100%',
        width: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
    }  as CSSProperties,
    helpFlowStyle: {
        height: '50%',
        width: '50%',
        left: 0,
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.25)',
    }  as CSSProperties,
};

export interface MapProps {
    style?: CSSProperties;
    onMouseMove?: (position: Position, coordinates: Coordinates, clickNumber: number, inputMethod: InputType) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onClick?: (position: Position, coordinates: Coordinates, inputMethod: InputType, clickNumber: number, setClickNumber: (x:number) => void) => void;
    onDoubleClick?: (event: React.MouseEvent, clickNumber: number, setClickNumber: (x:number) => void, inputMethod: InputType) => void;
    center: Coordinates;
    zoom: number;
    markers: Marker[];
    squares: Square[];
    rounds: Round[];
    line: Line[];
    polygon: Polygon[];
    //markersControlShow?: boolean;
}

export const Map: React.FC<MapProps> = (props: MapProps) => {
    const style: CSSProperties = {
        position: 'relative',
        ...props.style,
        overflow: 'hidden',
        userSelect: 'none',
    } as CSSProperties;

    // state
    const [zoom, setZoom] = useState<number>(props.zoom);
    const [center, setCenter] = useState<Coordinates>(props.center);
    const [map, setMap] = useState<HTMLDivElement | null>(null);
    const [mapSize, setMapSize] = useState<Size>(defaultMapSize);
    const [dragable, setDragable] = useState<boolean>(false);
    const [cursorPosition, setCursorPosition] = useState<Position>(defaultPosition);
    const [cursorStartPosition, setCursorStartPosition] = useState<Position>(defaultPosition);
    const [tilesCount, setTilesCount] = useState<Size>(defaultTilesCount);
    const [delta, setDelta] = useState<Position>({
        x: ((tilesCount.width - 1) * defaultTileSize.width - mapSize.width) / 2 + coordinatesOnTile(center, zoom).x,
        y: ((tilesCount.height - 1) * defaultTileSize.height - mapSize.height) / 2 + coordinatesOnTile(center, zoom).y,
    });
    const [startTile, setStartTile] = useState<Position>(
        minusPositions(
            coordinatesToTile(center, zoom),
            {
                x: Math.floor(defaultTilesCount.width / 2),
                y: Math.floor(defaultTilesCount.height / 2),
            }
        )
    );
    const [previousDelta, setPreviousDelta] = useState<Position>(delta);
    const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>(center);
    const [controlState, setControlState] = useState<ControlState>(ControlState.Default);
    const [markers, setMarkers] = useState<Marker[]>(props.markers);
    const [squares, setSquares] = useState<Square[]>(props.squares);
    const [rounds, setRounds] = useState<Round[]>(props.rounds);
    const [line, setLine] = useState<Line[]>(props.line);
    const [clickNumber, setClickNumber] = useState<number>(0);
    const [polygon, setPolygon] = useState<Polygon[]>(props.polygon);
    const [inputMethod, setInputMethod] = useState<InputType>(InputType.Cursor);
    // effects
    useEffect(
        () => {
            const size = getElementSize(map);
            setMapSize(size);

            const count = getTilesCount(size, defaultTileSize);
            setTilesCount(count);

            const start = minusPositions(
                coordinatesToTile(center, zoom),
                {
                    x: Math.floor(count.width / 2),
                    y: Math.floor(count.height / 2),
                }
            );

            setStartTile(start);

            const d = {
                x: - (((count.width - 1) * defaultTileSize.width - size.width) /
                2 + coordinatesOnTile(center, zoom).x),
                y: - (((count.height - 1) * defaultTileSize.height - size.height) /
                2 + coordinatesOnTile(center, zoom).y),
            };
            setDelta(d);
        },
        [map, zoom]
    );

    useEffect(
        () => {
            const changedDelta = minusPositions(previousDelta, delta);
            const vector: Position = {
                x: - Math.round(changedDelta.x / defaultTileSize.width),
                y: - Math.round(changedDelta.y / defaultTileSize.height),
            };
            if (Math.abs(vector.x) === 1 || Math.abs(vector.y) === 1) {
                setStartTile(
                    sumPositions(startTile, vector)
                );
            }
            setPreviousDelta(delta);
        },
        [delta]
    );

    // handlers
    const handleOnMouseMove = (event: React.MouseEvent) => {
        const position = getCursorPosition(event, map);
        setCursorPosition(position);
        if (dragable) {
            const d = amendDelta(
                minusPositions(position, cursorStartPosition),
                defaultTileSize,
                mapSize
            );
            setDelta(d);
            
						      props.onMouseMove && props.onMouseMove(position, currentCoordinates, clickNumber, inputMethod);
        } else {
            const coords = getCoordinates(
                position,
                delta,
                startTile,
                tilesCount,
                mapSize,
                defaultTileSize,
                zoom
            );
            setCurrentCoordinates(coords);
						      props.onMouseMove && props.onMouseMove(position, coords, clickNumber, inputMethod);
        }
    };

    const handleOnMouseUp = (event: React.MouseEvent) => {
        setCursorStartPosition(
            sumPositions(cursorPosition, delta)
        );
        setDragable(true);
				    props.onMouseUp && props.onMouseUp(event);
    };

    const handleOnMouseDown = (event: React.MouseEvent) => {
        setCursorStartPosition(
            minusPositions(cursorPosition, delta)
        );
        setDragable(true);
				    props.onMouseDown && props.onMouseDown(event);
    };

    const handleOnMouseClick = (event: React.MouseEvent) => {
        const position = getCursorPosition(event, map);
        // setCursorPosition(position);
        console.log(currentCoordinates,previousDelta, cursorStartPosition);
        if (dragable) {
           /*const d = amendDelta(
                minusPositions(position, cursorStartPosition),
                defaultTileSize,
                mapSize
            );
            setDelta(d);*/
            // setCursorPosition(position);
            setDragable(false);
						      props.onClick && props.onClick(position, currentCoordinates, inputMethod, clickNumber, setClickNumber);
        } else {
            console.log(position,
                delta,
                startTile,
                );
            const coords = getCoordinates(
                position,
                delta,
                startTile,
                tilesCount,
                mapSize,
                defaultTileSize,
                zoom
            );
            setCurrentCoordinates(coords);
            //setDragable(false);
        
                    props.onClick && props.onClick(position, coords, inputMethod, clickNumber, setClickNumber);
        
        }
    };

    const handleOnMouseDoubleClick = (event: React.MouseEvent) => {
        setDragable(false);
				    props.onDoubleClick && props.onDoubleClick(event, clickNumber, setClickNumber, inputMethod);
    };

    const handleOnMouseLeave = (event: React.MouseEvent) => {
        setDragable(false);
    };

    const handleOnMouseWheel = (event: React.WheelEvent) => {
        if (event.deltaY > 0 && zoom > 4) {
            setCenter(currentCoordinates);
            setZoom(zoom - 1);
        }
        if (event.deltaY < 0 && zoom < 19) {
            setCenter(currentCoordinates);
            setZoom(zoom + 1);
        }
    };

    useEffect(
        () => {
            console.log(inputMethod);
        },
        [inputMethod]
    );

    // render
    return (
		<>
			{
				// props.markersControlShow && (
                (
					<div>
						<button onClick={() => setInputMethod(InputType.Circle)}>Circle</button>
						<button onClick={() => setInputMethod(InputType.Line)}>Line</button>
						<button onClick={() => setInputMethod(InputType.Polygon)}>Polygon</button>
						<button onClick={() => setInputMethod(InputType.Marker)}>Marker</button>
						<button onClick={() => setInputMethod(InputType.Cursor)}>Cursor</button>
					</div>
				)
			}
	        <div style={style} ref={(element: HTMLDivElement) => setMap(element)}>
	            <Layout
	                displayMapSize={mapSize}
	                delta={delta}
	                center={center}
	                startTilePosition={startTile}
                    zoom={zoom}
	            />
	            <MarkersLayout
	                markers={markers}
	                squares={squares}
                    rounds={rounds}
                    line={line}
                    polygon={polygon}
	                delta={delta}
	                startTilePosition={startTile}
	                size={mapSize}
	                zoom={zoom}
	            />
	            <div
	                style={styles.controlFlowStyle}
	                onMouseMove={handleOnMouseMove}
	                onMouseUp={handleOnMouseUp}
	                onMouseDown={handleOnMouseDown}
	                onClick={handleOnMouseClick}
	                onDoubleClick={handleOnMouseDoubleClick}
	                onMouseLeave={handleOnMouseLeave}
	                onWheel={handleOnMouseWheel}
	            />
	        </div>
		</>
    );
};
