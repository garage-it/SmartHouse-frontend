import { Device } from '../../shared/devices/device.model';

export interface Position {
    x: Number;
    y: Number;
}

export interface MapViewSensorDto {
    sensor: Device;
    position: Position;
}

export interface MapViewSensorUpdateDto {
    sensor: string; // sensor id
    position: Position;
}

export interface MapViewInfoDto {
    _id: string;
    parentViewId?: string;
    name: string;
    description: string;
    pictureName: string;
    active: boolean;
    default: boolean;
    sensors: Array<MapViewSensorDto>;
}

export interface MapViewInfoCreateDto {
    name: string;
    description: string;
    active: boolean;
    default: boolean;
    sensors: Array<MapViewSensorUpdateDto>;
}
