import { Sensor } from '../../settings/devices/sensor-details/sensor';

export interface Position {
    x: Number;
    y: Number;
}

export interface MapViewSensorDto {
    sensor: Sensor;
    position: Position;
}

export interface MapViewSensorUpdateDto {
    sensor: string; // sensor id
    position: Position;
}

export interface MapViewInfoDto {
    _id: string;
    name: string;
    description: string;
    pictureName: string;
    active: boolean;
    sensors: Array<MapViewSensorDto>;
}

export interface MapViewInfoCreateDto {
    name: string;
    description: string;
    active: boolean;
    sensors: Array<MapViewSensorUpdateDto>;
}
