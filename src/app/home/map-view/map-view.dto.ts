import { Device } from '../../shared/devices/device.model';

export interface Position {
    x: Number;
    y: Number;
}

export interface MapViewSensorDto {
    _id: string;
    sensor: Device;
    position: Position;
}

export interface MapViewSensorUpdateDto {
    sensor: string; // sensor id
    position: Position;
}

export interface MapViewInfoDto {
    _id: string;
    pictureName: string;
    active: boolean;
    sensors: Array<MapViewSensorDto>;
}

export interface MapViewInfoCreateDto {
    active: boolean;
    sensors: Array<MapViewSensorUpdateDto>;
}
