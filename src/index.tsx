import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Map, MapProps } from './components/Map';
import * as serviceWorker from './serviceWorker';
import { Coordinates, Position, InputType } from './types';
import {latToKm, lngToKm} from '../src/helpers/converters';

const style = {
    border: 'solid 1px #000',
    height: '800px',
    left: '200px',
    position: 'absolute',
    top: '50px',
    width: '800px',
} as CSSProperties;

const mapProps: MapProps = {
    center: {
        lat: 50.1102,
        lng: 3.1506,
    },
    zoom: 7,
    markers: [
        /*{
            lat: 50.1102,
            lng: 3.1506,
        },
        {
            lat: 50.2102,
            lng: 3.1506,
        },
        {
            lat: 50.3102,
            lng: 3.1506,
        },
        {
            lat: 50.1102,
            lng: 3.2506,
        },
        {
            lat: 50.1102,
            lng: 3.3506,
        },
        {
            lat: 50.2102,
            lng: 3.2506,
        },
        {
            lat: 50.3102,
            lng: 3.3506,
        },*/
    ],
    squares: [
        /*{
            filled: false,
            points: [
                {
                    lat: 50.1102,
                    lng: 3.3506,
                },
                {
                    lat: 50.2102,
                    lng: 3.2506,
                },
                {
                    lat: 50.3102,
                    lng: 3.3506,
                },
            ],
        },*/
    ],
    rounds: [
        {
            center: {
                lat: 50.3102,
                lng: 3.3506,
            },
            radius: {
                km: 10,
            },
            filled: true,
            color: 'rgba(255, 255, 0, 0.5)',
        },
    ],
    line: [
        {
            filled: false,
            points: [
                {
                    lat: 50.1102,
                    lng: 3.1506,
                },
                {
                    lat: 50.2102,
                    lng: 3.1506,
                },
            ],
        },
    ],
    polygon: [
        {
            filled: false,
            points: [
                {
                    lat: 50.3102,
                    lng: 3.1506,
                },
                {
                    lat: 50.2102,
                    lng: 3.2506,
                },
                {
                    lat: 50.1102,
                    lng: 3.2506,
                },
            ],
        },
    ],
    onMouseMove (position: Position, coordinates: Coordinates, clickNumber: number, inputMethod: InputType) {
        switch(inputMethod){
            case(InputType.Line): {
                if (clickNumber === 1){
                    this.line[this.line.length - 1].points[1] = coordinates;
                }
                break;
            }
            case(InputType.Circle): {
                if (clickNumber === 1){
                    const delLat = this.rounds[this.rounds.length - 1].center.lat - coordinates.lat;
                    const delLng = this.rounds[this.rounds.length - 1].center.lng - coordinates.lng;
                    this.rounds[this.rounds.length - 1].radius.km = Math.sqrt((Math.pow(latToKm(delLat), 2) + (Math.pow(lngToKm(delLng, coordinates.lat), 2))));
                }
                break;
            }
            case(InputType.Polygon): {
                if (clickNumber !== 0){
                    this.polygon[this.polygon.length - 1].points[this.polygon[this.polygon.length - 1].points.length - 1] = coordinates;
                }
                break;
            }
        }
    },
    onClick(position: Position, coordinates: Coordinates, inputMethod: InputType, clickNumber: number, setClickNumber: (x:number) => void) {
        switch(inputMethod){
            case(InputType.Marker): {
                this.markers.push(coordinates);
                break;
            }
            case(InputType.Line): {
                if (clickNumber === 0){
                    setClickNumber(1);
                    this.line.push(
                        {
                            filled: false,
                            points: [
                                coordinates,
                                coordinates,
                            ],
                        },
                    );
                } else {
                    setClickNumber(0);
                    this.line[this.line.length - 1].points[1] = coordinates;
                }
                break;
            }
            case(InputType.Circle): {
                if (clickNumber === 0){
                    setClickNumber(1);
                    this.rounds.push(
                        {
                            center: coordinates,
                            radius: {
                                km: 10,
                            },
                            filled: true,
                            color: 'rgba(255, 255, 0, 0.5)',
                        },
                    );
                } else {
                    setClickNumber(0);
                    const delLat = this.rounds[this.rounds.length - 1].center.lat - coordinates.lat;
                    const delLng = this.rounds[this.rounds.length - 1].center.lng - coordinates.lng;
                    this.rounds[this.rounds.length - 1].radius.km = Math.sqrt((Math.pow(latToKm(delLat), 2) + (Math.pow(lngToKm(delLng, coordinates.lat), 2))));
                }
                break;
            }
            case(InputType.Polygon): {
                if (clickNumber === 0){
                    setClickNumber(1);
                    this.polygon.push(
                        {
                            filled: false,
                            points: [
                                coordinates,
                                coordinates,
                            ],
                        },
                    );
                } else {
                    setClickNumber(clickNumber + 1);
                    this.polygon[this.polygon.length - 1].points[this.polygon[this.polygon.length - 1].points.length - 1] = coordinates;
                    this.polygon[this.polygon.length - 1].points.push(coordinates);

                }
                break;
            }
        }
    },
    onDoubleClick(event: React.MouseEvent, clickNumber: number, setClickNumber: (x: number) => void, inputMethod: InputType) {
        setClickNumber(0);
        switch(inputMethod){
            case(InputType.Marker): {
                this.markers.pop();
                this.markers.pop();
                this.markers.pop();
                // this.markers = this.markers.splice(0, this.markers.length - 4);
                break;
            }
            case(InputType.Line): {
                this.line.pop();
                this.line.pop();
                if (clickNumber === 1){
                    setClickNumber(0);
                }
                break;
            }
            case(InputType.Circle): {
                this.rounds.pop();
                this.rounds.pop();
                if (clickNumber === 1){
                    setClickNumber(0);
                }
                break;
            }
            case(InputType.Polygon): {
                if (clickNumber !== 2){
                    setClickNumber(0);
                    this.polygon[this.polygon.length - 1].points.pop();
                    this.polygon[this.polygon.length - 1].points.pop();
                    this.polygon[this.polygon.length - 1].points.pop();
                } else {
                    this.polygon.pop();
                    this.polygon.pop();
                }
                
                break;
            }
        }
    }
};

ReactDOM.render(
    (
        <Map
            style={style}
            {...mapProps}
        />
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
