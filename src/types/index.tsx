export interface Size {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Km {
    km: number;
}

export interface Marker {
    lat: number;
    lng: number;
    image?: HTMLImageElement;
    size?: Size;
}

export interface Square {
    points: Coordinates[];
    filled: boolean;
    color?: string;
}

export interface Round {
    center: Coordinates;
    radius: Km;
    filled: boolean;
    color?: string;
}

export interface Line {
    points: Coordinates[];
    filled: boolean;
    color?: string;
}

export interface Polygon {
    points: Coordinates[];
    filled: boolean;
    color?: string;
}

export enum ControlState {
    Default = 0,
    Marker = 1,
    Square = 2,
    Line = 3,
    Polygon = 4,
}

export enum InputType {
    Circle,
    Line,
    Polygon,
    Marker,
	Cursor,
}
